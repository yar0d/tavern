<template>
  <label class="swap swap-rotate">
    <!-- this hidden checkbox controls the state -->
    <input type="checkbox" value="dolmenwood-dark" class="theme-controller" />
    <Icon icon="material-symbols-light:light-mode-outline" class="swap-on h-10 w-10 fill-current" />
    <Icon icon="material-symbols-light:dark-mode-outline" class="swap-off h-10 w-10 fill-current" />
  </label>
</template>

<script>
export default {
  name: "ThemeSwitcher",
  data () {
    return {}
  },
  computed: {
  },
  watch: {},
  created () {},
  beforeUnmount () {},
  mounted () {},
  methods: {},
}
</script>
