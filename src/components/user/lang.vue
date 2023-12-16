<template>
  <div style="margin-left:5px;margin-right:5px;display:inline-block">
    <el-switch
    v-model="result"
    inline-prompt
    style="--el-switch-on-color: var(--el-color-success); --el-switch-off-color: var(--el-color-primary)"
    active-text="繁"
    inactive-text="En"
    active-value="zh"
    inactive-value="en"
    @change="onChange"
  />
  </div>
</template>
  
<script setup>
import { onMounted, ref } from 'vue';
import { useStore } from 'vuex';
import { useI18n } from 'vue-i18n'
import Bus from "@/utils/event-bus";
const { locale } = useI18n();
const store = useStore()
const result = ref(store.state.language);
const onChange = (value) => {
  locale.value = value;
  store.commit("setLanguage",value);
  Bus.$emit("formReset",true)
};
onMounted(()=>{
    result.value = store.state.language;
})
</script>
<style lang="scss" scoped>
::v-deep .el-switch .el-switch__core{
  height:32px;
  border-radius: 18px;
}
</style>

