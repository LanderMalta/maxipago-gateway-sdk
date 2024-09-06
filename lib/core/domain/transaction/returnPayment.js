import axios from 'axios'
import buildReturnPaymentXML from '../../builder/transaction/returnPaymentBuilder'
import formatMaxiPagoResponse from '../../../utils/formatMaxiPagoResponse'

export async function returnPayment(
  _return,
  maxiPagoBaseURL,
  maxiPagoPostXMLEndpoint,
  maxiPagoApiVersion,
  maxiPagoAuth,
  maxiPagoHeaders,
  xmlOptions,
) {
  const returnPaymentXML = buildReturnPaymentXML(
    _return,
    maxiPagoApiVersion,
    maxiPagoAuth,
    xmlOptions,
  )
  const xmlResponse = await axios.post(
    maxiPagoBaseURL + maxiPagoPostXMLEndpoint,
    returnPaymentXML,
    maxiPagoHeaders,
  )
  const jsonResponse = formatMaxiPagoResponse(xmlResponse)
  return jsonResponse
}
