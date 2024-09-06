import { faker } from '@faker-js/faker'
import moment from 'moment'

const fakeRecurringPayment = function () {
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
const validRecurringPaymentXML = function (
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

const fakeRecurringPaymentWithToken = function () {
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
const validRecurringPaymentWithTokenXML = function (
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

const fakeCancelRecurringPayment = function () {
  return {
    orderID: faker.string.uuid(),
  }
}
const validCancelRecurringPaymentXML = function (
  merchantId,
  merchantKey,
  cancelRecurringPayment,
) {
  return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<api-request>
  <verification>
    <merchantId>${merchantId}</merchantId>
    <merchantKey>${merchantKey}</merchantKey>
  </verification>
  <command>cancel-recurring</command>
  <request>
    <orderID>${cancelRecurringPayment.orderID}</orderID>
  </request>
</api-request>`
}

export {
  fakeRecurringPayment,
  fakeRecurringPaymentWithToken,
  fakeUpdateRecurringPayment,
  fakeCancelRecurringPayment,
  validRecurringPaymentXML,
  validRecurringPaymentWithTokenXML,
  validUpdateRecurringPaymentXML,
  validCancelRecurringPaymentXML,
}
