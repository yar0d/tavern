import _ from "lodash-es"

import { createAbilities } from "@/libs/abilities"
import { roll3d6, rollFromArray } from "@/libs/dices"

import { CLASS_BARD, CLASS_CLERIC, CLASS_ENCHANTER, CLASS_FIGHTER, CLASS_FRIAR, CLASS_HUNTER, CLASS_KNIGHT, CLASS_MAGICIAN, CLASS_THIEF } from "@/libs/dolmenwood/classes"
import { Bard } from "@/libs/dolmenwood/classes/bard"
import { Cleric } from "@/libs/dolmenwood/classes/cleric"
import { Enchanter } from "@/libs/dolmenwood/classes/enchanter"
import { Fighter } from "@/libs/dolmenwood/classes/fighter"
import { Friar } from "@/libs/dolmenwood/classes/friar"
import { Hunter } from "@/libs/dolmenwood/classes/hunter"
import { Knight } from "@/libs/dolmenwood/classes/knight"
import { Magician } from "@/libs/dolmenwood/classes/magician"
import { Thief } from "@/libs/dolmenwood/classes/thief"

import { KINDRED_BREGGLE, KINDRED_ELF, KINDRED_GRIMALKIN, KINDRED_HUMAN, KINDRED_MOSSLING, KINDRED_WOODGRUE, Kindred } from "@/libs/dolmenwood/kindreds"
import { Breggle } from "@/libs/dolmenwood/kindreds/breggle"
import { Elf } from "@/libs/dolmenwood/kindreds/elf"
import { Grimalkin } from "@/libs/dolmenwood/kindreds/grimalkin"
import { Human } from "@/libs/dolmenwood/kindreds/human"
import { Mossling } from "@/libs/dolmenwood/kindreds/mossling"
import { Woodgrue } from "@/libs/dolmenwood/kindreds/woodgrue"

import { Class } from "@/libs/dolmenwood/classes"
import { CLASSES } from "@/libs/dolmenwood/classes/all"
import { randomDate } from "@/libs/dolmenwood/calendar"
import { KINDRED_TYPE_FEY } from "./kindreds"
import { getMoonSign } from "./calendar"

let _$t = function (...args) { return args }

export function register (app) {
  _$t = app.$t
}

export class Character {
  constructor () {
    this.uuid = `PC_${crypto.randomUUID()}`
    this.name = ""
    this.surname = ""
    this.birthday = null
    this.moonSign = null
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
    _.forEach(this.abilities,(ability) => {
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

  rollClass ({ allowed, xpModifiers, chooseBestClass }) {
    if (chooseBestClass) {
      let best = -Infinity
      let bestClass = []
      _.forEach(xpModifiers,(classXPMod, className) => {
        if (classXPMod > best && allowed[className]) {
          best = classXPMod
          bestClass = [className]
        }
        else if (classXPMod === best && allowed[className]) {
          best = classXPMod
          if (classXPMod === best)
            bestClass.push(className)
          else bestClass = [className]
        }
      })
      console.log("## Best class choice(s):", xpModifiers, bestClass)
      this.setClass(rollFromArray(bestClass))
      this.rollHitPoints(true) // Reroll 1 or 2
    }
    else {
      this.setClass(Class.rollforKindred(this.kindred.kind))
      this.rollHitPoints(true) // Reroll 1 or 2
    }
  }

  rollHitPoints (reroll1or2) {
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

  rollKindred () {
    const kindred = Kindred.roll()
    this.setKindred(kindred)
    this.setName(this.kindred.rollName())
  }

  rollFullFledged ({ chooseBestClass = false } = {}) {
    this.roll()
    this.rollKindred(this)

    this.birthday = randomDate()
    if (this.kindred.type!==KINDRED_TYPE_FEY)
      this.moonSign = getMoonSign(this.birthday.day, this.birthday.month.number)

    const allowed = {}
    const xpModifiers = {}
    _.forEach(CLASSES,(c) => {
      allowed[c.name] = c.canTrain(this.kindred)
      xpModifiers[c.name] = c.getPrimeAbilitiesXPModifier(this.abilities)
    })
    this.rollClass({ allowed, xpModifiers, chooseBestClass })

    return {
      pc: this,
      classes: {
        allowed,
        xpModifiers,
      },
    }
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

  setName ({ name, surname }) {
    if (name)
      this.name = _$t(name)
    if (surname)
      this.surname = _$t(surname)
  }

  dump () {
    console.log(`Character "${this.name}"`)
    this.kindred?.dump()
    _.forEach(this.abilities,(ability) => {
      ability.dump()
      ability.check()
    })
  }
}

export default Character
