const DEFAULT_DICE = { number: 1, faces: 6, modifier: 0, post: undefined }

function sum (dices) {
  let r = 0
  for (let i = 0; i < dices.length; i++) r += dices[i]
  return r
}

/*
* Accepts the following syntax:
*
* ```[b|w]<number><face>[modifier]```
*
* - b: *optional* keep the best dice.
* - w: *optional* keep the worst dice.
* - <number>: Number of dice to roll. If not choosing best or worst dice, the sum of dices will be the result.
* - <face>: Number of faces of the dice.
* - modifier: *optional* A number to add (+) or subtract (-) to the total. This modifier is applied only on total, not on each dice roll.
*
* **Example with w2d6-1**: Worst of two six-sided dices minus one. We roll «6» and «3», we keep «3» and subtract 1, so total is «2».
*
* ```js
* {
*   total: 2,
*   dices: [ 6, 3 ],
*   dice: 'w2d6-1',
*   number: 2,
*   faces: 6,
*   modifier: -1,
*   post: [Function: min]
* }
* ```
*
* **Attributes**:
* - total: The result of dices that were rolled.
* - dices: Array that contains each dice rolled.
* - dice: The dice that was asked for.
* - number: The number of dices that was rolled.
* - faces: The number of faces of the dices rolled.
* - modifier: The modifier that number of faces of the dices rolled.
* - post: This is the function that modify the total. It's called with destructured dices attributes. In our example, we called ```Math.min(6, 3)```.
*/
export function rollCustom (formula) {
  let opt = { ...DEFAULT_DICE }

  // Accept String: d4, 2D6+4, 2d6-1, d12, b3d10, w2d8
  if (typeof formula === "string") {
    let _dice = formula
    _dice = formula.toLowerCase()
    if (formula[0] === "b") {
      opt.post = Math.max
      _dice = formula.slice(1)
    }
    else if (formula[0] === "w") {
      opt.post = Math.min
      _dice = formula.slice(1)
    }
    const param = _dice.split("d") // 2d6+4 --> ['2', '6+4']
    opt.number = Number(param[0]) || 1 // d10 -> 1

    let faces = param[1].split("-") // 6+4 --> ['6+4']
    if (faces.length === 1)
      faces = param[1].split("+") // 6+4 --> ['6', '4']
    else opt.modifier = -Number(faces[1]) // -1
    if (faces.length === 1) {
      opt.faces = Number(param[1]) // 3d8 --> 8
      opt.modifier = 0
    }
    else {
      opt.faces = Number(faces[0]) // 6
      opt.modifier = opt.modifier || Number(faces[1]) // +4
    }
  }
  else {
    // Accept { Number number, Number face, Number modifier, Function post }
    opt = Object.assign(DEFAULT_DICE, formula)
  }

  const result = {
    total: 0,
    dices: [],
    formula,
    ...opt,
  }
  let d
  for (let i = 0; i < opt.number; i++) {
    d = Math.trunc(Math.random() * opt.faces + 1)
    result.total += d
    result.dices.push(d)
  }
  // Call post roll processing
  if (typeof opt.post === "function") {
    result.total = opt.post(...result.dices)
  }
  // Add modifier if any
  result.total += opt.modifier

  return result
}

/*
* Single dice roll. Return the Result as Number.
*/
export function d2 (callbackFn) {
  const r = Math.trunc(Math.random() * 2 + 1)
  if (callbackFn)
    callbackFn("d2", r)
  return r
}
export function d3 (callbackFn) {
  const r = Math.trunc(Math.random() * 3 + 1)
  if (callbackFn)
    callbackFn("d3", r)
  return r
}
export function d4 (callbackFn) {
  const r = Math.trunc(Math.random() * 4 + 1)
  if (callbackFn)
    callbackFn("d4", r)
  return r
}
export function d6 (callbackFn) {
  const r = Math.trunc(Math.random() * 6 + 1)
  if (callbackFn)
    callbackFn("d6", r)
  return r
}
export function d8 (callbackFn) {
  const r = Math.trunc(Math.random() * 8 + 1)
  if (callbackFn)
    callbackFn("d8", r)
  return r
}
export function d10 (callbackFn) {
  const r = Math.trunc(Math.random() * 10 + 1)
  if (callbackFn)
    callbackFn("d10", r)
  return r
}
export function d12 (callbackFn) {
  const r = Math.trunc(Math.random() * 12 + 1)
  if (callbackFn)
    callbackFn("d12", r)
  return r
}
export function d20 (callbackFn) {
  const r = Math.trunc(Math.random() * 20 + 1)
  if (callbackFn)
    callbackFn("d20", r)
  return r
}
export function d30 (callbackFn) {
  const r = Math.trunc(Math.random() * 30 + 1)
  if (callbackFn)
    callbackFn("d30", r)
  return r
}
export function d66 (callbackFn) {
  const r = d6() * 10 + d6()
  if (callbackFn)
    callbackFn("d66", r)
  return r
}
export function d100 (callbackFn) {
  const r = Math.trunc(Math.random() * 100 + 1)
  if (callbackFn)
    callbackFn("d100", r)
  return r
}

export function roll2d4 (callbackFn) {
  const r = d4() + d4()
  if (callbackFn)
    callbackFn("2d4", r)
  return r
}

export function roll3d4 (callbackFn) {
  const r = d4() + d4() + d4()
  if (callbackFn)
    callbackFn("3d4", r)
  return r
}

export function roll2d6 (callbackFn) {
  const r = d6() + d6()
  if (callbackFn)
    callbackFn("2d6", r)
  return r
}

export function roll3d6 (callbackFn) {
  const r = d6() + d6() + d6()
  if (callbackFn)
    callbackFn("3d6", r)
  return r
}

export function roll2d8 (callbackFn) {
  const r = d8() + d8()
  if (callbackFn)
    callbackFn("2d8", r)
  return r
}

export function roll3d8 (callbackFn) {
  const r = d8() + d8() + d8()
  if (callbackFn)
    callbackFn("3d8", r)
  return r
}

export function roll2d10 (callbackFn) {
  const r = d10() + d10()
  if (callbackFn)
    callbackFn("2d10", r)
  return r
}

export function roll3d10 (callbackFn) {
  const r = d10() + d10() + d10()
  if (callbackFn)
    callbackFn("3d10", r)
  return r
}

export function roll2d12 (callbackFn) {
  const r = d12() + d12()
  if (callbackFn)
    callbackFn("2d12", r)
  return r
}

export function roll3d12 (callbackFn) {
  const r = d12() + d12() + d12()
  if (callbackFn)
    callbackFn("3d12", r)
  return r
}

export function roll2d20 (callbackFn) {
  const r = d20() + d20()
  if (callbackFn)
    callbackFn("2d20", r)
  return r
}

export function roll3d20 (callbackFn) {
  const r = d20() + d20() + d20()
  if (callbackFn)
    callbackFn("3d20", r)
  return r
}

export function roll2d100 (callbackFn) {
  const r = d100() + d100()
  if (callbackFn)
    callbackFn("2d100", r)
  return r
}

export function roll3d100 (callbackFn) {
  const r = d100() + d100() + d100()
  if (callbackFn)
    callbackFn("3d100", r)
  return r
}

/**
 * This method return one random item from the given array.
 * @param {Array} array The table to get one item from.
 * @return {Mixed}  The item randomly chosen.
 */
export function rollFromArray (array, callbackFn) {
  const r = Math.trunc(Math.random() * array.length)
  if (callbackFn)
    callbackFn("rollFromArray", r, array[r], array)
  return array[r]
}

/**
 * Return a random entry from a table formatted like the following:
 * {
 *   '01': 'Actor',
 *   '02-05': 'Angler',
 *   ...
 *   '97-00': 'Woodcutter
 * }
 * @param {Function | string} dice   The dice {function} to roll, example d100. Or a {string} that is a formula to roll. See rollCustom for the syntax of the formula.
 * @param {object} table    The table object to get value from. It's an {Object} with items 'score-range: value`. The *score-range* is the score to compare to roll to.
 * @param {Function} callbackFn   A function to call when
 * @return {Mixed}   The value given by the roll.
 */
export function rollFromTable (dice, table, callbackFn) {
  let roll
  if (typeof dice === "function")
    roll = dice()
  else if (typeof dice === "string")
    roll = rollCustom(dice)
  else throw new Error("[rollFromTable] dice must be a function or string:", dice)

  const ranges = Object.keys(table)
  for (const range of ranges) {
    // Separator of score range ?
    let tmp
    if (range.includes("-"))
      tmp = range.split("-") // let's try a minus sign "01–02"
    else if (range.includes("–"))
      tmp = range.split("–") // let's try a dash "01–02"
    else if (range.includes("—"))
      tmp = range.split("—") // let's try an hyphen "01—02"
    // FUTURE: else if (range.includes(' ')) tmp = range.split(' ') // let's try a space "01 02"
    // FUTURE: else if (range.includes(',')) tmp = range.split(',') // let's try a coma "01,02"
    // FUTURE: else if (range.includes(':')) tmp = range.split(':') // let's try a colon "01:02"
    // FUTURE: else if (range.includes(';')) tmp = range.split(';') // let's try a semicolon "01;02"
    // FUTURE: else if (range.includes('...')) tmp = range.split('...') // let's try an ellipsis "01...02"
    // FUTURE: else if (range.includes('…')) tmp = range.split('…') // let's try a french ellipsis "01…02"
    // FUTURE: else if (range.includes('/')) tmp = range.split('/') // let's try a slash "01/02"
    else tmp = [range] // Not a range

    const from = Number(tmp[0])
    const to = tmp.length > 1 ? Number(tmp[1]) : from
    if (roll >= from && roll <= to) {
      if (callbackFn)
        callbackFn("rollFromTable", roll, range, table[range], table)
      return table[range]
    }
  }
}

/**
 *
 * @param {object} object The object to get one item from.
 * @param {Function} callbackFn A callback.
 * @return {Mixed}  The item randomly chosen.
 */
export function rollFromObject (object, callbackFn) {
  const keys = Object.keys(object)
  if (!keys?.length)
    return

  const r = Math.trunc(Math.random() * keys.length)
  if (callbackFn)
    callbackFn("rollFromObject", r, keys[r], object[keys[r]], object)
  return object[keys[r]]
}

/**
 * Return the highest results for multiples dice rolls.
 * @param {number} number The number of dices to roll.
 * @param {number} faces The number of faces for the dices.
 * @param {number} keep The number of highest result to keep.
 * @return {object} The total and the array of dices.
 */
export function rollExplode (number = 2, faces = 6, keep = 1, callbackFn) {
  const r = rollCustom(`${number}d${faces}`).dices
  r.sort((a, b) => {
    return b - a
  })
  if (callbackFn)
    callbackFn("rollExplode", r, sum(r.slice(0, keep)))
  return { total: sum(r.slice(0, keep)), dices: r }
}

/**
 * Return the lowest results for multiples dice rolls.
 * @param {number} number The number of dices to roll.
 * @param {number} faces The number of faces for the dices.
 * @param {number} keep The number of lowest result to keep.
 * @return {object} The total and the array of dices.
 */
export function rollImplode (number = 2, faces = 6, keep = 1, callbackFn) {
  let r = rollCustom(`${number}d${faces}`).dices
  r = r.sort((a, b) => {
    return a - b
  })
  if (callbackFn)
    callbackFn("rollImplode", r, sum(r.slice(0, keep)))
  return { total: sum(r.slice(0, keep)), dices: r }
}

/**
 * Return the highest dice rolled
 * @param {[number]} dices Array of dice result
 * @return The highest dice value
 */
export function highestOfDices (dices, callbackFn) {
  dices.sort((dice1, dice2) => {
    return dice2 - dice1
  })
  if (callbackFn)
    callbackFn("highestOfDices", dices[0], dices)
  return dices[0]
}

/**
 * Return the lowest dice rolled
 * @param {[number]} dices Array of dice result
 * @return The lowest dice value
 */
export function lowestOfDices (dices, callbackFn) {
  dices.sort((dice1, dice2) => {
    return dice1 - dice2
  })
  if (callbackFn)
    callbackFn("lowestOfDices", dices[0], dices)
  return dices[0]
}

/*
* By default roll() is for «2d6» dices.
*/
export function roll ({ number = 2, faces = 6, modifier = 0 } = {}, callbackFn) {
  let r = 0
  for (let i = 0; i < number; i++) {
    r += Math.trunc(Math.random() * faces + 1)
  }
  if (callbackFn)
    callbackFn(`${number}d${faces}${modifier === 0 ? "" : (modifier >= 0 ? `+${modifier}` : modifier)}`, r + modifier)
  return r + modifier
}

export class Dices {
  static get rollD2 () { return d2() }
  static get rollD3 () { return d3() }
  static get rollD4 () { return d4() }
  static get rollD6 () { return d6() }
  static get rollD8 () { return d8() }
  static get rollD10 () { return d10() }
  static get rollD12 () { return d12() }
  static get rollD20 () { return d20() }
  static get rollD30 () { return d30() }
  static get rollD66 () { return d66() }
  static get rollD100 () { return d100() }
  static get roll2D4 () { return roll2d4() }
  static get roll3D4 () { return roll3d4() }
  static get roll2D6 () { return roll2d6() }
  static get roll3D6 () { return roll3d6() }
  static get roll2D8 () { return roll2d8() }
  static get roll3D8 () { return roll3d8() }
  static get roll2D10 () { return roll2d10() }
  static get roll3D10 () { return roll3d10() }
  static get roll2D12 () { return roll2d12() }
  static get roll3D12 () { return roll3d12() }
  static get roll2D20 () { return roll2d20() }
  static get roll3D20 () { return roll3d20() }
  static get roll2D100 () { return roll2d100() }
  static get roll3D100 () { return roll3d100() }
  static get roll () { return roll() }
}

export default {
  Dices,
  d2,
  d3,
  d4,
  d6,
  d8,
  d10,
  d12,
  d20,
  d30,
  d66,
  d100,
  roll2d6,
  roll3d6,
  highestOfDices,
  lowestOfDices,
  rollCustom,
  rollExplode,
  rollFromTable,
  rollImplode,
  sum,
}
