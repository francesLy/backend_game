<template>
  <el-button style="width:100%" @click="getVerifyCode" type="primary" :disabled="btndisabled" plain>
    <span v-if="!btndisabled">{{sendBtnText}}</span>
    <span v-if="btndisabled">{{ time }}</span>
  </el-button>
</template>
<script setup>
import { ElMessage } from 'element-plus';
import { ref, onBeforeUnmount, watch,getCurrentInstance,computed } from 'vue';
import { userApi } from "@/api/request";
const { proxy } = getCurrentInstance();
const sendBtnText = ref(computed(()=> proxy.$t('btn.send')));
const btndisabled = ref(false);
const emailValue = ref()
const props = defineProps({
  email: { type: String },
  mode: {type:String}
})
const emit = defineEmits(['send'])
const time = ref(0);
let gen = null;
let timer = null;
watch(() => props.email, (val) => {
  if (!val) {
    return;
  }
  emailValue.value = val
}, { immediate: true })
//生成器
function* genTime(num) {
  let second = num;
  while (true) {
    second -= 1;
    if (second === -1) {
      clear()
    }
    yield `${second} s`;
  }
}
async function emailVaild() {
  let ret = false;
  await userApi.checkEmail(emailValue.value).then(res => {
    if (res.data){
       ret = true
       if(props.mode != "signup") ElMessage.error(proxy.$t('message.send.noexist'));
    }else {
      ret = false;//已存在
      if(props.mode == "signup"){
        ElMessage.error(proxy.$t('message.send.exist')); 
      } 
    }
  })
  return ret
}
async function getVerifyCode() {
  if (!emailValue.value) {
    ElMessage.error(proxy.$t('message.send.required'))
    return;
  }
  let isEmailAvaliable = await emailVaild()
  if(!isEmailAvaliable && props.mode == "signup") return;
  if(isEmailAvaliable && props.mode != "signup") return;
  emit("send", true);
  sendBtnText.value = computed(()=> (proxy.$t('btn.sending')+'...'))
  userApi.code({ email: emailValue.value }).then(res => {
    if (res.code == 0) {
      ElNotification({
        type: "success",
        message: proxy.$t('message.send.success'),
      });

      btndisabled.value = true;
      if (timer) clearInterval(timer);
      gen = genTime(res.data);
      timer = setInterval(() => {
        time.value = gen.next().value;
      },1000)
    } else {
      emit("send", false);
    }
    sendBtnText.value = computed(()=> proxy.$t('btn.send'))
  })
}
function clear() {
  clearInterval(timer);
  gen = null;
  btndisabled.value = false;
  emit("send", false);
}
onBeforeUnmount(() => {
  clear()
})
  </script>