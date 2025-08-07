import { COMBAT_APTITUDE_SEMI_MARTIAL } from "@/rules/abilities"
import { ARMOUR_LIGHT, ARMOUR_MEDIUM, SHIELD_NONE, WEAPON_MEDIUM, WEAPON_SMALL } from "@/rules/equipments"
import { KINDRED_TYPE_MORTAL } from "@/rules/dolmenwood/kindreds"
import { d6 } from "@/libs/dices"
import { CLASS_ENCHANTER, Class, ENCHANTER_PRIME_ABILITIES } from "."

export class Enchanter extends Class {
  constructor () {
    const cls = {
      name: CLASS_ENCHANTER,
      primaryAbilities: ENCHANTER_PRIME_ABILITIES,
      hitDice: { name: "d6", roll: d6 },
      combatAptitude: COMBAT_APTITUDE_SEMI_MARTIAL,
      armour: [ARMOUR_LIGHT, ARMOUR_MEDIUM, SHIELD_NONE],
      weapons: [WEAPON_SMALL, WEAPON_MEDIUM],
    }

    super(cls)
  }

  static get name () { return CLASS_ENCHANTER }
  static get primaryAbilities () { return ENCHANTER_PRIME_ABILITIES }
  static get forbiddenKindredTypes () { return [KINDRED_TYPE_MORTAL] }

  static canTrain (kindred) {
    if (this.forbiddenKindredTypes.includes(kindred.type))
      return false
    return true
  }
}
