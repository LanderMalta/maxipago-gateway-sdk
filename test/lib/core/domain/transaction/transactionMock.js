import { faker } from '@faker-js/faker'

const fakeAuth = function () {
  const id = Math.floor(Math.random() * (10000 - 100)) + 100
  return {
    processorID: '1',
    referenceNum: 'PONumber-' + id,
    billing: {
      name: faker.person.fullName(),
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
      chargeTotal: '10.00',
    },
    saveOnFile: {
      customerToken: faker.string.alphanumeric(32),
    },
  }
}
const validAuthXML = function (merchantId, merchantKey, auth) {
  return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<transaction-request>
  <version>3.1.1.15</version>
  <verification>
    <merchantId>${merchantId}</merchantId>
    <merchantKey>${merchantKey}</merchantKey>
  </verification>
  <order>
    <auth>
      <processorID>${auth.processorID}</processorID>
      <referenceNum>${auth.referenceNum}</referenceNum>
      <billing>
        <name>${auth.billing.name}</name>
      </billing>
      <transactionDetail>
        <payType>
          <creditCard>
            <number>${auth.transactionDetail.payType.creditCard.number}</number>
            <expMonth>${auth.transactionDetail.payType.creditCard.expMonth}</expMonth>
            <expYear>${auth.transactionDetail.payType.creditCard.expYear}</expYear>
            <cvvNumber/>
          </creditCard>
        </payType>
      </transactionDetail>
      <saveOnFile>
        <customerToken>${auth.saveOnFile.customerToken}</customerToken>
      </saveOnFile>
      <payment>
        <currencyCode>${auth.payment.currencyCode}</currencyCode>
        <chargeTotal>${auth.payment.chargeTotal}</chargeTotal>
      </payment>
    </auth>
  </order>
</transaction-request>`
}

const fakeAuthWithToken = function () {
  const id = Math.floor(Math.random() * (10000 - 100)) + 100
  return {
    processorID: '1',
    referenceNum: 'PONumber-' + id,
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
      chargeTotal: '10.00',
    },
  }
}
const validAuthWithTokenXML = function (
  merchantId,
  merchantKey,
  authWithToken,
) {
  return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<transaction-request>
  <version>3.1.1.15</version>
  <verification>
    <merchantId>${merchantId}</merchantId>
    <merchantKey>${merchantKey}</merchantKey>
  </verification>
  <order>
    <auth>
      <processorID>${authWithToken.processorID}</processorID>
      <referenceNum>${authWithToken.referenceNum}</referenceNum>
      <transactionDetail>
        <payType>
          <onFile>
            <customerId>${authWithToken.transactionDetail.payType.onFile.customerId}</customerId>
            <token>${authWithToken.transactionDetail.payType.onFile.token}</token>
          </onFile>
        </payType>
      </transactionDetail>
      <payment>
        <currencyCode>${authWithToken.payment.currencyCode}</currencyCode>
        <chargeTotal>${authWithToken.payment.chargeTotal}</chargeTotal>
      </payment>
    </auth>
  </order>
</transaction-request>`
}

const fakeCapture = function () {
  return {
    orderID: faker.string.uuid(),
    referenceNum: faker.number.bigInt(),
    payment: {
      chargeTotal: '10.00',
    },
  }
}
const validCaptureXML = function (merchantId, merchantKey, capture) {
  return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<transaction-request>
  <version>3.1.1.15</version>
  <verification>
    <merchantId>${merchantId}</merchantId>
    <merchantKey>${merchantKey}</merchantKey>
  </verification>
  <order>
    <capture>
      <orderID>${capture.orderID}</orderID>
      <referenceNum>${capture.referenceNum}</referenceNum>
      <payment>
        <chargeTotal>${capture.payment.chargeTotal}</chargeTotal>
      </payment>
    </capture>
  </order>
</transaction-request>`
}

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

const fakeSale = function () {
  const id = Math.floor(Math.random() * (10000 - 100)) + 100
  return {
    processorID: '1',
    referenceNum: 'PONumber-' + id,
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
      chargeTotal: '15.33',
    },
    saveOnFile: {
      customerToken: faker.string.alphanumeric(32),
    },
  }
}
const validSaleXML = function (merchantId, merchantKey, sale) {
  return `<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?>
<transaction-request>
  <version>3.1.1.15</version>
  <verification>
    <merchantId>${merchantId}</merchantId>
    <merchantKey>${merchantKey}</merchantKey>
  </verification>
  <order>
    <sale>
      <processorID>${sale.processorID}</processorID>
      <referenceNum>${sale.referenceNum}</referenceNum>
      <transactionDetail>
        <payType>
          <creditCard>
            <number>${sale.transactionDetail.payType.creditCard.number}</number>
            <expMonth>${sale.transactionDetail.payType.creditCard.expMonth}</expMonth>
            <expYear>${sale.transactionDetail.payType.creditCard.expYear}</expYear>
            <cvvNumber/>
          </creditCard>
        </payType>
      </transactionDetail>
      <saveOnFile>
        <customerToken>${sale.saveOnFile.customerToken}</customerToken>
      </saveOnFile>
      <payment>
        <currencyCode>${sale.payment.currencyCode}</currencyCode>
        <chargeTotal>${sale.payment.chargeTotal}</chargeTotal>
      </payment>
    </sale>
  </order>
</transaction-request>`
}

const fakeSaleWithFraudcheck = function () {
  const id = Math.floor(Math.random() * (10000 - 100)) + 100
  return {
    processorID: '1',
    referenceNum: 'PONumber-' + id,
    fraudCheck: 'Y',
    billing: {
      id: '1',
      type: 'Individual',
      name: faker.person.fullName(),
      address: 'address test',
      district: 'district test',
      gender: 'M',
      birthDate: '1989-02-23',
      city: 'Franca',
      state: 'SP',
      country: 'BR',
      postalcode: '14405016',
      email: 'magamais@magazineluiza.com.br',
      phones: {
        $: { phoneCount: '1' },
        phone: {
          phoneType: 'Mobile',
          phoneCountryCode: '55',
          phoneAreaCode: '16',
          phoneNumber: '999999999',
          phoneExtension: '',
        },
      },
      documents: {
        $: { documentCount: '1' },
        document: {
          documentType: 'CPF',
          documentValue: '000.000.000-00',
        },
      },
    },
    shipping: {
      name: faker.person.fullName(),
      address: 'address test',
      city: 'Franca',
      state: 'SP',
      district: 'district test',
      postalcode: '14405016',
      country: 'BR',
      id: '1',
      type: 'Individual',
      gender: 'M',
      phones: {
        $: { phoneCount: '1' },
        phone: {
          phoneType: 'Mobile',
          phoneCountryCode: '55',
          phoneAreaCode: '16',
          phoneNumber: '999999999',
          phoneExtension: '',
        },
      },
      documents: {
        $: { documentCount: '1' },
        document: {
          documentType: 'CPF',
          documentValue: '000.000.000-00',
        },
      },
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
      chargeTotal: '15.33',
    },
    fraudDetails: {
      fraudProcessorID: '98',
      fraudToken: '12345',
      websiteId: 'Android',
    },
    saveOnFile: {
      customerToken: faker.string.alphanumeric(32),
    },
  }
}
const validSaleWithFraudcheckXML = function (
  merchantId,
  merchantKey,
  saleWithfraudcheck,
) {
  return `<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?>
<transaction-request>
  <version>3.1.1.15</version>
  <verification>
    <merchantId>${merchantId}</merchantId>
    <merchantKey>${merchantKey}</merchantKey>
  </verification>
  <order>
    <sale>
      <processorID>${saleWithfraudcheck.processorID}</processorID>
      <referenceNum>${saleWithfraudcheck.referenceNum}</referenceNum>
      <fraudCheck>${saleWithfraudcheck.fraudCheck}</fraudCheck>
      <billing>
        <id>${saleWithfraudcheck.billing.id}</id>
        <type>${saleWithfraudcheck.billing.type}</type>
        <name>${saleWithfraudcheck.billing.name}</name>
        <address>${saleWithfraudcheck.billing.address}</address>
        <district>${saleWithfraudcheck.billing.district}</district>
        <gender>${saleWithfraudcheck.billing.gender}</gender>
        <birthDate>${saleWithfraudcheck.billing.birthDate}</birthDate>
        <city>${saleWithfraudcheck.billing.city}</city>
        <state>${saleWithfraudcheck.billing.state}</state>
        <postalcode>${saleWithfraudcheck.billing.postalcode}</postalcode>
        <country>${saleWithfraudcheck.billing.country}</country>
        <email>${saleWithfraudcheck.billing.email}</email>
        <phones>
          <phone>
            <phoneType>${saleWithfraudcheck.billing.phones.phone.phoneType}</phoneType>
            <phoneCountryCode>${saleWithfraudcheck.billing.phones.phone.phoneCountryCode}</phoneCountryCode>
            <phoneAreaCode>${saleWithfraudcheck.billing.phones.phone.phoneAreaCode}</phoneAreaCode>
            <phoneNumber>${saleWithfraudcheck.billing.phones.phone.phoneNumber}</phoneNumber>
            <phoneExtension/>
          </phone>
        </phones>
        <documents>
          <document>
            <documentType>${saleWithfraudcheck.billing.documents.document.documentType}</documentType>
            <documentValue>${saleWithfraudcheck.billing.documents.document.documentValue}</documentValue>
          </document>
        </documents>
      </billing>
      <transactionDetail>
        <payType>
          <creditCard>
            <number>${saleWithfraudcheck.transactionDetail.payType.creditCard.number}</number>
            <expMonth>${saleWithfraudcheck.transactionDetail.payType.creditCard.expMonth}</expMonth>
            <expYear>${saleWithfraudcheck.transactionDetail.payType.creditCard.expYear}</expYear>
            <cvvNumber/>
          </creditCard>
        </payType>
      </transactionDetail>
      <saveOnFile>
        <customerToken>${saleWithfraudcheck.saveOnFile.customerToken}</customerToken>
      </saveOnFile>
      <payment>
        <currencyCode>${saleWithfraudcheck.payment.currencyCode}</currencyCode>
        <chargeTotal>${saleWithfraudcheck.payment.chargeTotal}</chargeTotal>
      </payment>
      <fraudDetails>
        <fraudProcessorID>${saleWithfraudcheck.fraudDetails.fraudProcessorID}</fraudProcessorID>
        <fraudToken>${saleWithfraudcheck.fraudDetails.fraudToken}</fraudToken>
      </fraudDetails>
    </sale>
  </order>
</transaction-request>`
}

const fakeSaleWithToken = function () {
  const id = Math.floor(Math.random() * (10000 - 100)) + 100
  return {
    processorID: '1',
    referenceNum: 'PONumber-' + id,
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
      chargeTotal: '10.00',
    },
  }
}
const validSaleWithTokenXML = function (
  merchantId,
  merchantKey,
  saleWithToken,
) {
  return `<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?>
<transaction-request>
  <version>3.1.1.15</version>
  <verification>
    <merchantId>${merchantId}</merchantId>
    <merchantKey>${merchantKey}</merchantKey>
  </verification>
  <order>
    <sale>
      <processorID>${saleWithToken.processorID}</processorID>
      <referenceNum>${saleWithToken.referenceNum}</referenceNum>
      <transactionDetail>
        <payType>
          <onFile>
            <customerId>${saleWithToken.transactionDetail.payType.onFile.customerId}</customerId>
            <token>${saleWithToken.transactionDetail.payType.onFile.token}</token>
          </onFile>
        </payType>
      </transactionDetail>
      <payment>
        <currencyCode>${saleWithToken.payment.currencyCode}</currencyCode>
        <chargeTotal>${saleWithToken.payment.chargeTotal}</chargeTotal>
      </payment>
    </sale>
  </order>
</transaction-request>`
}

const fakeSaleWithTokenAndFraudcheck = function () {
  const id = Math.floor(Math.random() * (10000 - 100)) + 100
  return {
    processorID: '1',
    referenceNum: 'PONumber-' + id,
    fraudCheck: 'Y',
    billing: {
      id: '1',
      type: 'Individual',
      name: faker.person.fullName(),
      address: 'address test',
      district: 'district test',
      gender: 'M',
      birthDate: '1989-02-23',
      city: 'Franca',
      state: 'SP',
      country: 'BR',
      postalcode: '14405016',
      email: 'magamais@magazineluiza.com.br',
      phones: {
        $: { phoneCount: '1' },
        phone: {
          phoneType: 'Mobile',
          phoneCountryCode: '55',
          phoneAreaCode: '16',
          phoneNumber: '999999999',
          phoneExtension: '',
        },
      },
      documents: {
        $: { documentCount: '1' },
        document: {
          documentType: 'CPF',
          documentValue: '000.000.000-00',
        },
      },
    },
    shipping: {
      name: faker.person.fullName(),
      address: 'address test',
      city: 'Franca',
      state: 'SP',
      district: 'district test',
      postalcode: '14405016',
      country: 'BR',
      id: '1',
      type: 'Individual',
      gender: 'M',
      phones: {
        $: { phoneCount: '1' },
        phone: {
          phoneType: 'Mobile',
          phoneCountryCode: '55',
          phoneAreaCode: '16',
          phoneNumber: '999999999',
          phoneExtension: '',
        },
      },
      documents: {
        $: { documentCount: '1' },
        document: {
          documentType: 'CPF',
          documentValue: '000.000.000-00',
        },
      },
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
      chargeTotal: '15.33',
    },
    fraudDetails: {
      fraudProcessorID: '98',
      fraudToken: '12345',
      websiteId: 'Android',
    },
    saveOnFile: {
      customerToken: faker.string.alphanumeric(32),
    },
  }
}
const validSaleWithTokenAndFraudcheckXML = function (
  merchantId,
  merchantKey,
  saleWithTokenAndFraudcheck,
) {
  return `<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?>
<transaction-request>
  <version>3.1.1.15</version>
  <verification>
    <merchantId>${merchantId}</merchantId>
    <merchantKey>${merchantKey}</merchantKey>
  </verification>
  <order>
    <sale>
      <processorID>${saleWithTokenAndFraudcheck.processorID}</processorID>
      <referenceNum>${saleWithTokenAndFraudcheck.referenceNum}</referenceNum>
      <fraudCheck>${saleWithTokenAndFraudcheck.fraudCheck}</fraudCheck>
      <billing>
        <id>${saleWithTokenAndFraudcheck.billing.id}</id>
        <type>${saleWithTokenAndFraudcheck.billing.type}</type>
        <name>${saleWithTokenAndFraudcheck.billing.name}</name>
        <address>${saleWithTokenAndFraudcheck.billing.address}</address>
        <district>${saleWithTokenAndFraudcheck.billing.district}</district>
        <gender>${saleWithTokenAndFraudcheck.billing.gender}</gender>
        <birthDate>${saleWithTokenAndFraudcheck.billing.birthDate}</birthDate>
        <city>${saleWithTokenAndFraudcheck.billing.city}</city>
        <state>${saleWithTokenAndFraudcheck.billing.state}</state>
        <postalcode>${saleWithTokenAndFraudcheck.billing.postalcode}</postalcode>
        <country>${saleWithTokenAndFraudcheck.billing.country}</country>
        <email>${saleWithTokenAndFraudcheck.billing.email}</email>
        <phones>
          <phone>
            <phoneType>${saleWithTokenAndFraudcheck.billing.phones.phone.phoneType}</phoneType>
            <phoneCountryCode>${saleWithTokenAndFraudcheck.billing.phones.phone.phoneCountryCode}</phoneCountryCode>
            <phoneAreaCode>${saleWithTokenAndFraudcheck.billing.phones.phone.phoneAreaCode}</phoneAreaCode>
            <phoneNumber>${saleWithTokenAndFraudcheck.billing.phones.phone.phoneNumber}</phoneNumber>
            <phoneExtension/>
          </phone>
        </phones>
        <documents>
          <document>
            <documentType>${saleWithTokenAndFraudcheck.billing.documents.document.documentType}</documentType>
            <documentValue>${saleWithTokenAndFraudcheck.billing.documents.document.documentValue}</documentValue>
          </document>
        </documents>
      </billing>
      <transactionDetail>
        <payType>
          <onFile>
            <customerId>${saleWithTokenAndFraudcheck.transactionDetail.payType.onFile.customerId}</customerId>
            <token>${saleWithTokenAndFraudcheck.transactionDetail.payType.onFile.token}</token>
          </onFile>
        </payType>
      </transactionDetail>
      <saveOnFile>
        <customerToken>${saleWithTokenAndFraudcheck.saveOnFile.customerToken}</customerToken>
      </saveOnFile>
      <payment>
        <currencyCode>${saleWithTokenAndFraudcheck.payment.currencyCode}</currencyCode>
        <chargeTotal>${saleWithTokenAndFraudcheck.payment.chargeTotal}</chargeTotal>
      </payment>
      <fraudDetails>
        <fraudProcessorID>${saleWithTokenAndFraudcheck.fraudDetails.fraudProcessorID}</fraudProcessorID>
        <fraudToken>${saleWithTokenAndFraudcheck.fraudDetails.fraudToken}</fraudToken>
      </fraudDetails>
    </sale>
  </order>
</transaction-request>`
}

const fakeReturnPayment = function () {
  return {
    orderID: faker.string.uuid(),
    referenceNum: faker.number.bigInt(),
    payment: {
      chargeTotal: '10.00',
    },
  }
}
const validReturnPaymentXML = function (
  merchantId,
  merchantKey,
  returnPayment,
) {
  return `<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?>
<transaction-request>
  <version>3.1.1.15</version>
  <verification>
    <merchantId>${merchantId}</merchantId>
    <merchantKey>${merchantKey}</merchantKey>
  </verification>
  <order>
    <return>
      <orderID>${returnPayment.orderID}</orderID>
      <referenceNum>${returnPayment.referenceNum}</referenceNum>
      <payment>
        <chargeTotal>${returnPayment.payment.chargeTotal}</chargeTotal>
      </payment>
    </return>
  </order>
</transaction-request>`
}

const fakeTransactionQuery = function () {
  return {
    filterOptions: {
      transactionId: 2997111,
    },
  }
}
const validTransactionQueryXML = function (
  merchantId,
  merchantKey,
  transactionQuery,
) {
  return `<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?>
<rapi-request>
  <verification>
    <merchantId>${merchantId}</merchantId>
    <merchantKey>${merchantKey}</merchantKey>
  </verification>
  <command>transactionDetailReport</command>
  <request>
    <filterOptions>
      <transactionId>${transactionQuery.filterOptions.transactionId}</transactionId>
    </filterOptions>
  </request>
</rapi-request>`
}

export {
  fakeAuth,
  fakeAuthWithToken,
  fakeCapture,
  fakeVoid,
  fakeSale,
  fakeSaleWithFraudcheck,
  fakeSaleWithToken,
  fakeSaleWithTokenAndFraudcheck,
  fakeReturnPayment,
  fakeTransactionQuery,
  validAuthXML,
  validAuthWithTokenXML,
  validCaptureXML,
  validVoidXML,
  validSaleXML,
  validSaleWithFraudcheckXML,
  validSaleWithTokenXML,
  validSaleWithTokenAndFraudcheckXML,
  validReturnPaymentXML,
  validTransactionQueryXML,
}
