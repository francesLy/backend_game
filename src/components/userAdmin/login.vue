<template>
  <div class="login-bg" style="overflow-y: hidden;">
    <div class="logo" style="position: relative; z-index: 9; padding-left: 20px; text-align: left">
      <img :src="require('@/assets/img/logo&text.png')" />
      
      <lang style="margin-left:20px"></lang>
    </div>
    <div class="login-box">
      <h3 class="title-des wtext-xl">Play & Earn</h3>
      <p class="text-muted"><small>Enjoy the GameFi^^</small></p>
      <el-form ref="formRef" :rules="rules" label-position="top" label-width="100px" :model="form" style="padding-top: 2.5rem">
        <el-form-item :label="$t('text.email')" prop="email">
          <el-input v-model="form.email" :placeholder="`${$t('text.enter')}${$t('text.email').toLowerCase()}`" clearable />
        </el-form-item>
        <el-form-item :label="$t('text.password')" prop="password">
          <el-input v-model="form.password" type="password" :placeholder="`${$t('text.enter')}${$t('text.password').toLowerCase()}`" show-password clearable />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" class="w-100 shadow" @click="doLogin()">{{ $t('btn.signin')}}</el-button>
        </el-form-item>
      </el-form>
      <el-row style="margin-top: 10px; font-size: 14px">
        <el-col :span="24" style="text-align: left;">
          <span @click="visible=true" style="color:#fff;font-size: 13px;cursor: pointer;">{{$t('text.forgetPassword')}}?</span>
        </el-col>
        <el-col :span="24" style="margin-top:2.5rem;font-weight:500">
          <span class="text-muted">{{ $t('text.noaccount')}}？</span><a href="/register">{{ $t('btn.signup')}}</a>
        </el-col>
      </el-row>
    </div>
    <el-dialog v-model="visible" :title="$t('text.forgetPassword')" width="360px" destroy-on-close>
      <password-cont @close="visible = false"></password-cont>
    </el-dialog>
  </div>
</template>
<script setup>
import { ref,getCurrentInstance,computed } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { userApi } from "@/api/request";
import PasswordCont from "@/components/userAdmin/reset-password.vue";
import Lang from "@/components/user/lang.vue"
import { loadingHelper } from "@/utils/loading";
import { encryptAES } from "@/utils/crypto";
const { proxy } = getCurrentInstance();
const visible = ref(false);
const store = useStore();
const router = useRouter();
const formRef = ref(null);
const form = ref({
  email: "",
  password: "",
});
const rules = ref({});
rules.value.email = [
  { required: true, message: computed(()=> proxy.$t('require.email')), trigger: "blur" },
  {
    type: 'email',
    message: computed(()=> proxy.$t('message.email.rule')),
    trigger: ['blur', 'change'],
  }, {
    validator: function (rule, value, callback) {
      if (value) {
        userApi.checkEmail(value).then(res => {
          if (res.code == 0 && !res.data) callback();
          else callback(new Error(proxy.$t('message.send.noexist')));
        })
      }
    },
    trigger: "blur",
  }
];
rules.value.password = [
  { required: true, message: computed(()=> proxy.$t('require.password')), trigger: "blur" },
  { min: 8, max: 64, message: computed(()=> proxy.$t('message.password.length')), trigger: "blur" },
  {
    required: true,
    pattern: /^(?!^\d+$)(?!^[a-z]+$)(?!^[A-Z]+$)(?!^[^a-z0-9]+$)(?!^[^A-Z0-9]+$)(?!^.*[\u4E00-\u9FA5].*$)^\S*$/,
    message: computed(()=> proxy.$t('message.password.rule')),
    trigger: "blur",
  }
];
function doLogin() {
  loadingHelper.show();
  formRef.value.validate((valid) => {
    if (valid) {
      let data = {
        email: form.value.email,
        passwd: encryptAES(form.value.password),
      };
      userApi.login(data).then((res) => {
        if (res.code == 0 && res.msg == "success") {
          store.commit("setUser", { name: res.data.userName, account: res.data?.walletAddress, id: res.data.userId });
          store.commit("setRole", res.data.userType);
          store.commit("setToken", res.data.token);
          getABI()
        }
      });
    }else{
      loadingHelper.hide();
    }
  });
}
function getABI(){
  let data = {
    network:"bsc"
  }
  userApi.abi(data).then(res=>{
    if(res.code == 0){
      store.commit("setABI",res.data);
      router.push("/plat");
    }
    loadingHelper.hide();
  })
}
</script>
