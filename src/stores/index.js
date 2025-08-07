import { defineStore } from "pinia"

import { path } from "@tauri-apps/api"
import { getName } from "@tauri-apps/api/app"
import { BaseDirectory, exists, readTextFile, writeTextFile } from "@tauri-apps/plugin-fs"

import storage from "@/libs/storage"
import { THEME_DARK, THEME_LIGHT } from "@/libs/themes"
import { LOCALES_COUNTRIES, LOCALE_DEFAULT, LOCALE_DEFAULT_COUNTRY, LOCALE_NAMES } from "@/locales"

const CONFIG_FILE_VERSION = 1
const CONFIG_FILE_NAME = "app-conf.json"
const CONFIG_ROOT_NAME = "config"
const CONFIG_KEY_HISTORY = "history"
const CONFIG_KEY_THEME = "theme"

const HISTORY_FILE_NAME = "history.json"

// You can name the return value of `defineStore()` anything you want,
// but it's best to use the name of the store and surround it with `use`
// and `Store` (e.g. `useUserStore`, `useCartStore`, `useProductStore`)
// the first argument is a unique id of the store across your application
export const useAppStore = defineStore("app", {
  state: () => ({
    _config: {},
    _language: LOCALE_DEFAULT,
    _themeConfig: {
      dark: false,
      theme: THEME_DARK,
    },
    appName: null,
    baseDir: null,
    country: null,
    documentDir: null,
    pathNameConfig: CONFIG_FILE_NAME,
    pathNameHistory: HISTORY_FILE_NAME,
    standAlone: false,
  }),
  getters: {
    applicationName: (state) => state.appName || "OSE Tavern",
    config (state) { return state._config},
    language (state) { return state._language},
    prefersDarkTheme () {
      const prefersDarkTheme = window.matchMedia("(prefers-color-scheme: dark)")
      return prefersDarkTheme?.matches
    },
    themeConfig (state) { return state._themeConfig},
    themeIsDark (state) { state._themeConfig.dark },
  },
  actions: {
    async applyTheme () {
      this._themeConfig = this._config[CONFIG_KEY_THEME]
      if (this._themeConfig?.name) return // A theme is already choosen
      if (this.prefersDarkTheme) {
        this._themeConfig = { dark: true, name: THEME_DARK }
      } else {
        this._themeConfig = { dark: false, name: THEME_LIGHT }
      }
      this.saveTheme(this._themeConfig)
    },
    async init (app) {
      const messages = []

      const navLang = navigator.language || navigator.userLanguage
      this.country = LOCALES_COUNTRIES[navLang] || LOCALE_DEFAULT_COUNTRY
      this._language = LOCALE_NAMES[navLang] ? navLang : LOCALE_DEFAULT

      // eslint-disable-next-line no-console
      console.log(`[app] Language ${this.country} / ${this._language}.`)

      app.$root.$i18n.locale = this._language

      try {
        this.appName = await getName()
        this.baseDir = BaseDirectory.AppData
        this.documentDir = await path.appDataDir()

        // this.documentDir = await path.join(this.documentDir, this.appName)

        // const dirExists = await exists(this.appName, { baseDir: this.baseDir })
        // if (!dirExists) {
        //   await mkdir(this.appName, { baseDir: this.baseDir })
        //   messages.push(`[app] Created documents directory ${this.documentDir}.`)
        // } else
        messages.push(`[app] Using documents directory ${this.documentDir}.`)

        this.pathNameConfig = await path.join(this.appName, CONFIG_FILE_NAME)
        this.pathNameHistory = await path.join(this.appName, HISTORY_FILE_NAME)

        this.standAlone = true
      } catch (error) {
        this.standAlone = false
        console.error(error)
        messages.push(error)
        messages.push("[app] Failed initializing as Tauri app!")
      }

      await this.loadConfig()
      this.applyTheme()

      messages.push(`[app] History is saved in ${this.pathNameHistory}.`)
      messages.push("[app] Initialized as Tauri app.")
      return messages
    },
    async loadConfig () {
      try {
        if (this.standAlone) {
          const fileExists = await exists(this.pathNameConfig, { baseDir: this.baseDir })
          if (fileExists) {
            const newConfig = await readTextFile(this.pathNameConfig, { baseDir: this.baseDir })
            this._config = JSON.parse(newConfig || "{}")
          }
        }
        else {
          const newConfig = storage.get(CONFIG_KEY_THEME, "{}")
          this._config = JSON.parse(newConfig || "{}")
        }

        if (this._config.language) this._language = this._config.language

        return this._config
      } catch (error) {
        console.error(`[loadConfig] Error parsing configuration from ${this.pathNameConfig}`, error)
      }
    },
    async loadHistory () {
      try {
        if (this.standAlone) {
          const fileExists = await exists(this.pathNameHistory, { baseDir: this.baseDir })
          if (fileExists) {
            const history = await readTextFile(this.pathNameHistory, { baseDir: this.baseDir })
            return JSON.parse(history || "[]")
          }
          else
            return []}
        else
          return storage.get(CONFIG_KEY_HISTORY, [])
      } catch (error) {
        console.error(`[loadHistory] Error parsing history from ${this.pathNameConfig}`, error)
        throw error
      }
    },
    async saveConfig (config) {
      try {
        const newConfig = { ...this._config, ...config, version: CONFIG_FILE_VERSION }
        if (this.standAlone)
          await writeTextFile(this.pathNameConfig, JSON.stringify(newConfig), { baseDir: this.baseDir })
        else
          storage.set(CONFIG_ROOT_NAME, JSON.stringify(newConfig))

        this._config = newConfig
        return this._config
      } catch (error) {
        console.error(`[saveConfig] Error saving ${this.pathNameConfig}`, error)
        throw error
      }
    },
    async saveHistory (history) {
      try {
        if (this.standAlone)
          await writeTextFile(this.pathNameHistory, JSON.stringify(history || []), { baseDir: this.baseDir })
        else
          storage.set(CONFIG_KEY_HISTORY, JSON.stringify(history || []))
      } catch (error) {
        console.error(`[saveHistory] Error saving ${this.pathNameHistory}`, error)
        throw error
      }
    },
    async saveTheme (themeConfig) {
      await this.saveConfig({ [CONFIG_KEY_THEME]: themeConfig })
      this._themeConfig = themeConfig
    },
  },
})

export default useAppStore