<template>
  <fieldset class="fieldset">
    <legend v-if="label" class="fieldset-legend">{{ label }}</legend>
    <input v-model="value" type="text" class="input bg-base-100" required :placeholder="placeholder" list="modifiers" />
    <datalist id="modifiers">
      <option value="-4"></option>
      <option value="-3"></option>
      <option value="-2"></option>
      <option value="-1"></option>
      <option value="0"></option>
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
</template>

<script>
export default {
  name: "TextInput",
  props: {
    appendButton: { type: String, default: "" },
    help: { type: String, default: "" },
    label: { type: String, default: "" },
    placeholder: { type: String, default: "" },
    modelValue: { type: String, required: true },
  },
  emits: ["update:modelValue", "click"],
  data () {
    return {}
  },
  computed: {
    valid () {
      return /^[+-]?\d$/.test(this.value)
      // return /[+-]?\d{1, 1}/g.test(this.value)
    },
    value: {
      get () {
        return this.modelValue || "0"
      },
      set (value) {
        const v = value > 0 ? `+${value}` : value
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
