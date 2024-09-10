import { faker } from '@faker-js/faker'

const fakeAuth = function () {
  const id = Math.floor(Math.random() * (10000 - 100)) + 100
  return {
    processorID: '1',
    referenceNum: 'PONumber-' + id,
    billing: {
      name: faker.person.fullName(),
    },
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
      chargeTotal: '10.00',
    },
    saveOnFile: {
      customerToken: faker.string.alphanumeric(32),
    },
  }
}

const validAuthXML = function (merchantId, merchantKey, auth) {
  return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<transaction-request>
  <version>3.1.1.15</version>
  <verification>
    <merchantId>${merchantId}</merchantId>
    <merchantKey>${merchantKey}</merchantKey>
  </verification>
  <order>
    <auth>
      <processorID>${auth.processorID}</processorID>
      <referenceNum>${auth.referenceNum}</referenceNum>
      <billing>
        <name>${auth.billing.name}</name>
      </billing>
      <transactionDetail>
        <payType>
          <creditCard>
            <number>${auth.transactionDetail.payType.creditCard.number}</number>
            <expMonth>${auth.transactionDetail.payType.creditCard.expMonth}</expMonth>
            <expYear>${auth.transactionDetail.payType.creditCard.expYear}</expYear>
            <cvvNumber/>
          </creditCard>
        </payType>
      </transactionDetail>
      <saveOnFile>
        <customerToken>${auth.saveOnFile.customerToken}</customerToken>
      </saveOnFile>
      <payment>
        <currencyCode>${auth.payment.currencyCode}</currencyCode>
        <chargeTotal>${auth.payment.chargeTotal}</chargeTotal>
      </payment>
    </auth>
  </order>
</transaction-request>`
}

export { fakeAuth, validAuthXML }
