export default function formatObject(object, reference) {
  const formatted = {}
  Object.keys(reference).forEach(function (key) {
    if (object.hasOwnProperty(key)) {
      if (object[key] instanceof Object) {
        formatted[key] = formatObject(object[key], reference[key])
      } else {
        formatted[key] = object[key]
      }
    }
  })
  return formatted
}
