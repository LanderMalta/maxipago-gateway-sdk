import axios from 'axios'
import buildDeleteCustomerXML from '../../builder/customer/deleteCustomerBuilder'
import formatMaxiPagoResponse from '../../../utils/formatMaxiPagoResponse'

export async function deleteCustomer(
  customerId,
  maxiPagoBaseURL,
  maxiPagoPostApiEndpoint,
  maxiPagoAuth,
  maxiPagoHeaders,
  xmlOptions,
) {
  const deleteCustomerXML = buildDeleteCustomerXML(
    customerId,
    maxiPagoAuth,
    xmlOptions,
  )
  const xmlResponse = await axios.post(
    maxiPagoBaseURL + maxiPagoPostApiEndpoint,
    deleteCustomerXML,
    maxiPagoHeaders,
  )
  const jsonResponse = formatMaxiPagoResponse(xmlResponse)
  return jsonResponse
}
