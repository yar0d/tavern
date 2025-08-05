import { COMBAT_APTITUDE_MARTIAL } from "@/libs/abilities"
import { ARMOUR_ANY, SHIELD_ANY, WEAPON_ANY } from "@/libs/equipments"
import { d8 } from "@/libs/dices"
import { CLASS_FIGHTER, Class, FIGHTER_PRIME_ABILITIES } from "."

export class Fighter extends Class {
  constructor () {
    const cls = {
      name: CLASS_FIGHTER,
      primaryAbilities: FIGHTER_PRIME_ABILITIES,
      hitDice: { name: "d8", roll: d8 },
      combatAptitude: COMBAT_APTITUDE_MARTIAL,
      armour: [ARMOUR_ANY, SHIELD_ANY],
      weapons: [WEAPON_ANY],
    }

    super(cls)
  }

  static get name () { return CLASS_FIGHTER }
  static get primaryAbilities () { return FIGHTER_PRIME_ABILITIES }
  static get forbiddenKindredTypes () { return [] }

  static canTrain (kindred) {
    if (this.forbiddenKindredTypes.includes(kindred.type))
      return false
    return true
  }
}
