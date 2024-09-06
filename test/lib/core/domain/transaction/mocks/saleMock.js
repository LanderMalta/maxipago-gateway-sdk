import { faker } from '@faker-js/faker'

const fakeSale = function () {
  const id = Math.floor(Math.random() * (10000 - 100)) + 100
  return {
    processorID: '1',
    referenceNum: 'PONumber-' + id,
    transactionDetail: {
      payType: {
        creditCard: {
          number: '4111111111111111',
          expMonth: '12',
          expYear: '2020',
          cvvNumber: '',
        },
      },
    },
    payment: {
      currencyCode: 'BRL',
      chargeTotal: '15.33',
    },
    saveOnFile: {
      customerToken: faker.string.alphanumeric(32),
    },
  }
}

const validSaleXML = function (merchantId, merchantKey, sale) {
  return `<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?>
<transaction-request>
  <version>3.1.1.15</version>
  <verification>
    <merchantId>${merchantId}</merchantId>
    <merchantKey>${merchantKey}</merchantKey>
  </verification>
  <order>
    <sale>
      <processorID>${sale.processorID}</processorID>
      <referenceNum>${sale.referenceNum}</referenceNum>
      <transactionDetail>
        <payType>
          <creditCard>
            <number>${sale.transactionDetail.payType.creditCard.number}</number>
            <expMonth>${sale.transactionDetail.payType.creditCard.expMonth}</expMonth>
            <expYear>${sale.transactionDetail.payType.creditCard.expYear}</expYear>
            <cvvNumber/>
          </creditCard>
        </payType>
      </transactionDetail>
      <saveOnFile>
        <customerToken>${sale.saveOnFile.customerToken}</customerToken>
      </saveOnFile>
      <payment>
        <currencyCode>${sale.payment.currencyCode}</currencyCode>
        <chargeTotal>${sale.payment.chargeTotal}</chargeTotal>
      </payment>
    </sale>
  </order>
</transaction-request>`
}

export { fakeSale, validSaleXML }
