import _ from "lodash-es"

import { roll, rollFromArray } from "@/libs/dices"

export const MONTH_TABLE = [
  { number: 1, name: "Grimvold", days: 30, season: "The onset of winter", wysendays: [] },
  { number: 2, name: "Lymewald", days: 28, season: "Deep winter", wysendays: ["Hanglemas", "Dyboll’s Day"] },
  { number: 3, name: "Haggryme", days: 30, season: "The fading of winter", wysendays: ["Yarl’s Day", "The Day of Virgins"] },
  { number: 4, name: "Symswald", days: 29, season: "The onset of spring", wysendays: ["Hopfast"] },
  { number: 5, name: "Harchment", days: 29, season: "High spring", wysendays: ["Smithing"] },
  { number: 6, name: "Iggwyld", days: 30, season: "The fading of spring", wysendays: ["Shortening", "Longshank’s Day"] },
  { number: 7, name: "Chysting", days: 31, season: "The onset of summer", wysendays: ["Bradging", "Copsewallow", "Chalice"] },
  { number: 8, name: "Lillipythe", days: 29, season: "High summer", wysendays: ["Old Dobey’s Day"] },
  { number: 9, name: "Haelhold", days: 28, season: "The fading of summer", wysendays: [] },
  { number: 10, name: "Reedwryme", days: 30, season: "The onset of autumn", wysendays: ["Shub’s Eve", "Druden Day"] },
  { number: 11, name: "Obthryme", days: 28, season: "Deep autumn", wysendays: [] },
  { number: 12, name: "Braghold", days: 30, season: "The fading of autumn", wysendays: ["The Day of Doors", "Dolmenday (the last day of the year)"] },
]

export const MOON_SIGN_BY_DATE = [
  { from: { day: 4, month: 1 }, to: { day: 17, month: 1 }, moon: "Grinning", phase: "W" },
  { from: { day: 18, month: 1 }, to: { day: 20, month: 1 }, moon: "Grinning", phase: "F" },
  { from: { day: 21, month: 1 }, to: { day: 3, month: 2 }, moon: "Grinning", phase: "w" },
  { from: { day: 4, month: 2 }, to: { day: 16, month: 2 }, moon: "Dead", phase: "W" },
  { from: { day: 17, month: 2 }, to: { day: 19, month: 2 }, moon: "Dead", phase: "F" },
  { from: { day: 20, month: 2 }, to: { day: 4, month: 2 }, moon: "Dead", phase: "W" },
  { from: { day: 5, month: 3 }, to: { day: 18, month: 3 }, moon: "Beast", phase: "W" },
  { from: { day: 19, month: 3 }, to: { day: 21, month: 3 }, moon: "Beast", phase: "F" },
  { from: { day: 22, month: 3 }, to: { day: 3, month: 4 }, moon: "Beast", phase: "w" },
  { from: { day: 4, month: 4 }, to: { day: 17, month: 4 }, moon: "Squamous", phase: "W" },
  { from: { day: 18, month: 4 }, to: { day: 20, month: 4 }, moon: "Squamous", phase: "F" },
  { from: { day: 21, month: 4 }, to: { day: 4, month: 5 }, moon: "Squamous", phase: "w" },
  { from: { day: 5, month: 5 }, to: { day: 17, month: 5 }, moon: "Knight", phase: "W" },
  { from: { day: 18, month: 5 }, to: { day: 20, month: 5 }, moon: "Knight", phase: "F" },
  { from: { day: 21, month: 5 }, to: { day: 4, month: 6 }, moon: "Knight", phase: "w" },
  { from: { day: 5, month: 6 }, to: { day: 18, month: 6 }, moon: "Rotting", phase: "W" },
  { from: { day: 19, month: 6 }, to: { day: 21, month: 6 }, moon: "Rotting", phase: "F" },
  { from: { day: 22, month: 6 }, to: { day: 3, month: 7 }, moon: "Rotting", phase: "w" },
  { from: { day: 4, month: 7 }, to: { day: 17, month: 7 }, moon: "Maiden", phase: "W" },
  { from: { day: 18, month: 7 }, to: { day: 20, month: 7 }, moon: "Maiden", phase: "F" },
  { from: { day: 21, month: 7 }, to: { day: 2, month: 8 }, moon: "Maiden", phase: "w" },
  { from: { day: 3, month: 8 }, to: { day: 15, month: 8 }, moon: "Witch", phase: "W" },
  { from: { day: 16, month: 8 }, to: { day: 18, month: 8 }, moon: "Witch", phase: "F" },
  { from: { day: 19, month: 8 }, to: { day: 2, month: 9 }, moon: "Witch", phase: "w" },
  { from: { day: 3, month: 9 }, to: { day: 16, month: 9 }, moon: "Robber", phase: "W" },
  { from: { day: 17, month: 9 }, to: { day: 19, month: 9 }, moon: "Robber", phase: "F" },
  { from: { day: 20, month: 9 }, to: { day: 3, month: 10 }, moon: "Robber", phase: "w" },
  { from: { day: 4, month: 10 }, to: { day: 17, month: 10 }, moon: "Goat", phase: "W" },
  { from: { day: 18, month: 10 }, to: { day: 20, month: 10 }, moon: "Goat", phase: "F" },
  { from: { day: 21, month: 10 }, to: { day: 3, month: 11 }, moon: "Goat", phase: "w" },
  { from: { day: 4, month: 11 }, to: { day: 17, month: 11 }, moon: "Narrow", phase: "W" },
  { from: { day: 18, month: 11 }, to: { day: 20, month: 11 }, moon: "Narrow", phase: "F" },
  { from: { day: 21, month: 11 }, to: { day: 4, month: 12 }, moon: "Narrow", phase: "w" },
  { from: { day: 5, month: 12 }, to: { day: 18, month: 12 }, moon: "Black", phase: "W" },
  { from: { day: 19, month: 12 }, to: { day: 21, month: 12 }, moon: "Black", phase: "F" },
  { from: { day: 22, month: 12 }, to: { day: 3, month: 1 }, moon: "Black", phase: "w" },
]

export const MOON_SIGN_EFFECTS = [
  { moon: "Grinning", phase: "W", effect: "There is a 50% chance that guardian undead will ignore the character’s presence. (Though they act normally if the character provokes them.)"},
  { moon: "Grinning", phase: "F", effect: "+1 bonus to saving throws against the powers of undead monsters."},
  { moon: "Grinning", phase: "w", effect: "+1 bonus to attack rolls against undead monsters."},
  { moon: "Dead", phase: "W", effect: "+1 bonus to attack and damage rolls the round after killing a foe."},
  { moon: "Dead", phase: "F", effect: "If killed by non-magical means, the character returns to life in 1 turn with 1 hit point. Their CON and"},
  { moon: "WIS", phase: "are", effect: "permanently reduced by 50% (minimum 3). This supernatural ability to avoid death only take, effect once ever."},
  { moon: "Dead", phase: "w", effect: "Undead monsters attack all others in the party before attacking the character."},
  { moon: "Beast", phase: "W", effect: "+1 reaction bonus when interacting with dogs and horses."},
  { moon: "Beast", phase: "F", effect: "Wild animals attack all others in the party before attacking the character."},
  { moon: "Beast", phase: "w", effect: "+1 bonus to attack rolls against wolves and bears."},
  { moon: "Squamous", phase: "W", effect: "If the character is afflicted by poison, its effects are delayed by one turn."},
  { moon: "Squamous", phase: "F", effect: "+2 bonus to saving throws against the breath attacks and magical powers of wyrms and dragons."},
  { moon: "Squamous", phase: "w", effect: "+1 bonus to attack rolls against serpents and wyrms."},
  { moon: "Knight’s", phase: "W", effect: "+1 reaction bonus when interacting with nobles."},
  { moon: "Knight’s", phase: "F", effect: "+1 AC bonus against metal weapons."},
  { moon: "Knight’s", phase: "w", effect: "In melee with knights or soldiers, the character acts first on a tied initiative, as if they had won initiative."},
  { moon: "Rotting", phase: "W", effect: "+1 reaction bonus when interacting with sentient fungi."},
  { moon: "Rotting", phase: "F", effect: "+2 bonus to AC against attacks by fungal monsters."},
  { moon: "Rotting", phase: "w", effect: "In the character’s presence, fungal monsters suffer a –1 penalty to attacks and damage."},
  { moon: "Maiden’s", phase: "W", effect: "+1 reaction bonus when interacting with demi-fey."},
  { moon: "Maiden’s", phase: "F", effect: "+2 bonus to saving throws against charms and glamours."},
  { moon: "Maiden’s", phase: "w", effect: "+1 bonus to attack and damage rolls against shape-changers and those cloaked with illusions."},
  { moon: "Witch’s", phase: "W", effect: "When the character receives healing magic, the number of hit points they gain is increased by one."},
  { moon: "Witch’s", phase: "F", effect: "+1 bonus to saving throws against divine magic."},
  { moon: "Witch’s", phase: "w", effect: "+1 bonus to attack rolls against witches and divine spell casters."},
  { moon: "Robber’s", phase: "W", effect: "+1 reaction bonus when interacting with Chaotic persons."},
  { moon: "Robber’s", phase: "F", effect: "+1 bonus to AC against attacks by Chaotic persons."},
  { moon: "Robber’s", phase: "w", effect: "+1 bonus to attack rolls against Chaotic persons."},
  { moon: "Goat", phase: "W", effect: "+1 reaction bonus when interacting with goatfolk."},
  { moon: "Goat", phase: "F", effect: "Goatfolk attack all others in the party before attacking the character."},
  { moon: "Goat", phase: "w", effect: "+1 bonus to attack rolls against goatfolk."},
  { moon: "Narrow", phase: "W", effect: "+1 reaction bonus when interacting with fairies, but suffer a –1 penalty to all saves against fairy magic."},
  { moon: "Narrow", phase: "F", effect: "If the character is afflicted by a curse or geas, there is a 1-in-4 chance of the caster also being affected by their own magic."},
  { moon: "Narrow", phase: "w", effect: "+1 bonus to attack rolls against fairies and demi-fey."},
  { moon: "Black", phase: "W", effect: "Chance of detecting secret doors when searching increased by 1-in-6."},
  { moon: "Black", phase: "F", effect: "+2 bonus to AC and saving throw when surprised."},
  { moon: "Black", phase: "w", effect: "+2 bonus to saving throws versus illusions or glamours."},
]

export const MOON_PHASE = {
  "W": "Waxing", // 🌒
  "F": "Full", // 🌕
  "w": "waning", // 🌘
}

export function randomDate () {
  const month = rollFromArray(MONTH_TABLE)
  const day = roll(`1d${month.days}`)
  return {
    day,
    month,
  }
}

export function getMoonSign (day, month) {
  let i = 0
  let moonSign
  while (!moonSign && i < MOON_SIGN_BY_DATE.length - 1){
    if (MOON_SIGN_BY_DATE[i].from.day <= day && MOON_SIGN_BY_DATE[i].from.month === month
      && MOON_SIGN_BY_DATE[i].to.day >= day && (MOON_SIGN_BY_DATE[i].to.month === month || MOON_SIGN_BY_DATE[i].to.month === month + 1)
    ){
      moonSign = { ...MOON_SIGN_BY_DATE[i] }
    }

    i++
  }

  return moonSign ? _.find(MOON_SIGN_EFFECTS, { moon: moonSign.moon, phase: moonSign.phase }) : null
}