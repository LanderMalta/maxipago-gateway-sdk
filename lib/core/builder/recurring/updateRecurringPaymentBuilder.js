import xmlBuilder from '../../../utils/xmlBuilder'
import formatObject from '../../../utils/formatObject'
import updateRecurringPaymentModel from '../../model/recurring/updateRecurringPaymentModel'

export default function buildUpdateRecurringPaymentXML(
  updateRecurringPayment,
  maxiPagoAuth,
  xmlOptions,
) {
  const data = {}
  data.verification = maxiPagoAuth
  data.command = 'modify-recurring'
  data.request = formatObject(
    updateRecurringPayment,
    updateRecurringPaymentModel,
  )
  return xmlBuilder(xmlOptions).buildObject({
    'api-request': data,
  })
}
