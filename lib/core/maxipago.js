import { addCustomer } from './domain/customer/addCustomer'
import { updateCustomer } from './domain/customer/updateCustomer'
import { deleteCustomer } from './domain/customer/deleteCustomer'
import { addCard } from './domain/card/addCard'
import { deleteCard } from './domain/card/deleteCard'
import { zeroDollar } from './domain/card/zeroDollar'
import { auth } from './domain/transaction/auth'
import { capture } from './domain/transaction/capture'
import { _void } from './domain/transaction/void'
import { sale } from './domain/transaction/sale'
import { returnPayment } from './domain/transaction/returnPayment'
import { transactionQuery } from './domain/transaction/transactionQuery'
import { recurringPayment } from './domain/recurring/recurringPayment'
import { updateRecurringPayment } from './domain/recurring/updateRecurringPayment'
import { cancelRecurringPayment } from './domain/recurring/cancelRecurringPayment'

export default class Gateway {
  constructor(merchantId, merchantKey, maxiPagoEnv) {
    if (!merchantKey) {
      throw new Error('Merchant Key not found.')
    }

    this.merchantId = merchantId
    this.merchantKey = merchantKey
    this.maxiPagoApiVersion = '3.1.1.15'
    this.maxiPagoBaseURL =
      'https://' +
      (maxiPagoEnv.toLowerCase() !== 'production' ? 'test' : '') +
      'api.maxipago.net'
    this.maxiPagoHeaders = {
      headers: { 'Content-Type': 'text/xml charset=utf-8' },
    }
    this.maxiPagoAuth = { merchantId: merchantId, merchantKey: merchantKey }
    this.maxiPagoPostApiEndpoint = '/UniversalAPI/postAPI'
    this.maxiPagoPostXMLEndpoint = '/UniversalAPI/postXML'
    this.maxiPagoReportsEndpoint = '/ReportsAPI/servconst/ReportsAPI'
    this.xmlOptions = {
      explicitRoot: false,
      explicitArray: true,
    }
  }

  addCustomer(_customer) {
    return addCustomer(
      _customer,
      this.maxiPagoBaseURL,
      this.maxiPagoPostApiEndpoint,
      this.maxiPagoAuth,
      this.maxiPagoHeaders,
      this.xmlOptions,
    )
  }

  updateCustomer(_customer) {
    return updateCustomer(
      _customer,
      this.maxiPagoBaseURL,
      this.maxiPagoPostApiEndpoint,
      this.maxiPagoAuth,
      this.maxiPagoHeaders,
      this.xmlOptions,
    )
  }

  deleteCustomer(_customerId) {
    return deleteCustomer(
      _customerId,
      this.maxiPagoBaseURL,
      this.maxiPagoPostApiEndpoint,
      this.maxiPagoAuth,
      this.maxiPagoHeaders,
      this.xmlOptions,
    )
  }

  addCard(_card) {
    return addCard(
      _card,
      this.maxiPagoBaseURL,
      this.maxiPagoPostApiEndpoint,
      this.maxiPagoAuth,
      this.maxiPagoHeaders,
      this.xmlOptions,
    )
  }

  deleteCard(_deleteCard) {
    return deleteCard(
      _deleteCard,
      this.maxiPagoBaseURL,
      this.maxiPagoPostApiEndpoint,
      this.maxiPagoAuth,
      this.maxiPagoHeaders,
      this.xmlOptions,
    )
  }

  zeroDollar(_card) {
    return zeroDollar(
      _card,
      this.maxiPagoBaseURL,
      this.maxiPagoPostXMLEndpoint,
      this.maxiPagoApiVersion,
      this.maxiPagoAuth,
      this.maxiPagoHeaders,
      this.xmlOptions,
    )
  }

  auth(_auth) {
    return auth(
      _auth,
      this.maxiPagoBaseURL,
      this.maxiPagoPostXMLEndpoint,
      this.maxiPagoApiVersion,
      this.maxiPagoAuth,
      this.maxiPagoHeaders,
      this.xmlOptions,
    )
  }

  capture(_capture) {
    return capture(
      _capture,
      this.maxiPagoBaseURL,
      this.maxiPagoPostXMLEndpoint,
      this.maxiPagoApiVersion,
      this.maxiPagoAuth,
      this.maxiPagoHeaders,
      this.xmlOptions,
    )
  }

  void(__void) {
    return _void(
      __void,
      this.maxiPagoBaseURL,
      this.maxiPagoPostXMLEndpoint,
      this.maxiPagoApiVersion,
      this.maxiPagoAuth,
      this.maxiPagoHeaders,
      this.xmlOptions,
    )
  }

  sale(_sale) {
    return sale(
      _sale,
      this.maxiPagoBaseURL,
      this.maxiPagoPostXMLEndpoint,
      this.maxiPagoApiVersion,
      this.maxiPagoAuth,
      this.maxiPagoHeaders,
      this.xmlOptions,
    )
  }

  returnPayment(_return) {
    return returnPayment(
      _return,
      this.maxiPagoBaseURL,
      this.maxiPagoPostXMLEndpoint,
      this.maxiPagoApiVersion,
      this.maxiPagoAuth,
      this.maxiPagoHeaders,
      this.xmlOptions,
    )
  }

  transactionQuery(_query) {
    return transactionQuery(
      _query,
      this.maxiPagoBaseURL,
      this.maxiPagoReportsEndpoint,
      this.maxiPagoAuth,
      this.maxiPagoHeaders,
      this.xmlOptions,
    )
  }

  recurringPayment(_recurringPayment) {
    return recurringPayment(
      _recurringPayment,
      this.maxiPagoBaseURL,
      this.maxiPagoPostXMLEndpoint,
      this.maxiPagoApiVersion,
      this.maxiPagoAuth,
      this.maxiPagoHeaders,
      this.xmlOptions,
    )
  }

  updateRecurringPayment(_recurringPayment) {
    return updateRecurringPayment(
      _recurringPayment,
      this.maxiPagoBaseURL,
      this.maxiPagoPostApiEndpoint,
      this.maxiPagoAuth,
      this.maxiPagoHeaders,
      this.xmlOptions,
    )
  }

  cancelRecurringPayment(_recurringPayment) {
    return cancelRecurringPayment(
      _recurringPayment,
      this.maxiPagoBaseURL,
      this.maxiPagoPostApiEndpoint,
      this.maxiPagoAuth,
      this.maxiPagoHeaders,
      this.xmlOptions,
    )
  }
}
