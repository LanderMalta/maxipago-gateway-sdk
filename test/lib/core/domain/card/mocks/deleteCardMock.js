import { faker } from '@faker-js/faker'

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

export { fakeDeleteCard, validDeleteCardXML }
