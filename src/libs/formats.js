export const asSigned = function (number) {
  return number > 0 ? `+${number}` : `${number}`
}

export default {
  asSigned,
}
