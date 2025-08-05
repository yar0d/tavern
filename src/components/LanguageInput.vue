<template>
  <div class="dropdown dropdown-end">
    <div tabindex="0" role="button" class="btn btn-ghost rounded-field">
      <dui-icon-flag v-if="appStore.country" :value="appStore.country" width="24" />
      <dui-icon v-else icon="fluent:translate-32-regular" />
    </div>
    <ul tabindex="0"
      class="menu dropdown-content bg-base-100 rounded-box z-1 mt-4 p-2 shadow-sm">
      <li v-for="lang in localesList" :key="lang.value">
        <a :class="appStore.language === lang.value ? 'font-bold' : ''"><dui-icon-flag :value="lang.country" width="24" @click.stop="changeLocale(lang)" /> {{ lang.title }}</a>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapStores } from "pinia"

import { LOCALES_COUNTRIES, LOCALE_NAMES } from "@/locales"
import { useAppStore } from "@/stores"

export default {
  name: "LanguageInput",
  emits: ["locale-change"],
  data () {
    return {
      locale: null,
    }
  },
  computed: {
    ...mapStores(useAppStore),
    localesList () {
      const result = []
      for (const locale of this.$i18n.availableLocales) {
        result.push({
          title: this.$t(LOCALE_NAMES[locale]),
          value: locale,
          country: LOCALES_COUNTRIES[locale],
        })
      }
      return result
    },
  },
  mounted () {
    // this.changeLocale(storage.get("locale") || this.appStore.language)
  },
  methods: {
    changeLocale (newLocale) {
      this.locale = newLocale
      this.$root.$i18n.locale = newLocale
      this.$i18n.locale = newLocale
      this.appStore.language = newLocale
      this.$emit("locale-change", newLocale)
    },
  },
}
</script>
