import _ from "lodash-es"

export function getAbilityModifier (score) {
  if (score <= 3)
    return -3
  else if (score <= 5)
    return -2
  else if (score <= 8)
    return -1
  else if (score <= 12)
    return 0
  else if (score <= 15)
    return +1
  else if (score <= 17)
    return +2
  else return +3 // 18 or more
}

export function getPrimeAbilitiesXPModifier (primeAbilities, abilities) {
  let countMinus20 = false
  let countMinus10 = false
  let count5 = 0
  let count10 = 0
  _.forEach(primeAbilities, (abbr) => {
    // in one or more Prime Abilities
    if (abilities[abbr].score.max <= 5)
      countMinus20 = true
    if (abilities[abbr].score.max <= 8)
      countMinus10 = true

    // in all Prime Abilities
    if (abilities[abbr].score.max >= 13 && abilities[abbr].score.max <= 15)
      count5++
    if (abilities[abbr].score.max >= 16) {
      count5++
      count10++
    }
  })
  if (countMinus20)
    return -20
  if (countMinus10)
    return -10
  if (count10 === primeAbilities.length)
    return 10
  if (count5 === primeAbilities.length)
    return 5
  return 0
}

export function getModifierColor (modifier) {
  if (modifier <= -3)
    return "modifier-minus-3"
  if (modifier === -2)
    return "modifier-minus-2"
  if (modifier === -1)
    return "modifier-minus-1"
  if (modifier === 0)
    return "modifier-none"
  if (modifier === 1)
    return "modifier-minus-plus-1"
  if (modifier === 2)
    return "modifier-minus-plus-2"
  return "modifier-minus-plus-3"
}

export function getXPModifierColor (modifier) {
  if (modifier === -20)
    return "modifier-minus-2"
  if (modifier === -10)
    return "modifier-minus-1"
  if (modifier === 10)
    return "modifier-minus-plus-2"
  if (modifier === 5)
    return "modifier-minus-plus-1"
  return "modifier-none"
}

export default {
  getAbilityModifier,
  getModifierColor,
  getPrimeAbilitiesXPModifier,
  getXPModifierColor,
}
