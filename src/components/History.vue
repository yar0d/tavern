<template>
  <div class="collapse collapse-arrow bg-base-100 border-base-300 border">
    <input v-model="expanded" type="checkbox" />
    <div class="collapse-title font-semibold">
      {{ $t('History') }}
      <span v-if="history?.length" class="badge badge-sm badge-primary ml-1">{{ history?.length }}</span>
      [TOUT] | [tirages]
    </div>

    <div class="collapse-content text-sm">
      <ul class="list">
        <li v-for="item in history" :key="item.timestamp" class="list-row p-0 px-1 pb-1 m-0">
          <div class="text-sm">{{ $d(item.timestamp, isBeforeToday(item.timestamp) ? 'long' : 'time') }}</div>
          <div :class="getStyles(item)">
            {{ item.text }}
          </div>
          <div v-if="item?.sets" class="flex">
            <template v-for="(set, index) in item.sets" :key="`set-${index}`">
              <div v-for="(roll, idx) in set?.rolls" :key="`roll-${index}-${idx}`" class="badge badge-outline badge-xs">
                {{ roll.value }}
              </div>
            </template>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import _forEach from "lodash-es/forEach"
import _isArray from "lodash-es/isArray"
import _isObject from "lodash-es/isObject"

import dates from "@/libs/dates"

export default {
  name: "History",
  data () {
    return {
      TYPE_DICE: "dice",
      expanded: true,
      history: [],
    }
  },
  methods: {
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
      this.add(results, { text: this.$t("Rolled {notation}= {total}", { ...results, type: this.TYPE_DICE }) })
    },
    addInfo (items) {
      this.add(items, { info: true })
    },
    getStyles (item) {
      if (item.error) {
        return "text-error"
      }
      if (item.warning) {
        return "text-warning"
      }
      if (item.success) {
        return "text-success"
      }
      if (item.info) {
        return "text-info"
      }
      return "text-base-500"
    },
    isBeforeToday ( date) {
      return dates.isBefore(date, dates.today())
    },
  },
}
</script>
