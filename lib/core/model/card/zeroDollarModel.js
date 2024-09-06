const zeroDollarModel = {
  processorID: undefined,
  referenceNum: undefined,
  transactionDetail: {
    payType: {
      creditCard: {
        number: undefined,
        expMonth: undefined,
        expYear: undefined,
        cvvNumber: undefined,
      },
    },
  },
  payment: {
    chargeTotal: undefined,
  },
  saveOnFile: {
    customerToken: undefined,
    onFileEndDate: undefined,
  },
}
export default zeroDollarModel
