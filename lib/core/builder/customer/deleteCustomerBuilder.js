import xmlBuilder from '../../../utils/xmlBuilder'
import formatObject from '../../../utils/formatObject'
import deleteCustomerModel from '../../model/customer/deleteCustomerModel'

export default function buildDeleteCustomerXML(
  customerId,
  maxiPagoAuth,
  xmlOptions,
) {
  const data = {}
  data.verification = maxiPagoAuth
  data.command = 'delete-consumer'
  data.request = formatObject(customerId, deleteCustomerModel)
  return xmlBuilder(xmlOptions).buildObject({
    'api-request': data,
  })
}
