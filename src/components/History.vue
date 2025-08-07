<template>
  <div class="collapse collapse-arrow">
    <input v-model="expanded" type="checkbox" />
    <div class="collapse-title font-semibold">
      {{ $t('History') }}
      <span v-if="history?.length" class="badge badge-sm badge-primary ml-1">{{ history?.length }}</span>
      TODO: filter
    </div>

    <div class="collapse-content text-sm">
      <ul class="list">
        <li v-for="item in history" :key="item.timestamp" class="list-row p-0 px-1 pb-1 m-0">
          <template v-if="item.text">
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
          </template>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import dates from "@/libs/dates"

import { mapState, mapStores } from "pinia"
import { useHistoryStore } from "@/stores/history"

export default {
  name: "History",
  data () {
    return {
      expanded: true,
    }
  },
  computed: {
    ...mapStores(useHistoryStore),
    ...mapState(useHistoryStore, ["history"]),
  },
  methods: {
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
