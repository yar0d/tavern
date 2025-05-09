<template>
  <Icon :icon="`${icon}`" class="text-2xl md:text-6xl self-center" :class="disabled ? 'text-neutral' : `clickable ${color}`" v-bind="$attrs" />
</template>

<script>
export default {
  name: "DiceButton",
  props: {
    color: { type: String, default: "text-primary-content" },
    disabled: { type: Boolean, default: false },
    faces: { type: [Number, String], default: 9 },
    formula: { type: String, default: "d20" },
  },
  emits: ["roll-begin", "roll-end"],
  data () {
    return {}
  },
  computed: {
    icon () {
      switch (this.faces) {
        case 4, "4":
          return "game-icons:d4"
        case 6, "6":
          return "game-icons:perspective-dice-six-faces-six"
        case 8, "8":
          return "game-icons:dice-eight-faces-eight"
        case 10, "10":
          return "game-icons:d10"
        case 12, "12":
          return "game-icons:d12"
        case 20, "20":
          return "game-icons:dice-twenty-faces-twenty"
        default:
          return "game-icons:rolling-dice-cup"
      }
    },
  },
}
</script>
