export const REGEXP_NUMBER = /^-?(?:\d+|\d+\.\d+|\.\d+)(?:e[-+]?\d+)?$/i

export const REGEXP_DECIMALS = /\.\d*(?:0|9){10}\d*$/

export function normalizeDecimalNumber (value, times = 100000000000) {
  return REGEXP_DECIMALS.test(value) ? (Math.round(value * times) / times) : value
}

export const DELAY_THROTTLING = 75 // milliseconds