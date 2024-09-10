import convert from 'xml-js'

function nativeType(value) {
  const nValue = Number(value)
  if (!isNaN(nValue)) {
    return nValue
  }
  const bValue = value.toLowerCase()
  if (bValue === 'true') {
    return true
  } else if (bValue === 'false') {
    return false
  }
  return value
}

const removeJsonTextAttribute = function (value, parentElement) {
  const keyNo = Object.keys(parentElement._parent).length
  const keyName = Object.keys(parentElement._parent)[keyNo - 1]
  parentElement._parent[keyName] = nativeType(value)
}

const xmlConvertOptions = {
  compact: true,
  trim: true,
  ignoreDeclaration: true,
  ignoreInstruction: true,
  ignoreAttributes: true,
  ignoreComment: true,
  ignoreCdata: true,
  ignoreDoctype: true,
  textFn: removeJsonTextAttribute,
}

export default function formatMaxiPagoResponse(xmlResponse) {
  let xml = xmlResponse.data
  xml = xml.replace('rapi-response', 'response')
  xml = xml.replace('rapi-response', 'response')
  xml = xml.replace('api-response', 'response')
  xml = xml.replace('api-response', 'response')
  xml = xml.replace('transaction-response', 'response')
  xml = xml.replace('transaction-response', 'response')

  const jsonResponse = JSON.parse(convert.xml2json(xml, xmlConvertOptions))
  if (typeof jsonResponse.response != 'undefined') {
    jsonResponse.response.errorXML = xml
    return jsonResponse.response
  } else {
    const jsonResponse = JSON.parse(convert.xml2json(xml, xmlConvertOptions))
    jsonResponse.errorXML = xml
    return jsonResponse
  }
}
