import axios from 'axios'
import buildSaleXML from '../../builder/transaction/saleBuilder'
import formatMaxiPagoResponse from '../../../utils/formatMaxiPagoResponse'

export async function sale(
  sale,
  maxiPagoBaseURL,
  maxiPagoPostXMLEndpoint,
  maxiPagoApiVersion,
  maxiPagoAuth,
  maxiPagoHeaders,
  xmlOptions,
) {
  const saleXML = buildSaleXML(
    sale,
    maxiPagoApiVersion,
    maxiPagoAuth,
    xmlOptions,
  )
  const xmlResponse = await axios.post(
    maxiPagoBaseURL + maxiPagoPostXMLEndpoint,
    saleXML,
    maxiPagoHeaders,
  )
  const jsonResponse = formatMaxiPagoResponse(xmlResponse)
  return jsonResponse
}
