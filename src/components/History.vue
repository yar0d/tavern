<template>
  <div class="card w-full">
    <div class="card-body">
      <h2 class="card-title">
        {{ $t('History') }}
        <dui-text-input v-model="filter" :placeholder="$t('Search...')" />

        <div class="ml-auto tooltip tooltip-top" :data-tip="expanded ? $t('Less details') : $t('More details')">
          <dui-icon :icon="expanded ? 'fluent:text-bullet-list-square-32-regular' : 'fluent:textbox-32-regular'" width="24" @click="expanded = !expanded" />
        </div>
      </h2>

      <template v-for="item in filteredHistory" :key="item.timestamp">
        <template v-if="item.text">
          <div tabindex="0" class="w-full collapse">
            <input v-if="item?.sets" v-model="expanded" type="checkbox" />
            <div class="collapse-title p-1 flex items-center">
              <div class="text-sm">{{ $d(item.timestamp, isBeforeToday(item.timestamp) ? 'long' : 'time') }}</div>
              <div :class="getStyles(item)" class="pl-1 font-bold">
                {{ item.text }}
              </div>
            </div>

            <div class="collapse-content p-1">
              <div v-if="item?.sets" class="">
                <div v-for="(set, index) in item.sets" :key="`set-${index}`">
                  <div v-for="(roll, idx) in set?.rolls" :key="`roll-${index}-${idx}`" class="mx-1 badge badge-outline badge-md overflow-hidden text-ellipsis">
                    {{ roll.value }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </template>
      </template>
    </div>
  </div>
</template>

<script>
import _ from "lodash-es"

import dates from "@/libs/dates"

import { mapState, mapStores } from "pinia"
import { useHistoryStore } from "@/stores/history"

export default {
  name: "History",
  data () {
    return {
      expanded: true,
      filter: "",
    }
  },
  computed: {
    ...mapStores(useHistoryStore),
    ...mapState(useHistoryStore, ["history"]),
    filteredHistory () {
      return this.filter ? _.filter(this.history, item => item?.text && item.text.toUpperCase().indexOf(this.filter.toUpperCase()) >= 0) : this.history
    },
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
