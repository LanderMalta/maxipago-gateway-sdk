import axios from 'axios'
import buildRecurringPaymentXML from '../../builder/recurring/recurringPaymentBuilder'
import formatMaxiPagoResponse from '../../../utils/formatMaxiPagoResponse'

export async function recurringPayment(
  recurringPayment,
  maxiPagoBaseURL,
  maxiPagoPostXMLEndpoint,
  maxiPagoApiVersion,
  maxiPagoAuth,
  maxiPagoHeaders,
  xmlOptions,
) {
  const recurringPaymentXML = buildRecurringPaymentXML(
    recurringPayment,
    maxiPagoApiVersion,
    maxiPagoAuth,
    xmlOptions,
  )
  const xmlResponse = await axios.post(
    maxiPagoBaseURL + maxiPagoPostXMLEndpoint,
    recurringPaymentXML,
    maxiPagoHeaders,
  )
  const jsonResponse = formatMaxiPagoResponse(xmlResponse)
  return jsonResponse
}
