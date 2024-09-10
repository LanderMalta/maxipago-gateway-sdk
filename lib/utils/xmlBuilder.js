import xml2js from 'react-native-xml2js'

export default function xmlBuilder(options) {
  return new xml2js.Builder(options)
}
