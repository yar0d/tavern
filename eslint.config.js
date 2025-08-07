import globals from "globals"
import js from "@eslint/js"
import pluginVue from "eslint-plugin-vue"
import skipFormatting from "@vue/eslint-config-prettier/skip-formatting"
import stylistic from "@stylistic/eslint-plugin-js"

export default [
  {
    name: "app/files-to-lint",
    files: ["**/*.{js,mjs,jsx,vue}"],
  },

  {
    name: "app/files-to-ignore",
    ignores: ["**/dist/**", "**/dist-ssr/**", "**/coverage/**"],
  },

  js.configs.recommended,
  {
    languageOptions: {
      ...js.configs.recommended.languageOptions,
      globals: { ...globals.browser },
    },
  },
  ...pluginVue.configs["flat/recommended"],
  skipFormatting,

  {
    // Specifying the file glob here, otherwise it might cause the vue plugin to handle non-vue files
    files: ["**/*.vue"],
    rules: {
      "vue/block-order": ["error", { order: ["template", "script", "style"] }],
      "vue/component-definition-name-casing": ["error", "PascalCase"],
      "vue/component-options-name-casing": ["error", "kebab-case"],
      "vue/custom-event-name-casing": ["error", "kebab-case"],
      "vue/first-attribute-linebreak": ["error", { "singleline": "beside", "multiline": "beside" }],
      "vue/html-indent": ["error", 2, { "attribute": 1, "baseIndent": 1, "closeBracket": 0, "alignAttributesVertically": false, "ignores": [] }],
      "vue/multi-word-component-names": ["off"],
      "vue/mustache-interpolation-spacing": ["error", "always"],
      "vue/no-multi-spaces": ["error", { "ignoreProperties": false }],
      "vue/no-spaces-around-equal-signs-in-attribute": ["error"],
      "vue/operator-linebreak": ["error", "before"],
      "vue/valid-v-slot": ["error", { "allowModifiers": true }],
    },
  }, {
    // Rules specific to locales
    files: ["**/*_en-US.js", "**/*_fr-FR.js"],
    plugins: { stylistic },
    rules: {
      "stylistic/quotes": ["warn", "double", { avoidEscape: true }],
      "stylistic/quote-props": ["error", "consistent", { keywords: true, numbers: true, unnecessary: true }],
    },
  }, {
    // All other JS files will use general rules
    // files: ["src/**/*.js"],
    plugins: { stylistic },
    rules: {
      "stylistic/arrow-spacing": "error",
      "indent": ["error", 2, { "SwitchCase": 1, "flatTernaryExpressions": false }],
      "no-console": ["warn", { allow: ["warn", "error"] }],
      "no-template-curly-in-string": "error",
      "no-useless-concat": "error",
      "prefer-const": ["error", { "destructuring": "any", "ignoreReadBeforeAssign": false }],
      "prefer-template": "error",
      "stylistic/comma-dangle": ["error", "always-multiline"],
      "stylistic/comma-spacing": ["error", { "before": false, "after": true }],
      "stylistic/key-spacing": ["error", { "mode": "strict" }],
      "stylistic/no-multi-spaces": ["error", { ignoreEOLComments: false }],
      "stylistic/no-multiple-empty-lines": ["error", { "max": 1, "maxEOF": 1 }],
      "stylistic/object-curly-spacing": ["error", "always", { "arraysInObjects": true, "objectsInObjects": true }],
      "stylistic/operator-linebreak": ["error", "before"],
      "stylistic/padded-blocks": ["error", "never"],
      "stylistic/quote-props": ["error", "consistent", { keywords: true, numbers: true, unnecessary: true }],
      "stylistic/quotes": ["warn", "double", { avoidEscape: true }],
      "stylistic/semi": ["error", "never"],
      "stylistic/space-before-function-paren": ["error", "always"],
      "template-curly-spacing": "error",
    },
  },
]
