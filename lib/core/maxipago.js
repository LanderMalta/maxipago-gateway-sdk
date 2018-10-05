var xml2js = require("xml2js");
var restify = require("restify-clients");
var xmlBuilders = require("../core/xmlBuilders");
var axios = require("axios");
var convert = require('xml-js');

exports.Gateway = (function () {
  var MP_API_VERSION = "3.1.1.15";
  var MP_AUTH = {};
  var MP_POST_API = "/UniversalAPI/postAPI";
  var MP_POST_XML = "/UniversalAPI/postXML";
  var XML_OPTIONS = {
    explicitRoot: false,
    explicitArray: false
  };

  var _buildGateway = function (testMerchantId, testMerchantKey, maxiPagoEnv) {
    return new Gateway(testMerchantId, testMerchantKey, maxiPagoEnv);
  };
  exports.buildGateway = _buildGateway;
  var reqHandler = function (callback) {
    return function (err, req, res, xmlResponse) {
      if (err) return callback(err);
      xml2js.parseString(xmlResponse, XML_OPTIONS, function (err, obj) {
        if (err) return callback(err);
        return callback(obj.errorMessage, obj);
      });
    };
  };
  
  function nativeType(value) {
    var nValue = Number(value);
    if (!isNaN(nValue)) {
      return nValue;
    }
    var bValue = value.toLowerCase();
    if (bValue === 'true') {
      return true;
    } else if (bValue === 'false') {
      return false;
    }
    return value;
  }
  var removeJsonTextAttribute = function (value, parentElement) {
    try {
      var keyNo = Object.keys(parentElement._parent).length;
      var keyName = Object.keys(parentElement._parent)[keyNo - 1];
      parentElement._parent[keyName] = nativeType(value);
    } catch (e) { }
  }

  function Gateway(merchantId, merchantKey, maxiPagoEnv) {
    if (!merchantKey) {
      throw new Error("No merchantKey found");
    }
    this.test = maxiPagoEnv.toLowerCase() !== "production";
    MP_BASEURL = "https://" + (this.test ? "test" : "") + "api.maxipago.net"
    MP_HEADERS = { headers: { "Content-Type": "text/xml; charset=utf-8" } }
    MP_AUTH = {
      merchantId: merchantId,
      merchantKey: merchantKey
    };
    this.client = restify.createStringClient({
      url: "https://" + (this.test ? "test" : "") + "api.maxipago.net",
      contentType: "text/xml; charset=utf-8"
    });

    this.addCustomer2 = async function (client) {
      let clientXML = xmlBuilders.buildAddCustomerXML(
        client,
        MP_AUTH,
        XML_OPTIONS
      );
      let xmlResponse = await axios.post(MP_BASEURL + MP_POST_API, clientXML, MP_HEADERS);

      var options = {
        compact: true,
        trim: true,
        ignoreDeclaration: true,
        ignoreInstruction: true,
        ignoreAttributes: true,
        ignoreComment: true,
        ignoreCdata: true,
        ignoreDoctype: true,
        textFn: removeJsonTextAttribute
      };

      var xml = xmlResponse.data.replace('api-response', 'response');
      var xml = xml.replace('api-response', 'response');
      var jsonResponse = JSON.parse(convert.xml2json(xml, options));

      return jsonResponse.response;
    };

    this.addCustomer = function (client, callback) {
      var clientXML = xmlBuilders.buildAddCustomerXML(
        client,
        MP_AUTH,
        XML_OPTIONS
      );
      this.client.post(MP_POST_API, clientXML, reqHandler(callback));
    };
    this.updateCustomer = function (client, callback) {
      var clientXML = xmlBuilders.buildUpdateCustomerXML(
        client,
        MP_AUTH,
        XML_OPTIONS
      );
      this.client.post(MP_POST_API, clientXML, reqHandler(callback));
    };
    this.deleteCustomer = function (client, callback) {
      var clientXML = xmlBuilders.buildDeleteCustomerXML(
        client,
        MP_AUTH,
        XML_OPTIONS
      );
      this.client.post(MP_POST_API, clientXML, reqHandler(callback));
    };
    this.addCard = function (card, callback) {
      var cardXML = xmlBuilders.buildAddCardXML(card, MP_AUTH, XML_OPTIONS);
      this.client.post(MP_POST_API, cardXML, reqHandler(callback));
    };
    this.deleteCard = function (card, callback) {
      var cardXML = xmlBuilders.buildDeleteCardXML(card, MP_AUTH, XML_OPTIONS);
      this.client.post(MP_POST_API, cardXML, reqHandler(callback));
    };
    this.auth = function (auth, callback) {
      var authXML = xmlBuilders.buildAuthXML(
        auth,
        MP_API_VERSION,
        MP_AUTH,
        XML_OPTIONS
      );
      this.client.post(MP_POST_XML, authXML, reqHandler(callback));
    };
    this.capture = function (capture, callback) {
      var captureXML = xmlBuilders.buildCaptureXML(
        capture,
        MP_API_VERSION,
        MP_AUTH,
        XML_OPTIONS
      );
      this.client.post(MP_POST_XML, captureXML, reqHandler(callback));
    };
    this.void = function (_void, callback) {
      var voidXML = xmlBuilders.buildVoidXML(
        _void,
        MP_API_VERSION,
        MP_AUTH,
        XML_OPTIONS
      );
      this.client.post(MP_POST_XML, voidXML, reqHandler(callback));
    };
    this.sale = function (sale, callback) {
      var saleXML = xmlBuilders.buildSaleXML(
        sale,
        MP_API_VERSION,
        MP_AUTH,
        XML_OPTIONS
      );
      this.client.post(MP_POST_XML, saleXML, reqHandler(callback));
    };
    this.returnPayment = function (_return, callback) {
      var returnPaymentXML = xmlBuilders.buildReturnPaymentXML(
        _return,
        MP_API_VERSION,
        MP_AUTH,
        XML_OPTIONS
      );
      this.client.post(MP_POST_XML, returnPaymentXML, reqHandler(callback));
    };
    this.recurringPayment = function (recurringPayment, callback) {
      var recurringPaymentXML = xmlBuilders.buildRecurringPaymentXML(
        recurringPayment,
        MP_API_VERSION,
        MP_AUTH,
        XML_OPTIONS
      );
      this.client.post(MP_POST_XML, recurringPaymentXML, reqHandler(callback));
    };
    this.updateRecurringPayment = function (updateRecurringPayment, callback) {
      var updateRecurringPaymentXML = xmlBuilders.buildUpdateRecurringPaymentXML(
        updateRecurringPayment,
        MP_AUTH,
        XML_OPTIONS
      );
      this.client.post(
        MP_POST_API,
        updateRecurringPaymentXML,
        reqHandler(callback)
      );
    };
    this.cancelRecurringPayment = function (cancelRecurringPayment, callback) {
      var cancelRecurringPaymentXML = xmlBuilders.buildCancelRecurringPaymentXML(
        cancelRecurringPayment,
        MP_AUTH,
        XML_OPTIONS
      );
      this.client.post(
        MP_POST_API,
        cancelRecurringPaymentXML,
        reqHandler(callback)
      );
    };

    return this;
  }

  return Gateway;
})();
