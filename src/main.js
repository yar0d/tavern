import { createApp } from "vue"
import { createI18n } from "vue-i18n"
import { createPinia } from "pinia"

import "./style.css"
import App from "./App.vue"
import messages, { LOCALE_DEFAULT, LOCALE_FALLBACK } from "./locales"
import { datetimeFormats, numberFormats } from "./locales/formats"

import { Icon } from "@iconify/vue"

import dui from "./components/index"

console.log(messages)

const i18n = createI18n({
  // something vue-i18n options here ...
  legacy: false,
  locale: LOCALE_DEFAULT,
  fallbackLocale: LOCALE_FALLBACK,
  messages,
  datetimeFormats,
  numberFormats,
})

const pinia = createPinia()

const app = createApp(App)

app.use(i18n)
app.use(pinia)

// eslint-disable-next-line vue/multi-word-component-names
app.component("Icon", Icon)

dui.register(app).then(() => {
  app.mount("#app")
})
