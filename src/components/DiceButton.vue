<template>
  <div class="tooltip tooltip-bottom" :data-tip="`d${faces}`">
    <Icon :icon="`${icon}`" :class="cls" v-bind="$attrs" />
  </div>
</template>

<script>
export default {
  name: "DiceButton",
  props: {
    color: { type: String, default: "text-primary-content" },
    disabled: { type: Boolean, default: false },
    faces: { type: [Number, String], default: 9 },
    size: { type: String, default: "6xl" },
  },
  emits: ["roll-begin", "roll-end"],
  data () {
    return {}
  },
  computed: {
    cls () {
      let cls = `self-center text-${this.size}`
      if (this.disabled) cls += " text-neutral"
      else cls +=` clickable ${this.color}`
      return cls
    },
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
^