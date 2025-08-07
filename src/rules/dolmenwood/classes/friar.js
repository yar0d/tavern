import { COMBAT_APTITUDE_NON_MARTIAL } from "@/rules/abilities"
import { ARMOUR_NONE, WEAPON_CLUB, WEAPON_DAGGER, WEAPON_SLING } from "@/rules/equipments"
import { KINDRED_TYPE_DEMI_FEY, KINDRED_TYPE_FEY } from "@/rules/dolmenwood/kindreds"
import { d4 } from "@/libs/dices"
import { CLASS_FRIAR, Class, FRIAR_PRIME_ABILITIES } from "."

export class Friar extends Class {
  constructor () {
    const cls = {
      name: CLASS_FRIAR,
      primaryAbilities: FRIAR_PRIME_ABILITIES,
      hitDice: { name: "d4", roll: d4 },
      combatAptitude: COMBAT_APTITUDE_NON_MARTIAL,
      armour: [ARMOUR_NONE],
      weapons: [WEAPON_DAGGER, WEAPON_CLUB, WEAPON_SLING],
    }

    super(cls)
  }

  static get name () { return CLASS_FRIAR }
  static get primaryAbilities () { return FRIAR_PRIME_ABILITIES }
  static get forbiddenKindredTypes () { return [KINDRED_TYPE_FEY, KINDRED_TYPE_DEMI_FEY] }

  static canTrain (kindred) {
    if (this.forbiddenKindredTypes.includes(kindred.type))
      return false
    return true
  }
}
