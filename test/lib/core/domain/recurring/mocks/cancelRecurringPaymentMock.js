import { faker } from '@faker-js/faker'

const fakeCancelRecurringPayment = function () {
  return {
    orderID: faker.string.uuid(),
  }
}

const validCancelRecurringPaymentXML = function (
  merchantId,
  merchantKey,
  cancelRecurringPayment,
) {
  return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<api-request>
  <verification>
    <merchantId>${merchantId}</merchantId>
    <merchantKey>${merchantKey}</merchantKey>
  </verification>
  <command>cancel-recurring</command>
  <request>
    <orderID>${cancelRecurringPayment.orderID}</orderID>
  </request>
</api-request>`
}

export { fakeCancelRecurringPayment, validCancelRecurringPaymentXML }
