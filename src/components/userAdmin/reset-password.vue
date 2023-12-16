<template>
  <div>
    <el-form ref="formRef" :rules="rules" label-position="top" label-width="100px" :model="form">
      <el-form-item :label="$t('text.email')" prop="email">
        <el-input v-model="form.email" :placeholder="`${$t('text.enter')}${$t('text.email').toLowerCase()}`" clearable :disabled="btndisabled"/>
      </el-form-item>
      <el-form-item :label="$t('text.verifyCode')" prop="code">
        <el-row :gutter="10" style="width:100%">
          <el-col :span="18">
            <el-input v-model="form.code" type="text" :placeholder="`${$t('text.enter')}${$t('text.verifyCode').toLowerCase()}`" clearable />
          </el-col>
          <el-col :span="6">
            <count-down-time :email="form.email" mode="password" @send="setDisabled"></count-down-time>
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item :label="$t('text.newpassword')" prop="password">
        <el-input v-model="form.password" type="password" :placeholder="`${$t('text.enter')}${$t('text.newpassword').toLowerCase()}`" show-password clearable />
      </el-form-item>
      <el-form-item :label="$t('text.passwordagain')" prop="rpassword">
        <el-input v-model="form.rpassword" type="password" :placeholder="`${$t('text.enter')}${$t('text.newpassword').toLowerCase()}`" show-password clearable />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" class="w-100" @click="submit()">{{$t('btn.save')}}</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script setup>
import { ref,getCurrentInstance, computed } from "vue";
import { useRouter } from "vue-router";
import { userApi } from "@/api/request";
import { loadingHelper } from "@/utils/loading";
import { encryptAES } from "@/utils/crypto";
import CountDownTime from "@/components/userAdmin/count-down-time.vue"
const { proxy } = getCurrentInstance();
const emit = defineEmits(['close'])
const router = useRouter();
const formRef = ref(null);
const form = ref({
  email: "",
  code: "",
  password: "",
  rpassword: "",
});
const rules = ref({});
const time = ref(0)
const btndisabled = ref(false)
rules.value.email = [
  { required: true, message: computed(()=> proxy.$t('require.email')), trigger: "blur" },
  {
    type: 'email',
    message: computed(()=> proxy.$t('message.email.rule')),
    trigger: ['blur', 'change'],
  },{
  validator: function (rule, value, callback) {
    if (value) {
      userApi.checkEmail(value).then(res => {
        if (res.code == 0 && !res.data) callback();
        else callback(new Error(proxy.$t('message.send.noexist')));
      })
    }
  },
  trigger: "blur",
}];
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
      if (value != form.value.password) {
        callback(new Error(proxy.$t('message.password.nosame')));
      } else {
        //校验通过
        callback();
      }
    },
    trigger: "blur",
  },
];
function submit() {
  loadingHelper.show();
  formRef.value.validate((valid) => {
    if (valid) {
      let param = {
        email: form.value.email,
        code: form.value.code,
        newPasswd: encryptAES(form.value.password)
      }
      userApi.reset(param).then((res) => {
        if (res.code == 0 && res.msg == "success") {
          ElNotification({
            type: "success",
            message: "successed"
          })
          emit("close")
        }
        loadingHelper.hide();
      })
    }else{
      loadingHelper.hide();
    }
  });
}
function setDisabled(disabled){
  btndisabled.value = disabled
}
</script>
