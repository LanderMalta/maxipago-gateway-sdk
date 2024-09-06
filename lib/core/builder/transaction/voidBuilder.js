import xmlBuilder from '../../../utils/xmlBuilder'
import formatObject from '../../../utils/formatObject'
import voidModel from '../../model/transaction/voidModel'

export default function buildVoidXML(
  _void,
  mpAPIVersion,
  maxiPagoAuth,
  xmlOptions,
) {
  const data = {}
  data.version = mpAPIVersion
  data.verification = maxiPagoAuth
  data.order = {
    void: formatObject(_void, voidModel),
  }
  return xmlBuilder(xmlOptions).buildObject({
    'transaction-request': data,
  })
}
