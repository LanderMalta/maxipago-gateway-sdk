import axios from 'axios'
import buildAddCustomerXML from '../../builder/customer/addCustomerBuilder'
import formatMaxiPagoResponse from '../../../utils/formatMaxiPagoResponse'

export async function addCustomer(
  customer,
  maxiPagoBaseURL,
  maxiPagoPostApiEndpoint,
  maxiPagoAuth,
  maxiPagoHeaders,
  xmlOptions,
) {
  const addCustomerXML = buildAddCustomerXML(customer, maxiPagoAuth, xmlOptions)
  const xmlResponse = await axios.post(
    maxiPagoBaseURL + maxiPagoPostApiEndpoint,
    addCustomerXML,
    maxiPagoHeaders,
  )
  const jsonResponse = formatMaxiPagoResponse(xmlResponse)
  return jsonResponse
}
