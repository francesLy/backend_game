import store from "./store/index";
import router from "./router/index";
import App from "./App.vue";
import { createApp } from "vue";
import {i18n} from './lang'
import 'font-awesome/css/font-awesome.min.css'
import { MetaMask } from "./utils/meta-mask";
//import installElementPlus from "./plugins/element";
//require("../mock/index.js");
console.log("环境：",process.env.NODE_ENV)
import VConsole from 'vconsole';
if(process.env.VUE_APP_ENV != "production"){
  const vConsole = new VConsole(); 
}
const app = createApp(App);
//installElementPlus(app);
console.log(process.env)
app.config.globalProperties.metaMask = new MetaMask();
app.use(store).use(router).mount("#app");
app.use(i18n);  
export const globals = app.config.globalProperties;
app.config.errorHandler = (err, vm, info) => {
    console.log(err,vm,info)
}
app.config.warnHandler = (msg, instance, trace) => {
    console.log(msg,instance,trace)
}

