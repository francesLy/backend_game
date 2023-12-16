<template>
  <div>
    <el-form ref="formRef" :rules="rules" label-position="top" label-width="100px" :model="form">
      <el-form-item :label="$t('text.email')" prop="email">
        <el-input v-model="form.email" :placeholder="`${$t('text.enter')}${$t('text.email').toLowerCase()}`" clearable :disabled="btndisabled"/>
      </el-form-item>
      <el-form-item :label="$t('text.verifyCode')" prop="code">
        <el-row :gutter="10" style="width:100%">
          <el-col :span="18">
            <el-input v-model="form.code" :placeholder="`${$t('text.enter')}${$t('text.verifyCode').toLowerCase()}`" clearable />
          </el-col>
          <el-col :span="6">
            <count-down-time :email="form.email" mode="signup" @send="setDisabled"></count-down-time>
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" class="w-100" @click="submit()">{{$t('btn.save')}}</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script setup>
import { ref,getCurrentInstance,cpmputed } from "vue";
import { useStore } from "vuex"
import { useRouter } from "vue-router";
import { userApi } from "@/api/request";
import { loadingHelper } from "@/utils/loading";
import CountDownTime from "@/components/userAdmin/count-down-time.vue";
const { proxy } = getCurrentInstance();
const emit = defineEmits(['close'])
const store = useStore();
const router = useRouter();
const formRef = ref(null);
const form = ref({
  email: "",
  code: ""
});
const rules = ref({});
const time = ref(0)
const btndisabled = ref(false)
rules.value.email = [{ required: true, message: computed(()=> proxy.$t('require.email')), trigger: "blur" },
{
  type: 'email',
  message: computed(()=> proxy.$t('message.email.rule')),
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
}];
rules.value.code = [{ required: true, message: computed(()=> proxy.$t('require.verifyCode')), trigger: "blur" }];
function submit() {
  loadingHelper.show();
  formRef.value.validate((valid) => {
    if (valid) {
      let param = {
        email: form.value.email,
        code: form.value.code,
        userId: store.state.user.id,
      }
      userApi.email(param).then((res) => {
        if (res.code == 0 && res.msg == "success") {
          ElNotification({
            type: "success",
            message: proxy.$t('message.email.success')
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
function setDisabled(disabled){
  btndisabled.value = disabled
}
</script>
