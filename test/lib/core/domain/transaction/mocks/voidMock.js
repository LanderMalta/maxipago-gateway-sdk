import { faker } from '@faker-js/faker'

const fakeVoid = function () {
  return {
    transactionID: faker.string.alphanumeric(32),
  }
}

const validVoidXML = function (merchantId, merchantKey, _void) {
  return `<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?>
<transaction-request>
  <version>3.1.1.15</version>
  <verification>
    <merchantId>${merchantId}</merchantId>
    <merchantKey>${merchantKey}</merchantKey>
  </verification>
  <order>
    <void>
      <transactionID>${_void.transactionID}</transactionID>
    </void>
  </order>
</transaction-request>`
}

export { fakeVoid, validVoidXML }
