var xml2js = require('xml2js');
var xmlBuilder = function (options) { return new xml2js.Builder(options); };
var util = require('./../utils/utils');
var models = require('./models');

exports.buildAddCustomerXML = function (customer, mpAuth, xmlOptions) {
  var data = {};
  data.verification = mpAuth;
  data.command = 'add-consumer';
  data.request = util.formatObject(customer, models.addCustomer);
  return xmlBuilder(xmlOptions).buildObject({
    'api-request': data
  });
};
exports.buildUpdateCustomerXML = function (customer, mpAuth, xmlOptions) {
  var data = {};
  data.verification = mpAuth;
  data.command = 'update-consumer';
  data.request = util.formatObject(customer, models.updateCustomer);
  return xmlBuilder(xmlOptions).buildObject({
    'api-request': data
  });
};
exports.buildDeleteCustomerXML = function (customerId, mpAuth, xmlOptions) {
  var data = {};
  data.verification = mpAuth;
  data.command = 'delete-consumer';
  data.request = util.formatObject(customerId, models.deleteCustomer);
  return xmlBuilder(xmlOptions).buildObject({
    'api-request': data
  });
};


exports.buildZeroDollarXML = function (zeroDollar, mpAPIVersion, mpAuth, xmlOptions) {
  var data = {};
  data.version = mpAPIVersion;
  data.verification = mpAuth;
  data.order = {
    zeroDollar: util.formatObject(zeroDollar, models.zeroDollar)
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

  data.request = util.formatObject(card, models.addCard);
  return xmlBuilder(xmlOptions).buildObject({
    'api-request': data
  });
};
exports.buildDeleteCardXML = function (card, mpAuth, xmlOptions) {
  var data = {};
  data.verification = mpAuth;
  data.command = 'delete-card-onfile';
  data.request = util.formatObject(card, models.deleteCard);
  return xmlBuilder(xmlOptions).buildObject({
    'api-request': data
  });
};
exports.buildAuthXML = function (auth, mpAPIVersion, mpAuth, xmlOptions) {
  var data = {};
  data.version = mpAPIVersion;
  data.verification = mpAuth;
  data.order = {
    auth: util.formatObject(auth, models.sale)
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
    capture: util.formatObject(capture, models.capture)
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
    void: util.formatObject(_void, models.void)
  };
  return xmlBuilder(xmlOptions).buildObject({
    'transaction-request': data
  });
};
exports.buildSaleXML = function (sale, mpAPIVersion, mpAuth, xmlOptions) {
  var data = {};
  data.version = mpAPIVersion;
  data.verification = mpAuth;
  data.order = {
    sale: util.formatObject(sale, models.sale)
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
    return: util.formatObject(_return, models.returnPayment)
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
    recurringPayment: util.formatObject(recurringPayment, models.recurringPayment)
  };
  return xmlBuilder(xmlOptions).buildObject({
    'transaction-request': data
  });
};
exports.buildUpdateRecurringPaymentXML = function (updateRecurringPayment, mpAuth, xmlOptions) {
  var data = {};
  data.verification = mpAuth;
  data.command = 'modify-recurring';
  data.request = util.formatObject(updateRecurringPayment, models.updateRecurringPayment);
  return xmlBuilder(xmlOptions).buildObject({
    'api-request': data
  });
};
exports.buildCancelRecurringPaymentXML = function (cancelRecurringPayment, mpAuth, xmlOptions) {
  var data = {};
  data.verification = mpAuth;
  data.command = 'cancel-recurring';
  data.request = util.formatObject(cancelRecurringPayment, models.updateRecurringPayment)
  return xmlBuilder(xmlOptions).buildObject({
    'api-request': data
  });
};
