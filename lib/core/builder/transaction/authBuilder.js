import xmlBuilder from '../../../utils/xmlBuilder'
import formatObject from '../../../utils/formatObject'
import authModel from '../../model/transaction/authModel'

export default function buildAuthXML(
  auth,
  mpAPIVersion,
  maxiPagoAuth,
  xmlOptions,
) {
  const data = {}
  data.version = mpAPIVersion
  data.verification = maxiPagoAuth
  data.order = {
    auth: formatObject(auth, authModel),
  }
  return xmlBuilder(xmlOptions).buildObject({
    'transaction-request': data,
  })
}
