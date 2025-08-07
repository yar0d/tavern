/* eslint-disable no-console */
export const LOCALE_DEFAULT = "en-US"
export const LOCALE_FALLBACK = "en-US"

export const LOCALES = ["en-US", "fr-FR"]

export const LOCALES_COUNTRIES = {
  "en-US": "us",
  "fr-FR": "fr",
}
export const LOCALE_DEFAULT_COUNTRY = LOCALES_COUNTRIES[LOCALE_DEFAULT]

export const LOCALE_NAMES = {
  "en-US": "English",
  "fr-FR": "Français",
}

const messages = {}

/*
* Loading messages from all locales
*/
const modules = import.meta.glob("./**/*.js")
for (const path in modules) {
  try {
    const mod = await modules[path]() // Load module
    if (LOCALES.some((locale) => path.endsWith(`_${locale}.js`))) {
      const locale = path.split("_").pop().substring(0, 5)
      if (!messages[locale]) messages[locale] = {}
      messages[locale] = { ...messages[locale], ...mod.default }
      if (import.meta.env !== "production")
        console.log(`[locale] messages from ${path} registered.`)
    }
  } catch (error) {
    console.error("[locale] Error", error, path)
  }
}

export default {
  ...messages,
}
