import xmlBuilder from '../../../utils/xmlBuilder'
import formatObject from '../../../utils/formatObject'
import updateCustomerModel from '../../model/customer/updateCustomerModel'

export default function buildUpdateCustomerXML(
  customer,
  maxiPagoAuth,
  xmlOptions,
) {
  const data = {}
  data.verification = maxiPagoAuth
  data.command = 'update-consumer'
  data.request = formatObject(customer, updateCustomerModel)
  return xmlBuilder(xmlOptions).buildObject({
    'api-request': data,
  })
}
