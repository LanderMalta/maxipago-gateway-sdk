import xmlBuilder from '../../../utils/xmlBuilder'
import formatObject from '../../../utils/formatObject'
import zeroDollarModel from '../../model/card/zeroDollarModel'

export default function buildZeroDollarXML(
  zeroDollar,
  mpAPIVersion,
  maxiPagoAuth,
  xmlOptions,
) {
  const data = {}
  data.version = mpAPIVersion
  data.verification = maxiPagoAuth
  data.order = {
    zeroDollar: formatObject(zeroDollar, zeroDollarModel),
  }
  return xmlBuilder(xmlOptions).buildObject({
    'transaction-request': data,
  })
}
