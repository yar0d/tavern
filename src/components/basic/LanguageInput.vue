<template>
  <div class="dropdown dropdown-end">
    <div tabindex="0" role="button" class="btn btn-ghost">
      <dui-icon-flag v-if="country" :value="country" />
      <dui-icon v-else icon="fluent:translate-32-regular" height="32" />
    </div>
    <ul tabindex="0"
      class="menu dropdown-content bg-base-100 rounded-box z-1 mt-4 p-2 shadow-sm">
      <li v-for="lang in localesList" :key="lang.value">
        <a @click="changeLocale(lang.value)"><dui-icon-flag :value="lang.country" width="24" /> {{ lang.title }}</a>
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
    country () {
      return LOCALES_COUNTRIES?.[this.locale]
    },
    localesList () {
      const result = []
      for (const locale of this.$i18n.availableLocales) {
        result.push({
          title: LOCALE_NAMES[locale],
          value: locale,
          country: LOCALES_COUNTRIES[locale],
        })
      }
      return result
    },
  },
  mounted () {
    this.$nextTick(() => {
      this.changeLocale(this.appStore.language)
    })
  },
  methods: {
    changeLocale (newLocale) {
      this.locale = newLocale
      this.$root.$i18n.locale = newLocale
      // this.appStore.setLanguage = newLocale
      this.$emit("locale-change", newLocale)
    },
  },
}
</script>
