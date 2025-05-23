<template>
  <div v-show="isRolling" id="dice-box" class="dice3d-canvas w-full h-full" />
  <div class="blurred">
    <header class="blurred-contrast p-2" :dark="isDark">
      <div class="flex">
        <!-- <h1 class="text-2xl md:text-4xl">Header</h1> -->
        <Icon icon="game-icons:tavern-sign" class="text-warning text-2xl md:text-4xl self-center" />
        <h1 class="flex-auto self-center text-primary-content text-xl md:text-2xl mx-2">
          {{ $t('Welcome to the OSR Tavern!') }}
        </h1>
        <theme-switcher @change="changeTheme" />
      </div>
    </header>

    <div class="my-5 w-full flex flex-col space-y-4 md:flex-row md:space-x-4 md:space-y-0">
      <main class="md:w-2/3 lg:w-3/4 px-5 py-40">
      </main>

      <aside class="md:w-1/3 lg:w-1/4 px-5 py-40">
        <div class="flex content-center">
          <dice-button formula="d4" faces="4" :disabled="isRolling" @click="roll('1d4')" />
          <dice-button formula="d6" faces="6" :disabled="isRolling" @click="roll('1d6')" />
          <dice-button formula="d8" faces="8" :disabled="isRolling" @click="roll('1d8')" />
          <dice-button formula="d10" faces="10" :disabled="isRolling" @click="roll('1d10')" />
          <dice-button formula="d12" faces="12" :disabled="isRolling" @click="roll('1d12')" />
          <dice-button formula="d20" faces="20" :disabled="isRolling" @click="roll('1d20')" />

          <div class="dropdown dropdown-end">
            <div tabindex="0" role="button" class="btn btn-xl text-primary-content btn-link m-1">
              <Icon icon="fluent:more-vertical-48-regular" />
            </div>
            <ul tabindex="0" class="blurred blurred-contrast dropdown-content menu rounded-box z-1 w-52 p-2 shadow-sm" :dark="isDark">
              <div class="flex">
                <dui-text-input v-model="formula" :label="$t('Dice formula')" :append-button="$t('Roll')" @click="rollFormula(formula)" />
              </div>
              <li v-for="f in favoriteFormula" :key="f">
                <button class="btn btn-small" @click="roll(f)">
                  {{ f }}
                </button>
              </li>
            </ul>
          </div>
        </div>

        <div class="pt-4">
          <history ref="history-panel"/>
        </div>
      </aside>

      <div class="toast toast-center toast-top">
        <div v-for="(notification, index) in notifications" :key="index" role="alert" :class="NOTIFICATION_CLASSES[notification.type]" class="flex">
          <span>{{ notification.message }}</span>
          <Icon icon="fluent:delete-48-regular" class="NOTIFICATION_CLASSES[notification.type]" @click.prevent="notifyStore.removeNotification(notification)"/>
        </div>
      </div>
    </div>

    <footer class="mt-auto p-2 flex">
      <h1 class="text-sm md:text-md text-primary-content">
        Copyright © {{ new Date().getFullYear() }} - All right reserved
      </h1>
    </footer>
  </div>
</template>

<script>
import _debounce from "lodash-es/debounce"

import { mapState, mapStores } from "pinia"

import DiceBox from "@3d-dice/dice-box-threejs"

import { useAppStore } from "@/stores"
import DiceButton from "@/components/DiceButton.vue"
import ThemeSwitcher from "@/components/ThemeSwitcher.vue"
import History from "@/components/History.vue"
import useNotifyStore, { NOTIFICATION_CLASSES, NOTIFICATION_TYPE_ERROR, NOTIFICATION_TYPE_INFO, NOTIFICATION_TYPE_SUCCESS, NOTIFICATION_TYPE_WARNING } from "./stores/notifications"

let box = null

export default {
  name: "Tavern",
  components: {
    "dice-button": DiceButton,
    "history": History,
    "theme-switcher": ThemeSwitcher,
  },
  emits: ["update:modelValue"],
  data () {
    return {
      NOTIFICATION_CLASSES,
      diceCanvasResizeHandler: null,
      error: null,
      formula: "1d100+1d10",
      favoriteFormula: [],
      isRolling: true, // Mandatory to initialise 3D context
    }
  },
  computed: {
    ...mapStores(useAppStore, useNotifyStore),
    ...mapState(useNotifyStore, ["notifications"]),
    isDark () {
      return this.appStore.themeConfig.dark
    },
  },
  beforeUnmount () {
    if (this.diceCanvasResizeHandler)
      window.removeEventListener("resize", this.diceCanvasResizeHandler)
  },
  async mounted () {
    this.$refs["history-panel"].add(await this.appStore.init())
    this.$refs["history-panel"].addInfo(this.$t("Welcome to the OSR Tavern!"))

    // Hook an event handler to capture window resizing and adjust virtual table height
    if (this.diceCanvasResizeHandler)
      window.removeEventListener("resize", this.diceCanvasResizeHandler)

    this.$nextTick(() => {
      this.setDiceCanvasSize()
      this.diceCanvasResizeHandler = window.addEventListener("resize", () => {
        this.setDiceCanvasSize()
      })
    })

    this.initDiceBox()
  },
  methods: {
    changeTheme () {
      // todo
    },
    clearDice () {
      box.clearDice()
      this.isRolling = false
    },
    initDiceBox () {
      this.isRolling = true

      box = new DiceBox("#dice-box", {
        framerate: (1/60),
        sounds: true,
        volume: 100,
        color_spotlight: 0xefdfd5,
        shadows: true,
        theme_surface: "default",
        sound_dieMaterial: "plastic",
        theme_customColorset: null,
        theme_colorset: "white", // see available colorsets in https://github.com/3d-dice/dice-box-threejs/blob/main/src/const/colorsets.js
        theme_texture: "noise", // see available textures in https://github.com/3d-dice/dice-box-threejs/blob/main/src/const/texturelist.js
        theme_material: "none", // "none" | "metal" | "wood" | "glass" | "plastic"
        gravity_multiplier: 400,
        light_intensity: 0.9,
        baseScale: 100,
        strength: 1, // toss strength of dice
        onRollComplete: (results) => {
          console.log("## [dice-box]", results)
          this.$refs["history-panel"].addDiceRoll(results)
          setTimeout(() => {
            this.isRolling = false
            //   box.clearDice()
          }, 250)
        },
      })
      box.initialize()
        .then(() => {
          this.isRolling = false
        })
        .catch((error) => {
          console.error(error)
          this.error = error
        })

      // await box.initialize()
      //   .then(() => {
      //     // give code sandbox a chance to load up
      //     setTimeout(() => {
      //       // box.roll("7d6@4,4,4,4,4,4,4") // predeterministic rolling capability
      //       box.roll("1d2+1d4+1d6+1d8+1d10+1d12+1d20+1d100")
      //     }, 1000)
      //   })
      //   .catch((e) => console.error(e))
      this.notifyStore.notify(this.$t("Welcome to the OSR Tavern!"), NOTIFICATION_TYPE_INFO)
      this.notifyStore.notify(this.$t("Welcome to the OSR Tavern!"), NOTIFICATION_TYPE_SUCCESS)
      this.notifyStore.notify(this.$t("Welcome to the OSR Tavern!"), NOTIFICATION_TYPE_WARNING)
      this.notifyStore.notify(this.$t("Welcome to the OSR Tavern!"), NOTIFICATION_TYPE_ERROR)
    },
    roll (formula) {
      this.isRolling = true
      this.$nextTick(() => {
        box.roll(formula)
      })
    },
    rollFormula (formula) {
      if (!this.favoriteFormula.includes(formula))
        this.favoriteFormula.unshift(formula)
      this.roll(formula)
    },
    setDiceCanvasSize: _debounce(function () {
      this.isRolling = true
      setTimeout(() => {
        box.setDimensions()
        this.isRolling = false
      }, 500)
    }, 200),
  },
}
</script>
