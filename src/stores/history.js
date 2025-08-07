import { defineStore } from "pinia"

import _forEach from "lodash-es/forEach"
import _isArray from "lodash-es/isArray"
import _isObject from "lodash-es/isObject"

export const TYPE_DICE = "dice"

export const useHistoryStore = defineStore("history", {
  state: () => ({
    items: [],
  }),
  getters: {
    history: (state) => state.items,
  },
  actions: {
    add (items, attributes = {}) {
      _forEach(_isArray(items) ? items : [items], item => {
        let line
        if (_isObject(item)) line={ ...item, ...attributes }
        else line = { text: item, ...attributes }
        line.timestamp = new Date()
        this.history.unshift(line)
      })
    },
    addDiceRoll (results) {
      this.add(results, { text: this.$t("Rolled {notation}= {total}", { ...results }), type: TYPE_DICE })
    },
    addInfo (items) {
      this.add(items, { info: true })
    },
  },
})

export default useHistoryStore
