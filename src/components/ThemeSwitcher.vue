<template>
  <label class="swap swap-rotate">
    <!-- this hidden checkbox controls the state -->
    <input v-model="dark" type="checkbox" :value="theme" class="theme-controller" @change="switchTheme" />
    <Icon icon="material-symbols-light:light-mode-outline" class="swap-on h-10 w-10 fill-current" />
    <Icon icon="material-symbols-light:dark-mode-outline" class="swap-off h-10 w-10 fill-current" />
  </label>
</template>

<script>
import { mapStores } from "pinia"

import { useAppStore } from "@/stores"
import { THEME_DARK, THEME_LIGHT } from "@/libs/themes"

export default {
  name: "ThemeSwitcher",
  data () {
    return {
      theme: THEME_DARK,
      dark: false,
    }
  },
  computed: {
    ...mapStores(useAppStore),
  },
  mounted () {
    this.dark = this.appStore.themeConfig.dark
  },
  methods: {
    switchTheme () {
      if (this.dark) this.theme = THEME_DARK
      else this.theme = THEME_LIGHT
      this.appStore.saveTheme({
        dark: this.dark,
        name: this.theme,
      })
    },
  },
}
</script>
