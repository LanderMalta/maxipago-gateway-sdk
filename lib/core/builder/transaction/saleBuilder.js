import xmlBuilder from '../../../utils/xmlBuilder'
import formatObject from '../../../utils/formatObject'
import saleModel from '../../model/transaction/saleModel'

export default function buildSaleXML(
  sale,
  mpAPIVersion,
  maxiPagoAuth,
  xmlOptions,
) {
  xmlOptions.explicitArray = true
  xmlOptions.attrNameProcessors = true
  const data = {}
  data.version = mpAPIVersion
  data.verification = maxiPagoAuth
  data.order = {
    sale: formatObject(sale, saleModel),
  }
  return xmlBuilder(xmlOptions).buildObject({
    'transaction-request': data,
  })
}
