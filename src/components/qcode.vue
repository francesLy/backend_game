<template>
  <div>
    <qrcode-vue :value='url' :size='size' id="qcode"></qrcode-vue>
    <br />
    <p>{{ $t('message.invite.share') }}</p>
    <el-button type="primary" @click="download" id="download" round>{{ $t('btn.download') }}</el-button>
    <div style="width:80%;margin:20px auto;">
      <el-input v-model="url">
        <template #append>
          <el-button type="primary" @click="copyClick(url)">{{ $t('btn.copy') }}</el-button>
        </template>
      </el-input>
    </div>
  </div>
</template>
<script setup>
import QrcodeVue from 'qrcode.vue'
import { useStore } from "vuex"
import { ref, watch } from "vue"
import { copyClick } from '@/utils/copy';
const store = useStore();
const props = defineProps({
  id: {
    type: [Number, String]
  }
})
const inviterId = ref(store.state.user ? store.state.user.id : '')
const url = ref(null)
watch(() => props.id, (val) => {
  if (val) {
    inviterId.value = val;
    url.value = window.location.protocol + window.location.host + '/register?id=' + encodeURIComponent(inviterId.value)
  }
}, { immediate: true })
url.value = window.location.protocol +"//"+ window.location.host + '/register?id=' + encodeURIComponent(inviterId.value)
const size = ref(240)
function download() {
  let canvas = document.getElementById('qcode');
  let a = document.createElement('a');
  a.href = canvas.toDataURL('img/png');
  a.download = 'chessofstars_invite';
  a.click()
  ElMessage.success('loading...')
}
function copy(val) {
  copyClick(val)
}
</script>
