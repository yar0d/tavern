import _ from "lodash"

import { createAbilities } from "./abilities"

import { CLASS_BARD, CLASS_CLERIC, CLASS_ENCHANTER, CLASS_FIGHTER, CLASS_FRIAR, CLASS_HUNTER, CLASS_KNIGHT, CLASS_MAGICIAN, CLASS_THIEF } from "./classes"
import { Bard } from "./classes/bard"
import { Cleric } from "./classes/cleric"
import { Enchanter } from "./classes/enchanter"
import { Fighter } from "./classes/fighter"
import { Friar } from "./classes/friar"
import { Hunter } from "./classes/hunter"
import { Knight } from "./classes/knight"
import { Magician } from "./classes/magician"
import { Thief } from "./classes/thief"

import { KINDRED_BREGGLE, KINDRED_ELF, KINDRED_GRIMALKIN, KINDRED_HUMAN, KINDRED_MOSSLING, KINDRED_WOODGRUE } from "./kindreds"
import { Breggle } from "./kindreds/breggle"
import { Elf } from "./kindreds/elf"
import { Grimalkin } from "./kindreds/grimalkin"
import { Human } from "./kindreds/human"
import { Mossling } from "./kindreds/mossling"
import { Woodgrue } from "./kindreds/woodgrue"
import { roll3d6 } from "./dices"

export class Character {
  constructor () {
    this.uuid = _.uniqueId("character_")
    this.name = ""
    this.surname = ""
    this.kindred = null
    this.class = null
    this.hitPoints = { current: 0, max: 0 }
    this.XP = 0
    this.AC = { current: 10, default: 10, modifier: 0 }
    this.speed = { current: 40, max: 40 }
    this.abilities = createAbilities()
  }

  get discardable () {
    let score8OrLower = 0
    let score6OrLower = 0
    _.forEach(this.abilities, (ability) => {
      if (ability.score.max <= 8)
        score8OrLower++
      if (ability.score.max <= 6)
        score6OrLower++
    })
    return score8OrLower === Object.keys(this.abilities).length || score6OrLower > 1
  }

  roll () {
    _.forEach(this.abilities, (ability) => {
      ability.setMax(roll3d6())
    })
  }

  rollHipPoints (reroll1or2) {
    if (!this.class)
      return
    this.hitPoints.max = this.class.hitDice.roll()

    if (reroll1or2) {
      while (this.hitPoints.max < 3) {
        this.hitPoints.max = this.class.hitDice.roll()
      }
    }

    this.hitPoints.current = this.hitPoints.max
  }

  setClass (classId) {
    let C
    switch (classId) {
      case CLASS_BARD:
        C = Bard
        break
      case CLASS_CLERIC:
        C = Cleric
        break
      case CLASS_ENCHANTER:
        C = Enchanter
        break
      case CLASS_FIGHTER:
        C = Fighter
        break
      case CLASS_FRIAR:
        C = Friar
        break
      case CLASS_HUNTER:
        C = Hunter
        break
      case CLASS_KNIGHT:
        C = Knight
        break
      case CLASS_MAGICIAN:
        C = Magician
        break
      case CLASS_THIEF:
        C = Thief
        break
    }

    if (!C.canTrain(this.kindred))
      return false
    // if (!C.forbiddenKindredTypes.includes(this.kindred.type)) return false
    // if (C.allowedKindreds && !C.allowedKindreds.includes(this.kindred.kind)) return false

    this.class = new C()
    return true
  }

  setKindred (kindred) {
    switch (kindred) {
      case KINDRED_BREGGLE:
        this.kindred = new Breggle()
        break
      case KINDRED_ELF:
        this.kindred = new Elf()
        break
      case KINDRED_GRIMALKIN:
        this.kindred = new Grimalkin()
        break
      case KINDRED_HUMAN:
        this.kindred = new Human()
        break
      case KINDRED_MOSSLING:
        this.kindred = new Mossling()
        break
      case KINDRED_WOODGRUE:
        this.kindred = new Woodgrue()
        break
    }
    console.log("## setKindred", kindred, this.kindred)
  }

  setName (app, { name, surname }) {
    if (name)
      this.name = app.$t(name)
    if (surname)
      this.surname = app.$t(surname)
  }

  dump () {
    console.log(`Character "${this.name}"`)
    this.kindred?.dump()
    _.forEach(this.abilities, (ability) => {
      ability.dump()
      ability.check()
    })
  }
}

export default Character
