import { faker } from '@faker-js/faker'

const fakeSaleWithToken = function () {
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

const validSaleWithTokenXML = function (
  merchantId,
  merchantKey,
  saleWithToken,
) {
  return `<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?>
<transaction-request>
  <version>3.1.1.15</version>
  <verification>
    <merchantId>${merchantId}</merchantId>
    <merchantKey>${merchantKey}</merchantKey>
  </verification>
  <order>
    <sale>
      <processorID>${saleWithToken.processorID}</processorID>
      <referenceNum>${saleWithToken.referenceNum}</referenceNum>
      <transactionDetail>
        <payType>
          <onFile>
            <customerId>${saleWithToken.transactionDetail.payType.onFile.customerId}</customerId>
            <token>${saleWithToken.transactionDetail.payType.onFile.token}</token>
          </onFile>
        </payType>
      </transactionDetail>
      <payment>
        <currencyCode>${saleWithToken.payment.currencyCode}</currencyCode>
        <chargeTotal>${saleWithToken.payment.chargeTotal}</chargeTotal>
      </payment>
    </sale>
  </order>
</transaction-request>`
}

export { fakeSaleWithToken, validSaleWithTokenXML }
