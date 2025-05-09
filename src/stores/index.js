import { defineStore } from "pinia"

import { path } from "@tauri-apps/api"
import { getName } from "@tauri-apps/api/app"
import { BaseDirectory, exists, mkdir, readTextFile, writeTextFile } from "@tauri-apps/plugin-fs"

import { THEME_DARK } from "@/libs/themes"
import { THEME_LIGHT } from "../libs/themes"

const CONFIG_FILE_VERSION = 1
const CONFIG_FILE_NAME = "app-conf.json"
const CONFIG_KEY_THEME = "theme"

const HISTORY_FILE_NAME = "history.json"

// You can name the return value of `defineStore()` anything you want,
// but it's best to use the name of the store and surround it with `use`
// and `Store` (e.g. `useUserStore`, `useCartStore`, `useProductStore`)
// the first argument is a unique id of the store across your application
export const useAppStore = defineStore("app", {
  state: () => ({
    _config: {},
    _themeConfig: {
      dark: false,
      theme: THEME_DARK,
    },
    appName: "tavern",
    configDir: null,
    documentDir: null,
    language: null,
    pathNameConfig: null,
    pathNameHistory: null,
    standAlone: false,
  }),
  getters: {
    config (state) { return state._config},
    prefersDarkTheme () {
      const prefersDarkTheme = window.matchMedia("(prefers-color-scheme: dark)")
      return prefersDarkTheme?.matches
    },
    themeConfig (state) { return state._themeConfig},
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
    async init () {
      const messages = []

      try {
        this.language = navigator.language || navigator.userLanguage
        messages.push(`[app] Language ${this.language}.`)

        this.appName = await getName()

        this.configDir = await path.appConfigDir()

        this.documentDir = await path.documentDir()
        this.documentDir += `/${this.appName}`

        if (this.appName) {
          let dirExists = await exists(this.appName, { baseDir: BaseDirectory.Document })
          if (!dirExists) {
            await mkdir(this.appName, { baseDir: BaseDirectory.Document })
            messages.push(`[app] Created documents directory ${this.documentDir}.`)
          } else
            messages.push(`[app] Using documents directory ${this.documentDir}.`)

          dirExists = await exists(this.appName, { baseDir: BaseDirectory.Config })
          if (!dirExists){
            await mkdir(this.appName, { baseDir: BaseDirectory.Config })
            messages.push(`[app] Created config directory ${this.configDir}`)
          } else
            messages.push(`[app] Using config directory ${this.configDir}`)
        }

        this.pathNameConfig = await path.join(this.appName, CONFIG_FILE_NAME)
        this.pathNameHistory = await path.join(this.appName, HISTORY_FILE_NAME)

        await this.loadConfig()
        this.applyTheme()

        messages.push("[app] Initialized as Tauri app.")
        this.standAlone = true
      } catch (error) {
        this.standAlone = false
        console.error(error)
        messages.push("[app] Failed initializing as Tauri app!")
      }
      return messages
    },
    async loadConfig () {
      const fileExists = await exists(this.pathNameConfig, { baseDir: BaseDirectory.Config })
      if (fileExists){
        const newConfig = await readTextFile(this.pathNameConfig, { baseDir: BaseDirectory.Config })
        try {
          this._config = JSON.parse(newConfig || "{}")
        } catch (error) {
          console.error(`[loadConfig] Error parsing configuration from ${this.pathNameConfig}`, error)
        }
      }
      return this._config
    },
    async loadHistory () {
      const fileExists = await exists(this.pathNameHistory, { baseDir: BaseDirectory.Document })
      if (fileExists)
        return await readTextFile(this.pathNameHistory, { baseDir: BaseDirectory.Config })
      else
        return []
    },
    async saveConfig (config) {
      const newConfig = { ...this._config, ...config, version: CONFIG_FILE_VERSION }
      await writeTextFile(this.pathNameConfig, JSON.stringify(newConfig), { baseDir: BaseDirectory.Config })
      this._config = newConfig
      return this._config
    },
    async saveHistory (history) {
      await writeTextFile(this.pathNameHistory, JSON.stringify(history || []), { baseDir: BaseDirectory.Document })
      return
    },
    async saveTheme (themeConfig) {
      await this.saveConfig({ [CONFIG_KEY_THEME]: themeConfig })
      this._themeConfig = themeConfig
    },
  },
})

export default useAppStore