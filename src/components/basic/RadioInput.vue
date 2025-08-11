<template>
  <input v-bind="$attrs" type="radio" @input="onInput">
</template>

<script>
export default {
  name: "RadioInput",
  props: {
    modelValue: { type: [Number, String], required: true },
  },
  emits: ["update:modelValue"],
  data () {
    return {}
  },
  watch: {},
  created () {},
  beforeUnmount () {},
  mounted () {},
  methods: {
    onInput (event) {
      this.$emit("update:modelValue", event.target.value)
    },
  },
}
</script>
