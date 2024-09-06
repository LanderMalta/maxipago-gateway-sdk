import { faker } from '@faker-js/faker'

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

export { fakeSaleWithFraudcheck, validSaleWithFraudcheckXML }
