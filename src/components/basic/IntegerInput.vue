<template>
  <div class="tooltip tooltip-top" :data-tip="$t('Number of dices')">
    <fieldset class="fieldset flex items-center">
      <legend v-if="label" class="fieldset-legend">{{ label }}</legend>
      <dui-icon v-long-press="decrease" icon="fluent:subtract-circle-32-regular" width="24" @click="decrease" />
      <input v-model.number="value" type="text" class="input text-right" :class="width" :placeholder="placeholder" @keypress="filterInput" @keyup.up="increase" @keyup.down="decrease" @paste="paste" />
      <dui-icon v-long-press="increase" icon="fluent:add-square-32-regular" width="24" @click="increase" />
      <p v-if="help" class="label">{{ help }}</p>
    </fieldset>
  </div>
</template>

<script>
import _ from "lodash-es"

import { DELAY_THROTTLING, normalizeDecimalNumber, REGEXP_NUMBER } from "../../libs/ux"

export default {
  name: "IntegerInput",
  props: {
    disabled: { type: Boolean, default: false },
    help: { type: String, default: "" },
    label: { type: String, default: "" },
    max: { type: Number, default: Infinity },
    min: { type: Number, default: -Infinity },
    modelValue: { type: [Number, String], required: true },
    placeholder: { type: String, default: "" },
    step: { type: Number, default: 1 },
    width: { type: String, default: "w-16" },
  },
  emits: ["update:modelValue", "click"],
  data () {
    return {}
  },
  computed: {
    increasable () {
      const num = this.value
      return Number.isNaN(num) || num < this.max
    },
    decreasable () {
      const num = this.value
      return Number.isNaN(num) || num > this.min
    },
    isDisabled () {
      return this.disabled || (!this.decreasable && !this.increasable)
    },
    value: {
      get () {
        return this.modelValue
      },
      set (value) {
        this.$emit("update:modelValue", value)
      },
    },
  },
  methods: {
    click (...args) {
      this.$emit("click", ...args)
    },
    decrease: _.throttle(function () {
      if (this.decreasable) {
        let value = String(this.value).replace(",", ".")

        if (Number.isNaN(value)) {
          value = this.min || 0
        }

        this.value = Math.min(this.max, Math.max(this.min, normalizeDecimalNumber(Number(value) - this.step)))
      }
    }, DELAY_THROTTLING),
    filterInput (inputEvent) {
      if (!inputEvent.target.value.length && inputEvent.key === "-") {
        return true
      }

      if (!Number.isInteger(Number(inputEvent.key))) {
        inputEvent.preventDefault() // Key is not allowed!
      }

      return true
    },
    increase: _.throttle(function () {
      if (this.increasable) {
        let value = String(this.value).replace(",", ".")

        if (Number.isNaN(value)) {
          value = this.max || 0
        }

        this.value = Math.min(this.max, Math.max(this.min, normalizeDecimalNumber(Number(value) + this.step)))
      }
    }, DELAY_THROTTLING),
    paste (event) {
      const clipboardData = event.clipboardData || window.clipboardData
      if (clipboardData && !REGEXP_NUMBER.test(clipboardData.getData("text"))) {
        event.preventDefault()
      }
    },
    sanitize (value) {
      const sanitizedValue = String(value).replace(",", ".")
      let newValue = Math.trunc(Number(sanitizedValue))

      if (this.min <= this.max) {
        newValue = Math.min(this.max, Math.max(this.min, newValue))
      }
      return newValue
    },
  },
}
</script>
