import axios from 'axios'
import buildTransactionQueryXML from '../../builder/transaction/transactionQueryBuilder'
import formatMaxiPagoResponse from '../../../utils/formatMaxiPagoResponse'

export async function transactionQuery(
  query,
  maxiPagoBaseURL,
  maxiPagoReportsEndpoint,
  maxiPagoAuth,
  maxiPagoHeaders,
  xmlOptions,
) {
  const transactionQueryXML = buildTransactionQueryXML(
    query,
    maxiPagoAuth,
    xmlOptions,
  )
  const xmlResponse = await axios.post(
    maxiPagoBaseURL + maxiPagoReportsEndpoint,
    transactionQueryXML,
    maxiPagoHeaders,
  )
  const jsonResponse = formatMaxiPagoResponse(xmlResponse)
  return jsonResponse.result.records.record
}
