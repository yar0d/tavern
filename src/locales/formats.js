// Format from https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/NumberFormat
export const numberFormats = {
  "en-US": {
    currency: {
      style: "currency",
      currency: "USD",
      currencyDisplay: "symbol",
      notation: "standard",
    },
    decimal: {
      style: "decimal",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    },
    percent: {
      style: "percent",
      useGrouping: false,
    },
  },
  "fr-FR": {
    currency: {
      style: "currency",
      currency: "EUR",
      useGrouping: true,
      currencyDisplay: "symbol",
    },
    decimal: {
      style: "decimal",
      minimumSignificantDigits: 3,
      maximumSignificantDigits: 5,
    },
    percent: {
      style: "percent",
      useGrouping: false,
    },
  },
}

export const datetimeFormats = {
  "en-US": {
    short: {
      year: "numeric",
      month: "short",
      day: "numeric",
    },
    long: {
      year: "numeric",
      month: "short",
      day: "numeric",
      weekday: "short",
      hour: "numeric",
      minute: "numeric",
    },
    time: {
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
    },
  },
  "fr-FR": {
    short: {
      year: "numeric",
      month: "short",
      day: "numeric",
    },
    long: {
      year: "numeric",
      month: "short",
      day: "numeric",
      weekday: "short",
      hour: "numeric",
      minute: "numeric",
      hour12: false,
    },
    time: {
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
    },
  },
  // 'en-US': {
  //   startOfWeek: 0, // Sunday
  //   weekDaysFull: [0, 1, 2, 3, 4, 5, 6],
  //   weekDaysWork: [1, 2, 3, 4, 5],
  //   timeFormat: 'ampm',
  //   monthDayShortFormat: 'MM-DD'
  // },
  // 'fr-FR': {
  //   startOfWeek: 1, // Monday
  //   weekDaysFull: [1, 2, 3, 4, 5, 6, 0],
  //   weekDaysWork: [1, 2, 3, 4, 5],
  //   timeFormat: '24hr',
  //   monthDayShortFormat: 'DD/MM'
  // }
}

export const footToCm = function (foot) {
  return Math.round(30.48 * Number(foot))
}

export const poundToKg = function (pound) {
  return Math.round(0.45359237 * Number(pound))
}

export const HEIGHT = {
  "en-US": {
    convert: (value) => { return value },
  },
  "fr-FR": {
    convert: footToCm,
    unit: "cm",
  },
}

export const WEIGHT = {
  "en-US": {
    convert: (value) => { return value },
  },
  "fr-FR": {
    convert: poundToKg,
    unit: "kg",
  },
}

export default {
  HEIGHT,
  WEIGHT,
  footToCm,
  poundToKg,
  datetimeFormats,
  numberFormats,
}
