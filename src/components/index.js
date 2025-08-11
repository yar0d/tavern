/* eslint-disable no-console */
/*
* This will automatically register vue components with file names beginning with COMPONENT_PREFIX
*
* Usage:
* import dui from '@/components/index'
* dui.register(app)
*
*/

import kebabCase from "lodash-es/kebabCase"

import registerDirectives from "./directives"

export const COMPONENT_PREFIX = "dui" // Daisy UI

export default {
  COMPONENT_PREFIX,
  register: async (app) => {
    // Directives
    registerDirectives(app)

    const modules = import.meta.glob("./**/*.vue")
    if (import.meta.env !== "production")
      console.log(`[${COMPONENT_PREFIX}] Registering ${Object.keys(modules).length} components...`)

    for (const path in modules) {
      try {
        const mod = await modules[path]() // Load module
        const tmpName = path.split("/").pop()
        const componentName = `${COMPONENT_PREFIX}-${kebabCase(tmpName.replace(/^\.\//, "").replace(/\.\w+$/, ""))}`
        app.component(componentName, mod.default || mod) // Registering component
        if (import.meta.env !== "production")
          console.log(`[${COMPONENT_PREFIX}] Component «${componentName}» from ${path} registered.`)
      } catch (error) {
        console.error(`[${COMPONENT_PREFIX}] Component error`, error, path)
      }
    }
  },
}
