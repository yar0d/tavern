import { CHA, CON, DEX, INT, STR, WIS } from "@/libs/abilities"
import { d20, rollFromTable } from "@/libs/dices"
import { KINDRED_BREGGLE, KINDRED_ELF, KINDRED_GRIMALKIN, KINDRED_HUMAN, KINDRED_MOSSLING, KINDRED_WOODGRUE } from "@/libs/dolmenwood/kindreds"
import { getPrimeAbilitiesXPModifier } from "@/libs/modifiers"

export const CLASS_BARD = "Bard"
export const CLASS_CLERIC = "Cleric"
export const CLASS_ENCHANTER = "Enchanter"
export const CLASS_FIGHTER = "Fighter"
export const CLASS_FRIAR = "Friar"
export const CLASS_HUNTER = "Hunter"
export const CLASS_KNIGHT = "Knight"
export const CLASS_MAGICIAN = "Magician"
export const CLASS_THIEF = "Thief"

export const CLASSE_NAMES = [CLASS_BARD, CLASS_CLERIC, CLASS_ENCHANTER, CLASS_FIGHTER, CLASS_FRIAR, CLASS_HUNTER, CLASS_KNIGHT, CLASS_MAGICIAN, CLASS_THIEF]

export const BARD_PRIME_ABILITIES = [CHA, DEX]
export const CLERIC_PRIME_ABILITIES = [WIS]
export const ENCHANTER_PRIME_ABILITIES = [CHA, INT]
export const FIGHTER_PRIME_ABILITIES = [STR]
export const FRIAR_PRIME_ABILITIES = [INT, WIS]
export const HUNTER_PRIME_ABILITIES = [CON, DEX]
export const KNIGHT_PRIME_ABILITIES = [CHA, STR]
export const MAGICIAN_PRIME_ABILITIES = [INT]
export const THIEF_PRIME_ABILITIES = [DEX]

export const PRIME_ABILITIES = {
  [CLASS_BARD]: BARD_PRIME_ABILITIES,
  [CLASS_CLERIC]: CLERIC_PRIME_ABILITIES,
  [CLASS_ENCHANTER]: ENCHANTER_PRIME_ABILITIES,
  [CLASS_FIGHTER]: FIGHTER_PRIME_ABILITIES,
  [CLASS_FRIAR]: FRIAR_PRIME_ABILITIES,
  [CLASS_HUNTER]: HUNTER_PRIME_ABILITIES,
  [CLASS_KNIGHT]: KNIGHT_PRIME_ABILITIES,
  [CLASS_MAGICIAN]: MAGICIAN_PRIME_ABILITIES,
  [CLASS_THIEF]: THIEF_PRIME_ABILITIES,
}

export const ADVENTURER_CLASS_BY_KINDRED = {
  [KINDRED_BREGGLE]: {
    "1": CLASS_BARD,
    "2": CLASS_CLERIC,
    "3": CLASS_ENCHANTER,
    "4-8": CLASS_FIGHTER,
    "9": CLASS_FRIAR,
    "10-11": CLASS_HUNTER,
    "12-15": CLASS_KNIGHT,
    "16-18": CLASS_MAGICIAN,
    "19-20": CLASS_THIEF,
  },
  [KINDRED_ELF]: {
    "1-2": CLASS_BARD,
    "3-8": CLASS_ENCHANTER,
    "9-12": CLASS_FIGHTER,
    "13-15": CLASS_HUNTER,
    "16-17": CLASS_MAGICIAN,
    "19-20": CLASS_THIEF,
  },
  [KINDRED_GRIMALKIN]: {
    "1-4": CLASS_BARD,
    // "2": CLASS_CLERIC,
    "5-8": CLASS_ENCHANTER,
    "9-10": CLASS_FIGHTER,
    "11-14": CLASS_HUNTER,
    "15-15": CLASS_MAGICIAN,
    "17-20": CLASS_THIEF,
  },
  [KINDRED_HUMAN]: {
    "1-2": CLASS_BARD,
    "3-5": CLASS_CLERIC,
    "6": CLASS_ENCHANTER,
    "7-10": CLASS_FIGHTER,
    "11-12": CLASS_FRIAR,
    "13-14": CLASS_HUNTER,
    "15-16": CLASS_KNIGHT,
    "17-18": CLASS_MAGICIAN,
    "19-20": CLASS_THIEF,
  },
  [KINDRED_MOSSLING]: {
    "1-3": CLASS_BARD,
    "4": CLASS_ENCHANTER,
    "5-10": CLASS_FIGHTER,
    "11-16": CLASS_HUNTER,
    "17": CLASS_MAGICIAN,
    "18-20": CLASS_THIEF,
  },
  [KINDRED_WOODGRUE]: {
    "1-5": CLASS_BARD,
    "6-8": CLASS_ENCHANTER,
    "9-10": CLASS_FIGHTER,
    "11-14": CLASS_HUNTER,
    "15-16": CLASS_MAGICIAN,
    "17-20": CLASS_THIEF,
  },
}

/*
* Class root
*/
export class Class {
  constructor ({ name, primaryAbilities, hitDice, combatAptitude, armour, weapons, allowedKindreds }) {
    this.name = name
    this.primaryAbilities = primaryAbilities
    this.hitDice = hitDice
    this.combatAptitude = combatAptitude
    this.armour = armour || []
    this.weapons = weapons || []
    this.allowedKindreds = allowedKindreds || []
  }

  /**
   * Return a score if abilities are bad (score < 0) or good (score > 0) for this class
   * @param {object} abilities
   */
  static getPrimeAbilitiesXPModifier (abilities) {
    return getPrimeAbilitiesXPModifier(this.primaryAbilities, abilities)
  }

  static rollforKindred (kindred) {
    return rollFromTable(d20, ADVENTURER_CLASS_BY_KINDRED[kindred])
  }

  dump () {
    console.log("Class:", JSON.stringify(this))
  }
}

export function getPrimeAbilities (classId) {
  return PRIME_ABILITIES[classId]
}
