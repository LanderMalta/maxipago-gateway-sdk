import xmlBuilder from '../../../utils/xmlBuilder'
import formatObject from '../../../utils/formatObject'
import recurringPaymentModel from '../../model/recurring/recurringPaymentModel'

export default function buildRecurringPaymentXML(
  recurringPayment,
  mpAPIVersion,
  maxiPagoAuth,
  xmlOptions,
) {
  const data = {}
  data.version = mpAPIVersion
  data.verification = maxiPagoAuth
  data.order = {
    recurringPayment: formatObject(recurringPayment, recurringPaymentModel),
  }
  return xmlBuilder(xmlOptions).buildObject({
    'transaction-request': data,
  })
}
