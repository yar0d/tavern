<template>
  <div class="tooltip tooltip-top" :data-tip="$t('Modifier')">
    <fieldset class="fieldset w-16">
      <legend v-if="label" class="fieldset-legend">{{ label }}</legend>
      <input v-model="value" type="text" class="input bg-base-100" required :placeholder="$t('Modifier')" list="modifiers" />
      <datalist id="modifiers">
        <option value="-4"></option>
        <option value="-3"></option>
        <option value="-2"></option>
        <option value="-1"></option>
        <option :value="NO_MODIFIER"></option>
        <option value="+1"></option>
        <option value="+2"></option>
        <option value="+3"></option>
        <option value="+4"></option>
      </datalist>
      <div v-if="!valid" role="alert" class="alert alert-error p-1">
        <span>{{ $t('Field must be a valid modifier, like: -1, 0 or +2!') }}</span>
      </div>
      <p v-else-if="help" class="label">{{ help }}</p>
    </fieldset>
    <button v-if="appendButton" class="btn btn-ghost btn-sm self-center" @click="click">
      {{ appendButton }}
    </button>
  </div>
</template>

<script>
import { NO_MODIFIER } from "../rules/modifiers"

export default {
  name: "TextInput",
  props: {
    appendButton: { type: String, default: "" },
    help: { type: String, default: "" },
    label: { type: String, default: "" },
    modelValue: { type: String, required: true },
  },
  emits: ["update:modelValue", "click"],
  data () {
    return {
      NO_MODIFIER,
    }
  },
  computed: {
    valid () {
      return this.value === NO_MODIFIER || /^[+-]?\d$/.test(this.value)
    },
    value: {
      get () {
        return this.modelValue
      },
      set (value) {
        const v = isNaN(value) ? 0 : (value > 0 ? `+${value}` : value)
        this.$emit("update:modelValue", v || 0)
      },
    },
  },
  methods: {
    click (...args) {
      this.$emit("click", ...args)
    },
  },
}
</script>
