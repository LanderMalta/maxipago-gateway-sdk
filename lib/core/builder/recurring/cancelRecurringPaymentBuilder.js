import xmlBuilder from '../../../utils/xmlBuilder'
import formatObject from '../../../utils/formatObject'
import cancelRecurringPaymentModel from '../../model/recurring/cancelRecurringPaymentModel'

export default function buildCancelRecurringPaymentXML(
  cancelRecurringPayment,
  maxiPagoAuth,
  xmlOptions,
) {
  const data = {}
  data.verification = maxiPagoAuth
  data.command = 'cancel-recurring'
  data.request = formatObject(
    cancelRecurringPayment,
    cancelRecurringPaymentModel,
  )
  return xmlBuilder(xmlOptions).buildObject({
    'api-request': data,
  })
}
