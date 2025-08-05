import { d12, rollFromTable } from "../../dices"

export const KINDRED_BREGGLE = "Breggle"
export const KINDRED_ELF = "Elf"
export const KINDRED_GRIMALKIN = "Grimalkin"
export const KINDRED_HUMAN = "Human"
export const KINDRED_MOSSLING = "Mossling"
export const KINDRED_WOODGRUE = "Woodgrue"

export const KINDRED_NAMES = [KINDRED_BREGGLE, KINDRED_ELF, KINDRED_GRIMALKIN, KINDRED_HUMAN, KINDRED_MOSSLING, KINDRED_WOODGRUE]

export const KINDRED_TYPE_DEMI_FEY = "Demi-fey"
export const KINDRED_TYPE_FEY = "Fey"
export const KINDRED_TYPE_MORTAL = "Mortal"

export const KINDRED_HEIGHT_SMALL = "Small"
export const KINDRED_HEIGHT_MEDIUM = "Medium"
export const KINDRED_HEIGHT_TALL = "Tall"

export const GENDER_FEMALE = "Female"
export const GENDER_MALE = "Male"
export const GENDER_UNISEX = "Unisex"

export const ADVENTURER_KINDREDS = {
  "1-3": KINDRED_BREGGLE,
  "4": KINDRED_ELF,
  "5": KINDRED_GRIMALKIN,
  "6-9": KINDRED_HUMAN,
  "10-11": KINDRED_MOSSLING,
  "12": KINDRED_WOODGRUE,
}

/*
* Kindred root
*/
export class Kindred {
  constructor ({ kind, type, gender, lifespan, age, height, heightType, weight, languages, background, trinket }) {
    this.kind = kind
    this.type = type
    this.gender = gender
    this.lifespan = lifespan
    this.age = age
    this.height = Math.round(height * 100) / 100
    this.heightType = heightType
    this.weight = Math.round(weight * 10) / 10
    this.languages = languages
    this.background = background
    this.trinket = trinket
  }

  static roll () {
    return rollFromTable(d12, ADVENTURER_KINDREDS)
  }

  dump () {
    console.log("Kindred:", JSON.stringify(this))
  }
}

export default {
  GENDER_FEMALE,
  GENDER_MALE,
  GENDER_UNISEX,
  KINDRED_BREGGLE,
  KINDRED_ELF,
  KINDRED_GRIMALKIN,
  KINDRED_MOSSLING,
  KINDRED_WOODGRUE,
  KINDRED_HUMAN,
  KINDRED_NAMES,
  Kindred,
}
