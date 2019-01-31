
var models = require('./models');
var utils = require('./../utils/utils');
var xml2js = require('react-native-xml2js');
var xmlBuilder = function (options) { return new xml2js.Builder(options); };

exports.buildAddCustomerXML = function (customer, mpAuth, xmlOptions) {
  var data = {};
  data.verification = mpAuth;
  data.command = 'add-consumer';
  data.request = utils.formatObject(customer, models.addCustomer);
  return xmlBuilder(xmlOptions).buildObject({
    'api-request': data
  });
};
exports.buildUpdateCustomerXML = function (customer, mpAuth, xmlOptions) {
  var data = {};
  data.verification = mpAuth;
  data.command = 'update-consumer';
  data.request = utils.formatObject(customer, models.updateCustomer);
  return xmlBuilder(xmlOptions).buildObject({
    'api-request': data
  });
};
exports.buildDeleteCustomerXML = function (customerId, mpAuth, xmlOptions) {
  var data = {};
  data.verification = mpAuth;
  data.command = 'delete-consumer';
  data.request = utils.formatObject(customerId, models.deleteCustomer);
  return xmlBuilder(xmlOptions).buildObject({
    'api-request': data
  });
};
exports.buildZeroDollarXML = function (zeroDollar, mpAPIVersion, mpAuth, xmlOptions) {
  var data = {};
  data.version = mpAPIVersion;
  data.verification = mpAuth;
  data.order = {
    zeroDollar: utils.formatObject(zeroDollar, models.zeroDollar)
  };
  return xmlBuilder(xmlOptions).buildObject({
    'transaction-request': data
  });
};
exports.buildAddCardXML = function (card, mpAuth, xmlOptions) {
  var data = {};
  data.verification = mpAuth;
  data.command = 'add-card-onfile';

  // fixing month length
  card.expirationMonth = ('00' + card.expirationMonth).slice(-2);

  data.request = utils.formatObject(card, models.addCard);
  return xmlBuilder(xmlOptions).buildObject({
    'api-request': data
  });
};
exports.buildDeleteCardXML = function (card, mpAuth, xmlOptions) {
  var data = {};
  data.verification = mpAuth;
  data.command = 'delete-card-onfile';
  data.request = utils.formatObject(card, models.deleteCard);
  return xmlBuilder(xmlOptions).buildObject({
    'api-request': data
  });
};
exports.buildAuthXML = function (auth, mpAPIVersion, mpAuth, xmlOptions) {
  var data = {};
  data.version = mpAPIVersion;
  data.verification = mpAuth;
  data.order = {
    auth: utils.formatObject(auth, models.sale)
  };
  return xmlBuilder(xmlOptions).buildObject({
    'transaction-request': data
  });
};
exports.buildCaptureXML = function (capture, mpAPIVersion, mpAuth, xmlOptions) {
  var data = {};
  data.version = mpAPIVersion;
  data.verification = mpAuth;
  data.order = {
    capture: utils.formatObject(capture, models.capture)
  };
  return xmlBuilder(xmlOptions).buildObject({
    'transaction-request': data
  });
};
exports.buildVoidXML = function (_void, mpAPIVersion, mpAuth, xmlOptions) {
  var data = {};
  data.version = mpAPIVersion;
  data.verification = mpAuth;
  data.order = {
    void: utils.formatObject(_void, models.void)
  };
  return xmlBuilder(xmlOptions).buildObject({
    'transaction-request': data
  });
};
exports.buildSaleXML = function (sale, mpAPIVersion, mpAuth, xmlOptions) {
  xmlOptions.explicitArray = true;
  xmlOptions.attrNameProcessors = true;
  var data = {};
  data.version = mpAPIVersion;
  data.verification = mpAuth;
  data.order = {
    sale: sale //util.formatObject(sale, models.sale)
  };
  return xmlBuilder(xmlOptions).buildObject({
    'transaction-request': data
  });
};
exports.buildReturnPaymentXML = function (_return, mpAPIVersion, mpAuth, xmlOptions) {
  var data = {};
  data.version = mpAPIVersion;
  data.verification = mpAuth;
  data.order = {
    return: utils.formatObject(_return, models.returnPayment)
  };
  return xmlBuilder(xmlOptions).buildObject({
    'transaction-request': data
  });
};
exports.buildRecurringPaymentXML = function (recurringPayment, mpAPIVersion, mpAuth, xmlOptions) {
  var data = {};
  data.version = mpAPIVersion;
  data.verification = mpAuth;
  data.order = {
    recurringPayment: utils.formatObject(recurringPayment, models.recurringPayment)
  };
  return xmlBuilder(xmlOptions).buildObject({
    'transaction-request': data
  });
};
exports.buildUpdateRecurringPaymentXML = function (updateRecurringPayment, mpAuth, xmlOptions) {
  var data = {};
  data.verification = mpAuth;
  data.command = 'modify-recurring';
  data.request = utils.formatObject(updateRecurringPayment, models.updateRecurringPayment);
  return xmlBuilder(xmlOptions).buildObject({
    'api-request': data
  });
};
exports.buildCancelRecurringPaymentXML = function (cancelRecurringPayment, mpAuth, xmlOptions) {
  var data = {};
  data.verification = mpAuth;
  data.command = 'cancel-recurring';
  data.request = utils.formatObject(cancelRecurringPayment, models.updateRecurringPayment)
  return xmlBuilder(xmlOptions).buildObject({
    'api-request': data
  });
};
exports.buildTransactionQueryXML = function (transactionId, mpAuth, xmlOptions) {
  var data = {};
  data.verification = mpAuth;
  data.command = 'transactionDetailReport';
  data.request = utils.formatObject(transactionId, models.transactionQuery);
  return xmlBuilder(xmlOptions).buildObject({
    'rapi-request': data
  });
};
