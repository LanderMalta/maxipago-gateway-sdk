import { faker } from '@faker-js/faker'
import moment from 'moment'
import { fakeAddBasicCustomerJSON } from './addBasicCustomerMock'

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

export { fakeAddFullCustomerJSON, validAddFullCustomerXML }
