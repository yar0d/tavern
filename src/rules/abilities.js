import _ from "lodash-es"

import { d6, roll3d6, rollExplode } from "@/libs/dices"
import { getAbilityModifier } from "@/rules/modifiers"

export const STR = "STR"
export const INT = "INT"
export const WIS = "WIS"
export const DEX = "DEX"
export const CON = "CON"
export const CHA = "CHA"

export const ABILITIES = [STR, INT, WIS, DEX, CON, CHA]

export const ABILITIES_NAMES = {
  [STR]: "Strength",
  [INT]: "Intelligence",
  [WIS]: "Wisdom",
  [DEX]: "Dexterity",
  [CON]: "Constitution",
  [CHA]: "Charisma",
}

export const ABILITY_CHECK_SUCCESS_SCORE = 4

export const COMBAT_APTITUDE_MARTIAL = "Martial"
export const COMBAT_APTITUDE_NON_MARTIAL = "Non-martial"
export const COMBAT_APTITUDE_SEMI_MARTIAL = "Semi-martial"

export class Ability {
  constructor (abbr) {
    this.abbr = abbr
    this.score = { max: 0 }
    this.modifier = 0
    this.score.current = this.score.max
    this.updateModifier()
  }

  check () {
    return d6() + this.modifier >= ABILITY_CHECK_SUCCESS_SCORE
  }

  roll ({ hero } = {}) {
    // Hero roll 4d6 and keep the 3 best score.
    const roll = hero ? rollExplode(4, 6, 3) : roll3d6()
    this.setMax(roll)
  }

  setMax (score) {
    this.score = { max: score }
    this.updateModifier()
  }

  updateModifier () {
    this.modifier = getAbilityModifier(this.score.max)
  }

  dump () {
    console.log(JSON.stringify(this))
  }
}

export function createAbilities () {
  const result = {}
  _.forEach(ABILITIES,(abbr) => {
    result[abbr] = new Ability(abbr)
  })
  return result
}

export default {
  STR,
  INT,
  WIS,
  DEX,
  CON,
  CHA,
  ABILITY_CHECK_SUCCESS_SCORE,
  ABILITIES,
  ABILITIES_NAMES,
  Ability,
  COMBAT_APTITUDE_MARTIAL,
  COMBAT_APTITUDE_NON_MARTIAL,
  COMBAT_APTITUDE_SEMI_MARTIAL,
  createAbilities,
  getAbilityModifier,
}
