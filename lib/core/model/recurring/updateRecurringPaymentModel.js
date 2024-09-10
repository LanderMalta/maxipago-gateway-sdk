const updateRecurringPaymentModel = {
  orderID: undefined,
  paymentInfo: {
    cardInfo: {
      creditCardNumber: undefined,
      expirationMonth: undefined,
      expirationYear: undefined,
      chargeTotal: undefined,
    },
  },
  recurring: {
    processorID: undefined,
    action: undefined,
    installments: undefined,
    nextFireDate: undefined,
    fireDay: undefined,
    period: undefined,
    lastDate: undefined,
    lastAmount: undefined,
  },
  billingInfo: {
    name: undefined,
    address1: undefined,
    address2: undefined,
    city: undefined,
    zip: undefined,
    country: undefined,
    email: undefined,
    phone: undefined,
  },
  shippingInfo: {
    name: undefined,
    address1: undefined,
    address2: undefined,
    city: undefined,
    zip: undefined,
    country: undefined,
    email: undefined,
    phone: undefined,
  },
}
export default updateRecurringPaymentModel
