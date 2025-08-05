import { COMBAT_APTITUDE_SEMI_MARTIAL } from "@/libs/abilities"
import { ARMOUR_LIGHT, SHIELD_NONE, WEAPON_MEDIUM, WEAPON_SMALL } from "@/libs/equipments"
import { d4 } from "@/libs/dices"
import { CLASS_THIEF, Class, THIEF_PRIME_ABILITIES } from "."

export class Thief extends Class {
  constructor () {
    const cls = {
      name: CLASS_THIEF,
      primaryAbilities: THIEF_PRIME_ABILITIES,
      hitDice: { name: "d4", roll: d4 },
      combatAptitude: COMBAT_APTITUDE_SEMI_MARTIAL,
      armour: [ARMOUR_LIGHT, SHIELD_NONE],
      weapons: [WEAPON_SMALL, WEAPON_MEDIUM],
    }

    super(cls)
  }

  static get name () { return CLASS_THIEF }
  static get primaryAbilities () { return THIEF_PRIME_ABILITIES }
  static get forbiddenKindredTypes () { return [] }

  static canTrain (kindred) {
    if (this.forbiddenKindredTypes.includes(kindred.type))
      return false
    return true
  }
}
