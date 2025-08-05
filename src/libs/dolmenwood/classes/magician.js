import { COMBAT_APTITUDE_NON_MARTIAL } from "@/libs/abilities"
import { ARMOUR_NONE, WEAPON_DAGGER, WEAPON_STAFF } from "@/libs/equipments"
import { d4 } from "@/libs/dices"
import { CLASS_MAGICIAN, Class, MAGICIAN_PRIME_ABILITIES } from "."

export class Magician extends Class {
  constructor () {
    const cls = {
      name: CLASS_MAGICIAN,
      primaryAbilities: MAGICIAN_PRIME_ABILITIES,
      hitDice: { name: "d4", roll: d4 },
      combatAptitude: COMBAT_APTITUDE_NON_MARTIAL,
      armour: [ARMOUR_NONE],
      weapons: [WEAPON_DAGGER, WEAPON_STAFF],
    }

    super(cls)
  }

  static get name () { return CLASS_MAGICIAN }
  static get primaryAbilities () { return MAGICIAN_PRIME_ABILITIES }
  static get forbiddenKindredTypes () { return [] }

  static canTrain (kindred) {
    if (this.forbiddenKindredTypes.includes(kindred.type))
      return false
    return true
  }
}
