// vue-i18n所需要引入的
import { createI18n } from 'vue-i18n'
// 本地的文件夹
import enLocale from './en'
import zhLocale from './zh'
import store from "@/store/index";
const messages = {
  en: {
    ...enLocale
  },
  zh: {
    ...zhLocale
  },
}

// 获取浏览器的语言
const lang = (navigator.language || 'en').toLocaleLowerCase()
const language = store.state.language || lang.split('-')[0] || 'zh';
store.commit("setLanguage", language)
const i18n = createI18n({
  legacy: false,
  globalInjection: true,
  locale: language,
  fallbackLocale: 'en',
  messages,
})
export { i18n }


