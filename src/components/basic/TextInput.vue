<template>
  <fieldset class="fieldset">
    <legend v-if="label" class="fieldset-legend">{{ label }}</legend>
    <input v-model="value" type="text" class="input" :placeholder="placeholder" />
    <p v-if="help" class="label">{{ help }}</p>
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
  },
}
</script>
