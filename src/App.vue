<template>
  <header class="bg-primary text-primary-content flex p-2">
    <Icon icon="game-icons:tavern-sign" class="text-warning text-2xl md:text-6xl self-center" />
    <h1 class="flex-auto self-center text-xl md:text-2xl mx-2">
      {{ $t('Welcome to the OSR Tavern!') }}
    </h1>
    <theme-switcher @change="changeTheme" />
  </header>

  <div class="w-full flex flex-col space-y-4 md:flex-row md:space-x-4 md:space-y-0">
    <main id="scene-container" class="bg-base-100 md:w-2/3 lg:w-3/4">
      <a href="https://vite.dev" target="_blank">
        <img src="/vite.svg" class="logo" alt="Vite logo" />
      </a>
      <a href="https://vuejs.org/" target="_blank">
        <img src="./assets/vue.svg" class="logo vue" alt="Vue logo" />
      </a>
    </main>

    <aside class="glass bg-base-200 md:w-1/3 lg:w-1/4 p-2 rounded-box shadow-md">
      <div class="flex">
        <dice-button formula="d4" faces="4" :disabled="isRolling" @click="roll('1d4')" />
        <dice-button formula="d6" faces="6" :disabled="isRolling" @click="roll('1d6')" />
        <dice-button formula="d8" faces="8" :disabled="isRolling" @click="roll('1d8')" />
        <dice-button formula="d10" faces="10" :disabled="isRolling" @click="roll('1d10')" />
        <dice-button formula="d12" faces="12" :disabled="isRolling" @click="roll('1d12')" />
        <dice-button formula="d20" faces="20" :disabled="isRolling" @click="roll('1d20')" />
        <button class="btn" @click="clearDice">
          {{ $t('Clear') }}
        </button>
      </div>

      Liste des PJ ouverts

      Liens vers les SRD
      - OSR
      - Dolmenwood

      Outils pour le SOLO
      - oracle
      - prise de notes markdown
      - gestion fichiers
      - générateurs à foison

      <div>
        <history ref="history-panel"/>
      </div>
    </aside>
  </div>

  <footer class="footer sm:footer-horizontal bg-neutral text-neutral-content items-center px-4">
    <aside class="grid-flow-col items-center">
      <Icon icon="material-symbols-light:tag" size="x-large" />
      <p>Copyright © {{ new Date().getFullYear() }} - All right reserved</p>
    </aside>
    <nav class="grid-flow-col gap-4 md:place-self-center md:justify-self-end">
      put social media links here
    </nav>
  </footer>
</template>

<script>
import _debounce from "lodash-es/debounce"

import { mapStores } from "pinia"

// import { setTheme } from "@tauri-apps/api/app"

import DiceBox from "@3d-dice/dice-box-threejs"

import { useAppStore } from "./stores"
import DiceButton from "./components/DiceButton.vue"
import ThemeSwitcher from "./components/ThemeSwitcher.vue"
import History from "./components/History.vue"

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
      diceCanvasResizeHandler: null,
      isRolling: false,
    }
  },
  computed: {
    ...mapStores(useAppStore),
  },
  beforeUnmount () {
    if (this.diceCanvasResizeHandler)
      window.removeEventListener("resize", this.diceCanvasResizeHandler)
  },
  async mounted () {
    this.$refs["history-panel"].add(await this.appStore.init())

    // Hook an event handler to capture window resizing and adjust virtual table height
    if (this.diceCanvasResizeHandler)
      window.removeEventListener("resize", this.diceCanvasResizeHandler)

    this.$nextTick(() => {
      this.setDiceCanvasSize()
      this.diceCanvasResizeHandler = window.addEventListener("resize", () => {
        this.setDiceCanvasSize()
      })
    })

    // dices3D.initialize("dice-canvas")
    box = new DiceBox("#scene-container", {
      framerate: (1/60),
      sounds: true,
      volume: 100,
      color_spotlight: 0xefdfd5,
      shadows: true,
      theme_surface: "default",
      sound_dieMaterial: "metal",
      theme_customColorset: null,
      theme_colorset: "white", // see available colorsets in https://github.com/3d-dice/dice-box-threejs/blob/main/src/const/colorsets.js
      theme_texture: "noise", // see available textures in https://github.com/3d-dice/dice-box-threejs/blob/main/src/const/texturelist.js
      theme_material: "none", // "none" | "metal" | "wood" | "glass" | "plastic"
      gravity_multiplier: 400,
      light_intensity: 0.9,
      baseScale: 100,
      strength: 1, // toss strength of dice
      onRollComplete: (results) => {
        console.log("I've got results :>> ", results, JSON.stringify(results, undefined, 2))
        this.$refs["history-panel"].addDiceRoll(results)
        setTimeout(() => {
          this.isRolling = false
        //   box.clearDice()
        }, 500)
        /* Example:
          {
            "notation": "3d6",
            "sets": [
              {
                "num": 3,
                "type": "d6",
                "sides": 6,
                "rolls": [{
                  "type": "d6",
                  "sides": 6,
                  "id": 0,
                  "value": 5,
                  "label": "5",
                  "reason": "natural"
                }, {
                  "type": "d6",
                  "sides": 6,
                  "id": 1,
                  "value": 6,
                  "label": "6",
                  "reason": "natural"
                }, {
                  "type": "d6",
                  "sides": 6,
                  "id": 2,
                  "value": 3,
                  "label": "3",
                  "reason": "natural"
                }],
                "total": 14
              }
            ],
            "modifier": 0,
            "total": 14
          }
        */
      },
    })
    await box.initialize()
    // await box.initialize()
    //   .then(() => {
    //     // give code sandbox a chance to load up
    //     setTimeout(() => {
    //       // box.roll("7d6@4,4,4,4,4,4,4") // predeterministic rolling capability
    //       box.roll("1d2+1d4+1d6+1d8+1d10+1d12+1d20+1d100")
    //     }, 1000)
    //   })
    //   .catch((e) => console.error(e))

    this.$refs["history-panel"].addInfo(this.$t("Welcome to the OSR Tavern!"))
  },
  methods: {
    changeTheme () {
      // todo
    },
    clearDice () {
      this.isRolling = false
      box.clearDice()
    },
    roll (formula) {
      if (this.isRolling) box.add(formula)
      else box.roll(formula)
      this.isRolling = true
    },
    setDiceCanvasSize: _debounce(function () {
      box.updateConfig()
    }, 200),
  },
}
</script>
