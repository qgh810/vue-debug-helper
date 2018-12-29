
export const getWindowSize = function () {
  const {innerWidth, innerHeight} = window
  return {width: innerWidth, height: innerHeight}
}

export const clone = function (obj) {
  return JSON.parse(JSON.stringify(obj))
}
