import { faker } from '@faker-js/faker'
import moment from 'moment'

const fakeAddRecurringPayment = function () {
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
        creditCard: {
          number: '4111111111111111',
          expMonth: '12',
          expYear: '2020',
          cvvNumber: '',
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

const validAddRecurringPaymentXML = function (
  merchantId,
  merchantKey,
  recurringPayment,
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
      <processorID>${recurringPayment.processorID}</processorID>
      <referenceNum>${recurringPayment.referenceNum}</referenceNum>
      <billing>
        <name>${recurringPayment.billing.name}</name>
        <address>${recurringPayment.billing.address}</address>
        <address2>${recurringPayment.billing.address2}</address2>
        <city>${recurringPayment.billing.city}</city>
        <state>${recurringPayment.billing.state}</state>
        <postalcode>${recurringPayment.billing.postalcode}</postalcode>
        <country>${recurringPayment.billing.country}</country>
        <phone>${recurringPayment.billing.phone}</phone>
        <email>${recurringPayment.billing.email}</email>
      </billing>
      <shipping>
        <name>${recurringPayment.shipping.name}</name>
        <address>${recurringPayment.shipping.address}</address>
        <address2>${recurringPayment.shipping.address2}</address2>
        <city>${recurringPayment.shipping.city}</city>
        <state>${recurringPayment.shipping.state}</state>
        <postalcode>${recurringPayment.shipping.postalcode}</postalcode>
        <country>${recurringPayment.shipping.country}</country>
        <phone>${recurringPayment.shipping.phone}</phone>
        <email>${recurringPayment.shipping.email}</email>
      </shipping>
      <transactionDetail>
        <payType>
          <creditCard>
            <number>${recurringPayment.transactionDetail.payType.creditCard.number}</number>
            <expMonth>${recurringPayment.transactionDetail.payType.creditCard.expMonth}</expMonth>
            <expYear>${recurringPayment.transactionDetail.payType.creditCard.expYear}</expYear>
            <cvvNumber/>
          </creditCard>
        </payType>
      </transactionDetail>
      <payment>
        <currencyCode>${recurringPayment.payment.currencyCode}</currencyCode>
        <chargeTotal>${recurringPayment.payment.chargeTotal}</chargeTotal>
      </payment>
      <recurring>
        <action>${recurringPayment.recurring.action}</action>
        <startDate>${recurringPayment.recurring.startDate}</startDate>
        <frequency>${recurringPayment.recurring.frequency}</frequency>
        <period>${recurringPayment.recurring.period}</period>
        <installments>${recurringPayment.recurring.installments}</installments>
        <failureThreshold>${recurringPayment.recurring.failureThreshold}</failureThreshold>
      </recurring>
    </recurringPayment>
  </order>
</transaction-request>`
}

export { fakeAddRecurringPayment, validAddRecurringPaymentXML }
