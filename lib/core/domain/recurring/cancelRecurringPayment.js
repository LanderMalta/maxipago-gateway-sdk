import axios from 'axios'
import buildCancelRecurringPaymentXML from '../../builder/recurring/cancelRecurringPaymentBuilder'
import formatMaxiPagoResponse from '../../../utils/formatMaxiPagoResponse'

export async function cancelRecurringPayment(
  recurringPayment,
  maxiPagoBaseURL,
  maxiPagoPostApiEndpoint,
  maxiPagoAuth,
  maxiPagoHeaders,
  xmlOptions,
) {
  const cancelRecurringPaymentXML = buildCancelRecurringPaymentXML(
    recurringPayment,
    maxiPagoAuth,
    xmlOptions,
  )
  const xmlResponse = await axios.post(
    maxiPagoBaseURL + maxiPagoPostApiEndpoint,
    cancelRecurringPaymentXML,
    maxiPagoHeaders,
  )
  const jsonResponse = formatMaxiPagoResponse(xmlResponse)
  return jsonResponse
}
