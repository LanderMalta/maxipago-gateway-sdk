import { faker } from '@faker-js/faker'

const fakeDeleteCustomerJSON = function () {
  return {
    customerId: faker.number.bigInt(),
  }
}

const validDeleteCustomerXML = function (
  merchantId,
  merchantKey,
  deleteCustomer,
) {
  return `<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?>
<api-request>
  <verification>
    <merchantId>${merchantId}</merchantId>
    <merchantKey>${merchantKey}</merchantKey>
  </verification>
  <command>delete-consumer</command>
  <request>
    <customerId>${deleteCustomer.customerId}</customerId>
  </request>
</api-request>`
}

export { fakeDeleteCustomerJSON, validDeleteCustomerXML }
