<template>
  <div>
    <el-button type="primary" @click="open" round>{{$t('btn.buy')}}</el-button>
    <el-dialog v-model="visible" :title="$t('btn.buy')+' COSD'" width="360px" destroy-on-close append-to-body>
      <el-alert :title="$t('message.buy.tip')+' 100,000'" type="info" style="margin-bottom:20px"></el-alert>
      <el-row :gutter="5" style="margin-bottom:20px">
        <el-col :span="4">
          COSD
        </el-col>
        <el-col :span="20">
          <el-input-number v-model.number="action.amount1" controls-position="right" :step="1" :min="20" :max="max" :placeholder="$t('text.setAmount')" style="width:100%" @change="translate('usdt')" clearable></el-input-number>
        </el-col>
        <el-col :span="24" style="text-align: right;">
          <el-button type="success" link @click="toMax">{{ $t("text.max") }}</el-button>
        </el-col>
      </el-row>
      <el-row :gutter="5">
        <el-col :span="4">USDT</el-col>
        <el-col :span="20">
          <el-input-number v-model.number="action.amount" controls-position="right" :step="1" :min="min" :max="max/20" :placeholder="$t('text.setAmount')" style="width:100%" @change="translate('cosd')" clearable></el-input-number>
        </el-col>
        <el-col :span="24" style="margin-top:15px">
          <div style="text-align: right;">
            <b style="display:inline-block;padding:0 10px;background: #fef1db;color:#ff9800;">{{ $t('text.currentallowance') }}: {{ allowance['buycosd'] }}</b>
          </div>
          <el-button type="primary" @click="purchaseApprove" style="width:100%" :disabled="disabled">
            <el-tag size="small">1</el-tag>&nbsp;{{$t('btn.approve')}}
          </el-button>
        </el-col>
        <el-col :span="24">
          <p style="text-align: right;"><small>1COSD = 0.07USDT</small></p>
        </el-col>
        <el-col :span="24" style="margin-top:15px">
          <el-button type="success" @click="purchase" style="width:100%" :disabled="allowance['buycosd'] >= action.amount?false:true">
            <el-tag size="small">2</el-tag>&nbsp;{{$t('btn.buy')}}
          </el-button>
        </el-col>
      </el-row>
    </el-dialog>
  </div>
</template>
<script setup>
import { ref,getCurrentInstance, onMounted } from "vue";
import {useStore} from "vuex"
import { loadingHelper } from "@/utils/loading";
import { ASSETTYPE, TXTYPE, savaAfterTransaction } from "@/utils/meta-mask";
import {base64} from "@/utils/base64"
const store = useStore();
const {proxy} = getCurrentInstance();
let CONTRACTS = store.state.abi?.contract;
const emit = defineEmits(['balance'])
const action = ref({
  amount1: 20,
  amount: 1,
  title: proxy.$t('btn.buy')+' COSD',
  command: 'buy'
});
const allowance = ref({sl:0,club:0,defi:0,blindbox:0,buycosd:0})
const metaMask = proxy.metaMask;
const min = ref(1)
const allowPurchace = ref(2000000)
const marketBalance = ref(10000000)
const max = ref(2000000)
const visible = ref(false)
const disabled = ref(false)
const abis = ref({ buy: JSON.parse(base64.decode(CONTRACTS.buycosd.abi)), cosd: JSON.parse(base64.decode(CONTRACTS.cosd.abi)), busd: JSON.parse(base64.decode(CONTRACTS.busd.abi)) })
function isEmpty() {
  if (!action.value.amount) {
    ElMessage.error(proxy.$t('require.amount'))
  }
  return action.value.amount ? false : true;
}
function open() {
  if (!metaMask.isAvailable()) return;
  action.value = {
    amount1: 20,
    amount: 1,
    title: proxy.$t('btn.buy')+' COSD',
    command: 'buy'
  }
  disabled.value = false;
  min.value = 1;
  /*await getMarketBalance()
  await getAmountOfCOSDHasBuy()
  max.value = Math.min(marketBalance.value, allowPurchace.value, 2000000)
  if (max.value <= 0) {
    if (!allowPurchace.value) ElMessage.error("The COSD limit is 2,000,000,there is no available quota!")
    if (!marketBalance.value) ElMessage.error("No COSD available for purchase in the market !")
    return;
  }*/
  visible.value = true
}
function translate(type) {
  let rate = 0.07;
  if (type == 'cosd') {
    action.value.amount1 = action.value.amount / rate;
  } else if (type == 'usdt') {
    action.value.amount = action.value.amount1 * rate;
  }
}
function toMax() {
  action.value.amount1 = Math.min(marketBalance.value, allowPurchace.value, 2000000)
  translate('usdt')
}
function getAllowance(key){
  let data = {
    abi: abis.value['busd'],
    address: CONTRACTS['busd'].address,
    from: store.state.metaMask?.account,
    to: CONTRACTS[key].proxyAddress
  }
  metaMask.getAllowanceByContract(data).then(res=>{
    allowance.value[key] = res
  })
}
async function getMarketBalance() {
  if (!metaMask.isAvailable()) return;
  let data = {
    abi: abis.value['cosd'],
    address: CONTRACTS['cosd'].address,
    baddress: CONTRACTS['buycosd'].proxyAddress,
    from: store.state.metaMask?.account
  }
  await metaMask.getMarketBalanceByContract(data).then(res => {
    console.log(res)
    marketBalance.value = Math.round((res) * 1000) / 1000;
  });
}
async function getAmountOfCOSDHasBuy() {
  if (!metaMask.isAvailable()) return;
  let data = {
    abi: abis.value['buy'],
    address: CONTRACTS['buycosd'].proxyAddress,
    from: store.state.metaMask?.account
  }
  await metaMask.getCOSDHasBuyByContract(data).then(res => {
    allowPurchace.value = 2000000 - Math.round((res) * 1000) / 1000;
  });
}
function purchaseApprove() {
  if (!metaMask.isAvailable()) return;
  let data = {
    from: store.state.metaMask?.account,
    address: CONTRACTS["buycosd"].proxyAddress,
    amount: action.value.amount,
    abi: abis.value.buy,
    approveAddress: CONTRACTS["busd"].address,
    abiApprove: abis.value['busd']
  }
  if(allowance.value.buycosd > 100000){
    ElMessage.error(proxy.$t('message.buy.tip')+' 100,000')
    return;
  }
  if (isEmpty()) return;
  loadingHelper.show()
  metaMask.approveByContract(data).then(() => {
    loadingHelper.hide();
    getAllowance('buycosd')
    disabled.value = true;
  }).catch(err => {
    loadingHelper.hide();
  })
}
function purchase() {
  if (!metaMask.isAvailable()) return;
  if (isEmpty()) return;
  let data = {
    from: store.state.metaMask?.account,
    address: CONTRACTS["buycosd"].proxyAddress,
    amount: action.value.amount,
    abi: abis.value.buy,
    approveAddress: CONTRACTS["busd"].address,
    abiApprove: abis.value['busd']
  }
  loadingHelper.show()
  metaMask.transferByContract(data).then((res) => {
    visible.value = false;
    loadingHelper.hide();
    let param = {
      "txId": res.transactionHash,
      "transType": TXTYPE.buy,
      "fromUserId": store.state.user.id,
      "fromAssetType": ASSETTYPE.usdt,
      "fromAmount": action.value.amount,
      "toUserId": store.state.user.id,
      "toAssetType": ASSETTYPE.cosd,
      "toAmount": action.value.amount1,
      "nftVo": {},
      "blockNumber": res.blockNumber
    }
    savaAfterTransaction(param)
    emit("balance");
    getAllowance('buycosd')
  }).catch(err => {
    loadingHelper.hide();
  })
}
onMounted(()=>{
  if (metaMask.isAvailable()) {
    getAllowance('buycosd')
  }
})
</script>