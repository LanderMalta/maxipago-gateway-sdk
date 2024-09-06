import { faker } from '@faker-js/faker'

const fakeCapture = function () {
  return {
    orderID: faker.string.uuid(),
    referenceNum: faker.number.bigInt(),
    payment: {
      chargeTotal: '10.00',
    },
  }
}

const validCaptureXML = function (merchantId, merchantKey, capture) {
  return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<transaction-request>
  <version>3.1.1.15</version>
  <verification>
    <merchantId>${merchantId}</merchantId>
    <merchantKey>${merchantKey}</merchantKey>
  </verification>
  <order>
    <capture>
      <orderID>${capture.orderID}</orderID>
      <referenceNum>${capture.referenceNum}</referenceNum>
      <payment>
        <chargeTotal>${capture.payment.chargeTotal}</chargeTotal>
      </payment>
    </capture>
  </order>
</transaction-request>`
}

export { fakeCapture, validCaptureXML }
