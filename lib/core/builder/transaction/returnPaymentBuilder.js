import xmlBuilder from '../../../utils/xmlBuilder'
import formatObject from '../../../utils/formatObject'
import returnPaymentModel from '../../model/transaction/returnPaymentModel'

export default function buildReturnPaymentXML(
  _return,
  mpAPIVersion,
  maxiPagoAuth,
  xmlOptions,
) {
  const data = {}
  data.version = mpAPIVersion
  data.verification = maxiPagoAuth
  data.order = {
    return: formatObject(_return, returnPaymentModel),
  }
  return xmlBuilder(xmlOptions).buildObject({
    'transaction-request': data,
  })
}
