const authModel = {
  processorID: undefined,
  referenceNum: undefined,
  ipAddress: undefined,
  fraudCheck: undefined,
  customerIdExt: undefined,
  billing: {
    id: undefined,
    type: undefined,
    name: undefined,
    address: undefined,
    district: undefined,
    gender: undefined,
    birthDate: undefined,
    address2: undefined,
    city: undefined,
    state: undefined,
    postalcode: undefined,
    country: undefined,
    phone: undefined,
    email: undefined,
    phones: {
      phone: {
        phoneType: undefined,
        phoneCountryCode: undefined,
        phoneAreaCode: undefined,
        phoneNumber: undefined,
        phoneExtension: undefined,
      },
    },
    documents: {
      document: {
        documentType: undefined,
        documentValue: undefined,
      },
    },
  },
  transactionDetail: {
    payType: {
      boconsto: {
        expirationDate: undefined,
        number: undefined,
        instructions: undefined,
      },
      creditCard: {
        number: undefined,
        expMonth: undefined,
        expYear: undefined,
        cvvNumber: undefined,
      },
      onFile: {
        customerId: undefined,
        token: undefined,
      },
    },
  },
  saveOnFile: {
    customerToken: undefined,
    onFileEndDate: undefined,
  },
  payment: {
    currencyCode: undefined,
    chargeTotal: undefined,
    creditInstallment: {
      numberOfInstallments: undefined,
      chargeInterest: undefined,
    },
  },
  fraudDetails: {
    fraudProcessorID: undefined,
    fraudToken: undefined,
  },
}
export default authModel
