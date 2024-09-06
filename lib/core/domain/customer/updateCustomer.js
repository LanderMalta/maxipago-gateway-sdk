import axios from 'axios'
import buildUpdateCustomerXML from '../../builder/customer/updateCustomerBuilder'
import formatMaxiPagoResponse from '../../../utils/formatMaxiPagoResponse'

export async function updateCustomer(
  customer,
  maxiPagoBaseURL,
  maxiPagoPostApiEndpoint,
  maxiPagoAuth,
  maxiPagoHeaders,
  xmlOptions,
) {
  const updateCustomerXML = buildUpdateCustomerXML(
    customer,
    maxiPagoAuth,
    xmlOptions,
  )
  const xmlResponse = await axios.post(
    maxiPagoBaseURL + maxiPagoPostApiEndpoint,
    updateCustomerXML,
    maxiPagoHeaders,
  )
  const jsonResponse = formatMaxiPagoResponse(xmlResponse)
  return jsonResponse
}
