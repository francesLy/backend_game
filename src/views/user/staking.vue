<template>
  <div class="content">
    <div class="container-fluid">
      <div class="row">
        <!--Purchase cosd-->
        <div class="card" style="margin-bottom:0;margin-top:10px">
          <div class="card-header" style="display:flex;align-items: center;justify-content: space-between;padding:10px;">
            <div>COSD&nbsp;{{ $t('text.balance') }}: <b>{{ balance.cosd }}</b></div>
            <div>
              <purchase-cosd @balance="getBalance('cosd')"></purchase-cosd>
            </div>
          </div>
        </div>
        <div class="card" style="margin-top:45px">
          <div class="card-header card-header-tabs card-header-warning">
            <el-row>
              <el-col :span="22">
                <div class="nav-tabs-navigation">
              <div class="nav-tabs-wrapper">
                <ul class="nav nav-tabs" data-tabs="tabs">
                  <li class="nav-item" @click="handleClickb('trans')">
                    <a class="nav-link" :class="activeNameb =='trans'?' active show':''" href="javascript:void(0);" data-toggle="tab">
                      COSD&nbsp;{{ $t('text.staking') }}
                    </a>
                  </li>
                  <li class="nav-item" @click="handleClickb('list')">
                    <a class="nav-link" :class="activeNameb =='list'?' active show':''" href="javascript:void(0);" data-toggle="tab">
                      {{ $t('text.staking') }}{{ $t('text.list') }}
                      <div class="ripple-container"></div>
                    </a>
                  </li>
                  <li class="nav-item" @click="handleClickb('unstakelist')">
                    <a class="nav-link" :class="activeNameb =='unstakelist'?' active show':''" href="javascript:void(0);" data-toggle="tab">
                      {{ $t('text.unstaking') }}{{ $t('text.list') }}
                      <div class="ripple-container"></div>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
              </el-col>
              <el-col :span="2" style="text-align:right">
              <i class="fa fa-refresh page-refresh" @click="listRefresh"></i>
            </el-col>
            </el-row>
            
          </div>
          <div class="card-body">
            <div v-show="activeNameb =='trans'">
              <el-alert type="warning" style="margin-bottom:20px" :title="`${$t('message.defi.reminder')}`"></el-alert>
              <div class="row">
                <div class="col-md-3">
                  <ul class="staking-nav nav nav-pills nav-pills-warning nav-pills-icons flex-column" role="tablist">
                    <li class="nav-item">
                      <a class="nav-link" :class="active=='sl'?' active show':''" data-toggle="tab" @click="handleClick('sl')" role="tablist">
                        <i class="fa fa-connectdevelop"></i> {{ $t('text.stakingfor') }} <br /><span>{{ $t('text.starlight') }}</span><span>{{ $t('text.league') }}</span>
                        <br /><small>({{ $t('text.coming') }})</small>
                      </a>
                    </li>
                    <li class="nav-item">
                      <a class="nav-link" :class="active=='club'?' active show':''" data-toggle="tab" @click="handleClick('club')" role="tablist">
                        <i class="fa fa-group"></i> {{ $t('text.stakingfor') }} <br />{{$t('text.club')}}{{$t('text.ownership')}}
                        <br /><small>({{ $t('text.coming') }})</small>
                      </a>
                    </li>
                    <li class="nav-item">
                      <a class="nav-link" :class="active=='cosd'?' active show':''" data-toggle="tab" @click="handleClick('cosd')" role="tablist">
                        <i class="fa fa-btc"></i> {{ $t('text.stakingfor') }} <br />{{$t('text.earning') }} COSD
                      </a>
                    </li>
                  </ul>
                </div>
                <div class="col-md-9">
                  <div class="tab-content">
                    <!--Starlight league-->
                    <div class="tab-pane" :class="active=='sl'?' active show':''" id="tab-staking-sll">
                      <div class="card card-stats for-unqualified">
                        <div class="card-header card-header-warning card-header-icon">
                          <div class="card-icon">
                            <i class="fa fa-connectdevelop"></i>
                          </div>
                          <p class="card-category">{{$t('text.current')}} {{$t('text.staking')}} COSD</p>
                          <h3 class="card-title">{{ balance.sl }}</h3>
                          <span class="badge badge-pill badge-success" v-if="balance.sl>=400">{{ $t('text.starlight') }}{{ $t('text.league') }}{{$t('text.unqualified')}}</span>
                          <span class="badge badge-pill badge-default" v-if="balance.sl<400">{{ $t('text.starlight') }}{{ $t('text.league') }}{{$t('text.qualified')}}</span>
                        </div>
                        <div class="card-footer">
                          <div class="stats">
                            <i class="fa fa-cubes"></i>&nbsp;{{ $t('text.staking') }}{{ $t('text.pool') }}{{ $t('text.contractAddress') }}:&nbsp;&nbsp;
                            <a :href="$store.state.metaMask?`${$store.state.metaMask?.url}address/${contracts.sl.address}`:'javascript:void(0);'" :target="$store.state.metaMask?'_blank':null">{{contracts.sl.proxyAddress}}</a>
                          </div>
                        </div>
                      </div>
                      <div class="card card-pricing card-raised for-unqualified">
                        <div class="card-body">
                          <div class="card-icon icon-rose">
                            <i class="fa fa-connectdevelop"></i>
                          </div>
                          <h3 class="card-title" style="color: rgb(188, 0, 0);font-weight:bold;"> 400 COSD = 20 USDT</h3>
                          <div style="font-weight: bold;color:rgb(66, 66, 66);">
                            <span style="text-decoration:line-through!important;">1980 COSD = 99 USDT</span>&nbsp;&nbsp;Limited time discount
                          </div>
                          <p class="card-description">
                            You need to stake 400 COSD (400 COSD = 20 USDT) to get a qualification for Starlight {{ $t('text.league') }}.
                          </p>
                          <button class="btn btn-rose btn-round" @click="open('slstaking')">{{ $t('text.stake') }}</button>
                          <button class="btn btn-warning btn-round" v-if="balance.sl" @click="open('slunstaking')">{{ $t('text.stop') }}{{ $t('text.staking') }}</button>
                        </div>
                      </div>
                    </div>
                    <!--Club ownership-->
                    <!--<div class="tab-pane" :class="active=='club'?' active show':''" id="tab-staking-club">
                      <div class="card card-stats for-unqualified">
                        <div class="card-header card-header-warning card-header-icon">
                          <div class="card-icon">
                            <i class="fa fa-group"></i>
                          </div>
                          <p class="card-category">Current staking COSD</p>
                          <h3 class="card-title">{{ balance.club }}</h3>
                          <span class="badge badge-pill badge-success" v-if="isClubBoss">Club ownership Qqualified</span>
                          <span class="badge badge-pill badge-default" v-if="!isClubBoss">Club ownership Unqualified</span>
                        </div>
                        <div class="card-footer">
                          <div class="stats">
                            <i class="fa fa-cubes"></i>&nbsp;Staking pool contract address:&nbsp;&nbsp;
                            <a :href="$store.state.metaMask?`${$store.state.metaMask?.url}address/${contracts.club.address}`:'javascript:void(0);'" :target="$store.state.metaMask?'_blank':null">{{contracts.club.proxyAddress}}</a>
                          </div>
                        </div>
                      </div>
                      <div class="card card-pricing card-raised for-unqualified">
                        <div class="card-body">
                          <div class="card-icon icon-rose">
                            <i class="fa fa-group"></i>
                          </div>
                          <h3 class="card-title" style="color: rgb(188, 0, 0);font-weight:bold;"> 4000 COSD = 200 USDT</h3>
                          <div style="font-weight: bold;color:rgb(66, 66, 66);">
                            <span style="text-decoration:line-through!important;">19800 COSD = 990 USDT</span>&nbsp;&nbsp;Limited time discount
                          </div>
                          <p class="card-description">
                            You need to stake 4000 COSD (= 200 USDT) to get a qualification for a club ownership.
                          </p>
                          <el-popover placement="top" :width="300" effect="dark" trigger="hover">
                            <template #reference>
                              <p>Activity Rules: <i class="fa fa-question-circle"></i></p>
                            </template>
                            <div style="letter-spacing: .01em;line-height: 1.2;">
                              <h4 style="padding-bottom: 15px;">Activity Rules</h4>
                              <p><span style="display:inline-block;width:140px">Activity Start Time: </span>{{ stakeStartTime.club?.time }}</p>
                              <p><span style="display:inline-block;width:140px">Lockup Period: </span>90 Days</p>
                              <p><span style="display:inline-block;width:140px">Amount: </span>&gt;= 4000 cosd</p>
                              <p> Users can only stake after the event starts. The staking period of each user is 90 days, and the user can only unstake after the staking reaches 90 days. The staking period starts once the staking operation is completed.</p>
                            </div>
                          </el-popover>
                          <a href="javascript:void(0);" class="btn btn-rose btn-round" @click="open('clubstaking')">Stake</a>
                          <button class="btn btn-warning btn-round" v-if="balance.club" @click="open('clubunstaking')">Stop staking</button>
                        </div>
                      </div>
                    </div>-->
                    <!--COSD Earning-->
                    <div class="tab-pane" :class="active=='cosd'?' active show':''" id="tab-staking-cosd">
                      <div class="card card-stats">
                        <div class="card-header card-header-warning card-header-icon">
                          <div class="card-icon">
                            <i class="fa fa-btc"></i>
                          </div>
                          <p class="card-category">{{ $t('text.staking') }} COSD</p>
                          <h3 class="card-title">{{ balance.defi }}</h3>
                        </div>
                        <div class="card-footer">
                          <div class="stats">
                            <i class="fa fa-cubes"></i>&nbsp;{{ $t('text.staking') }}{{ $t('text.pool') }}{{ $t('text.contractAddress') }}:&nbsp;&nbsp;
                            <a :href="$store.state.metaMask?`${$store.state.metaMask?.url}address/${contracts.defi.address}`:'javascript:void(0);'" :target="$store.state.metaMask?'_blank':null">{{contracts.defi.proxyAddress}}</a>
                          </div>
                        </div>
                      </div>
                      <div class="card card-stats for-cosd-unstaked" v-if="balance.defi||reward">
                        <div class="card-header">
                          <el-row :gutter="10">
                            <el-col :span="12" style="display:flex">
                              <div style="flex:1;margin-right:10px;">
                                <i class="fa fa-line-chart" style="font-size:20px;color:#e91e63;padding:15px;border:1px solid #eee;border-radius:28px;"></i>
                              </div>
                              <div style="width:100%">
                                <h3 class="card-title"> <el-tooltip placement="top" :content="reward+''"><b>{{ Math.round((reward) * 1000) / 1000 }}</b></el-tooltip></h3>
                                <p class="card-category">
                                  {{$t('message.defi.reward')}}
                                </p>
                              </div>
                            </el-col>
                            <el-col :span="12" style="text-align:right">
                              <button class="btn btn-warning btn-sm btn-round" v-if="balance.defi" @click="open('defiunstaking')">{{ $t('text.stop') }}{{ $t('text.staking') }}</button>
                              <button class="btn btn-success btn-sm btn-round" v-if="reward" @click="claimReward()">{{ $t('btn.claim') }}</button>
                            </el-col>
                          </el-row>
                        </div>
                        <div class="card-footer">
                          <div class="stats">
                            {{$t('message.defi.place')}}
                          </div>
                        </div>
                      </div>
                      <div class="card card-pricing card-raised for-cosd-unstaked">
                        <div class="card-body">
                          <div class="card-icon icon-rose">
                            <i class="fa fa-btc"></i>
                          </div>
                          <h3 class="card-title"> 4000 COSD = 200 USDT</h3>
                          <p class="card-description">
                            {{$t('message.defi.stake')}} 4000 COSD (200 USDT).
                          </p>
                          <el-popover placement="top" effect="dark" :width="300" trigger="hover">
                            <template #reference>
                              <p>{{ $t('text.actRules') }}: <i class="fa fa-question-circle"></i></p>
                            </template>
                            <div style="letter-spacing: .01em;line-height: 1.2;">
                              <h4 style="padding-bottom: 15px;">{{ $t('text.actRules') }}</h4>
                              <p><span style="display:inline-block;width:140px">{{$t('text.starttime')}}: </span>{{ stakeStartTime.defi?.time }}</p>
                              <p><span style="display:inline-block;width:140px">{{$t('text.lock')}}: </span>30 Days</p>
                              <p><span style="display:inline-block;width:140px">{{$t('text.return')}}: </span>{{ '52%'||rewardRate }}</p>
                              <p>{{$t('message.defi.rule')}}</p>
                            </div>
                          </el-popover>
                          <button class="btn btn-rose btn-round" @click="open('defistaking')">{{ $t('text.stake') }}</button>
                        </div>
                      </div>

                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div v-if="activeNameb =='list'">
              <el-row :gutter="10">
                <el-col  :md="6" :sm="24">
                  <el-select v-model="stakeListType">
                    <el-option :label="$t('text.starlight')" :value="2"></el-option>
                    <el-option :label="$t('text.club')" :value="3"></el-option>
                    <el-option label="defi" :value="1"></el-option>
                  </el-select>
                </el-col>
              </el-row>
              <buy-list v-model:refresh="isrefresh" v-show="activeNameb =='list'" :txtype="stakeListType"></buy-list>
            </div>
            <div v-show="activeNameb =='unstakelist'">
              <el-row :gutter="10">
                <el-col :md="6" :sm="24">
                  <el-select v-model="unstakeListType">
                    <el-option :label="$t('text.starlight')" :value="5"></el-option>
                    <el-option :label="$t('text.club')" :value="6"></el-option>
                    <el-option label="defi" :value="4"></el-option>
                  </el-select>
                </el-col>
              </el-row>
              <buy-list v-model:refresh="isrefresh" v-show="activeNameb =='unstakelist'" :txtype="unstakeListType"></buy-list>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!--Staking && UnStaking-->
    <el-dialog v-model="visible" :title="action.title" width="360px" destroy-on-close>
      <el-row :gutter="5">
        <el-col :span="4">
          COSD
        </el-col>
        <el-col :span="20">
          <el-input-number v-model.number="action.amount" controls-position="right" :step="1" :min="min.value" :max="100000" placeholder="`set amount" style="width:100%" clearable></el-input-number>
        </el-col>
        <el-col :span="24" style="margin-top:15px" v-if="needApprove">
          <div style="text-align: right;">
            <b style="display:inline-block;padding:0 10px;background: #fef1db;color:#ff9800;">{{ $t('text.currentallowance') }}: {{ allowance[action.key] }}</b>
          </div>
          <el-button type="primary" @click="handleApproveOperate()" style="width:100%" :disabled="disabled">
            <el-tag size="small">1</el-tag>&nbsp;{{$t('btn.approve')}}
          </el-button>
        </el-col>
        <el-col :span="24" style="margin-top:15px">
          <el-button type="success" @click="handleTransferOperate()" style="width:100%" :disabled="needApprove?(allowance[action.key] >= action.amount?false:true):!disabled">
            <el-tag size="small" v-if="needApprove">2</el-tag>&nbsp;{{buttonText}}
          </el-button>
        </el-col>
      </el-row>
    </el-dialog>
  </div>
</template>
<script setup>
import { ref, onMounted, getCurrentInstance, onUnmounted,computed } from "vue"
import { useStore } from "vuex"
import { DateHelper } from "@/utils/helper";
import { loadingHelper   } from "@/utils/loading";
import { ASSETTYPE, TXTYPE, POOL, savaAfterTransaction } from "@/utils/meta-mask";
import { base64 } from "@/utils/base64";
import { cosdApi } from "@/api/request";
import PurchaseCosd from "@/components/purchase-cosd.vue";
import BuyList from "@/components/user/trans-table.vue";
import Bus from "@/utils/event-bus";
const store = useStore();
const active = ref("cosd");
const balance = ref({
  cosd: 0,
  sl: 0, club: 0, defi: 0
});
const action = ref({
  amount1: 20,
  amount: 1,
  title: '',
  command: ''
});
let CONTRACTS = store.state.abi?.contract;
const contracts = ref(CONTRACTS);
const abis = ref({ sl: JSON.parse(base64.decode(CONTRACTS.sl.abi)), club: JSON.parse(base64.decode(CONTRACTS.club.abi)), defi: JSON.parse(base64.decode(CONTRACTS.defi.abi)), buy: JSON.parse(base64.decode(CONTRACTS.buycosd.abi)), cosd: JSON.parse(base64.decode(CONTRACTS.cosd.abi)), busd: JSON.parse(base64.decode(CONTRACTS.busd.abi)) })
const visible = ref(false)
const isClubBoss = ref(false)
const needApprove = ref(true);
const { proxy } = getCurrentInstance();
const metaMask = proxy.metaMask;
const disabled = ref(false)
const titles = ref({ buy: `${proxy.$t('btn.buy')} COSD`, "slstaking": `${ proxy.$t('text.stakingfor') } ${proxy.$t('text.starlight')} ${proxy.$t('text.league') }`, "clubstaking": `${ proxy.$t('text.stakingfor') } club ownership`, "defistaking": `${ proxy.$t('text.stakingfor') }${proxy.$t('text.earning') } COSD` })
const reward = ref(0)
const rewardRate = ref('52%')
const buttonText = ref(computed(()=>proxy.$t('text.stake')))
const min = ref(1)
const stakeStartTime = ref({ club: {}, defi: {} })
const activeNameb = ref("trans")
const transTypes = ref(TXTYPE)
const stakeListType = ref(2)
const unstakeListType = ref(5)
const isrefresh =ref(false)
const allowance = ref({sl:0,club:0,defi:0,blindbox:0,buycosd:0})
function handleClick(tab) {
  if(tab=='cosd') active.value = tab;
}

function getBalance(key,isProxy) {
  let data = {
    abi: abis.value[key],
    address: isProxy?CONTRACTS[key].proxyAddress:CONTRACTS[key].address,
    from: store.state.metaMask?.account
  }
  metaMask.getBalanceByContract(data).then(res => {
    balance.value[key] = Math.round((res) * 1000) / 1000;
  });
}
function getAllowance(key){
  let data = {
    abi: abis.value['cosd'],
    address: CONTRACTS['cosd'].address,
    from: store.state.metaMask?.account,
    to: CONTRACTS[key].proxyAddress
  }
  metaMask.getAllowanceByContract(data).then(res=>{
    console.log(key+ " allowance: "+res)
    allowance.value[key] = res
  })
}
function getRewardBalance() {
  if (!metaMask.isAvailable()) return;
  let data = {
    abi: abis.value['defi'],
    address: CONTRACTS['defi'].proxyAddress,
    from: store.state.metaMask?.account
  }
  metaMask.getRewardByContract(data).then(res => {
    reward.value = res
  });
}
function getRewardRate() {
  if (!metaMask.isAvailable()) return;
  let data = {
    abi: abis.value['defi'],
    address: CONTRACTS['defi'].proxyAddress,
    from: store.state.metaMask?.account
  }
  metaMask.getRewardRateByContract(data).then(res => {
    rewardRate.value = res
  });
}
function getClubStatus() {
  if (!metaMask.isAvailable()) return;
  let data = {
    abi: abis.value['club'],
    address: CONTRACTS['club'].proxyAddress,
    from: store.state.metaMask?.account
  }
  metaMask.getClubStatusByContract(data).then(res => {
    isClubBoss.value = res;
    if (res) store.commit("setRole", 1)
    else store.commit("setRole", 2)
  });
}
function getStakeStartTime(key) {
  if (!metaMask.isAvailable()) return;
  let data = {
    abi: abis.value[key],
    address: CONTRACTS[key].proxyAddress,
    from: store.state.metaMask?.account
  }
  metaMask.getStakeStartTimeByContract(data).then(res => {
    stakeStartTime.value[key] = { time: DateHelper.toString(res * 1000), origin: res * 1000 }
  });
}
async function open(command) {
  if (!metaMask.isAvailable()) return;
  action.value = {
    amount1: 20,
    amount: 1,
    title: titles.value[command],
    command: command,
    key:''
  }
  disabled.value = false;
  min.value = 1;
  openHandler[command]();
}
const openHandler = {
  slstaking: () => {
    action.value.amount = 400;
    needApprove.value = true;
    buttonText.value = computed(()=>proxy.$t('text.stake'));
    min.value = 400;
    action.value.key = 'sl'
    visible.value = true
  },
  clubstaking: async () => {
    let isTimeAvailable = await isStakeTimeAvailable('club');
    if (!isTimeAvailable) return;
    action.value.amount = 4000;
    needApprove.value = true;
    buttonText.value = computed(()=>proxy.$t('text.stake'));
    min.value = 4000;
    action.value.key = 'club'
    visible.value = true
  },
  defistaking: async () => {
    let isTimeAvailable = await isStakeTimeAvailable('defi');
    if (!isTimeAvailable) return;
    action.value.amount = 1;
    needApprove.value = true;
    buttonText.value = computed(()=>proxy.$t('text.stake'));
    min.value = 1;
    action.value.key = 'defi'
    visible.value = true
  },
  slunstaking: () => {
    action.value.amount = balance.value['sl'];
    needApprove.value = false
    buttonText.value = computed(()=>proxy.$t('text.unstake'))
    disabled.value = true;
    action.value.key = 'club'
    visible.value = true
  },
  clubunstaking: async () => {
    let isTimeAvailable = await isUnStakeTimeAvailable('club');
    if (!isTimeAvailable) return;
    action.value.amount = balance.value['club'];
    needApprove.value = false
    buttonText.value = computed(()=>proxy.$t('text.unstake'))
    disabled.value = true;
    action.value.key = 'club'
    visible.value = true
  },
  defiunstaking: async () => {
    let isTimeAvailable = await isUnStakeTimeAvailable('defi');
    if (!isTimeAvailable) return;
    action.value.amount = balance.value['defi'];
    needApprove.value = false
    buttonText.value = computed(()=>proxy.$t('text.unstake'))
    disabled.value = true;
    action.value.key = 'defi'
    visible.value = true
  }
}
const transferHandler = {
  slstaking: stakingTransfer.bind(this, 'sl'),
  clubstaking: stakingTransfer.bind(this, 'club'),
  defistaking: stakingTransfer.bind(this, 'defi'),
  slunstaking: unstakingTransfer.bind(this, 'sl'),
  clubunstaking: unstakingTransfer.bind(this, 'club'),
  defiunstaking: unstakingTransfer.bind(this, 'defi')
}
function handleApproveOperate() {
  stakingApprove(action.value.key);
}
function handleTransferOperate() {
  transferHandler[action.value.command]();
}
function isEmpty() {
  if (!action.value.amount) {
    ElMessage.error(proxy.$t('require.amount'))
  }
  return action.value.amount ? false : true;
}
function validatorAmount(key) {
  if (isEmpty()) return false;
  if (action.value.amount > balance.value[key]) {
    ElMessage.error(proxy.$t('message.defi.limit'))
    return false
  } else {
    return true;
  }
}
async function getStakeTime(key) {
  let data = {
    poolId: POOL[key]
  };
  let ret;
  loadingHelper.show("Checking for stake time ...")
  await cosdApi.checkTime(data).then((res => {
    if (res.code == 0) ret = res.data
    loadingHelper.hide()
  }))
  return ret
}
async function getUnstakeTime(key) {
  let data = {
    userId: store.state.user.id,
    poolId: POOL[key]
  }
  let ret;
  loadingHelper.show("Checking for unstake time ...")
  await cosdApi.checkTimeun(data).then((res => {
    if (res.code == 0) ret = res.data.flag
    loadingHelper.hide()
  }))
  return ret
}
async function isStakeTimeAvailable(key) {
  let ret = false;
  ret = await getStakeTime(key)
  if (!ret) ElMessage.warning(proxy.$t('message.defi.lock'))
  return ret
}
async function isUnStakeTimeAvailable(key) {
  let ret = false;
  ret = await getUnstakeTime(key)
  if (!ret) ElMessage.warning(proxy.$t('message.defi.locktip'))
  return ret
}
async function stakingApprove(key) {
  if (!metaMask.isAvailable()) return;
  let data = { from: store.state.metaMask?.account, address: CONTRACTS[key].proxyAddress, amount: action.value.amount, abi: abis.value[key], abiApprove: abis.value["cosd"], approveAddress: CONTRACTS["cosd"].address }
  if (!validatorAmount('cosd')) return;
  loadingHelper.show()
  metaMask.approveByContract(data).then(() => {
    loadingHelper.hide();
    disabled.value = true;
    getAllowance(key)
  }).catch(err => {
    loadingHelper.hide();
  })
}
function stakingTransfer(key) {
  if (!metaMask.isAvailable()) return;
  let data = { from: store.state.metaMask?.account, address: CONTRACTS[key].proxyAddress, amount: action.value.amount, abi: abis.value[key], abiApprove: abis.value["cosd"], approveAddress: CONTRACTS["cosd"].address }
  loadingHelper.show()
  metaMask.stakingByContract(data).then((res) => {
    visible.value = false;
    loadingHelper.hide()
    let param = {
      "txId": res.transactionHash,
      "transType": TXTYPE.stake[key],
      "fromUserId": store.state.user.id,
      "fromAssetType": ASSETTYPE.cosd,
      "fromAmount": action.value.amount,
      "toUserId": store.state.user.id,
      "toAssetType": ASSETTYPE.cosd,
      "toAmount": action.value.amount,
      "nftVo": {},
      "poolId": POOL[key],
      "blockNumber": res.blockNumber
    }
    savaAfterTransaction(param)
    getBalance(key,true);
    getBalance('cosd');
    getAllowance(key)
    if (key == 'club') getClubStatus()
    if (key == 'defi') { getRewardBalance() }
  }).catch(err => {
    loadingHelper.hide();
  })
}
async function unstakingTransfer(key) {
  if (!metaMask.isAvailable()) return;
  if (!validatorAmount(key)) return;
  let account = store.state.metaMask?.account;
  let data = { from: account, address: CONTRACTS[key].proxyAddress, amount: action.value.amount, abi: abis.value[key] }
  loadingHelper.show()
  metaMask.unStakingByContract(data).then((res) => {
    visible.value = false;
    let param = {
      "txId": res.transactionHash,
      "transType": TXTYPE.unstake[key],
      "fromUserId": store.state.user.id,
      "fromAssetType": ASSETTYPE.cosd,
      "fromAmount": 0 - action.value.amount,
      "toUserId": store.state.user.id,
      "toAssetType": ASSETTYPE.cosd,
      "toAmount": 0 - action.value.amount,
      "nftVo": {},
      "poolId": POOL[key],
      "blockNumber": res.blockNumber
    }
    savaAfterTransaction(param)
    if (key == 'defi') { getRewardBalance() }
    loadingHelper.hide();
    getBalance(key,true);
    getBalance('cosd');
    if (key == 'club') getClubStatus()
  }).catch(err => {
    console.log(err)
    loadingHelper.hide();
  })
}
async function claimReward() {
  let isTimeAvailable = await isUnStakeTimeAvailable('defi');
  if (!isTimeAvailable) return;
  if (!metaMask.isAvailable()) return;
  let data = { from: store.state.metaMask?.account, address: CONTRACTS['defi'].proxyAddress, abi: abis.value['defi'] };
  loadingHelper.show();
  metaMask.claimRewardByContract(data).then(() => {
    loadingHelper.hide();
  }).catch(err => {
    loadingHelper.hide();
  })
}
function refresh() {
  getAllowance('sl')
  getAllowance('club')
  getAllowance('defi')
  getBalance('cosd')
  getBalance('sl',true)
  getBalance('club',true)
  getBalance('defi',true)
  getStakeStartTime('club')
  getStakeStartTime('defi')
  getClubStatus()
  getRewardBalance()
  getRewardRate()
}
Bus.$on('refresh',(isRefresh)=>{
  if(isRefresh) refresh();
})
function handleClickb(tab) {
  activeNameb.value = tab;
}
function listRefresh(){
  isrefresh.value =true;
}
onMounted(() => {
  if (metaMask.isAvailable()) {
    refresh()
  }
})
onUnmounted(()=>{
  Bus.$off('refresh')
})
</script>