<template>
  <el-button :type="isConnected?'success':'primary'" @click="connectWallet" :disabled="isConnected?true:false" round>
    <span v-if="!isConnected"><i class="fa fa-btc"></i>&nbsp;&nbsp;Connect Wallet</span>
    <el-popover v-if="isConnected" placement="bottom" :width="300" trigger="hover">
      <template #reference>
        <span>
          <i class="fa fa-bullseye"></i>
          <b style="display:inline-block;vertical-align: top;font-weight:400">&nbsp;&nbsp;{{$store.state.metaMask?.account.substring(0,6)+'...'}}</b>
        </span>
      </template>
      <template #default>
        <div style="text-align: center;">
          <el-image :src="require('@/assets/metamask-fox.svg')"></el-image>
          <p style="width:60%;margin:5px auto"><small>{{ $store.state.metaMask?.account }} <i class="fa fa-copy" @click="copy($store.state.metaMask?.account)"></i></small></p>
          <el-row :gutter="10" style="margin-top:10px">
            <el-col :span="10">
              <el-tag type="success" round><i class="fa fa-bullseye" style="font-size:12px;"></i> &nbsp;connected</el-tag>
            </el-col>
            <el-col :span="14" style="text-align: right;">
              <el-tooltip effect="light" :content="$store.state.abi?.networkName" placement="bottom">
              <span :title="$store.state.abi?.networkName">{{$store.state.abi?.networkName.length>20?($store.state.abi?.networkName.substring(0,20)+'...'):$store.state.abi?.networkName}}</span>
              </el-tooltip>
            </el-col>
          </el-row>
        </div>

      </template>
    </el-popover>
  </el-button>
</template>
<script setup>
import { ref, getCurrentInstance, computed } from "vue";
import { useStore } from "vuex"
import { chainApi } from "@/api/request";
import { base64 } from "@/utils/base64";
import { copyClick } from '@/utils/copy';
import Bus from "@/utils/event-bus";
const { proxy } = getCurrentInstance()
const store = useStore()
let CONTRACTS = store.state.abi?.contract;
const emit = defineEmits(['refresh'])
const metaMask = proxy.metaMask;
const provider = window.ethereum;
const abis = ref({ cosd: JSON.parse(base64.decode(CONTRACTS.cosd.abi)), busd: JSON.parse(base64.decode(CONTRACTS.busd.abi)) })
const chains = ref({ '0x1': "ethereum", '0x61': 'bsc' })
let isConnected = computed(() => {
  return store.state.metaMask ? true : false
})
if (provider) {
  if (store.state.metaMask) {
    let account;
    ethereum.request({ method: 'eth_requestAccounts' }).then(async(accounts) => {
      console.log(accounts);
      let chainId = await ethereum.request({ method: 'eth_chainId' })
      if (accounts && accounts.length) account = accounts[0];
      metaMask.setValue(chainId,account);
      if (account != store.state.metaMask.account) {
        store.commit("setMetaMask", { chainID: chainId, url: store.state.metaMask?.url, account: account });
      }
    });
  }
  provider.on('connect', (account) => {
    console.log('connect', account)
    if (!store.state.metaMask) metaMask.connectMetaMask()
  })
  provider.on('accountsChanged', (accounts) => {
    console.log('accountsChanged', accounts);
    if (!store.state.user) return;
    if (!accounts.length) {
      metaMask.disconnect();
    } else {
      if (store.state.metaMask) {
        metaMask.account = accounts[0]
        store.commit("setMetaMask", { chainID: store.state.metaMask?.chainID, url: store.state.metaMask?.url, account: accounts[0] });
        metaMask.isCurrentAccount()
      }
    }
  })
  provider.on('message', message => {
    console.log('message', message)
  })
  provider.on('disconnect', () => {
    console.log('disconnect')
    metaMask.disconnect();
  })
  provider.on('chainChanged', (chainId) => {
    if (!store.state.user) return;
    if (store.state.metaMask) {
      chainApi.getWalletUrl(chainId).then(res => {
        if (res.code == 0) {
          store.commit("setMetaMask", { account: store.state.user?.account, chainID: chainId, url: res.data });
        }
      })
      ElMessage.success("You have changed the chain!")
    }
  })
}
function getBalance(key,isProxy) {
  let data = {
    abi: abis.value[key],
    address: isProxy?CONTRACTS[key].proxyAddress:CONTRACTS[key].address,
    from: store.state.metaMask?.account,
    key: key
  }
  metaMask.getBalanceByContract(data).then(res => {
    let balance = store.state.balance
    balance[key] = Math.round((res) * 1000) / 1000;
    store.commit("setBalance", { ...balance })
  });
}
async function connectWallet() {
  await metaMask.connectMetaMask()
  if(!metaMask.isAvailable()) return;
  await getBalance('busd')
  await getBalance('cosd')
  Bus.$emit('refresh', true);
}
function copy(val){
  copyClick(val)
}
</script>
<style scoped>
.fa-copy{
  cursor: pointer;
  color:rgb(121, 121, 158)
}
</style>