import xmlBuilder from '../../../utils/xmlBuilder'
import formatObject from '../../../utils/formatObject'
import transactionQueryModel from '../../model/transaction/transactionQueryModel'

export default function buildTransactionQueryXML(
  transactionId,
  maxiPagoAuth,
  xmlOptions,
) {
  const data = {}
  data.verification = maxiPagoAuth
  data.command = 'transactionDetailReport'
  data.request = formatObject(transactionId, transactionQueryModel)
  return xmlBuilder(xmlOptions).buildObject({
    'rapi-request': data,
  })
}
