import { COMBAT_APTITUDE_SEMI_MARTIAL } from "@/rules/abilities"
import { ARMOUR_ANY, SHIELD_ANY, WEAPON_ANY } from "@/rules/equipments"
import { KINDRED_TYPE_DEMI_FEY, KINDRED_TYPE_FEY } from "@/rules/dolmenwood/kindreds"
import { d6 } from "@/libs/dices"
import { CLASS_CLERIC, CLERIC_PRIME_ABILITIES, Class } from "."

export class Cleric extends Class {
  constructor () {
    const cls = {
      name: CLASS_CLERIC,
      primaryAbilities: CLERIC_PRIME_ABILITIES,
      hitDice: { name: "d6", roll: d6 },
      combatAptitude: COMBAT_APTITUDE_SEMI_MARTIAL,
      armour: [ARMOUR_ANY, SHIELD_ANY],
      weapons: [WEAPON_ANY],
    }

    super(cls)
  }

  static get name () { return CLASS_CLERIC }
  static get primaryAbilities () { return CLERIC_PRIME_ABILITIES }
  static get forbiddenKindredTypes () { return [KINDRED_TYPE_FEY, KINDRED_TYPE_DEMI_FEY] }

  static canTrain (kindred) {
    if (this.forbiddenKindredTypes.includes(kindred.type))
      return false
    return true
  }
}
