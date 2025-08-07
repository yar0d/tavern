import { COMBAT_APTITUDE_SEMI_MARTIAL } from "@/rules/abilities"
import { ARMOUR_LIGHT, ARMOUR_MEDIUM, SHIELD_NONE, WEAPON_MEDIUM, WEAPON_SMALL } from "@/rules/equipments"
import { d6 } from "@/libs/dices"
import { BARD_PRIME_ABILITIES, CLASS_BARD, Class } from "."

export class Bard extends Class {
  constructor () {
    const cls = {
      name: CLASS_BARD,
      primaryAbilities: BARD_PRIME_ABILITIES,
      hitDice: { name: "d6", roll: d6 },
      combatAptitude: COMBAT_APTITUDE_SEMI_MARTIAL,
      armour: [ARMOUR_LIGHT, ARMOUR_MEDIUM, SHIELD_NONE],
      weapons: [WEAPON_SMALL, WEAPON_MEDIUM],
    }

    super(cls)
  }

  static get name () { return CLASS_BARD }
  static get primaryAbilities () { return BARD_PRIME_ABILITIES }
  static get forbiddenKindredTypes () { return [] }

  static canTrain (kindred) {
    if (this.forbiddenKindredTypes.includes(kindred.type))
      return false
    return true
  }
}
