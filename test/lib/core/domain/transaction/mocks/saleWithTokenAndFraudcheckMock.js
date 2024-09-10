import { faker } from '@faker-js/faker'

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

export { fakeSaleWithTokenAndFraudcheck, validSaleWithTokenAndFraudcheckXML }
