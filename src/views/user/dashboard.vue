<template>
  <div class="content">
    <div class="row">
      <div class="col-lg-6 col-md-12 col-sm-12">
        <div class="card card-stats">
          <div class="card-header card-header-warning card-header-icon">
            <div class="card-icon">
              <i class="fa fa-user"></i>
            </div>
            <p class="card-category">{{$t('text.invited')}}</p>
            <h3 class="card-title">{{dashboard.level1}}<small class="text-muted">&nbsp;-<span>{{$t('text.level')}}</span>1&nbsp;&nbsp;</small>{{dashboard.level2}}<small class="text-muted">&nbsp;-<span>{{$t('text.level')}}</span>2&nbsp;&nbsp;</small>{{dashboard.level3}}<small class="text-muted">&nbsp;-<span>{{$t('text.level')}}</span>3</small></h3>
          </div>
          <div class="card-footer">
            <div class="stats">
              <i class="fa fa-btc"></i>&nbsp;{{ $t('message.dashboard.level') }}
              <!-- <a href="#pablo">Get More COSD...</a> -->
            </div>
          </div>
        </div>
      </div>
      <div class="col-lg-6 col-md-6 col-sm-6">
        <div class="card card-stats">
          <div class="card-header card-header-info card-header-icon">
            <div class="card-icon">
              <i class="fa fa-gamepad"></i>
            </div>
            <p class="card-category">{{ $t('text.gamePlayed') }}</p>
            <h3 class="card-title">{{ dashboard.nft? dashboard.games:0 }}</h3>
          </div>
          <div class="card-footer">
            <div class="stats">
              <i class="fa fa-gamepad"></i>&nbsp;
              <!--/plat/nfts?active=0-->
              <a href="javascript:void(0)">{{ $t('message.dashboard.game') }}</a>
            </div>
          </div>
        </div>
      </div>
      <div class="col-lg-4 col-md-6 col-sm-6">
        <div class="card card-stats">
          <div class="card-header card-header-warning card-header-icon">
            <div class="card-icon">
              <i class="fa fa-btc"></i>
            </div>
            <p class="card-category">COSD</p>
            <h3 class="card-title">{{ dashboard.cosd }}</h3>
          </div>
          <div class="card-footer">
            <div class="stats">
              <i class="fa fa-btc"></i>&nbsp;{{ $t('message.dashboard.cosd') }}
              <!-- <a href="#pablo">Get More COSD...</a> -->
            </div>
          </div>
        </div>
      </div>
      <div class="col-lg-4 col-md-6 col-sm-6">
        <div class="card card-stats">
          <div class="card-header card-header-warning card-header-icon">
            <div class="card-icon">
              <i class="fa fa-money"></i>
            </div>
            <p class="card-category">Evics</p>
            <h3 class="card-title">{{ dashboard.evics }}</h3>
          </div>
          <div class="card-footer">
            <div class="stats">
              <i class="fa fa-money"></i>&nbsp;{{ $t('message.dashboard.evic') }}
              <!-- <a href="#pablo">Exchange to USDT</a> -->
            </div>
          </div>
        </div>
      </div>
      <div class="col-lg-4 col-md-6 col-sm-6">
        <div class="card card-stats">
          <div class="card-header card-header-info card-header-icon">
            <div class="card-icon">
              <i class="fa fa-ticket"></i>
            </div>
            <p class="card-category">NFTs</p>
            <h3 class="card-title">{{ dashboard.nft }}</h3>
          </div>
          <div class="card-footer">
            <div class="stats">
              <i class="fa fa-ticket"></i>&nbsp;
              <!--/plat/nfts?active=3-->
              <a href="javascript:void(0)">{{ $t('message.dashboard.nft') }}</a>
            </div>
          </div>
        </div>
      </div>
    </div>
      <div class="row">
      <!--<div class="col-lg-4 col-md-12 col-sm-12 col-xs-12">
        <div class="card" style="margin-top:10px">
          <div style="text-align:center;padding:10px 10px 20px;">
            <h3><b>{{ dashboard.assets }}</b></h3>
            <p>Invited Reward</p>
            <div>
              <el-tooltip placement="top" content="Withdraw Assets" effect="customized">
                <el-button type='success' style="margin-left:10px;" @click="open('withdrawAssets')" round>Withdraw</el-button>
              </el-tooltip>
            </div>
          </div>
        </div>
      </div>-->
      <div class="col-lg-4 col-md-6 col-sm-6 col-xs-6">
        <div class="card" style="margin-top:10px">
          <div style="text-align:center;padding:10px 10px 20px;">
            <h3><b>{{ dashboard.evics }}</b></h3>
            <p>Evics {{ $t('text.balance') }}</p>
            <div>
              <!--<el-button type="primary" @click="open('buy')" round>Purchase</el-button>-->
              <el-tooltip placement="top" :content="`${$t('text.atleast')} 1000 evic`" effect="customized">
                <el-button type='success' style="margin-left:10px;" :disabled="!dashboard.evics" @click="open('withdraw')" round>{{ $t('btn.withdraw') }}</el-button>
              </el-tooltip>
            </div>
          </div>
        </div>
      </div>
      <div class="col-lg-4 col-md-6 col-sm-6 col-xs-6">
        <div class="card" style="margin-top:10px">
          <div style="text-align:center;padding:10px 10px 20px;">
            <h3><b>{{ dashboard.cosd }}</b></h3>
            <p>COSD {{ $t('text.balance') }}</p>
            <div>
              <add-token style="display:inline-block;" @balance="getBalances()"></add-token>
              &nbsp;
              <purchase-cosd style="display:inline-block" @balance="refreshCosd()"></purchase-cosd>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="card" style="margin-top:50px;">
      <div class="card-header card-header-text card-header-warning">
        <div class="card-text" style="display:block">
          <el-row>
            <el-col :span="22">
              <h4 class="card-title">{{ $t('text.transaction') }}</h4>
              <p class="card-category"></p>
            </el-col>
            <el-col :span="2" style="text-align:right">
              <i class="fa fa-refresh page-refresh" @click="listRefresh"></i>
            </el-col>
          </el-row>

        </div>
      </div>
      <div class="card-body">
        <el-tabs v-model="activeName">
          <el-tab-pane label="Evic" name="evic">
            <!--<el-select v-model="evicType">
              <el-option label="all" value="[7,8]"></el-option>
              <el-option label="purchase" :value="7"></el-option>
              <el-option label="withdraw" :value="8"></el-option>
            </el-select>-->
            <buy-list v-model:refresh="isrefresh" v-if="activeName =='evic'" :txtype="evicType"></buy-list>
          </el-tab-pane>
          <el-tab-pane label="COSD" name="cosd">
            <buy-list v-model:refresh="isrefresh" display="to" v-if="activeName =='cosd'" :txtype="transTypes.buy"></buy-list>
          </el-tab-pane>
          <!--<el-tab-pane label="Blindbox" name="blindbox">
            <buy-list v-model:refresh="isrefresh" v-show="activeName =='blindbox'" :txtype="transTypes.blindbox"></buy-list>
          </el-tab-pane>-->
        </el-tabs>
      </div>
    </div>
    <el-dialog v-model="visible" :title="action.title" width="360px" destroy-on-close>
      <el-alert :title="`${$t('text.tip')}: 1 USDT = 100 EVIC`" type="info" style="margin-bottom:20px"></el-alert>
      <el-row :gutter="10">
        <el-col :span="6">EVIC</el-col>
        <el-col :span="18">
          <el-input-number v-model.number="amount1" controls-position="right" :step="100" :min="min" :max="max" style="width:100%" @change="translate('evic')" clearable></el-input-number>
        </el-col>
        <el-col :span="6" v-if="action.command != 'withdraw'" style="margin-top:10px">USDT</el-col>
        <el-col :span="18" v-if="action.command != 'withdraw'" style="margin-top:10px">
          <el-input-number v-model.number="amount" controls-position="right" :step="1" :min="min/100" :max="max/100" style="width:100%" @change="translate('usdt')" clearable></el-input-number>
        </el-col>
        <el-col :span="24" style="margin-top:30px;">
          <el-button type="success" style="width:100%" @click="handleOperate">{{ action.btn }}</el-button>
        </el-col>
      </el-row>
    </el-dialog>
    <el-dialog v-model="visibleAssets" :title="action.title" width="360px" destroy-on-close>
      <el-row :gutter="10">
        <el-col :span="6">{{$t('text.assets')}}</el-col>
        <el-col :span="18">
          <el-input-number v-model.number="amount1" controls-position="right" :step="100" :min="min" :max="max" style="width:100%" clearable></el-input-number>
        </el-col>
        <el-col :span="24" style="margin-top:30px;">
          <el-button type="success" style="width:100%" @click="handleOperate">{{ action.btn }}</el-button>
        </el-col>
      </el-row>
    </el-dialog>
  </div>

</template>
 <script setup>
import { ref, onMounted, getCurrentInstance, onUnmounted,computed } from 'vue'
import { useStore } from "vuex";
import { ASSETTYPE, TXTYPE, savaAfterTransaction } from "@/utils/meta-mask";
import { dashboardApi, evicsApi, } from '@/api/request';
import { base64 } from "@/utils/base64";
import { loadingHelper } from "@/utils/loading";
import PurchaseCosd from "@/components/purchase-cosd.vue";
import AddToken from "@/components/user/add-token.vue";
import BuyList from "@/components/user/trans-table.vue";
import Bus from "@/utils/event-bus";
const store = useStore();
const dashboard = ref({ cosd: 0, nft: 0, games: 1, evics: 0, level1: 0, level2: 0, level3: 0, assets: 0 })
const { proxy } = getCurrentInstance();
let CONTRACTS = store.state.abi?.contract;
const metaMask = proxy.metaMask;
const transTypes = ref(TXTYPE)
const abis = ref({ cosd: JSON.parse(base64.decode(CONTRACTS.cosd.abi)), nft: JSON.parse(base64.decode(CONTRACTS.nft.abi)), busd: JSON.parse(base64.decode(CONTRACTS.busd.abi)) })
const amount = ref(0)
const amount1 = ref(0)
const visible = ref(false)
const visibleAssets = ref(false)
const action = ref({ title: "", btn: "" })
const max = ref(Infinity)
const min = ref(100)
const activeName = ref("evic")
const evicType = ref(8)
const isrefresh = ref(false);
function isEmpty() {
  if (!amount.value) {
    ElMessage.error("amount is required!")
  }
  return amount.value ? false : true;
}
function translate(type) {
  let rate = 100;
  if (type == 'evic') {
    amount.value = amount1.value / rate;
  } else if (type == 'usdt') {
    amount1.value = amount.value * rate;
  }
}
function evicBalance() {
  let data = {
    "userId": store.state.user.id,
    "assetType": 3
  }
  evicsApi.data(data).then(res => {
    if (res.code == 0) dashboard.value.evics = res.data.amount
  })
}
function getBalance(key, isProxy) {
  let data = {
    abi: abis.value[key],
    address: isProxy ? CONTRACTS[key].proxyAddress : CONTRACTS[key].address,
    from: store.state.metaMask?.account,
    key: key
  }
  metaMask.getBalanceByContract(data).then(res => {
    dashboard.value[key] = Math.round((res) * 1000) / 1000;
  });
}
function open(command) {
  if (!metaMask.isAvailable()) return;
  let res = openHandler[command]();
  if (command == "withdrawAssets") {
    action.value = {
      btn: computed(()=>proxy.$t('btn.withdraw')),
      title: "Assets Transaction",
      command: command
    }
    if (res) visibleAssets.value = true;
  } else {
    action.value = {
      btn: command == 'buy' ? computed(()=>proxy.$t('btn.buy')) : computed(()=>proxy.$t('btn.withdraw')),
      title: computed(()=>proxy.$t('text.evictitle')),
      command: command
    }
    if (res) visible.value = true;
  }


}
function handleOperate() {
  evicHandler[action.value.command]()
}
const openHandler = {
  withdraw: () => {
    max.value = dashboard.value.evics;
    min.value = 1000;
    if (dashboard.value.evics < min.value) {
      ElMessage.warning(`${proxy.$t('message.evic.atleast')} ${min.value} EVIC!`);
      return false;
    }
    amount.value = 10;
    amount1.value = 1000;
    return true;
  },
  buy: () => {
    max.value = Infinity
    min.value = 100
    amount.value = 1;
    amount1.value = 100;
    return true;
  },
  withdrawAssets:()=>{
    max.value = dashboard.value.assets;
    min.value = 100;
    if (dashboard.value.assets < min.value) {
      ElMessage.warning(`Sorry, you need to have at least ${min.value} USDT to withdraw!`);
      return false;
    }
    amount1.value = min.value;
    return true;
  }
}
const evicHandler = {
  buy: () => {
    if (!metaMask.isAvailable()) return;
    if (isEmpty()) return;
    let data = {
      from: store.state.metaMask?.account,
      address: CONTRACTS["busd"].address,
      amount: amount.value,
      abi: abis.value.busd
    }
    loadingHelper.show()
    metaMask.transferEvicByContract(data).then((res) => {
      visible.value = false;
      loadingHelper.hide();
      let param = {
        "txId": res.transactionHash,
        "transType": TXTYPE.evic,
        "fromUserId": store.state.user.id,
        "fromAssetType": ASSETTYPE.usdt,
        "fromAmount": amount.value,
        "toUserId": store.state.user.id,
        "toAssetType": ASSETTYPE.evic,
        "toAmount": amount1.value,
        "nftVo": {},
      }
      savaAfterTransaction(param)
      evicBalance()
      listRefresh()
    }).catch(err => {
      loadingHelper.hide();
    })
  },
  withdraw: () => {
    if (!amount1.value) return;
    if (amount1.value > dashboard.value.evics) {
      ElMessage.warning(proxy.$t('message.evic.limit'))
      return
    }
    let param = {
      "transType": TXTYPE.evic1,
      "fromUserId": store.state.user.id,
      "fromAssetType": ASSETTYPE.evic,
      "fromAmount": 0 - amount1.value,
      "toUserId": store.state.user.id,
      "toAssetType": 3,//ASSETTYPE.usdt
      "toAmount": 0 - amount1.value,
      "nftVo": {}
    }
    loadingHelper.show()
    evicsApi.withdraw(param).then((res) => {
      visible.value = false;
      loadingHelper.hide();
      if (res.code == 0) {
        ElNotification({ type: "success", message: proxy.$t('message.evic.success') })
        evicBalance()
        listRefresh()
      }
    }).catch(err => {
      loadingHelper.hide();
    })
  },
  withdrawAssets:()=>{
    if (!amount1.value) return;
    if (amount1.value > dashboard.value.assets) {
      ElMessage.warning(proxy.$t('message.evic.limit'))
      return
    }
    let param = {
      "transType": 12,
      "fromUserId": store.state.user.id,
      "fromAssetType": 0,
      "fromAmount": 0 - amount1.value,
      "toUserId": store.state.user.id,
      "toAssetType": 0,//0-3
      "toAmount": 0 - amount1.value,
      "nftVo": {}
    }
    loadingHelper.show()
    dashboardApi.withdraw(param).then((res) => {
      visibleAssets.value = false;
      loadingHelper.hide();
      if (res.code == 0) {
        ElNotification({ type: "success", message: proxy.$t('message.evic.success') })
        getAssets()
      }
    }).catch(err => {
      loadingHelper.hide();
    })
  }
}
function queryInvited() {
  let data = {
    userId: store.state.user.id
  }
  dashboardApi.getInvite(data).then((res) => {
    if(res.data) dashboard.value = { ...dashboard.value, ...res.data }
  })
}
function getAssets() {
  let data = {
    userId: store.state.user.id,
    assetType: 0
  }
  dashboardApi.queryAssets(data).then((res) => {
    if(res.data) dashboard.value.assets = parseInt(res.data.amount*100) / 100 || 0;
  })
}
function refresh() {
  evicBalance()
  getBalance('cosd')
  getBalance('nft', true)
  queryInvited()
  getAssets()
}
function getBalances() {
  getBalance('cosd')
  getBalance('busd')
}
function listRefresh() {
  isrefresh.value = true
}
function refreshCosd() {
  getBalance('cosd')
  if (activeName.value == "cosd") listRefresh()
}
Bus.$on('refresh', (isRefresh) => {
  if (isRefresh) refresh();
})
onMounted(() => {
  evicBalance()
  queryInvited()
  getAssets()
  if (metaMask.isAvailable()) {
    getBalance('cosd')
    getBalance('nft', true)
  }
})
onUnmounted(() => {
  Bus.$off('refresh')
})
 </script>
 <style>
.el-popper.is-customized {
  /* Set padding to ensure the height is 32px */
  padding: 6px 12px;
  color: rgba(255, 152, 0);
  background: #fff9f1;
}

.el-popper.is-customized .el-popper__arrow::before {
  background: #fff9f1;
  right: 0;
}
</style>
