<template>
  <div v-show="isRolling" id="dice-box" class="dice3d-canvas w-screen h-dvh" />
  <div class="size-auto">
    <header :dark="isDark">
      <div class="navbar blurred-contrast shadow-sm px-4 text-base-content">
        <div class="flex-none">
          <div class="drawer drawer-end">
            <input id="app-drawer" type="checkbox" class="drawer-toggle" />
            <div class="drawer-content">
              <label for="app-drawer" class="text-2xl clickable">
                <dui-icon icon="fluent:line-horizontal-3-32-regular" class="text-2xl" />
              </label>
            </div>
            <div class="drawer-side">
              <label for="app-drawer" aria-label="close sidebar" class="drawer-overlay"></label>
              <div class="bg-base-300 text-base-content min-h-full w-auto max-w-1/2 p-4">
                <div class="p-1 opacity-75 bg-base-100">
                  <a href="https://oldschoolessentials.necroticgnome.com/srd/" target="_srd">
                    {{ $t('SRD OSE') }}
                  </a>
                  |
                  <a href="https://www.dolmenwood.necroticgnome.com/rules/" target="_srd">
                    {{ $t('SRD Dolmenwood') }}
                  </a>
                </div>

                <dui-history />
              </div>
            </div>
          </div>
        </div>

        <div class="flex-1 capitalize text-xl flex ">
          <dui-icon icon="game-icons:tavern-sign" class="text-warning text-2xl mx-2" />
          {{ applicationName }}
        </div>

        <div>
          <button class="btn" @click="createCharacter">{{ $t('Create a new character') }}</button>
        </div>

        <div v-if="diceBoxReady" class="flex-auto flex content-center">
          <dui-dice-button formula="d4" faces="4" :disabled="isRolling" @click="roll('1d4')" />
          <dui-dice-button formula="d6" faces="6" :disabled="isRolling" @click="roll('1d6')" />
          <dui-dice-button formula="d8" faces="8" :disabled="isRolling" @click="roll('1d8')" />
          <dui-dice-button formula="d10" faces="10" :disabled="isRolling" @click="roll('1d10')" />
          <dui-dice-button formula="d12" faces="12" :disabled="isRolling" @click="roll('1d12')" />
          <dui-dice-button formula="d20" faces="20" :disabled="isRolling" @click="roll('1d20')" />
          <dui-modifier-input v-model="modifier" />
        </div>

        <div class="ml-2 flex">
          <dui-theme-switcher class="mr-2" @change="changeTheme" />
          <dui-language-input />
        </div>
      </div>
    </header>

    <div class="my-5 w-full h-full flex flex-col space-y-4 md:flex-row md:space-x-4 md:space-y-0">
      <div class="toast toast-center toast-top">
        <div v-for="(notification, index) in notifications" :key="index" role="alert" :class="NOTIFICATION_CLASSES[notification.type]" class="flex">
          <span>{{ notification.message }}</span>
          <dui-icon icon="fluent:delete-32-regular" class="NOTIFICATION_CLASSES[notification.type]" @click.prevent="notifyStore.removeNotification(notification)"/>
        </div>
      </div>

      <main class="bg-base-100 size-auto">
        <div class="flex w-full justify-start gap-2 py-2">
          <a v-for="(pc, index) in characters" :key="index" :href="`#${pc.uuid}`" class="btn btn-xs">
            <dui-icon icon="game-icons:character" class="text-info" />
            {{ pc?.name }} {{ pc?.surname }}
          </a>
        </div>

        <div class="carousel rounded-box content-start mx-8">
          <template v-for="(pc, index) in characters" :key="index">
            <div :id="pc.uuid" class="carousel-item w-full">
              <dui-character-sheet :ref="`character-sheet-${index}`" :value="pc" />
            </div>
          </template>
        </div>

        <!-- <template v-for="(character, index) in characters" :key="index">
          <div class="collapse collapse-arrow bg-base-100 border border-base-300 debug">
            <input type="radio" name="character-accordion-2" :checked="index ? '' : 'checked'" />
            <div></div>
            <div class="collapse-content text-sm">
              <character-sheet :ref="`character-sheet-${index}`" :value="character" />
              {{ character }}
            </div>
          </div>
        </template> -->

      </main>
    </div>

    <!-- <footer class="mt-auto p-2 flex">
      <h1 class="text-sm md:text-md text-primary-content">
        Copyright © {{ new Date().getFullYear() }} - All right reserved
      </h1>
    </footer> -->
  </div>
</template>

<script>
import _debounce from "lodash-es/debounce"
import DiceBox from "@3d-dice/dice-box-threejs"

import { mapState, mapStores } from "pinia"
import { useAppStore } from "@/stores"
import { useHistoryStore } from "@/stores/history"
import useNotifyStore, { NOTIFICATION_CLASSES } from "@/stores/notifications"

import CharacterDolmenwood, { register } from "@/libs/dolmenwood/character"

let box = null

export default {
  name: "Tavern",
  emits: ["update:modelValue"],
  data () {
    return {
      NOTIFICATION_CLASSES,
      characters: [],
      diceBoxReady: false,
      diceCanvasResizeHandler: null,
      error: null,
      formula: "1d100+1d10",
      favoriteFormula: [],
      isRolling: true, // Mandatory to initialise 3D context
      modifier: "0",
    }
  },
  computed: {
    ...mapStores(useAppStore, useHistoryStore, useNotifyStore),
    ...mapState(useAppStore, ["applicationName"]),
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
    this.historyStore.add(await this.appStore.init())
    this.historyStore.addInfo(this.$t("Welcome to the OSR Tavern!"))

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
    register(this)
  },
  methods: {
    changeTheme () {
      // todo
    },
    clearDice () {
      box.clearDice()
      this.isRolling = false
    },
    createCharacter () {
      const pc = new CharacterDolmenwood()
      pc.rollFullFledged({ chooseBestClass: true })
      this.characters.push(pc)
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
        baseScale: 50,
        strength: 1, // toss strength of dice
        onRollComplete: (results) => {
          this.historyStore.addDiceRoll(results)
        },
      })

      box.initialize()
        // .then(() => {
        //   this.isRolling = false
        // })
        .catch((error) => {
          console.error("[error] dice initialize" , error)
          this.notifyStore.error(error)
        })
        .finally(() => {
          this.isRolling = false
          this.diceBoxReady = true
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
      this.notifyStore.info(this.$t("Welcome to the OSR Tavern!"))
    },
    roll (formula) {
      this.isRolling = true
      this.$nextTick(() => {
        box.roll(`${formula}${this.modifier || ""}`)
          .catch ((error) =>{
            console.error(`[error] roll ${formula}`, error)
            this.notifyStore.error(error)
          })
          .finally(() => {
            setTimeout(() => { this.isRolling = false }, 250)
          })
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
