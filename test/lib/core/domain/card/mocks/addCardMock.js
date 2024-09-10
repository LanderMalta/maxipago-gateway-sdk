import { faker } from '@faker-js/faker'

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

export { fakeAddCard, validAddCardXML }
