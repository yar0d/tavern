<template>
  <!-- name of each tab group should be unique -->
  <div class="tabs tabs-lift">
    <label class="tab">
      <input type="radio" :name="`pc-tab-${uuid}`" :checked="!pc?.uuid" />
      <dui-icon icon="game-icons:rule-book" class="text-2xl mx-1" />
      {{ $t('Rules') }}
    </label>
    <div class="tab-content border-base-300 p-6">
      <div role="alert" class="alert">
        <dui-icon icon="game-icons:rule-book" class="text-2xl stroke-info text-info" />
        <span>{{ $t('Choose the ruleset you want to use to create your character.') }}</span>
      </div>

      <div class="card-body">
        <div class="card-title">
          {{ $t('Rules') }}
        </div>

        <div class="join">
          <dui-radio-input v-for="(rs, name) in RULESETS" :key="rs.id" v-model="rulesetId" :value="name" name="radio-ruleset" class="join-item btn" :aria-label="name" />
        </div>
      </div>

      <div v-if="ruleset?.extensions?.length" class="ml-8">
        <div class="card-title">{{ $t('Extensions') }}</div>

        <div class="flex flex-wrap">
          <fieldset v-for="extension in ruleset.extensions" :key="extension.id" class="fieldset bg-base-100 border-base-300 rounded-box w-64 border p-4">
            <img v-if="extension.cover" :src="`/assets/covers/${extension.cover}`" class="w-40" />
            <label class="label">
              <input type="checkbox" :value="extension.id" class="toggle" />
              {{ extension.id }}
            </label>
          </fieldset>
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

            <a v-if="ruleset?.srd" :href="ruleset.srd" target="_srd">
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
      rulesetId: null,
      uuid: randomUUID,
    }
  },
  computed: {
    sheetClass () {
      return ""
    },
  },
  watch: {
    rulesetId (newValue, oldValue) {
      if (newValue!==oldValue)
        this.ruleset = RULESETS?.[newValue]
    },
  },
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
