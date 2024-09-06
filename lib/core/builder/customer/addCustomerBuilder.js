import xmlBuilder from '../../../utils/xmlBuilder'
import formatObject from '../../../utils/formatObject'
import addCustomerModel from '../../model/customer/addCustomerModel'

export default function buildAddCustomerXML(
  customer,
  maxiPagoAuth,
  xmlOptions,
) {
  const data = {}
  data.verification = maxiPagoAuth
  data.command = 'add-consumer'
  data.request = formatObject(customer, addCustomerModel)
  return xmlBuilder(xmlOptions).buildObject({
    'api-request': data,
  })
}
