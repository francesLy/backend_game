<template>
  <div>
    <el-form ref="formRef" :rules="rules" label-position="top" label-width="100px" :model="form">
      <el-form-item :label="$t('text.oldpassword')" prop="oldPassword">
        <el-input v-model="form.oldPassword" type="password" :placeholder="`${$t('text.enter')}${$t('text.oldpassword').toLowerCase()}`" show-password clearable />
      </el-form-item>
      <el-form-item :label="$t('text.newpassword')" prop="newPassword">
        <el-input v-model="form.newPassword" type="password" :placeholder="`${$t('text.enter')}${$t('text.newpassword').toLowerCase()}`" show-password clearable />
      </el-form-item>
      <el-form-item :label="$t('text.passwordagain')" prop="rpassword">
        <el-input v-model="form.rpassword" type="password" :placeholder="`${$t('text.enter')}${$t('text.newpassword').toLowerCase()}`" show-password clearable />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" class="w-100" @click="submit">{{$t('btn.save')}}</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script setup>
import { ref,getCurrentInstance,computed } from "vue";
import { useStore } from "vuex"
import { useRouter } from "vue-router";
import { userApi } from "@/api/request";
import { loadingHelper } from "@/utils/loading";
import { encryptAES } from "@/utils/crypto";
const { proxy } = getCurrentInstance();
const emit = defineEmits(['close'])
const store = useStore();
const router = useRouter();
const formRef = ref(null);
const form = ref({
  oldPassword: "",
  newPassword: "",
  rpassword: "",
});
const rules = ref({});
rules.value.oldPassword = [
  { required: true, message: computed(()=> proxy.$t('require.oldpassword')), trigger: "blur" },
  { min: 8, max: 64, message: computed(()=> proxy.$t('message.password.length')), trigger: "blur" }, 
  {
    required: true,
    pattern: /^(?!^\d+$)(?!^[a-z]+$)(?!^[A-Z]+$)(?!^[^a-z0-9]+$)(?!^[^A-Z0-9]+$)(?!^.*[\u4E00-\u9FA5].*$)^\S*$/,
    message: computed(()=> proxy.$t('message.password.rule')),
    trigger: "blur",
  }];
rules.value.newPassword = [
  { required: true, message: computed(()=> proxy.$t('require.newpassword')), trigger: "blur" },
  { min: 8, max: 64, message: computed(()=> proxy.$t('message.password.length')), trigger: "blur" }, 
  {
    required: true,
    pattern: /^(?!^\d+$)(?!^[a-z]+$)(?!^[A-Z]+$)(?!^[^a-z0-9]+$)(?!^[^A-Z0-9]+$)(?!^.*[\u4E00-\u9FA5].*$)^\S*$/,
    message: computed(()=> proxy.$t('message.password.rule')),
    trigger: "blur",
  },
  {
    validator: function (rule, value, callback) {
      if (value === form.value.oldPassword) {
        callback(new Error(proxy.$t('message.password.newpassnosame')));
      } else {
        //校验通过
        callback();
      }
    },
    trigger: "blur",
  },];
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
      if (value != form.value.newPassword) {
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
        oldPasswd: encryptAES(form.value.oldPassword),
        newPasswd: encryptAES(form.value.newPassword),
        userId: store.state.user.id
      }
      userApi.password(param).then((res) => {
        if (res.code == 0 && res.msg == "success") {
          ElNotification({
            type: "success",
            message: proxy.$t('message.password.success')
          })
          emit("close")
          router.push({
            path: "/login",
          });
        }
        loadingHelper.hide();
      })
    }else{
      loadingHelper.hide();
    }
  });
}
</script>
