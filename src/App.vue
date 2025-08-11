<template>
  <div v-show="isRolling" id="dice-box" class="dice3d-canvas w-screen h-dvh" />
  <div class="toast toast-center toast-top">
    <div v-for="(notification, index) in notifications" :key="index" class="opacity-90" role="alert" :class="NOTIFICATION_CLASSES[notification.type]">
      <span>{{ notification.message }}</span>
      <dui-icon icon="fluent:delete-32-regular" class="NOTIFICATION_CLASSES[notification.type]" @click.prevent="notifyStore.removeNotification(notification)"/>
    </div>
  </div>

  <div class="flex flex-col md:flex-row items-start md:justify-between p-2 h-screen">
    <!-- Left Section -->
    <div class="bg-base-300 text-base-content items-stretch flex flex-col md:w-1/3 blurred-contrast" dark>
      <div class="bg-base-100 text-base-content flex items-center text-xl flex ">
        <dui-icon icon="game-icons:tavern-sign" class="text-warning text-2xl mx-2" />
        <div class="mx-2 w-full capitalize font-bold">
          {{ $t(applicationName) }}
        </div>

        <!-- <dui-theme-switcher class="mx-1" @change="changeTheme" /> -->
        <dui-language-input />
      </div>

      <div class="w-full flex items-center">
        <dui-integer-input v-model="diceNumber" :min="1" :max="50" width="w-12" />
        <div class="px-1">
          <dui-dice-button faces="4" :disabled="!diceSystemReady || isRolling" @click="roll('d4')" />
          <dui-dice-button faces="6" :disabled="!diceSystemReady || isRolling" @click="roll('d6')" />
          <dui-dice-button faces="8" :disabled="!diceSystemReady || isRolling" @click="roll('d8')" />
          <dui-dice-button faces="10" :disabled="!diceSystemReady || isRolling" @click="roll('d10')" />
          <dui-dice-button faces="12" :disabled="!diceSystemReady || isRolling" @click="roll('d12')" />
          <dui-dice-button faces="20" :disabled="!diceSystemReady || isRolling" @click="roll('d20')" />
        </div>
        <dui-modifier-input v-model="diceModifier" />
      </div>

      <div class="items-start">
        <button class="btn btn-primary" @click="createCharacter">
          <dui-icon icon="game-icons:character" />
          {{ $t('Create a character') }}
        </button>
      </div>

      <dui-history />
    </div>

    <!-- Right Section (Image or Content) -->
    <div class="bg-base-300 ml-2 mt-2 md:mt-0 md:w-2/3 h-full">
      <main class="size-auto">
        <div class="flex h-full w-full justify-start gap-2 py-2">
          <a v-for="(pc, index) in characters" :key="index" :href="`#${pc.uuid}`" class="btn btn-xs">
            <dui-icon icon="game-icons:character" class="text-info" />
            ## {{ $t('{count} {item}', { value: index + 1, unit: $t('Character') }) }}
            {{ pc?.name || $t('{count} {item}', { value: index + 1, unit: $t('Character') }) }} {{ pc?.surname }}
          </a>
        </div>

        <div class="carousel rounded-box content-start mx-8">
          <template v-for="(pc, index) in characters" :key="index">
            <div class="carousel-item w-full">
              <dui-character-sheet :ref="`character-sheet-${index}`" />
            </div>
          </template>
        </div>
      </main>
    </div>
  </div>
</template>

<script>
import _debounce from "lodash-es/debounce"
import DiceBox from "@3d-dice/dice-box-threejs"

import { mapState, mapStores } from "pinia"
import { useAppStore } from "@/stores"
import { useHistoryStore } from "@/stores/history"
import useNotifyStore, { NOTIFICATION_CLASSES } from "@/stores/notifications"

import { register } from "@/rules"
import { NO_MODIFIER } from "./rules/modifiers"
import { rollCustom } from "./libs/dices"

let box = null

export default {
  name: "Tavern",
  emits: ["update:modelValue"],
  data () {
    return {
      NOTIFICATION_CLASSES,
      characters: [],
      dice3DAvailable: false,
      diceCanvasResizeHandler: null,
      diceModifier: NO_MODIFIER,
      diceNumber: 1,
      diceSystemReady: false,
      error: null,
      formula: "",
      favoriteFormula: [],
      isRolling: true, // Mandatory to initialise 3D context
    }
  },
  computed: {
    ...mapStores(useAppStore, useHistoryStore, useNotifyStore),
    ...mapState(useAppStore, ["applicationName", "themeIsDark"]),
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
    this.historyStore.add(await this.appStore.init(this))
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
      this.characters.push({})
    },
    historizeRoll (roll) {
      console.warn("## historizeRoll", roll)
      this.historyStore.addDiceRoll(roll)
      this.notifyStore.info(this.$t("Rolled {notation}= {total}", { ...roll }))
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
          this.historizeRoll(results)
        },
      })

      box.initialize()
        .then(() => {
          this.dice3DAvailable = true
          // eslint-disable-next-line no-console
          console.log("[dice] 3D initialized.")
        })
        .catch((error) => {
          this.dice3DAvailable = false
          console.error("[error] dice initialize", error)
          this.notifyStore.error(error)
        })
        .finally(() => {
          this.isRolling = false
          this.diceSystemReady = true
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
    roll (dice) {
      this.isRolling = true
      this.formula = `${this.diceNumber || 1}${dice}${this.diceModifier || ""}`

      if (this.dice3DAvailable) {
        // 3D is available :)
        this.$nextTick(() => {
          box.roll(this.formula)
            .catch ((error) => {
              console.error(`[error] roll ${dice}`, error)
              this.notifyStore.error(error)
            })
            .finally(() => {
              setTimeout(() => {this.isRolling = false}, 250)
            })
        })
      } else {
        // Fallback if no 3D is available
        this.historizeRoll(rollCustom(this.formula))
        setTimeout(() => {this.isRolling = false}, 250)
      }
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
