import { faker } from '@faker-js/faker'
import moment from 'moment'

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

const fakeAddFullCustomerJSON = function () {
  const client = fakeAddBasicCustomerJSON()
  client.address1 = faker.location.streetAddress()
  client.address2 = faker.location.streetAddress()
  client.city = faker.location.city()
  client.state = faker.location.state()
  client.zip = faker.location.zipCode('#########')
  client.country = faker.location.countryCode()
  client.phone = faker.phone.number()
  client.email = faker.internet.email()
  client.dob = moment(faker.date.past()).format('MM/DD/YYYY')
  client.sex = client.customerIdExt % 2 === 0 ? 'M' : 'F'
  return client
}
const validAddFullCustomerXML = function (
  merchantId,
  merchantKey,
  addFullCustomer,
) {
  return `<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?>
<api-request>
  <verification>
    <merchantId>${merchantId}</merchantId>
    <merchantKey>${merchantKey}</merchantKey>
  </verification>
  <command>add-consumer</command>
  <request>
    <customerIdExt>${addFullCustomer.customerIdExt}</customerIdExt>
    <firstName>${addFullCustomer.firstName}</firstName>
    <lastName>${addFullCustomer.lastName}</lastName>
    <address1>${addFullCustomer.address1}</address1>
    <address2>${addFullCustomer.address2}</address2>
    <city>${addFullCustomer.city}</city>
    <state>${addFullCustomer.state}</state>
    <zip>${addFullCustomer.zip}</zip>
    <country>${addFullCustomer.country}</country>
    <phone>${addFullCustomer.phone}</phone>
    <email>${addFullCustomer.email}</email>
    <dob>${addFullCustomer.dob}</dob>
    <sex>${addFullCustomer.sex}</sex>
  </request>
</api-request>`
}

const fakeUpdateCustomerJSON = function () {
  const client = fakeAddBasicCustomerJSON()
  client.customerId = faker.number.bigInt()
  client.address1 = faker.location.streetAddress()
  client.address2 = faker.location.streetAddress()
  client.city = faker.location.city()
  client.state = faker.location.state()
  client.zip = faker.location.zipCode('#########')
  client.country = faker.location.countryCode()
  client.phone = faker.phone.number()
  client.email = faker.internet.email()
  client.dob = moment(faker.date.past()).format('MM/DD/YYYY')
  client.sex = client.customerIdExt % 2 === 0 ? 'M' : 'F'
  return client
}
const validUpdateCustomerXML = function (
  merchantId,
  merchantKey,
  updateCustomer,
) {
  return `<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?>
<api-request>
  <verification>
    <merchantId>${merchantId}</merchantId>
    <merchantKey>${merchantKey}</merchantKey>
  </verification>
  <command>update-consumer</command>
  <request>
    <customerId>${updateCustomer.customerId}</customerId>
    <customerIdExt>${updateCustomer.customerIdExt}</customerIdExt>
    <firstName>${updateCustomer.firstName}</firstName>
    <lastName>${updateCustomer.lastName}</lastName>
    <address1>${updateCustomer.address1}</address1>
    <address2>${updateCustomer.address2}</address2>
    <city>${updateCustomer.city}</city>
    <state>${updateCustomer.state}</state>
    <zip>${updateCustomer.zip}</zip>
    <country>${updateCustomer.country}</country>
    <phone>${updateCustomer.phone}</phone>
    <email>${updateCustomer.email}</email>
    <dob>${updateCustomer.dob}</dob>
    <sex>${updateCustomer.sex}</sex>
  </request>
</api-request>`
}

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

export {
  fakeAddBasicCustomerJSON,
  fakeAddFullCustomerJSON,
  fakeUpdateCustomerJSON,
  fakeDeleteCustomerJSON,
  validAddBasicCustomerXML,
  validAddFullCustomerXML,
  validUpdateCustomerXML,
  validDeleteCustomerXML,
}
