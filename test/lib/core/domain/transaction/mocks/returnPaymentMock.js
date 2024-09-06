import { faker } from '@faker-js/faker'

const fakeReturnPayment = function () {
  return {
    orderID: faker.string.uuid(),
    referenceNum: faker.number.bigInt(),
    payment: {
      chargeTotal: '10.00',
    },
  }
}

const validReturnPaymentXML = function (
  merchantId,
  merchantKey,
  returnPayment,
) {
  return `<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?>
<transaction-request>
  <version>3.1.1.15</version>
  <verification>
    <merchantId>${merchantId}</merchantId>
    <merchantKey>${merchantKey}</merchantKey>
  </verification>
  <order>
    <return>
      <orderID>${returnPayment.orderID}</orderID>
      <referenceNum>${returnPayment.referenceNum}</referenceNum>
      <payment>
        <chargeTotal>${returnPayment.payment.chargeTotal}</chargeTotal>
      </payment>
    </return>
  </order>
</transaction-request>`
}

export { fakeReturnPayment, validReturnPaymentXML }
