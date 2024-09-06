import { faker } from '@faker-js/faker'
import moment from 'moment'

const fakeUpdateRecurringPayment = function () {
  const fiveDaysAhead = moment().add(1, 'days').format('YYYY-MM-DD')
  return {
    orderID: faker.string.uuid(),
    paymentInfo: {
      cardInfo: {
        creditCardNumber: '4111111111111111',
        expirationMonth: '12',
        expirationYear: '2020',
        chargeTotal: '2000.00',
      },
    },
    recurring: {
      processorID: '1',
      action: 'disable',
      installments: '11',
      nextFireDate: fiveDaysAhead,
      fireDay: '20',
      period: 'quarterly',
    },
    billingInfo: {
      name: faker.person.firstName(),
      address1: faker.location.streetAddress(),
      address2: faker.location.streetAddress(),
      city: faker.location.city(),
      zip: faker.location.zipCode('#########'),
      country: faker.location.countryCode(),
      email: faker.internet.email(),
      phone: faker.phone.number(),
    },
    shippingInfo: {
      name: faker.person.firstName(),
      address1: faker.location.streetAddress(),
      address2: faker.location.streetAddress(),
      city: faker.location.city(),
      zip: faker.location.zipCode('#########'),
      country: faker.location.countryCode(),
      email: faker.internet.email(),
      phone: faker.phone.number(),
    },
  }
}

const validUpdateRecurringPaymentXML = function (
  merchantId,
  merchantKey,
  updateRecurringPayment,
) {
  return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<api-request>
  <verification>
    <merchantId>${merchantId}</merchantId>
    <merchantKey>${merchantKey}</merchantKey>
  </verification>
  <command>modify-recurring</command>
  <request>
    <orderID>${updateRecurringPayment.orderID}</orderID>
    <paymentInfo>
      <cardInfo>
        <creditCardNumber>${updateRecurringPayment.paymentInfo.cardInfo.creditCardNumber}</creditCardNumber>
        <expirationMonth>${updateRecurringPayment.paymentInfo.cardInfo.expirationMonth}</expirationMonth>
        <expirationYear>${updateRecurringPayment.paymentInfo.cardInfo.expirationYear}</expirationYear>
        <chargeTotal>${updateRecurringPayment.paymentInfo.cardInfo.chargeTotal}</chargeTotal>
      </cardInfo>
    </paymentInfo>
    <recurring>
      <processorID>${updateRecurringPayment.recurring.processorID}</processorID>
      <action>${updateRecurringPayment.recurring.action}</action>
      <installments>${updateRecurringPayment.recurring.installments}</installments>
      <nextFireDate>${updateRecurringPayment.recurring.nextFireDate}</nextFireDate>
      <fireDay>${updateRecurringPayment.recurring.fireDay}</fireDay>
      <period>${updateRecurringPayment.recurring.period}</period>
    </recurring>
    <billingInfo>
      <name>${updateRecurringPayment.billingInfo.name}</name>
      <address1>${updateRecurringPayment.billingInfo.address1}</address1>
      <address2>${updateRecurringPayment.billingInfo.address2}</address2>
      <city>${updateRecurringPayment.billingInfo.city}</city>
      <zip>${updateRecurringPayment.billingInfo.zip}</zip>
      <country>${updateRecurringPayment.billingInfo.country}</country>
      <email>${updateRecurringPayment.billingInfo.email}</email>
      <phone>${updateRecurringPayment.billingInfo.phone}</phone>
    </billingInfo>
    <shippingInfo>
      <name>${updateRecurringPayment.shippingInfo.name}</name>
      <address1>${updateRecurringPayment.shippingInfo.address1}</address1>
      <address2>${updateRecurringPayment.shippingInfo.address2}</address2>
      <city>${updateRecurringPayment.shippingInfo.city}</city>
      <zip>${updateRecurringPayment.shippingInfo.zip}</zip>
      <country>${updateRecurringPayment.shippingInfo.country}</country>
      <email>${updateRecurringPayment.shippingInfo.email}</email>
      <phone>${updateRecurringPayment.shippingInfo.phone}</phone>
    </shippingInfo>
  </request>
</api-request>`
}

export { fakeUpdateRecurringPayment, validUpdateRecurringPaymentXML }
