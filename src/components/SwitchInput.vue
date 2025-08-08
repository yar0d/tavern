<template>
  <input v-bind="$attrs" type="checkbox" class="toggle" @input="onInput" />
</template>

<script>
export default {
  name: "SwitchInput",
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
