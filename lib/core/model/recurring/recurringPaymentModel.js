const recurringPaymentModel = {
  processorID: undefined,
  referenceNum: undefined,
  ipAddress: undefined,
  billing: {
    name: undefined,
    address: undefined,
    address2: undefined,
    city: undefined,
    state: undefined,
    postalcode: undefined,
    country: undefined,
    phone: undefined,
    email: undefined,
  },
  shipping: {
    name: undefined,
    address: undefined,
    address2: undefined,
    city: undefined,
    state: undefined,
    postalcode: undefined,
    country: undefined,
    phone: undefined,
    email: undefined,
  },
  transactionDetail: {
    payType: {
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
  payment: {
    currencyCode: undefined,
    chargeTotal: undefined,
  },
  recurring: {
    action: undefined,
    startDate: undefined,
    frequency: undefined,
    period: undefined,
    installments: undefined,
    firstAmount: undefined,
    lastAmount: undefined,
    lastDate: undefined,
    failureThreshold: undefined,
  },
}
export default recurringPaymentModel
