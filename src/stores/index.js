import { defineStore } from "pinia"

import { path } from "@tauri-apps/api"
import { getName } from "@tauri-apps/api/app"
import { BaseDirectory, exists, readTextFile, writeTextFile } from "@tauri-apps/plugin-fs"

import { THEME_DARK, THEME_LIGHT } from "@/libs/themes"

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
    appName: null,
    baseDir: null,
    documentDir: null,
    language: null,
    pathNameConfig: CONFIG_FILE_NAME,
    pathNameHistory: HISTORY_FILE_NAME,
    standAlone: false,
  }),
  getters: {
    applicationName: (state) => state.appName,
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
        this.appName = await getName()
        this.baseDir = BaseDirectory.AppData
        this.documentDir = await path.appDataDir()

        messages.push(`[app] Starting ${this.appName}.`)
        messages.push(`[app] Language ${this.language}.`)

        // this.documentDir = await path.join(this.documentDir, this.appName)

        // const dirExists = await exists(this.appName, { baseDir: this.baseDir })
        // if (!dirExists) {
        //   await mkdir(this.appName, { baseDir: this.baseDir })
        //   messages.push(`[app] Created documents directory ${this.documentDir}.`)
        // } else
        messages.push(`[app] Using documents directory ${this.documentDir}.`)

        // this.pathNameConfig = await path.join(this.appName, CONFIG_FILE_NAME)
        // this.pathNameHistory = await path.join(this.appName, HISTORY_FILE_NAME)

        await this.loadConfig()
        this.applyTheme()

        messages.push(`[app] History is saved in ${this.pathNameHistory}.`)
        messages.push("[app] Initialized as Tauri app.")
        this.standAlone = true
      } catch (error) {
        this.standAlone = false
        console.error(error)
        messages.push(error)
        messages.push("[app] Failed initializing as Tauri app!")
      }
      return messages
    },
    async loadConfig () {
      try {
        const fileExists = await exists(this.pathNameConfig, { baseDir: this.baseDir })
        if (fileExists) {
          const newConfig = await readTextFile(this.pathNameConfig, { baseDir: this.baseDir })
          this._config = JSON.parse(newConfig || "{}")
        }
        return this._config
      } catch (error) {
        console.error(`[loadConfig] Error parsing configuration from ${this.pathNameConfig}`, error)
      }
    },
    async loadHistory () {
      try {
        const fileExists = await exists(this.pathNameHistory, { baseDir: this.baseDir })
        if (fileExists)
          return await readTextFile(this.pathNameHistory, { baseDir: this.baseDir })
        else
          return []
      } catch (error) {
        console.error(`[loadHistory] Error parsing history from ${this.pathNameConfig}`, error)
        throw error
      }
    },
    async saveConfig (config) {
      try {
        const newConfig = { ...this._config, ...config, version: CONFIG_FILE_VERSION }
        await writeTextFile(this.pathNameConfig, JSON.stringify(newConfig), { baseDir: this.baseDir })
        this._config = newConfig
        return this._config
      } catch (error) {
        console.error(`[saveConfig] Error saving ${this.pathNameConfig}`, error)
        throw error
      }
    },
    async saveHistory (history) {
      try {
        await writeTextFile(this.pathNameHistory, JSON.stringify(history || []), { baseDir: this.baseDir })
        return
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