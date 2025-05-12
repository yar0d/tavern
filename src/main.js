/* eslint-disable vue/component-definition-name-casing */
import { createApp } from "vue"
import { createI18n } from "vue-i18n"
import { createPinia } from "pinia"

import "./style.css"
import App from "./App.vue"
import messages from "./locales"
import { datetimeFormats, numberFormats } from "./locales/formats"

import { Icon } from "@iconify/vue"

import TextInput from "./components/dui/TextInput.vue"

const i18n = createI18n({
  // something vue-i18n options here ...
  legacy: false,
  locale: "fr-FR",
  fallbackLocale: "en-US",
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

app.component("dui-text-input", TextInput)

app.mount("#app")
