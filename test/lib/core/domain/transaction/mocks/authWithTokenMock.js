import { faker } from '@faker-js/faker'

const fakeAuthWithToken = function () {
  const id = Math.floor(Math.random() * (10000 - 100)) + 100
  return {
    processorID: '1',
    referenceNum: 'PONumber-' + id,
    transactionDetail: {
      payType: {
        onFile: {
          customerId: faker.number.bigInt(),
          token: faker.string.alphanumeric(32),
        },
      },
    },
    payment: {
      currencyCode: 'BRL',
      chargeTotal: '10.00',
    },
  }
}

const validAuthWithTokenXML = function (
  merchantId,
  merchantKey,
  authWithToken,
) {
  return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<transaction-request>
  <version>3.1.1.15</version>
  <verification>
    <merchantId>${merchantId}</merchantId>
    <merchantKey>${merchantKey}</merchantKey>
  </verification>
  <order>
    <auth>
      <processorID>${authWithToken.processorID}</processorID>
      <referenceNum>${authWithToken.referenceNum}</referenceNum>
      <transactionDetail>
        <payType>
          <onFile>
            <customerId>${authWithToken.transactionDetail.payType.onFile.customerId}</customerId>
            <token>${authWithToken.transactionDetail.payType.onFile.token}</token>
          </onFile>
        </payType>
      </transactionDetail>
      <payment>
        <currencyCode>${authWithToken.payment.currencyCode}</currencyCode>
        <chargeTotal>${authWithToken.payment.chargeTotal}</chargeTotal>
      </payment>
    </auth>
  </order>
</transaction-request>`
}

export { fakeAuthWithToken, validAuthWithTokenXML }
