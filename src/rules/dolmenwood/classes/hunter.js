import { COMBAT_APTITUDE_MARTIAL } from "@/rules/abilities"
import { ARMOUR_LIGHT, SHIELD_ANY, WEAPON_ANY } from "@/rules/equipments"
import { d8 } from "@/libs/dices"
import { CLASS_HUNTER, Class, HUNTER_PRIME_ABILITIES } from "."

export class Hunter extends Class {
  constructor () {
    const cls = {
      name: CLASS_HUNTER,
      primaryAbilities: HUNTER_PRIME_ABILITIES,
      hitDice: { name: "d8", roll: d8 },
      combatAptitude: COMBAT_APTITUDE_MARTIAL,
      armour: [ARMOUR_LIGHT, SHIELD_ANY],
      weapons: [WEAPON_ANY],
    }

    super(cls)
  }

  static get name () { return CLASS_HUNTER }
  static get primaryAbilities () { return HUNTER_PRIME_ABILITIES }
  static get forbiddenKindredTypes () { return [] }

  static canTrain (kindred) {
    if (this.forbiddenKindredTypes.includes(kindred.type))
      return false
    return true
  }
}
