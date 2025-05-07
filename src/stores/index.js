import { defineStore } from "pinia"

import { path } from "@tauri-apps/api"
import { getName } from "@tauri-apps/api/app"

import { exists, mkdir, BaseDirectory } from "@tauri-apps/plugin-fs"

// You can name the return value of `defineStore()` anything you want,
// but it's best to use the name of the store and surround it with `use`
// and `Store` (e.g. `useUserStore`, `useCartStore`, `useProductStore`)
// the first argument is a unique id of the store across your application
export const useAppStore = defineStore("app", {
  state: () => ({
    appName: "tavern",
    configDir: null,
    documentDir: null,
    language: null,
    standAlone: false,
  }),
  actions: {
    async init () {
      const messages = []

      try {
        this.language = navigator.language || navigator.userLanguage
        messages.push(`[app] Language ${this.language}.`)

        this.appName = await getName()

        this.configDir = await path.appConfigDir()
        messages.push(`[app] Config saved in ${this.configDir}`)
        this.documentDir = await path.documentDir()

        if (this.appName) {
          if (this.documentDir) {
            const dirExists = await exists(this.appName, { baseDir: BaseDirectory.Document })
            if (!dirExists){
              await mkdir(this.appName, { baseDir: BaseDirectory.Document })
              messages.push(`[app] Created documents directory ${this.documentDir}/${this.appName}.`)
            } else
              messages.push(`[app] Using documents directory ${this.documentDir}/${this.appName}.`)
          }
        }

        messages.push("[app] Initialized as Tauri app.")
        this.standAlone = true
      } catch (error) {
        this.standAlone = false
        console.error(error)
        messages.push("[app] Initialized as web app.")
      }
      return messages
    },
  },
})

export default useAppStore