import axios from 'axios'
import buildUpdateRecurringPaymentXML from '../../builder/recurring/updateRecurringPaymentBuilder'
import formatMaxiPagoResponse from '../../../utils/formatMaxiPagoResponse'

export async function updateRecurringPayment(
  recurringPayment,
  maxiPagoBaseURL,
  maxiPagoPostApiEndpoint,
  maxiPagoAuth,
  maxiPagoHeaders,
  xmlOptions,
) {
  const updateRecurringPaymentXML = buildUpdateRecurringPaymentXML(
    recurringPayment,
    maxiPagoAuth,
    xmlOptions,
  )
  const xmlResponse = await axios.post(
    maxiPagoBaseURL + maxiPagoPostApiEndpoint,
    updateRecurringPaymentXML,
    maxiPagoHeaders,
  )
  const jsonResponse = formatMaxiPagoResponse(xmlResponse)
  return jsonResponse
}
