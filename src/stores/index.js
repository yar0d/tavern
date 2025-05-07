import { defineStore } from "pinia"

import { path } from "@tauri-apps/api"
import { getName } from "@tauri-apps/api/app"

import { BaseDirectory, exists, mkdir, readTextFile, writeTextFile } from "@tauri-apps/plugin-fs"

const CONFIG_FILE_NAME = "app-conf.json"
const HISTORY_FILE_NAME = "history.json"

// You can name the return value of `defineStore()` anything you want,
// but it's best to use the name of the store and surround it with `use`
// and `Store` (e.g. `useUserStore`, `useCartStore`, `useProductStore`)
// the first argument is a unique id of the store across your application
export const useAppStore = defineStore("app", {
  state: () => ({
    _config: {},
    appName: "tavern",
    configDir: null,
    documentDir: null,
    language: null,
    standAlone: false,
  }),
  getters: {
    config (state) { return state._config},
  },
  actions: {
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

        this.loadConfig()

        messages.push("[app] Initialized as Tauri app.")
        this.standAlone = true
      } catch (error) {
        this.standAlone = false
        console.error(error)
        messages.push("[app] Initialized as web app.")
      }
      return messages
    },
    async loadConfig () {
      const fileExists = await exists(`${this.appName}/${CONFIG_FILE_NAME}`, { baseDir: BaseDirectory.Config })
      if (fileExists)
        this._config = await readTextFile(`${this.appName}/${CONFIG_FILE_NAME}`, { baseDir: BaseDirectory.Config })
      return this._config
    },
    async loadHistory () {
      const fileExists = await exists(`${this.appName}/${HISTORY_FILE_NAME}`, { baseDir: BaseDirectory.Document })
      if (fileExists)
        return await readTextFile(`${this.appName}/${HISTORY_FILE_NAME}`, { baseDir: BaseDirectory.Config })
      else
        return []
    },
    async saveConfig (config) {
      const newConfig = { ...this._config, ...config }
      await writeTextFile(`${this.appName}/${CONFIG_FILE_NAME}`, JSON.stringify(newConfig, undefined, 2), { baseDir: BaseDirectory.Config })
      this._config = newConfig
      return this._config
    },
    async saveHistory (history) {
      await writeTextFile(`${this.appName}/${HISTORY_FILE_NAME}`, JSON.stringify(history || [], undefined, 2), { baseDir: BaseDirectory.Document })
      return
    },
  },
})

export default useAppStore