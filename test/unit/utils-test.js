var proxyquire = require('proxyquire');
var sinon = require('sinon');
var assert = require('assert');
var models = require('../../lib/core/models');

describe('>> core', function () {
  describe('**utils', function () {
    it('return an obj with only model attributes and in correct order', function () {
      var strict_obj = {
        a: undefined,
        b: undefined,
        c: {
          d: undefined
        }
      };
      var to_format = {
        d: 'd',
        c: {
          e: 'e',
          d: 'd',
          f: 'f'
        },
        b: 'b',
        a: 'a'
      };
      var expected = {
        a: 'a',
        b: 'b',
        c: {
          d: 'd'
        }
      };

      assert.notDeepEqual(Object.keys(to_format), Object.keys(strict_obj));
      assert.notDeepEqual(to_format, expected);

      var result = require('../../lib/utils/utils').formatObject(to_format, strict_obj);

      assert.deepEqual(result, expected);
      assert.deepEqual(Object.keys(result), Object.keys(strict_obj));
    });
  });
  describe('**xmlBuilders for maxiPago!', function () {
    var xml2js;
    var fn_buildObj;
    var formattedObj;
    var fn_formatObject;
    var mp_utils;

    before(function () {
      sandbox = sinon.sandbox.create();

      fn_buildObj = sandbox.spy();
      xml2js = {
        Builder: sandbox.spy(function () {
          return {
            buildObject: fn_buildObj
          };
        })
      };

      mp_utils = proxyquire('../../lib/utils/utils', {
        'xml2js': xml2js
      });

      formattedObj = 'formattedObj';
      fn_formatObject = sandbox.stub(mp_utils, 'formatObject');
      fn_formatObject.returns(formattedObj);
    });

    afterEach(function () {
      fn_buildObj.reset();
      xml2js = {
        Builder: sandbox.spy(function () {
          return {
            buildObject: fn_buildObj
          };
        })
      };
      mp_utils = proxyquire('../../lib/utils/utils', {
        'xml2js': xml2js
      });

      formattedObj = 'formattedObj';
      fn_formatObject = sandbox.stub(mp_utils, 'formatObject');
      fn_formatObject.returns(formattedObj);
    });

    after(function () {
      sandbox.restore();
    });

    it('build AddCustomerXML', function () {
      var data = {
        'data': 'data'
      };
      var auth = {
        'auth': 'auth'
      };
      var xmlOpts = {
        'opt': 'opt'
      };

      mp_utils.buildAddCustomerXML(data, auth, xmlOpts);

      assert.ok(fn_formatObject.calledOnce);
      assert.ok(fn_formatObject.calledWithExactly(data, models.addCustomer));

      assert.ok(xml2js.Builder.calledOnce);
      assert.ok(xml2js.Builder.calledWithExactly(xmlOpts));

      assert.ok(fn_buildObj.calledOnce);
      assert.ok(fn_buildObj.calledWithExactly({
        'api-request': {
          verification: auth,
          command: 'add-consumer',
          request: formattedObj
        }
      }));
    });
    it('build UpdateCustomerXML', function () {
      var data = {
        'data': 'data'
      };
      var auth = {
        'auth': 'auth'
      };
      var xmlOpts = {
        'opt': 'opt'
      };

      mp_utils.buildUpdateCustomerXML(data, auth, xmlOpts);
      assert.ok(fn_formatObject.calledOnce);
      assert.ok(fn_formatObject.calledWithExactly(data, models.updateCustomer));

      assert.ok(xml2js.Builder.calledOnce);
      assert.ok(xml2js.Builder.calledWithExactly(xmlOpts));

      assert.ok(fn_buildObj.calledOnce);
      assert.ok(fn_buildObj.calledWithExactly({
        'api-request': {
          verification: auth,
          command: 'update-consumer',
          request: formattedObj
        }
      }));
    });

    it('build AddCardXML', function () {
      var data = {
        'expirationMonth': 12
      };
      var fixedData = {
        'expirationMonth': '12'
      };
      var auth = {
        'auth': 'auth'
      };
      var xmlOpts = {
        'opt': 'opt'
      };

      mp_utils.buildAddCardXML(data, auth, xmlOpts);

      assert.ok(fn_formatObject.calledOnce);
      assert.ok(fn_formatObject.calledWithExactly(fixedData, models.addCard));

      assert.ok(xml2js.Builder.calledOnce);
      assert.ok(xml2js.Builder.calledWithExactly(xmlOpts));

      assert.ok(fn_buildObj.calledOnce);
      assert.ok(fn_buildObj.calledWithExactly({
        'api-request': {
          verification: auth,
          command: 'add-card-onfile',
          request: formattedObj
        }
      }));
    });
    it('build AddCardXML with month < 10', function () {
      var data = {
        'expirationMonth': 12
      };
      var fixedData = {
        'expirationMonth': '12'
      };
      var auth = {
        'auth': 'auth'
      };
      var xmlOpts = {
        'opt': 'opt'
      };


      mp_utils.buildAddCardXML(data, auth, xmlOpts);

      assert.ok(fn_formatObject.calledOnce);
      assert.ok(fn_formatObject.calledWithExactly(fixedData, models.addCard));

      assert.ok(xml2js.Builder.calledOnce);
      assert.ok(xml2js.Builder.calledWithExactly(xmlOpts));

      assert.ok(fn_buildObj.calledOnce);
      assert.ok(fn_buildObj.calledWithExactly({
        'api-request': {
          verification: auth,
          command: 'add-card-onfile',
          request: formattedObj
        }
      }));
    });
    it('build DeleteCardXML', function () {
      var data = {
        'data': 'data'
      };
      var auth = {
        'auth': 'auth'
      };
      var xmlOpts = {
        'opt': 'opt'
      };

      mp_utils.buildDeleteCardXML(data, auth, xmlOpts);

      assert.ok(fn_formatObject.calledOnce);
      assert.ok(fn_formatObject.calledWithExactly(data, models.deleteCard));

      assert.ok(xml2js.Builder.calledOnce);
      assert.ok(xml2js.Builder.calledWithExactly(xmlOpts));

      assert.ok(fn_buildObj.calledOnce);
      assert.ok(fn_buildObj.calledWithExactly({
        'api-request': {
          verification: auth,
          command: 'delete-card-onfile',
          request: formattedObj
        }
      }));
    });

    it('build AuthXML', function () {
      var data = {
        'data': 'data'
      };
      var version = {
        'version': 'version'
      };
      var auth = {
        'auth': 'auth'
      };
      var xmlOpts = {
        'opt': 'opt'
      };

      mp_utils.buildAuthXML(data, version, auth, xmlOpts);

      assert.ok(fn_formatObject.calledOnce);
      assert.ok(fn_formatObject.calledWithExactly(data, models.sale));

      assert.ok(xml2js.Builder.calledOnce);
      assert.ok(xml2js.Builder.calledWithExactly(xmlOpts));

      assert.ok(fn_buildObj.calledOnce);
      assert.ok(fn_buildObj.calledWithExactly({
        'transaction-request': {
          version: version,
          verification: auth,
          order: {
            auth: formattedObj
          }
        }
      }));
    });
    it('build CaptureXML', function () {
      var data = {
        'data': 'data'
      };
      var version = {
        'version': 'version'
      };
      var auth = {
        'auth': 'auth'
      };
      var xmlOpts = {
        'opt': 'opt'
      };

      mp_utils.buildCaptureXML(data, version, auth, xmlOpts);

      assert.ok(fn_formatObject.calledOnce);
      assert.ok(fn_formatObject.calledWithExactly(data, models.capture));

      assert.ok(xml2js.Builder.calledOnce);
      assert.ok(xml2js.Builder.calledWithExactly(xmlOpts));

      assert.ok(fn_buildObj.calledOnce);
      assert.ok(fn_buildObj.calledWithExactly({
        'transaction-request': {
          version: version,
          verification: auth,
          order: {
            capture: formattedObj
          }
        }
      }));
    });
    it('build SaleXML', function () {
      var data = {
        'data': 'data'
      };
      var version = {
        'version': 'version'
      };
      var auth = {
        'auth': 'auth'
      };
      var xmlOpts = {
        'opt': 'opt'
      };

      mp_utils.buildSaleXML(data, version, auth, xmlOpts);

      assert.ok(fn_formatObject.calledOnce);
      assert.ok(fn_formatObject.calledWithExactly(data, models.sale));

      assert.ok(xml2js.Builder.calledOnce);
      assert.ok(xml2js.Builder.calledWithExactly(xmlOpts));

      assert.ok(fn_buildObj.calledOnce);
      assert.ok(fn_buildObj.calledWithExactly({
        'transaction-request': {
          version: version,
          verification: auth,
          order: {
            sale: formattedObj
          }
        }
      }));
    });
    it('build ReturnPaymentXML', function () {
      var data = {
        'data': 'data'
      };
      var version = {
        'version': 'version'
      };
      var auth = {
        'auth': 'auth'
      };
      var xmlOpts = {
        'opt': 'opt'
      };

      mp_utils.buildReturnPaymentXML(data, version, auth, xmlOpts);

      assert.ok(fn_formatObject.calledOnce);
      assert.ok(fn_formatObject.calledWithExactly(data, models.returnPayment));

      assert.ok(xml2js.Builder.calledOnce);
      assert.ok(xml2js.Builder.calledWithExactly(xmlOpts));

      assert.ok(fn_buildObj.calledOnce);
      assert.ok(fn_buildObj.calledWithExactly({
        'transaction-request': {
          version: version,
          verification: auth,
          order: {
            return: formattedObj
          }
        }
      }));
    });

    it('build RecurringPaymentXML', function () {
      var data = {
        'data': 'data'
      };
      var version = {
        'version': 'version'
      };
      var auth = {
        'auth': 'auth'
      };
      var xmlOpts = {
        'opt': 'opt'
      };

      mp_utils.buildRecurringPaymentXML(data, version, auth, xmlOpts);

      assert.ok(fn_formatObject.calledOnce);
      assert.ok(fn_formatObject.calledWithExactly(data, models.recurringPayment));

      assert.ok(xml2js.Builder.calledOnce);
      assert.ok(xml2js.Builder.calledWithExactly(xmlOpts));

      assert.ok(fn_buildObj.calledOnce);
      assert.ok(fn_buildObj.calledWithExactly({
        'transaction-request': {
          version: version,
          verification: auth,
          order: {
            recurringPayment: formattedObj
          }
        }
      }));
    });
    it('build UpdateRecurringPaymentXML', function () {
      var data = {
        'data': 'data'
      };
      var auth = {
        'auth': 'auth'
      };
      var xmlOpts = {
        'opt': 'opt'
      };

      mp_utils.buildUpdateRecurringPaymentXML(data, auth, xmlOpts);

      assert.ok(fn_formatObject.calledOnce);
      assert.ok(fn_formatObject.calledWithExactly(data, models.updateRecurringPayment));

      assert.ok(xml2js.Builder.calledOnce);
      assert.ok(xml2js.Builder.calledWithExactly(xmlOpts));

      assert.ok(fn_buildObj.calledOnce);
      assert.ok(fn_buildObj.calledWithExactly({
        'api-request': {
          verification: auth,
          command: 'modify-recurring',
          request: formattedObj
        }
      }));
    });
    it('build CancelRecurringPaymentXML', function () {
      var data = {
        'data': 'data'
      };
      var auth = {
        'auth': 'auth'
      };
      var xmlOpts = {
        'opt': 'opt'
      };

      mp_utils.buildCancelRecurringPaymentXML(data, auth, xmlOpts);

      assert.ok(fn_formatObject.calledOnce);
      assert.ok(fn_formatObject.calledWithExactly(data, models.updateRecurringPayment));

      assert.ok(xml2js.Builder.calledOnce);
      assert.ok(xml2js.Builder.calledWithExactly(xmlOpts));

      assert.ok(fn_buildObj.calledOnce);
      assert.ok(fn_buildObj.calledWithExactly({
        'api-request': {
          verification: auth,
          command: 'cancel-recurring',
          request: formattedObj
        }
      }));
    });

  });
});
