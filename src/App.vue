<template>
  <el-config-provider :locale="locale">
    <div id="app">
      <router-view></router-view>
    </div>
  </el-config-provider>
</template>

<style lang="scss">
@import "@/style/common.scss";
</style>
<script>
import zhTW from "element-plus/dist/locale/zh-tw.mjs"; // 中文包
import enUS from "element-plus/dist/locale/en.mjs";
import {ref} from "vue";
import {useStore} from "vuex"
export default {
  name: "App",
  setup() {
    const store = useStore();
    let language = store.state.language=="en"?enUS:zhTW
    const locale = ref(language);
    const debounce = (fn, delay) => {
      let timer = null;
      return function () {
        let context = this;
        let args = arguments;
        clearTimeout(timer);
        timer = setTimeout(function () {
          fn.apply(context, args);
        }, delay);
      }
    }

    const _ResizeObserver = window.ResizeObserver;
    window.ResizeObserver = class ResizeObserver extends _ResizeObserver {
      constructor(callback) {
        callback = debounce(callback, 16);
        super(callback);
      }
    }
    return {
      locale
    }
  }
};
</script>

<style>
#app {
  font-family: sans-serif, "Hiragino Sans GB", "PingFang SC", "Helvetica Neue",
    Helvetica, "Microsoft YaHei", "微软雅黑", Arial;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #111;
}
</style>

