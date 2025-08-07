<template>
  <!-- name of each tab group should be unique -->
  <div class="tabs tabs-lift">
    <label class="tab">
      <input type="radio" :name="`pc-tab-${uuid}`" :checked="!pc?.uuid" />
      <dui-icon icon="game-icons:rule-book" class="text-2xl mx-1" />
      {{ $t('Rules') }}
    </label>
    <div class="tab-content bg-base-100 border-base-300 p-6">
      <div v-for="(rs, name) in RULESETS" :key="rs.id" class="card bg-base-100 w-auto shadow-sm" >
        <div class="card-body">
          <div class="card-title flex bg-accent">
            {{ name }}
          </div>

          <div v-if="rs.extensions?.length">
            <div>Extensiom {{ rs.extensions.id }}</div>
          </div>
        </div>
      </div>
    </div>

    <label class="tab" :class="pc?.uuid ? 'tab-disabled' : ''">
      <input type="radio" :name="`pc-tab-${uuid}`" :checked="pc?.uuid" />
      <dui-icon icon="game-icons:character" class="text-2xl mx-1" />
      {{ $t('Character') }}
    </label>
    <div class="tab-content bg-base-100 border-base-300 p-6">
      <div class="card bg-base-100 w-auto shadow-sm" :class="sheetClass">
        <figure class="relative">
          <img src="/assets/sheets/cs-1-en-US.png" />
        </figure>
        <div class="card-body transparent absolute top-0 left-0">
          <div class="card-title flex bg-accent">
            <dui-icon-close @click="close" />
            {{ pc?.name }} {{ pc?.surname }}

            <a v-if="ruleset.srd" :href="ruleset.srd" target="_srd">
              ({{ $t('SRD') }})
            </a>
          </div>

          <div class="glass text-primary">
            <pre>{{ pc }}</pre>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { randomUUID } from "@/libs/utilities"
import { RULESETS } from "../rules"

export default {
  name: "CharacterSheet",
  props: {},
  emits: ["update:modelValue"],
  data () {
    return {
      RULESETS,
      pc: null,
      ruleset: null,
      uuid: randomUUID,
    }
  },
  computed: {
    sheetClass () {
      return ""
    },
  },
  watch: {},
  created () {},
  beforeUnmount () {},
  mounted () {},
  methods: {
    close () {
      // TODO
    },
    create () {
      // const pc = new CharacterDolmenwood()
      // pc.rollFullFledged({ chooseBestClass: true })
    },
  },
}
</script>
