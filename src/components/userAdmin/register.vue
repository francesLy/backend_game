<template>
  <div class="login-bg">
    <div class="logo" style="position: relative; z-index: 9; padding-left: 20px; text-align: left">
      <img :src="require('@/assets/img/logo.webp')" />
      <span class="wtext-l">Chess Of Stars</span>
      <lang style="margin-left:20px"></lang>
    </div>
    <div class="login-box" style="margin-top:10px">
      <h3 class="title-des wtext-xl">Play & Earn</h3>
      <p class="text-muted"><small>{{$t('text.registersub')}}^^</small></p>
      <el-form ref="formRef" :rules="rules" label-position="top" label-width="100px" :model="form" style="padding-top: 25px">
        <el-form-item :label="$t('text.email')" prop="email">
          <el-input v-model="form.email" :placeholder="`${$t('text.enter')}${$t('text.email').toLowerCase()}`" clearable :disabled="btndisabled" />
        </el-form-item>
        <el-form-item :label="$t('text.verifyCode')" prop="code">
          <el-row :gutter="10" style="width:100%">
            <el-col :span="16">
              <el-input v-model="form.code" type="text" :placeholder="`${$t('text.enter')}${$t('text.verifyCode').toLowerCase()}`" clearable />
            </el-col>
            <el-col :span="8">
              <count-down-time :email="form.email" mode="signup" @send="setDisabled"></count-down-time>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item :label="$t('text.nickname')" prop="name">
          <el-input v-model="form.name" :placeholder="`${$t('text.enter')}${$t('text.nickname').toLowerCase()}`" clearable />
        </el-form-item>
        <el-form-item :label="$t('text.password')" prop="passwd">
          <el-input v-model="form.passwd" type="password" :placeholder="`${$t('text.enter')}${$t('text.password').toLowerCase()}`" show-password clearable />
        </el-form-item>
        <el-form-item :label="$t('text.again')" prop="rpassword">
          <el-input v-model="form.rpassword" type="password" :placeholder="`${$t('text.enter')}${$t('text.password').toLowerCase()}`" show-password clearable />
        </el-form-item>
        <!--<el-form-item label="type">
          <el-select v-model="form.userType" placeholder="select" style="width: 100%" clearable>
            <el-option v-for="(item, index) in roleList" :key="index" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>-->
        <el-form-item>
          <el-button type="primary" class="w-100 shadow" @click="doRegister()">{{ $t('btn.signup')}}</el-button>
        </el-form-item>
      </el-form>
      <div style="margin-top: 60px; font-size: 14px;font-weight:500"><span class="text-muted">{{ $t('text.hasaccount')}}？</span><a href="/login">{{ $t('btn.signin')}}</a></div>
    </div>
  </div>
</template>
<script setup>
import { ref,getCurrentInstance,computed } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { userApi } from "@/api/request";
import { AppHelper } from "@/utils/helper";
import { loadingHelper } from "@/utils/loading";
import { encryptAES } from "@/utils/crypto";
import CountDownTime from "@/components/userAdmin/count-down-time.vue"
import Lang from "@/components/user/lang.vue"
import { ElMessageBox, ElNotification } from "element-plus";
const { proxy } = getCurrentInstance();
const store = useStore();
const router = useRouter();
const roleList = ref([{ id: 0, name: 'channel leader' }, { id: 1, name: 'club boss' }, { id: 2, name: 'user' }]);//0-渠道商 1-俱乐部老板 2 普通用户
const formRef = ref(null);
let id = AppHelper.getURLParam('id');
console.log(id)
const form = ref({
  email: "",
  name: "",
  passwd: "",
  userType: 2,
  code: "",
  rpassword: "",
  inviterId: id ? id : null,
});
const rules = ref({});
const time = ref(0)
const btndisabled = ref(false)

rules.value.email = [
  { required: true, message: computed(()=> proxy.$t('require.email')), trigger: "blur" },
  {
    type: 'email',
    message: proxy.$t('message.email.rule'),
    trigger: ['blur', 'change'],
  },
  {
    validator: function (rule, value, callback) {
      if (value) {
        userApi.checkEmail(value).then(res => {
          if (res.data) callback();
          else callback(new Error(proxy.$t('message.send.exist')));
        })
      }
    },
    trigger: "blur",
  },
];
rules.value.name = [
  { required: true, message: computed(()=> proxy.$t('require.nickname')), trigger: "blur" },
  { min: 2, max: 64, message: computed(()=> proxy.$t('message.nickname.length')), trigger: "blur" },
  {
    required: true,
    pattern: /^[a-zA-Z]{1}([a-zA-Z0-9]|[_]){1,64}$/,
    message: computed(()=> proxy.$t('message.nickname.rule')),
    trigger: "blur",
  },
  {
    validator: function (rule, value, callback) {
      if (value) {
        userApi.checkUser(value).then(res => {
          if (res.code == 0 && !res.data) callback();
          else callback(new Error(proxy.$t('message.nickname.nosame')));
        })
      }
    },
    trigger: "blur",
  },
];
rules.value.passwd = [
  { required: true, message: computed(()=> proxy.$t('require.password')), trigger: "blur" },
  { min: 8, max: 64, message: computed(()=> proxy.$t('message.password.length')), trigger: "blur" },
  {
    required: true,
    pattern: /^(?!^\d+$)(?!^[a-z]+$)(?!^[A-Z]+$)(?!^[^a-z0-9]+$)(?!^[^A-Z0-9]+$)(?!^.*[\u4E00-\u9FA5].*$)^\S*$/,
    message: computed(()=> proxy.$t('message.password.rule')),
    trigger: "blur",
  }
];
rules.value.code = [{ required: true, message: computed(()=> proxy.$t('require.verifyCode')), trigger: "blur" }];
rules.value.rpassword = [
  { required: true, message: computed(()=> proxy.$t('require.password')), trigger: "blur" },
  { min: 8, max: 64, message: computed(()=> proxy.$t('message.password.length')), trigger: "blur" },
  {
    required: true,
    pattern: /^(?!^\d+$)(?!^[a-z]+$)(?!^[A-Z]+$)(?!^[^a-z0-9]+$)(?!^[^A-Z0-9]+$)(?!^.*[\u4E00-\u9FA5].*$)^\S*$/,
    message: computed(()=> proxy.$t('message.password.rule')),
    trigger: "blur",
  },
  {
    validator: function (rule, value, callback) {
      if (value != form.value.passwd) {
        callback(new Error(proxy.$t('message.password.nosame')));
      } else {
        //校验通过
        callback();
      }
    },
    trigger: "blur",
  },
];
function doRegister() {
  loadingHelper.show();
  formRef.value.validate((valid) => {
    if (valid) {
      let data = {
        email: form.value.email,
        name: form.value.name,
        passwd: encryptAES(form.value.passwd),
        userType: form.value.userType,
        code: form.value.code,
        inviterId: form.value.inviterId
      }
      userApi.signup(data).then((res) => {
        if (res.code == 0 && res.msg == "success") {
          formRef.value.resetFields();
          loadingHelper.hide();
          ElMessageBox.alert(
            proxy.$t('message.register.success'),
            'Success',
            {
              confirmButtonText: 'Yes',
              type: 'success',
              showClose: false,
              callback:() => {
                router.push('/login')
              }
            }
          )
        }
        
      });
    }else{
      loadingHelper.hide();
    }
  });
}
function setDisabled(disabled) {
  btndisabled.value = disabled
}
</script>
