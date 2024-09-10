import { faker } from '@faker-js/faker'

const fakeAddBasicCustomerJSON = function () {
  const id = Math.floor(Math.random() * (10000 - 100)) + 100
  return {
    customerIdExt: id,
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
  }
}

const validAddBasicCustomerXML = function (
  merchantId,
  merchantKey,
  addCustomer,
) {
  return `<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?>
<api-request>
  <verification>
    <merchantId>${merchantId}</merchantId>
    <merchantKey>${merchantKey}</merchantKey>
  </verification>
  <command>add-consumer</command>
  <request>
    <customerIdExt>${addCustomer.customerIdExt}</customerIdExt>
    <firstName>${addCustomer.firstName}</firstName>
    <lastName>${addCustomer.lastName}</lastName>
  </request>
</api-request>`
}

export { fakeAddBasicCustomerJSON, validAddBasicCustomerXML }
