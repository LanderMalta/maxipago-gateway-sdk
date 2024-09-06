import { faker } from '@faker-js/faker'
import moment from 'moment'

const fakeAddRecurringPaymentWithToken = function () {
  const id = Math.floor(Math.random() * (10000 - 100)) + 100
  const tomorrow = moment().add(1, 'days').format('YYYY-MM-DD')
  return {
    processorID: '1',
    referenceNum: 'PONumber-' + id,
    billing: {
      name: faker.person.firstName(),
      address: faker.location.streetAddress(),
      address2: faker.location.streetAddress(),
      city: faker.location.city(),
      state: faker.location.state(),
      postalcode: faker.location.zipCode('#########'),
      country: faker.location.countryCode(),
      phone: faker.phone.number(),
      email: faker.internet.email(),
    },
    shipping: {
      name: faker.person.firstName(),
      address: faker.location.streetAddress(),
      address2: faker.location.streetAddress(),
      city: faker.location.city(),
      state: faker.location.state(),
      postalcode: faker.location.zipCode('#########'),
      country: faker.location.countryCode(),
      phone: faker.phone.number(),
      email: faker.internet.email(),
    },
    transactionDetail: {
      payType: {
        onFile: {
          customerId: faker.number.bigInt(),
          token: faker.string.alphanumeric(32),
        },
      },
    },
    payment: {
      currencyCode: 'BRL',
      chargeTotal: '11.00',
    },
    recurring: {
      action: 'new',
      startDate: tomorrow,
      frequency: '1',
      period: 'monthly',
      installments: '10',
      failureThreshold: '5',
    },
  }
}

const validAddRecurringPaymentWithTokenXML = function (
  merchantId,
  merchantKey,
  recurringPaymentWithToken,
) {
  return `<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?>
<transaction-request>
  <version>3.1.1.15</version>
  <verification>
    <merchantId>${merchantId}</merchantId>
    <merchantKey>${merchantKey}</merchantKey>
  </verification>
  <order>
    <recurringPayment>
      <processorID>${recurringPaymentWithToken.processorID}</processorID>
      <referenceNum>${recurringPaymentWithToken.referenceNum}</referenceNum>
      <billing>
        <name>${recurringPaymentWithToken.billing.name}</name>
        <address>${recurringPaymentWithToken.billing.address}</address>
        <address2>${recurringPaymentWithToken.billing.address2}</address2>
        <city>${recurringPaymentWithToken.billing.city}</city>
        <state>${recurringPaymentWithToken.billing.state}</state>
        <postalcode>${recurringPaymentWithToken.billing.postalcode}</postalcode>
        <country>${recurringPaymentWithToken.billing.country}</country>
        <phone>${recurringPaymentWithToken.billing.phone}</phone>
        <email>${recurringPaymentWithToken.billing.email}</email>
      </billing>
      <shipping>
        <name>${recurringPaymentWithToken.shipping.name}</name>
        <address>${recurringPaymentWithToken.shipping.address}</address>
        <address2>${recurringPaymentWithToken.shipping.address2}</address2>
        <city>${recurringPaymentWithToken.shipping.city}</city>
        <state>${recurringPaymentWithToken.shipping.state}</state>
        <postalcode>${recurringPaymentWithToken.shipping.postalcode}</postalcode>
        <country>${recurringPaymentWithToken.shipping.country}</country>
        <phone>${recurringPaymentWithToken.shipping.phone}</phone>
        <email>${recurringPaymentWithToken.shipping.email}</email>
      </shipping>
      <transactionDetail>
        <payType>
          <onFile>
            <customerId>${recurringPaymentWithToken.transactionDetail.payType.onFile.customerId}</customerId>
            <token>${recurringPaymentWithToken.transactionDetail.payType.onFile.token}</token>
          </onFile>
        </payType>
      </transactionDetail>
      <payment>
        <currencyCode>${recurringPaymentWithToken.payment.currencyCode}</currencyCode>
        <chargeTotal>${recurringPaymentWithToken.payment.chargeTotal}</chargeTotal>
      </payment>
      <recurring>
        <action>${recurringPaymentWithToken.recurring.action}</action>
        <startDate>${recurringPaymentWithToken.recurring.startDate}</startDate>
        <frequency>${recurringPaymentWithToken.recurring.frequency}</frequency>
        <period>${recurringPaymentWithToken.recurring.period}</period>
        <installments>${recurringPaymentWithToken.recurring.installments}</installments>
        <failureThreshold>${recurringPaymentWithToken.recurring.failureThreshold}</failureThreshold>
      </recurring>
    </recurringPayment>
  </order>
</transaction-request>`
}

export {
  fakeAddRecurringPaymentWithToken,
  validAddRecurringPaymentWithTokenXML,
}
