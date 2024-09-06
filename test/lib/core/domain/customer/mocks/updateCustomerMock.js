import { faker } from '@faker-js/faker'
import moment from 'moment'
import { fakeAddBasicCustomerJSON } from './addBasicCustomerMock'

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

export { fakeUpdateCustomerJSON, validUpdateCustomerXML }
