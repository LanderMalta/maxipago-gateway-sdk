var maxipago = require('../../lib/core/maxipago');
var mockData = require('../../lib/utils/mockData');
var assert = require('assert');
var moment = require('moment');

require('dotenv').config({ path: '../.env' })
var testMerchantId = process.env.MP_TEST_ID;
var testMerchantKey = process.env.MP_TEST_KEY;

describe('>> gateway requests', function () {
  var start, count, itTimeout = 30000, mpGateway = null;
  this.timeout(itTimeout);
  before(function () {
    count = 0;
    start = moment();
    mpGateway = new maxipago.Gateway(testMerchantId, testMerchantKey, true);
  });
  beforeEach(function () {
    count++;
  });
  after(function () {
    var total = moment() - start;
    if (total >= (0.25 * count * itTimeout)) {
      console.warn('Test suite taken too long! ' + total + 'ms');
    }
  });

  describe('customer', function () {
    it('add customer basic data', function (done) {
      var client = mockData.fakeClient();

      /** add client **/
      mpGateway.addCustomer(
        client,
        function (err, mp_err, data) {
          assert.ok(!err);
          assert.ok(!mp_err);
          assert.equal(data.errorCode, '0');
          assert.equal(data.errorMessage, '');
          assert.equal(data.command, 'add-consumer');
          assert.ok(data.hasOwnProperty('result'));
          assert.ok(data.result.hasOwnProperty('customerId'));
          var deleteCustomer = mockData.fakeDeleteCustomer(data.result.customerId);

          /** delete client **/
          mpGateway.deleteCustomer(deleteCustomer, function (err, mp_err, data) {
            assert.ok(!err);
            assert.ok(!mp_err);
            assert.equal(data.errorCode, '0');
            assert.equal(data.errorMessage, '');
            assert.equal(data.command, 'delete-consumer');
            assert.ok(data.hasOwnProperty('result'));
            assert.equal(data.result, '');
            done();
          });
        });
    });
    it('add customer full data', function (done) {
      var client = mockData.fakeFullClient();

      /** add client **/
      mpGateway.addCustomer(
        client,
        function (err, mp_err, data) {
          assert.ok(!err);
          assert.ok(!mp_err);
          assert.equal(data.errorCode, '0');
          assert.equal(data.errorMessage, '');
          assert.equal(data.command, 'add-consumer');
          assert.ok(data.hasOwnProperty('result'));
          assert.ok(data.result.hasOwnProperty('customerId'));
          var deleteCustomer = mockData.fakeDeleteCustomer(data.result.customerId);

          /** delete client **/
          mpGateway.deleteCustomer(deleteCustomer, function (err, mp_err, data) {
            assert.ok(!err);
            assert.ok(!mp_err);
            assert.equal(data.errorCode, '0');
            assert.equal(data.errorMessage, '');
            assert.equal(data.command, 'delete-consumer');
            assert.ok(data.hasOwnProperty('result'));
            assert.equal(data.result, '');
            done();
          });
        });
    });
    it('add customer full data with unordered request', function (done) {
      var client = mockData.fakeFullClient();
      var unordered_client = {};
      Object.keys(client).reverse().forEach(function (key) {
        unordered_client[key] = client[key];
      });

      /** add client **/
      mpGateway.addCustomer(
        unordered_client,
        function (err, mp_err, data) {
          assert.ok(!err);
          assert.ok(!mp_err);
          assert.equal(data.errorCode, '0');
          assert.equal(data.errorMessage, '');
          assert.equal(data.command, 'add-consumer');
          assert.ok(data.hasOwnProperty('result'));
          assert.ok(data.result.hasOwnProperty('customerId'));
          var deleteCustomer = mockData.fakeDeleteCustomer(data.result.customerId);

          /** delete client **/
          mpGateway.deleteCustomer(deleteCustomer, function (err, mp_err, data) {
            assert.ok(!err);
            assert.ok(!mp_err);
            assert.equal(data.errorCode, '0');
            assert.equal(data.errorMessage, '');
            assert.equal(data.command, 'delete-consumer');
            assert.ok(data.hasOwnProperty('result'));
            assert.equal(data.result, '');
            done();
          });
        });
    });
    it('update customer data', function (done) {
      var client = mockData.fakeClient();

      /** add client **/
      mpGateway.addCustomer(
        client,
        function (err, mp_err, data) {
          var cId = data.result.customerId;
          client.customerId = cId;
          client.firstName += ' updated';
          client.lastName += ' updated';

          /** update client **/
          mpGateway.updateCustomer(client, function (err, mp_err, data) {
            assert.ok(!err);
            assert.ok(!mp_err);
            assert.equal(data.errorCode, '0');
            assert.equal(data.errorMessage, '');
            assert.equal(data.command, 'update-consumer');
            assert.ok(data.hasOwnProperty('result'));
            assert.equal(data.result, '');
            var deleteCustomer = mockData.fakeDeleteCustomer(cId);

            /** delete client **/
            mpGateway.deleteCustomer(deleteCustomer, function (err, mp_err, data) {
              assert.ok(!err);
              assert.ok(!mp_err);
              assert.equal(data.errorCode, '0');
              assert.equal(data.errorMessage, '');
              assert.equal(data.command, 'delete-consumer');
              assert.ok(data.hasOwnProperty('result'));
              assert.equal(data.result, '');
              done();
            });
          });
        });
    });
    it('update customer data with unordered request', function (done) {
      var client = mockData.fakeClient();
      var unordered_client = {};
      Object.keys(client).reverse().forEach(function (key) {
        unordered_client[key] = client[key];
      });

      /** add client **/
      mpGateway.addCustomer(
        client,
        function (err, mp_err, data) {
          var cId = data.result.customerId;
          unordered_client.customerId = cId;
          unordered_client.firstName += ' updated';
          unordered_client.lastName += ' updated';

          /** update client **/
          mpGateway.updateCustomer(unordered_client, function (err, mp_err, data) {
            assert.ok(!err);
            assert.ok(!mp_err);
            assert.equal(data.errorCode, '0');
            assert.equal(data.errorMessage, '');
            assert.equal(data.command, 'update-consumer');
            assert.ok(data.hasOwnProperty('result'));
            assert.equal(data.result, '');
            var deleteCustomer = mockData.fakeDeleteCustomer(cId);

            /** delete client **/
            mpGateway.deleteCustomer(deleteCustomer, function (err, mp_err, data) {
              assert.ok(!err);
              assert.ok(!mp_err);
              assert.equal(data.errorCode, '0');
              assert.equal(data.errorMessage, '');
              assert.equal(data.command, 'delete-consumer');
              assert.ok(data.hasOwnProperty('result'));
              assert.equal(data.result, '');
              done();
            });
          });
        });
    });
    it('delete customer data', function (done) {
      var client = mockData.fakeClient();

      /** add client **/
      mpGateway.addCustomer(
        client,
        function (err, mp_err, data) {
          var deleteCustomer = mockData.fakeDeleteCustomer(data.result.customerId);

          /** delete client **/
          mpGateway.deleteCustomer(deleteCustomer, function (err, mp_err, data) {
            assert.ok(!err);
            assert.ok(!mp_err);
            assert.equal(data.errorCode, '0');
            assert.equal(data.errorMessage, '');
            assert.equal(data.command, 'delete-consumer');
            assert.ok(data.hasOwnProperty('result'));
            assert.equal(data.result, '');
            done();
          });
        });
    });
  });

  describe('card', function () {
    it('add new card', function (done) {
      var client = mockData.fakeClient();

      /** add client **/
      mpGateway.addCustomer(client, function (err, mp_err, data) {
        var cId = data.result.customerId;
        var card = mockData.fakeAddCard(cId);

        /** add card **/
        mpGateway.addCard(
          card,
          function (err, mp_err, data) {
            assert.ok(!err);
            assert.ok(!mp_err);
            assert.equal(data.errorCode, '0');
            assert.equal(data.errorMessage, '');
            assert.equal(data.command, 'add-card-onfile');
            assert.ok(data.hasOwnProperty('result'));
            assert.ok(data.result.hasOwnProperty('token'));
            var cardToken = data.result.token;
            var deletedCard = mockData.fakeDeleteCard(cId, cardToken);

            /** delete card **/
            mpGateway.deleteCard(
              deletedCard,
              function (err, mp_err, data) {
                assert.ok(!err);
                assert.ok(!mp_err);
                assert.equal(data.errorCode, '0');
                assert.equal(data.errorMessage, '');
                assert.equal(data.command, 'delete-card-onfile');
                var deleteCustomer = mockData.fakeDeleteCustomer(cId);

                /** delete client **/
                mpGateway.deleteCustomer(deleteCustomer, function (err, mp_err, data) {
                  assert.ok(!err);
                  assert.ok(!mp_err);
                  assert.equal(data.errorCode, '0');
                  assert.equal(data.errorMessage, '');
                  assert.equal(data.command, 'delete-consumer');
                  assert.ok(data.hasOwnProperty('result'));
                  assert.equal(data.result, '');
                  done();
                });
              });
          });
      });
    });
    it('add existing card', function (done) {
      var client = mockData.fakeClient();

      /** add client **/
      mpGateway.addCustomer(client, function (err, mp_err, data) {
        var cId = data.result.customerId;
        var card = mockData.fakeAddCard(cId);

        /** add card **/
        mpGateway.addCard(
          card,
          function (err, mp_err, data) {
            var token = data.result.token;

            /** add card **/
            mpGateway.addCard(
              card,
              function (err, mp_err, data) {
                assert.ok(!err);
                assert.ok(!mp_err);
                assert.equal(data.result.token, token);
                var cardToken = data.result.token;
                var deletedCard = mockData.fakeDeleteCard(cId, cardToken);

                /** delete card **/
                mpGateway.deleteCard(
                  deletedCard,
                  function (err, mp_err, data) {
                    assert.ok(!err);
                    assert.ok(!mp_err);
                    assert.equal(data.errorCode, '0');
                    assert.equal(data.errorMessage, '');
                    assert.equal(data.command, 'delete-card-onfile');

                    /** delete client **/
                    var deleteCustomer = mockData.fakeDeleteCustomer(cId);
                    mpGateway.deleteCustomer(deleteCustomer, function (err, mp_err, data) {
                      assert.ok(!err);
                      assert.ok(!mp_err);
                      assert.equal(data.errorCode, '0');
                      assert.equal(data.errorMessage, '');
                      assert.equal(data.command, 'delete-consumer');
                      assert.ok(data.hasOwnProperty('result'));
                      assert.equal(data.result, '');
                      done();
                    });
                  });
              });
          });
      });
    });
    it('delete existing card', function (done) {
      var client = mockData.fakeClient();

      /** add client **/
      mpGateway.addCustomer(client, function (err, mp_err, data) {
        var cId = data.result.customerId;
        var card = mockData.fakeAddCard(cId);

        /** add card **/
        mpGateway.addCard(
          card,
          function (err, mp_err, data) {
            var token = data.result.token;
            var deletedCard = mockData.fakeDeleteCard(cId, token);

            /** delete card **/
            mpGateway.deleteCard(
              deletedCard,
              function (err, mp_err, data) {
                assert.ok(!err);
                assert.ok(!mp_err);
                assert.equal(data.errorCode, '0');
                assert.equal(data.errorMessage, '');
                assert.equal(data.command, 'delete-card-onfile');
                var deleteCustomer = mockData.fakeDeleteCustomer(cId);

                /** delete client **/
                mpGateway.deleteCustomer(deleteCustomer, function (err, mp_err, data) {
                  assert.ok(!err);
                  assert.ok(!mp_err);
                  assert.equal(data.errorCode, '0');
                  assert.equal(data.errorMessage, '');
                  assert.equal(data.command, 'delete-consumer');
                  assert.ok(data.hasOwnProperty('result'));
                  assert.equal(data.result, '');
                  done();
                });
              });
          });
      });
    });
  });

  describe('sale', function () {
    it('add auth', function (done) {
      var client = mockData.fakeClient();

      /** add client **/
      mpGateway.addCustomer(client, function (err, mp_err, data) {
        var cId = data.result.customerId;
        var auth = mockData.fakeAuth(cId);

        /** add auth **/
        mpGateway.auth(
          auth,
          function (err, mp_err, data) {
            assert.ok(!err);
            assert.ok(!mp_err);
            assert.equal(data.authCode, '123456');
            assert.equal(data.referenceNum, auth.referenceNum);
            assert.equal(data.errorMessage, '');
            assert.equal(data.responseCode, '0');
            assert.equal(data.responseMessage, 'AUTHORIZED');
            assert.equal(data.avsResponseCode, 'YYY');
            assert.equal(data.cvvResponseCode, 'M');
            assert.equal(data.processorCode, 'A');
            assert.equal(data.processorMessage, 'APPROVED');
            assert.ok(data.hasOwnProperty('orderID'));
            assert.ok(data.hasOwnProperty('transactionID'));
            assert.ok(data.hasOwnProperty('transactionTimestamp'));
            assert.ok(data['save-on-file'].hasOwnProperty('token'));
            var deletedCard = mockData.fakeDeleteCard(cId, data['save-on-file'].token);

            /** delete card **/
            mpGateway.deleteCard(
              deletedCard,
              function (err, mp_err, data) {
                assert.ok(!err);
                assert.ok(!mp_err);
                assert.equal(data.errorCode, '0');
                assert.equal(data.errorMessage, '');
                assert.equal(data.command, 'delete-card-onfile');
                var deleteCustomer = mockData.fakeDeleteCustomer(cId);

                /** delete client **/
                mpGateway.deleteCustomer(deleteCustomer, function (err, mp_err, data) {
                  assert.ok(!err);
                  assert.ok(!mp_err);
                  assert.equal(data.errorCode, '0');
                  assert.equal(data.errorMessage, '');
                  assert.equal(data.command, 'delete-consumer');
                  assert.ok(data.hasOwnProperty('result'));
                  assert.equal(data.result, '');
                  done();
                });
              });
          });
      });
    });
    it('add auth using token', function (done) {
      var client = mockData.fakeClient();

      /** add client **/
      mpGateway.addCustomer(client, function (err, mp_err, data) {
        var cId = data.result.customerId;
        var card = mockData.fakeAddCard(cId);

        /** add card **/
        mpGateway.addCard(
          card,
          function (err, mp_err, data) {
            var token = data.result.token;
            var auth = mockData.fakeAuthWithToken(cId, token);

            /** add auth **/
            mpGateway.auth(
              auth,
              function (err, mp_err, data) {
                assert.ok(!err);
                assert.ok(!mp_err);
                assert.equal(data.authCode, '123456');
                assert.equal(data.referenceNum, auth.referenceNum);
                assert.equal(data.errorMessage, '');
                assert.equal(data.responseCode, '0');
                assert.equal(data.responseMessage, 'AUTHORIZED');
                assert.equal(data.avsResponseCode, 'YYY');
                assert.equal(data.cvvResponseCode, 'M');
                assert.equal(data.processorCode, 'A');
                assert.equal(data.processorMessage, 'APPROVED');
                assert.ok(data.hasOwnProperty('orderID'));
                assert.ok(data.hasOwnProperty('transactionID'));
                assert.ok(data.hasOwnProperty('transactionTimestamp'));
                var deletedCard = mockData.fakeDeleteCard(cId, token);

                /** delete card **/
                mpGateway.deleteCard(
                  deletedCard,
                  function (err, mp_err, data) {
                    assert.ok(!err);
                    assert.ok(!mp_err);
                    assert.equal(data.errorCode, '0');
                    assert.equal(data.errorMessage, '');
                    assert.equal(data.command, 'delete-card-onfile');
                    var deleteCustomer = mockData.fakeDeleteCustomer(cId);

                    /** delete client **/
                    mpGateway.deleteCustomer(deleteCustomer, function (err, mp_err, data) {
                      assert.ok(!err);
                      assert.ok(!mp_err);
                      assert.equal(data.errorCode, '0');
                      assert.equal(data.errorMessage, '');
                      assert.equal(data.command, 'delete-consumer');
                      assert.ok(data.hasOwnProperty('result'));
                      assert.equal(data.result, '');
                      done();
                    });
                  });
              });
          });
      });
    });
    it('capture an auth', function (done) {
      var client = mockData.fakeClient();

      /** add client **/
      mpGateway.addCustomer(client, function (err, mp_err, data) {
        var cId = data.result.customerId;
        var card = mockData.fakeAddCard(cId);

        /** add card **/
        mpGateway.addCard(
          card,
          function (err, mp_err, data) {
            var token = data.result.token;
            var auth = mockData.fakeAuthWithToken(cId, token);

            /** add auth **/
            mpGateway.auth(
              auth,
              function (err, mp_err, data) {
                var orderID = data.orderID;
                var referenceNum = data.referenceNum;
                var capture = mockData.fakeCapture(orderID, referenceNum);

                /** add capture **/
                mpGateway.capture(
                  capture,
                  function (err, mp_err, data) {
                    assert.ok(!err);
                    assert.ok(!mp_err);
                    assert.equal(data.errorMessage, '');
                    assert.equal(data.responseCode, '0');
                    assert.equal(data.responseMessage, 'CAPTURED');
                    assert.equal(data.processorMessage, 'APPROVED');
                    assert.ok(data.hasOwnProperty('orderID'));
                    var deletedCard = mockData.fakeDeleteCard(cId, token);

                    /**delete card **/
                    mpGateway.deleteCard(
                      deletedCard,
                      function (err, mp_err, data) {
                        assert.ok(!err);
                        assert.ok(!mp_err);
                        assert.equal(data.errorCode, '0');
                        assert.equal(data.errorMessage, '');
                        assert.equal(data.command, 'delete-card-onfile');
                        var deleteCustomer = mockData.fakeDeleteCustomer(cId);

                        /** delete client **/
                        mpGateway.deleteCustomer(deleteCustomer, function (err, mp_err, data) {
                          assert.ok(!err);
                          assert.ok(!mp_err);
                          assert.equal(data.errorCode, '0');
                          assert.equal(data.errorMessage, '');
                          assert.equal(data.command, 'delete-consumer');
                          assert.ok(data.hasOwnProperty('result'));
                          assert.equal(data.result, '');
                          done();
                        });
                      });
                  });
              });
          });
      });
    });
    it('void an capture', function (done) {
      var client = mockData.fakeClient();

      /** add client **/
      mpGateway.addCustomer(client, function (err, mp_err, data) {
        var cId = data.result.customerId;
        var card = mockData.fakeAddCard(cId);

        /** add card **/
        mpGateway.addCard(
          card,
          function (err, mp_err, data) {
            var token = data.result.token;

            /** add auth **/
            var auth = mockData.fakeAuthWithToken(cId, token);
            mpGateway.auth(
              auth,
              function (err, mp_err, data) {
                var orderID = data.orderID;
                var referenceNum = data.referenceNum;
                var capture = mockData.fakeCapture(orderID, referenceNum);

                /** add capture **/
                mpGateway.capture(
                  capture,
                  function (err, mp_err, data) {
                    assert.ok(!err);
                    assert.ok(!mp_err);
                    assert.equal(data.errorMessage, '');
                    assert.equal(data.responseCode, '0');
                    assert.equal(data.responseMessage, 'CAPTURED');
                    assert.equal(data.processorMessage, 'APPROVED');
                    assert.ok(data.hasOwnProperty('orderID'));
                    var transactionID = data.transactionID;
                    var _void = mockData.fakeVoid(transactionID);

                    /** void capture **/
                    mpGateway.void(
                      _void,
                      function (err, mp_err, data) {
                        assert.ok(!err);
                        assert.ok(!mp_err);
                        assert.equal(data.errorMessage, '');
                        assert.equal(data.responseCode, '0');
                        assert.equal(data.transactionID, transactionID);
                        assert.equal(data.responseMessage, 'VOIDED');
                        assert.equal(data.processorMessage, 'APPROVED');
                        var deletedCard = mockData.fakeDeleteCard(cId, token);

                        /**delete card **/
                        mpGateway.deleteCard(
                          deletedCard,
                          function (err, mp_err, data) {
                            assert.ok(!err);
                            assert.ok(!mp_err);
                            assert.equal(data.errorCode, '0');
                            assert.equal(data.errorMessage, '');
                            assert.equal(data.command, 'delete-card-onfile');
                            var deleteCustomer = mockData.fakeDeleteCustomer(cId);

                            /** delete client **/
                            mpGateway.deleteCustomer(deleteCustomer, function (err, mp_err, data) {
                              assert.ok(!err);
                              assert.ok(!mp_err);
                              assert.equal(data.errorCode, '0');
                              assert.equal(data.errorMessage, '');
                              assert.equal(data.command, 'delete-consumer');
                              assert.ok(data.hasOwnProperty('result'));
                              assert.equal(data.result, '');
                              done();
                            });
                          });
                      });
                  });
              });
          });
      });
    });
    it('add fresh sale', function (done) {
      var client = mockData.fakeClient();

      /** add client **/
      mpGateway.addCustomer(client, function (err, mp_err, data) {
        var cId = data.result.customerId;
        var sale = mockData.fakeSale(cId, true);

        /** add sale **/
        mpGateway.sale(
          sale,
          function (err, mp_err, data) {
            assert.ok(!err);
            assert.ok(!mp_err);
            assert.equal(data.authCode, '123456');
            assert.equal(data.referenceNum, sale.referenceNum);
            assert.equal(data.errorMessage, '');
            assert.equal(data.responseCode, '0');
            assert.equal(data.responseMessage, 'CAPTURED');
            assert.equal(data.avsResponseCode, 'YYY');
            assert.equal(data.cvvResponseCode, 'M');
            assert.equal(data.processorCode, 'A');
            assert.equal(data.processorMessage, 'APPROVED');
            assert.ok(data.hasOwnProperty('save-on-file'));
            assert.ok(data['save-on-file'].hasOwnProperty('token'));
            assert.ok(data.hasOwnProperty('orderID'));
            assert.ok(data.hasOwnProperty('transactionID'));
            assert.ok(data.hasOwnProperty('transactionTimestamp'));
            var deletedCard = mockData.fakeDeleteCard(cId, data['save-on-file'].token);

            /** delete card **/
            mpGateway.deleteCard(
              deletedCard,
              function (err, mp_err, data) {
                assert.ok(!err);
                assert.ok(!mp_err);
                assert.equal(data.errorCode, '0');
                assert.equal(data.errorMessage, '');
                assert.equal(data.command, 'delete-card-onfile');
                var deleteCustomer = mockData.fakeDeleteCustomer(cId);

                /** delete client **/
                mpGateway.deleteCustomer(deleteCustomer, function (err, mp_err, data) {
                  assert.ok(!err);
                  assert.ok(!mp_err);
                  assert.equal(data.errorCode, '0');
                  assert.equal(data.errorMessage, '');
                  assert.equal(data.command, 'delete-consumer');
                  assert.ok(data.hasOwnProperty('result'));
                  assert.equal(data.result, '');
                  done();
                });
              });
          });
      });
    });
    it('add fresh sale with failed response', function (done) {
      var client = mockData.fakeClient();

      /** add client **/
      mpGateway.addCustomer(client, function (err, mp_err, data) {
        var cId = data.result.customerId;
        var sale = mockData.fakeSale(cId, false);

        /** add sale **/
        mpGateway.sale(
          sale,
          function (err, mp_err, data) {
            assert.ok(!err);
            assert.ok(!mp_err);
            assert.equal(data.authCode, '');
            assert.equal(data.referenceNum, sale.referenceNum);
            assert.equal(data.errorMessage, '');
            assert.equal(data.responseCode, '1');
            assert.equal(data.responseMessage, 'DECLINED');
            assert.equal(data.avsResponseCode, 'NNN');
            assert.equal(data.cvvResponseCode, 'N');
            assert.equal(data.processorCode, 'D');
            assert.equal(data.processorMessage, 'DECLINED');
            assert.ok(!data['save-on-file'].hasOwnProperty('token'));
            assert.equal(
              data['save-on-file'].error,
              'transaction failed. card on file not done.'
            );
            assert.ok(data.hasOwnProperty('orderID'));
            assert.ok(data.hasOwnProperty('transactionID'));
            assert.ok(data.hasOwnProperty('transactionTimestamp'));
            var deleteCustomer = mockData.fakeDeleteCustomer(cId);

            /** delete customer **/
            mpGateway.deleteCustomer(deleteCustomer, function (err, mp_err, data) {
              assert.ok(!err);
              assert.ok(!mp_err);
              assert.equal(data.errorCode, '0');
              assert.equal(data.errorMessage, '');
              assert.equal(data.command, 'delete-consumer');
              assert.ok(data.hasOwnProperty('result'));
              assert.equal(data.result, '');
              done();
            });
          });
      });
    });
    it('add fresh sale using token', function (done) {
      var client = mockData.fakeClient();

      /** add client **/
      mpGateway.addCustomer(client, function (err, mp_err, data) {
        var cId = data.result.customerId;
        var sale = mockData.fakeSale(cId, true);
        var card = mockData.fakeAddCard(cId);

        /** add card **/
        mpGateway.addCard(
          card,
          function (err, mp_err, data) {
            var token = data.result.token;
            var sale = mockData.fakeSaleWithToken(cId, token);

            /** add sale **/
            mpGateway.sale(
              sale,
              function (err, mp_err, data) {
                assert.ok(!err);
                assert.ok(!mp_err);
                assert.equal(data.authCode, '123456');
                assert.equal(data.referenceNum, sale.referenceNum);
                assert.equal(data.errorMessage, '');
                assert.equal(data.responseCode, '0');
                assert.equal(data.responseMessage, 'CAPTURED');
                assert.equal(data.avsResponseCode, 'YYY');
                assert.equal(data.cvvResponseCode, 'M');
                assert.equal(data.processorCode, 'A');
                assert.equal(data.processorMessage, 'APPROVED');
                assert.ok(data.hasOwnProperty('orderID'));
                assert.ok(data.hasOwnProperty('transactionID'));
                assert.ok(data.hasOwnProperty('transactionTimestamp'));
                var deletedCard = mockData.fakeDeleteCard(cId, token);

                /** delete card **/
                mpGateway.deleteCard(
                  deletedCard,
                  function (err, mp_err, data) {
                    assert.ok(!err);
                    assert.ok(!mp_err);
                    assert.equal(data.errorCode, '0');
                    assert.equal(data.errorMessage, '');
                    assert.equal(data.command, 'delete-card-onfile');
                    var deleteCustomer = mockData.fakeDeleteCustomer(cId);

                    /** delete customer **/
                    mpGateway.deleteCustomer(deleteCustomer, function (err, mp_err, data) {
                      assert.ok(!err);
                      assert.ok(!mp_err);
                      assert.equal(data.errorCode, '0');
                      assert.equal(data.errorMessage, '');
                      assert.equal(data.command, 'delete-consumer');
                      assert.ok(data.hasOwnProperty('result'));
                      assert.equal(data.result, '');
                      done();
                    });
                  });
              });
          });
      });
    });
    it('return an capture', function (done) {
      var client = mockData.fakeClient();

      /** add client **/
      mpGateway.addCustomer(client, function (err, mp_err, data) {
        var cId = data.result.customerId;
        var auth = mockData.fakeAuth(cId);

        /** add auth **/
        mpGateway.auth(
          auth,
          function (err, mp_err, data) {
            assert.ok(data['save-on-file'].hasOwnProperty('token'));
            var orderID = data.orderID;
            var referenceNum = data.referenceNum;;
            var capture = mockData.fakeCapture(orderID, referenceNum);
            var token = data['save-on-file'].token;

            /** add capture **/
            mpGateway.capture(
              capture,
              function (err, mp_err, data) {
                var returnPayment = mockData.fakeReturnPayment(orderID, referenceNum);

                /** return payment **/
                mpGateway.returnPayment(
                  returnPayment,
                  function (err, mp_err, data) {
                    assert.ok(!err);
                    assert.ok(!mp_err);
                    assert.equal(data.errorMessage, '');
                    assert.equal(data.responseCode, '0');
                    assert.equal(data.orderID, orderID);
                    assert.equal(data.responseMessage, 'CAPTURED');
                    assert.equal(data.processorMessage, 'APPROVED');
                    assert.ok(data.hasOwnProperty('orderID'));
                    var deletedCard = mockData.fakeDeleteCard(cId, token);

                    /** delete card **/
                    mpGateway.deleteCard(
                      deletedCard,
                      function (err, mp_err, data) {
                        assert.ok(!err);
                        assert.ok(!mp_err);
                        assert.equal(data.errorCode, '0');
                        assert.equal(data.errorMessage, '');
                        assert.equal(data.command, 'delete-card-onfile');
                        var deleteCustomer = mockData.fakeDeleteCustomer(cId);

                        /** delete client **/
                        mpGateway.deleteCustomer(deleteCustomer, function (err, mp_err, data) {
                          assert.ok(!err);
                          assert.ok(!mp_err);
                          assert.equal(data.errorCode, '0');
                          assert.equal(data.errorMessage, '');
                          assert.equal(data.command, 'delete-consumer');
                          assert.ok(data.hasOwnProperty('result'));
                          assert.equal(data.result, '');
                          done();
                        });
                      });
                  });
              });
          });
      });
    });
  });

  describe('recurring', function () {
    it('add recurring payment', function (done) {
      var recurring = mockData.fakeRecurringPayment();

      /** create recurring payment **/
      mpGateway.recurringPayment(
        recurring,
        function (err, mp_err, data) {
          assert.ok(!err);
          assert.ok(!mp_err);
          assert.ok(data.hasOwnProperty('orderID'));
          assert.ok(data.hasOwnProperty('transactionID'));
          assert.ok(data.hasOwnProperty('transactionTimestamp'));
          assert.equal(data.responseMessage, 'APPROVED');
          assert.equal(data.processorName, 'SIMULATOR');
          var orderID = data.orderID;
          var cancelRecurringPayment = mockData.fakeCancelRecurringPayment(orderID);

          /** cancel recurring payment **/
          mpGateway.cancelRecurringPayment(
            cancelRecurringPayment,
            function (err, mp_err, data) {
              assert.ok(!err);
              assert.ok(!mp_err);
              assert.equal(data.errorCode, '0');
              assert.equal(data.errorMessage, '');
              assert.equal(data.command, 'cancel-recurring');
              done();
            });
        });
    });
    it('add recurring payment using token', function (done) {
      var client = mockData.fakeClient();

      /** add client **/
      mpGateway.addCustomer(client, function (err, mp_err, data) {
        var cId = data.result.customerId;
        var card = mockData.fakeAddCard(cId);

        /** add card **/
        mpGateway.addCard(
          card,
          function (err, mp_err, data) {
            var token = data.result.token;
            var recurring = mockData.fakeRecurringPaymentWithToken(cId, token);

            /** create recurring payment **/
            mpGateway.recurringPayment(
              recurring,
              function (err, mp_err, data) {
                assert.ok(!err);
                assert.ok(!mp_err);
                assert.ok(data.hasOwnProperty('orderID'));
                assert.ok(data.hasOwnProperty('transactionID'));
                assert.ok(data.hasOwnProperty('transactionTimestamp'));
                assert.equal(data.responseMessage, 'APPROVED');
                assert.equal(data.processorName, 'SIMULATOR');
                var orderID = data.orderID;
                var cancelRecurringPayment = mockData.fakeCancelRecurringPayment(orderID);

                /** cancel recurring payment **/
                mpGateway.cancelRecurringPayment(
                  cancelRecurringPayment,
                  function (err, mp_err, data) {
                    assert.ok(!err);
                    assert.ok(!mp_err);
                    assert.equal(data.errorCode, '0');
                    assert.equal(data.errorMessage, '');
                    assert.equal(data.command, 'cancel-recurring');
                    var deletedCard = mockData.fakeDeleteCard(cId, token);

                    /** delete card **/
                    mpGateway.deleteCard(
                      deletedCard,
                      function (err, mp_err, data) {
                        assert.ok(!err);
                        assert.ok(!mp_err);
                        assert.equal(data.errorCode, '0');
                        assert.equal(data.errorMessage, '');
                        assert.equal(data.command, 'delete-card-onfile');
                        var deleteCustomer = mockData.fakeDeleteCustomer(cId);

                        /** delete client **/
                        mpGateway.deleteCustomer(deleteCustomer, function (err, mp_err, data) {
                          assert.ok(!err);
                          assert.ok(!mp_err);
                          assert.equal(data.errorCode, '0');
                          assert.equal(data.errorMessage, '');
                          assert.equal(data.command, 'delete-consumer');
                          assert.ok(data.hasOwnProperty('result'));
                          assert.equal(data.result, '');
                          done();
                        });
                      });
                  });
              });
          });
      });
    });
    it('update recurring payment', function (done) {
      var client = mockData.fakeClient();

      /** add client **/
      mpGateway.addCustomer(client, function (err, mp_err, data) {
        var cId = data.result.customerId;
        var card = mockData.fakeAddCard(cId);

        /** add card **/
        mpGateway.addCard(
          card,
          function (err, mp_err, data) {
            var token = data.result.token;
            var recurringPayment = mockData.fakeRecurringPaymentWithToken(cId, token);

            /** create recurring payment **/
            mpGateway.recurringPayment(
              recurringPayment,
              function (err, mp_err, data) {
                var orderID = data.orderID,
                  updateRecurringPayment = mockData.fakeUpdateRecurringPayment(orderID);

                /** update recurring payment **/
                mpGateway.updateRecurringPayment(
                  updateRecurringPayment,
                  function (err, mp_err, data) {
                    assert.ok(!err);
                    assert.ok(!mp_err);
                    assert.equal(data.errorCode, '0');
                    assert.equal(data.errorMessage, '');
                    assert.equal(data.command, 'modify-recurring');
                    var cancelRecurringPayment = mockData.fakeCancelRecurringPayment(orderID);

                    /** cancel recurring payment **/
                    mpGateway.cancelRecurringPayment(
                      cancelRecurringPayment,
                      function (err, mp_err, data) {
                        assert.ok(!err);
                        assert.ok(!mp_err);
                        assert.equal(data.errorCode, '0');
                        assert.equal(data.errorMessage, '');
                        assert.equal(data.command, 'cancel-recurring');
                        var deletedCard = mockData.fakeDeleteCard(cId, token);

                        /** delete card **/
                        mpGateway.deleteCard(
                          deletedCard,
                          function (err, mp_err, data) {
                            assert.ok(!err);
                            assert.ok(!mp_err);
                            assert.equal(data.errorCode, '0');
                            assert.equal(data.errorMessage, '');
                            assert.equal(data.command, 'delete-card-onfile');
                            var deleteCustomer = mockData.fakeDeleteCustomer(cId);

                            /** delete client **/
                            mpGateway.deleteCustomer(deleteCustomer, function (err, mp_err, data) {
                              assert.ok(!err);
                              assert.ok(!mp_err);
                              assert.equal(data.errorCode, '0');
                              assert.equal(data.errorMessage, '');
                              assert.equal(data.command, 'delete-consumer');
                              assert.ok(data.hasOwnProperty('result'));
                              assert.equal(data.result, '');
                              done();
                            });
                          });
                      });
                  });
              });
          });
      });
    });
    it('cancel recurring payment', function (done) {
      var client = mockData.fakeClient();

      /** add client **/
      mpGateway.addCustomer(client, function (err, mp_err, data) {
        var cId = data.result.customerId;
        var card = mockData.fakeAddCard(cId);

        /** add card **/
        mpGateway.addCard(
          card,
          function (err, mp_err, data) {
            var token = data.result.token;
            var recurringPayment = mockData.fakeRecurringPaymentWithToken(cId, token);

            /** create recurring payment **/
            mpGateway.recurringPayment(
              recurringPayment,
              function (err, mp_err, data) {
                var orderID = data.orderID;
                var cancelRecurringPayment = mockData.fakeCancelRecurringPayment(orderID);

                /** cancel recurring payment **/
                mpGateway.cancelRecurringPayment(
                  cancelRecurringPayment,
                  function (err, mp_err, data) {
                    assert.ok(!err);
                    assert.ok(!mp_err);
                    assert.equal(data.errorCode, '0');
                    assert.equal(data.errorMessage, '');
                    assert.equal(data.command, 'cancel-recurring');
                    var deletedCard = mockData.fakeDeleteCard(cId, token);

                    /** delete card **/
                    mpGateway.deleteCard(
                      deletedCard,
                      function (err, mp_err, data) {
                        assert.ok(!err);
                        assert.ok(!mp_err);
                        assert.equal(data.errorCode, '0');
                        assert.equal(data.errorMessage, '');
                        assert.equal(data.command, 'delete-card-onfile');
                        var deleteCustomer = mockData.fakeDeleteCustomer(cId);

                        /** delete client **/
                        mpGateway.deleteCustomer(deleteCustomer, function (err, mp_err, data) {
                          assert.ok(!err);
                          assert.ok(!mp_err);
                          assert.equal(data.errorCode, '0');
                          assert.equal(data.errorMessage, '');
                          assert.equal(data.command, 'delete-consumer');
                          assert.ok(data.hasOwnProperty('result'));
                          assert.equal(data.result, '');
                          done();
                        });
                      });
                  });
              });
          });
      });
    });
  });
});
