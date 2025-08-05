<template>
  <dui-icon :icon="`flagpack:${value}`" v-bind="$attrs" />
</template>

<script>
export default {
  name: "IconFlag",
  props: {
    value: { type: String, required: true },
  },
}
</script>
