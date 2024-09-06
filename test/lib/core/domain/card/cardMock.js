import { faker } from '@faker-js/faker'

const fakeZeroDollar = function () {
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
          cvvNumber: '999',
        },
      },
    },
    payment: {
      chargeTotal: '00.00',
    },
  }
}
const validZeroDollarXML = function (merchantId, merchantKey, zeroDollar) {
  return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<transaction-request>
  <version>3.1.1.15</version>
  <verification>
    <merchantId>${merchantId}</merchantId>
    <merchantKey>${merchantKey}</merchantKey>
  </verification>
  <order>
    <zeroDollar>
      <processorID>${zeroDollar.processorID}</processorID>
      <referenceNum>${zeroDollar.referenceNum}</referenceNum>
      <transactionDetail>
        <payType>
          <creditCard>
            <number>${zeroDollar.transactionDetail.payType.creditCard.number}</number>
            <expMonth>${zeroDollar.transactionDetail.payType.creditCard.expMonth}</expMonth>
            <expYear>${zeroDollar.transactionDetail.payType.creditCard.expYear}</expYear>
            <cvvNumber>${zeroDollar.transactionDetail.payType.creditCard.cvvNumber}</cvvNumber>
          </creditCard>
        </payType>
      </transactionDetail>
      <payment>
        <chargeTotal>${zeroDollar.payment.chargeTotal}</chargeTotal>
      </payment>
    </zeroDollar>
  </order>
</transaction-request>`
}

const fakeAddCard = function () {
  return {
    customerId: faker.number.bigInt(),
    creditCardNumber: '4111111111111111',
    expirationMonth: 12,
    expirationYear: 2020,
    billingName: faker.person.firstName(),
  }
}
const validAddCardXML = function (merchantId, merchantKey, addCard) {
  return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<api-request>
  <verification>
    <merchantId>${merchantId}</merchantId>
    <merchantKey>${merchantKey}</merchantKey>
  </verification>
  <command>add-card-onfile</command>
  <request>
    <customerId>${addCard.customerId}</customerId>
    <creditCardNumber>${addCard.creditCardNumber}</creditCardNumber>
    <expirationMonth>${addCard.expirationMonth}</expirationMonth>
    <expirationYear>${addCard.expirationYear}</expirationYear>
    <billingName>${addCard.billingName}</billingName>
  </request>
</api-request>`
}

const fakeDeleteCard = function () {
  return {
    customerId: faker.number.bigInt(),
    token: faker.string.alphanumeric(32),
  }
}
const validDeleteCardXML = function (merchantId, merchantKey, deleteCard) {
  return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<api-request>
  <verification>
    <merchantId>${merchantId}</merchantId>
    <merchantKey>${merchantKey}</merchantKey>
  </verification>
  <command>delete-card-onfile</command>
  <request>
    <customerId>${deleteCard.customerId}</customerId>
    <token>${deleteCard.token}</token>
  </request>
</api-request>`
}

export {
  fakeZeroDollar,
  fakeAddCard,
  fakeDeleteCard,
  validZeroDollarXML,
  validAddCardXML,
  validDeleteCardXML,
}
