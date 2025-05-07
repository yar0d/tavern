export function isBefore (date1, date2) {
  return date1.getTime() < date2.getTime()
}

export function now () {
  return new Date()
}

export function today () {
  const result = new Date()
  result.setHours(0, 0, 0, 0)
  return result
}

export default {
  isBefore,
  now,
  today,
}