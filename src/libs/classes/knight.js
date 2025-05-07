import { COMBAT_APTITUDE_MARTIAL } from "../abilities"
import { ARMOUR_HEAVY, ARMOUR_MEDIUM, SHIELD_ANY, WEAPON_MELEE } from "../equipments"
import { KINDRED_BREGGLE, KINDRED_HUMAN } from "../kindreds"
import { d8 } from "../dices"
import { CLASS_KNIGHT, Class, KNIGHT_PRIME_ABILITIES } from "."

export class Knight extends Class {
  constructor () {
    const cls = {
      name: CLASS_KNIGHT,
      primaryAbilities: KNIGHT_PRIME_ABILITIES,
      hitDice: { name: "d8", roll: d8 },
      combatAptitude: COMBAT_APTITUDE_MARTIAL,
      armour: [ARMOUR_HEAVY, ARMOUR_MEDIUM, SHIELD_ANY],
      weapons: [WEAPON_MELEE],
    }

    super(cls)
  }

  static get name () { return CLASS_KNIGHT }
  static get primaryAbilities () { return KNIGHT_PRIME_ABILITIES }
  static get forbiddenKindredTypes () { return [] }
  static get allowedKindreds () { return [KINDRED_BREGGLE, KINDRED_HUMAN] }

  static canTrain (kindred) {
    if (this.forbiddenKindredTypes.includes(kindred.type))
      return false
    if (!this.allowedKindreds.includes(kindred.kind))
      return false
    return true
  }
}
