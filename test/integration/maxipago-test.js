var maxipago = require('../../lib/core/maxipago');
var mockData = require('../../lib/utils/mockData');
var assert = require('assert');
var moment = require('moment');

require('dotenv').config({ path: '../.env' })
var testMerchantId = process.env.MP_TEST_ID;
var testMerchantKey = process.env.MP_TEST_KEY;

describe('GATEWAY REQUESTS -  This tests will take a few minutes to be completed', function () {
  var start;
  var count;
  var itTimeout = 100000;
  var mpGateway = null;
  this.timeout(itTimeout);

  before(function () {
    count = 0;
    start = moment();
    mpGateway = maxipago.buildGateway(testMerchantId, testMerchantKey, 'development');
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

  describe('Customer Requests', function () {
    it('add customer basic data', function (done) {
      /** add client **/
      var client = mockData.fakeClient();
      mpGateway.addCustomer(client).then(data => {
        assert.equal(data.errorCode, '0');
        assert.equal(data.command, 'add-consumer');
        assert.ok(data.result.hasOwnProperty('customerId'));
        /** delete client **/
        var deleteCustomer = mockData.fakeDeleteCustomer(data.result.customerId);
        mpGateway.deleteCustomer(deleteCustomer).then(data => {
          assert.equal(data.errorCode, '0');
          assert.equal(data.command, 'delete-consumer');
          done();
        })
      })
    });

    it('add customer full data', function (done) {
      /** add client **/
      var client = mockData.fakeFullClient();
      mpGateway.addCustomer(client).then(data => {
        assert.equal(data.errorCode, '0');
        assert.equal(data.command, 'add-consumer');
        assert.ok(data.result.hasOwnProperty('customerId'));
        /** delete client **/
        var deleteCustomer = mockData.fakeDeleteCustomer(data.result.customerId);
        mpGateway.deleteCustomer(deleteCustomer).then(data => {
          assert.equal(data.errorCode, '0');
          assert.equal(data.command, 'delete-consumer');
          done();
        });
      });
    });

    it('add customer full data with unordered request', function (done) {
      /** add client **/
      var client = mockData.fakeFullClient();
      var unordered_client = {};
      Object.keys(client).reverse().forEach(function (key) {
        unordered_client[key] = client[key];
      });
      mpGateway.addCustomer(unordered_client).then(data => {
        assert.equal(data.errorCode, '0');
        assert.equal(data.command, 'add-consumer');
        assert.ok(data.result.hasOwnProperty('customerId'));
        /** delete client **/
        var deleteCustomer = mockData.fakeDeleteCustomer(data.result.customerId);
        mpGateway.deleteCustomer(deleteCustomer).then(data => {
          assert.equal(data.errorCode, '0');
          assert.equal(data.command, 'delete-consumer');
          done();
        });
      });
    });

    it('update customer data', function (done) {
      /** add client **/
      var client = mockData.fakeClient();
      mpGateway.addCustomer(client).then(data => {
        var cId = data.result.customerId;
        client.customerId = cId;
        client.firstName += ' updated';
        client.lastName += ' updated';
        /** update client **/
        mpGateway.updateCustomer(client).then(data => {
          assert.equal(data.errorCode, '0');
          assert.equal(data.command, 'update-consumer');
          /** delete client **/
          var deleteCustomer = mockData.fakeDeleteCustomer(cId);
          mpGateway.deleteCustomer(deleteCustomer).then(data => {
            assert.equal(data.errorCode, '0');
            assert.equal(data.command, 'delete-consumer');
            done();
          });
        });
      });
    });

    it('update customer data with unordered request', function (done) {
      /** add client **/
      var client = mockData.fakeClient();
      var unordered_client = {};
      Object.keys(client).reverse().forEach(function (key) {
        unordered_client[key] = client[key];
      });
      mpGateway.addCustomer(client).then(data => {
        var cId = data.result.customerId;
        unordered_client.customerId = cId;
        unordered_client.firstName += ' updated';
        unordered_client.lastName += ' updated';

        /** update client **/
        mpGateway.updateCustomer(unordered_client).then(data => {
          assert.equal(data.errorCode, '0');
          assert.equal(data.command, 'update-consumer');
          var deleteCustomer = mockData.fakeDeleteCustomer(cId);

          /** delete client **/
          mpGateway.deleteCustomer(deleteCustomer).then(data => {
            assert.equal(data.errorCode, '0');
            assert.equal(data.command, 'delete-consumer');
            done();
          });
        });
      });
    });

    it('delete customer data', function (done) {
      /** add client **/
      var client = mockData.fakeClient();
      mpGateway.addCustomer(client).then(data => {
        /** delete client **/
        var deleteCustomer = mockData.fakeDeleteCustomer(data.result.customerId);
        mpGateway.deleteCustomer(deleteCustomer).then(data => {
          assert.equal(data.errorCode, '0');
          assert.equal(data.command, 'delete-consumer');
          done();
        });
      });
    });
  });

  describe('Card Requests', function () {
    it('add new card', function (done) {
      /** add client **/
      var client = mockData.fakeClient();
      mpGateway.addCustomer(client).then(data => {
        var cId = data.result.customerId;

        /** add card **/
        var card = mockData.fakeAddCard(cId);
        mpGateway.addCard(card).then(data => {
          assert.equal(data.errorCode, '0');
          assert.equal(data.command, 'add-card-onfile');
          assert.ok(data.result.hasOwnProperty('token'));
          var cardToken = data.result.token;

          /** delete card **/
          var deletedCard = mockData.fakeDeleteCard(cId, cardToken);
          mpGateway.deleteCard(deletedCard).then(data => {
            assert.equal(data.errorCode, '0');
            assert.equal(data.command, 'delete-card-onfile');

            /** delete client **/
            var deleteCustomer = mockData.fakeDeleteCustomer(cId);
            mpGateway.deleteCustomer(deleteCustomer).then(data => {
              assert.equal(data.errorCode, '0');
              assert.equal(data.command, 'delete-consumer');
              done();
            });
          });
        });
      });
    });

    it('add existing card', function (done) {
      /** add client **/
      var client = mockData.fakeClient();
      mpGateway.addCustomer(client).then(data => {
        var cId = data.result.customerId;

        /** add card **/
        var card = mockData.fakeAddCard(cId);
        mpGateway.addCard(card).then(data => {
          var token = data.result.token;

          /** add card **/
          mpGateway.addCard(card).then(data => {
            assert.equal(data.result.token, token);
            var cardToken = data.result.token;

            /** delete card **/
            var deletedCard = mockData.fakeDeleteCard(cId, cardToken);
            mpGateway.deleteCard(deletedCard).then(data => {
              assert.equal(data.errorCode, '0');
              assert.equal(data.command, 'delete-card-onfile');

              /** delete client **/
              var deleteCustomer = mockData.fakeDeleteCustomer(cId);
              mpGateway.deleteCustomer(deleteCustomer).then(data => {
                assert.equal(data.errorCode, '0');
                assert.equal(data.command, 'delete-consumer');
                done();
              });
            });
          });
        });
      });
    });

    it('delete existing card', function (done) {
      /** add client **/
      var client = mockData.fakeClient();
      mpGateway.addCustomer(client).then(data => {
        var cId = data.result.customerId;

        /** add card **/
        var card = mockData.fakeAddCard(cId);
        mpGateway.addCard(card).then(data => {
          var token = data.result.token;

          /** delete card **/
          var deletedCard = mockData.fakeDeleteCard(cId, token);
          mpGateway.deleteCard(deletedCard).then(data => {
            assert.equal(data.errorCode, '0');
            assert.equal(data.command, 'delete-card-onfile');
            var deleteCustomer = mockData.fakeDeleteCustomer(cId);

            /** delete client **/
            mpGateway.deleteCustomer(deleteCustomer).then(data => {
              assert.equal(data.errorCode, '0');
              assert.equal(data.command, 'delete-consumer');
              done();
            });
          });
        });
      });
    });
  });

  describe('Sale Requests', function () {
    it('add auth', function (done) {
      /** add client **/
      var client = mockData.fakeClient();
      mpGateway.addCustomer(client).then(data => {
        var cId = data.result.customerId;

        /** add auth **/
        var auth = mockData.fakeAuth(cId);
        mpGateway.auth(auth).then(data => {
          assert.equal(data.authCode, '123456');
          assert.equal(data.referenceNum, auth.referenceNum);
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

          /** delete card **/
          var deletedCard = mockData.fakeDeleteCard(cId, data['save-on-file'].token);
          mpGateway.deleteCard(deletedCard).then(data => {
            assert.equal(data.errorCode, '0');
            assert.equal(data.command, 'delete-card-onfile');
            var deleteCustomer = mockData.fakeDeleteCustomer(cId);

            /** delete client **/
            mpGateway.deleteCustomer(deleteCustomer).then(data => {
              assert.equal(data.errorCode, '0');
              assert.equal(data.command, 'delete-consumer');
              done();
            });
          });
        });
      });
    });

    it('add auth using token', function (done) {
      /** add client **/
      var client = mockData.fakeClient();
      mpGateway.addCustomer(client).then(data => {
        var cId = data.result.customerId;
        var card = mockData.fakeAddCard(cId);

        /** add card **/
        mpGateway.addCard(card).then(data => {
          var token = data.result.token;
          var auth = mockData.fakeAuthWithToken(cId, token);

          /** add auth **/
          mpGateway.auth(auth).then(data => {
            assert.equal(data.authCode, '123456');
            assert.equal(data.referenceNum, auth.referenceNum);
            assert.equal(data.responseCode, '0');
            assert.equal(data.responseMessage, 'AUTHORIZED');
            assert.equal(data.avsResponseCode, 'YYY');
            assert.equal(data.cvvResponseCode, 'M');
            assert.equal(data.processorCode, 'A');
            assert.equal(data.processorMessage, 'APPROVED');
            assert.ok(data.hasOwnProperty('orderID'));
            assert.ok(data.hasOwnProperty('transactionID'));
            assert.ok(data.hasOwnProperty('transactionTimestamp'));

            /** delete card **/
            var deletedCard = mockData.fakeDeleteCard(cId, token);
            mpGateway.deleteCard(deletedCard).then(data => {
              assert.equal(data.errorCode, '0');
              assert.equal(data.command, 'delete-card-onfile');

              /** delete client **/
              var deleteCustomer = mockData.fakeDeleteCustomer(cId);
              mpGateway.deleteCustomer(deleteCustomer).then(data => {
                assert.equal(data.errorCode, '0');
                assert.equal(data.command, 'delete-consumer');
                done();
              });
            });
          });
        });
      });
    });

    it('capture an auth', function (done) {
      /** add client **/
      var client = mockData.fakeClient();
      mpGateway.addCustomer(client).then(data => {
        var cId = data.result.customerId;

        /** add card **/
        var card = mockData.fakeAddCard(cId);
        mpGateway.addCard(card).then(data => {
          var token = data.result.token;

          /** add auth **/
          var auth = mockData.fakeAuthWithToken(cId, token);
          mpGateway.auth(auth).then(data => {
            var orderID = data.orderID;
            var referenceNum = data.referenceNum;

            /** add capture **/
            var capture = mockData.fakeCapture(orderID, referenceNum);
            mpGateway.capture(capture).then(data => {
              assert.equal(data.responseCode, '0');
              assert.equal(data.responseMessage, 'CAPTURED');
              assert.equal(data.processorMessage, 'APPROVED');
              assert.ok(data.hasOwnProperty('orderID'));

              /**delete card **/
              var deletedCard = mockData.fakeDeleteCard(cId, token);
              mpGateway.deleteCard(deletedCard).then(data => {
                assert.equal(data.errorCode, '0');
                assert.equal(data.command, 'delete-card-onfile');

                /** delete client **/
                var deleteCustomer = mockData.fakeDeleteCustomer(cId);
                mpGateway.deleteCustomer(deleteCustomer).then(data => {
                  assert.equal(data.errorCode, '0');
                  assert.equal(data.command, 'delete-consumer');
                  done();
                });
              });
            });
          });
        });
      });
    });

    it('void an capture', function (done) {
      /** add client **/
      var client = mockData.fakeClient();
      mpGateway.addCustomer(client).then(data => {
        var cId = data.result.customerId;
        var card = mockData.fakeAddCard(cId);

        /** add card **/
        mpGateway.addCard(card).then(data => {
          var token = data.result.token;

          /** add auth **/
          var auth = mockData.fakeAuthWithToken(cId, token);
          mpGateway.auth(auth).then(data => {
            var orderID = data.orderID;
            var referenceNum = data.referenceNum;

            /** add capture **/
            var capture = mockData.fakeCapture(orderID, referenceNum);
            mpGateway.capture(capture).then(data => {
              assert.equal(data.responseCode, '0');
              assert.equal(data.responseMessage, 'CAPTURED');
              assert.equal(data.processorMessage, 'APPROVED');
              assert.ok(data.hasOwnProperty('orderID'));
              var transactionID = data.transactionID;

              /** void capture **/
              var _void = mockData.fakeVoid(transactionID);
              mpGateway.void(_void).then(data => {
                assert.equal(data.responseCode, '0');
                assert.equal(data.transactionID, transactionID);
                assert.equal(data.responseMessage, 'VOIDED');
                assert.equal(data.processorMessage, 'APPROVED');

                /**delete card **/
                var deletedCard = mockData.fakeDeleteCard(cId, token);
                mpGateway.deleteCard(deletedCard).then(data => {
                  assert.equal(data.errorCode, '0');
                  assert.equal(data.command, 'delete-card-onfile');

                  /** delete client **/
                  var deleteCustomer = mockData.fakeDeleteCustomer(cId);
                  mpGateway.deleteCustomer(deleteCustomer).then(data => {
                    assert.equal(data.errorCode, '0');
                    assert.equal(data.command, 'delete-consumer');
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
      /** add client **/
      var client = mockData.fakeClient();
      mpGateway.addCustomer(client).then(data => {
        var cId = data.result.customerId;

        /** add sale **/
        var sale = mockData.fakeSale(cId, true);
        mpGateway.sale(sale).then(data => {
          assert.equal(data.authCode, '123456');
          assert.equal(data.referenceNum, sale.referenceNum);
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

          /** delete card **/
          var deletedCard = mockData.fakeDeleteCard(cId, data['save-on-file'].token);
          mpGateway.deleteCard(deletedCard).then(data => {
            assert.equal(data.errorCode, '0');
            assert.equal(data.command, 'delete-card-onfile');

            /** delete client **/
            var deleteCustomer = mockData.fakeDeleteCustomer(cId);
            mpGateway.deleteCustomer(deleteCustomer).then(data => {
              assert.equal(data.errorCode, '0');
              assert.equal(data.command, 'delete-consumer');
              done();
            });
          });
        });
      });
    });

    it('add fresh sale with failed response', function (done) {
      /** add client **/
      var client = mockData.fakeClient();
      mpGateway.addCustomer(client).then(data => {
        var cId = data.result.customerId;

        /** add sale **/
        var sale = mockData.fakeSale(cId, false);
        mpGateway.sale(sale).then(data => {
          assert.equal(data.referenceNum, sale.referenceNum);
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

          /** delete customer **/
          var deleteCustomer = mockData.fakeDeleteCustomer(cId);
          mpGateway.deleteCustomer(deleteCustomer).then(data => {
            assert.equal(data.errorCode, '0');
            assert.equal(data.command, 'delete-consumer');
            done();
          });
        });
      });
    });

    it('add fresh sale using token', function (done) {
      /** add client **/
      var client = mockData.fakeClient();
      mpGateway.addCustomer(client).then(data => {
        var cId = data.result.customerId;
        var sale = mockData.fakeSale(cId, true);

        /** add card **/
        var card = mockData.fakeAddCard(cId);
        mpGateway.addCard(card).then(data => {
          var token = data.result.token;
          var sale = mockData.fakeSaleWithToken(cId, token);

          /** add sale **/
          mpGateway.sale(sale).then(data => {
            assert.equal(data.authCode, '123456');
            assert.equal(data.referenceNum, sale.referenceNum);
            assert.equal(data.responseCode, '0');
            assert.equal(data.responseMessage, 'CAPTURED');
            assert.equal(data.avsResponseCode, 'YYY');
            assert.equal(data.cvvResponseCode, 'M');
            assert.equal(data.processorCode, 'A');
            assert.equal(data.processorMessage, 'APPROVED');
            assert.ok(data.hasOwnProperty('orderID'));
            assert.ok(data.hasOwnProperty('transactionID'));
            assert.ok(data.hasOwnProperty('transactionTimestamp'));

            /** delete card **/
            var deletedCard = mockData.fakeDeleteCard(cId, token);
            mpGateway.deleteCard(deletedCard).then(data => {
              assert.equal(data.errorCode, '0');
              assert.equal(data.command, 'delete-card-onfile');

              /** delete customer **/
              var deleteCustomer = mockData.fakeDeleteCustomer(cId);
              mpGateway.deleteCustomer(deleteCustomer).then(data => {
                assert.equal(data.errorCode, '0');
                assert.equal(data.command, 'delete-consumer');
                done();
              });
            });
          });
        });
      });
    });

    it('return an capture', function (done) {
      /** add client **/
      var client = mockData.fakeClient();
      mpGateway.addCustomer(client).then(data => {
        var cId = data.result.customerId;

        /** add auth **/
        var auth = mockData.fakeAuth(cId);
        mpGateway.auth(auth).then(data => {
          assert.ok(data['save-on-file'].hasOwnProperty('token'));
          var orderID = data.orderID;
          var referenceNum = data.referenceNum;;
          var capture = mockData.fakeCapture(orderID, referenceNum);
          var token = data['save-on-file'].token;

          /** add capture **/
          mpGateway.capture(capture).then(data => {

            /** return payment **/
            var returnPayment = mockData.fakeReturnPayment(orderID, referenceNum);
            mpGateway.returnPayment(returnPayment).then(data => {
              assert.equal(data.responseCode, '0');
              assert.equal(data.orderID, orderID);
              assert.equal(data.responseMessage, 'CAPTURED');
              assert.equal(data.processorMessage, 'APPROVED');
              assert.ok(data.hasOwnProperty('orderID'));
              var deletedCard = mockData.fakeDeleteCard(cId, token);

              /** delete card **/
              mpGateway.deleteCard(deletedCard).then(data => {
                assert.equal(data.errorCode, '0');
                assert.equal(data.command, 'delete-card-onfile');

                /** delete client **/
                var deleteCustomer = mockData.fakeDeleteCustomer(cId);
                mpGateway.deleteCustomer(deleteCustomer).then(data => {
                  assert.equal(data.errorCode, '0');
                  assert.equal(data.command, 'delete-consumer');
                  done();
                });
              });
            });
          });
        });
      });
    });
  });

  describe('Recurring Requests', function () {
    it('add recurring payment', function (done) {
      /** create recurring payment **/
      var recurring = mockData.fakeRecurringPayment();
      mpGateway.recurringPayment(recurring).then(data => {
        assert.ok(data.hasOwnProperty('orderID'));
        assert.ok(data.hasOwnProperty('transactionID'));
        assert.ok(data.hasOwnProperty('transactionTimestamp'));
        assert.equal(data.responseMessage, 'APPROVED');
        assert.equal(data.processorName, 'SIMULATOR');
        var orderID = data.orderID;

        /** cancel recurring payment **/
        var cancelRecurringPayment = mockData.fakeCancelRecurringPayment(orderID);
        mpGateway.cancelRecurringPayment(cancelRecurringPayment).then(data => {
          assert.equal(data.errorCode, '0');
          assert.equal(data.command, 'cancel-recurring');
          done();
        });
      });
    });

    it('add recurring payment using token', function (done) {
      /** add client **/
      var client = mockData.fakeClient();
      mpGateway.addCustomer(client).then(data => {
        var cId = data.result.customerId;
        var card = mockData.fakeAddCard(cId);

        /** add card **/
        mpGateway.addCard(card).then(data => {
          var token = data.result.token;

          /** create recurring payment **/
          var recurring = mockData.fakeRecurringPaymentWithToken(cId, token);
          mpGateway.recurringPayment(recurring).then(data => {
            assert.ok(data.hasOwnProperty('orderID'));
            assert.ok(data.hasOwnProperty('transactionID'));
            assert.ok(data.hasOwnProperty('transactionTimestamp'));
            assert.equal(data.responseMessage, 'APPROVED');
            assert.equal(data.processorName, 'SIMULATOR');
            var orderID = data.orderID;

            /** cancel recurring payment **/
            var cancelRecurringPayment = mockData.fakeCancelRecurringPayment(orderID);
            mpGateway.cancelRecurringPayment(cancelRecurringPayment).then(data => {
              assert.equal(data.errorCode, '0');
              assert.equal(data.command, 'cancel-recurring');

              /** delete card **/
              var deletedCard = mockData.fakeDeleteCard(cId, token);
              mpGateway.deleteCard(deletedCard).then(data => {
                assert.equal(data.errorCode, '0');
                assert.equal(data.command, 'delete-card-onfile');

                /** delete client **/
                var deleteCustomer = mockData.fakeDeleteCustomer(cId);
                mpGateway.deleteCustomer(deleteCustomer).then(data => {
                  assert.equal(data.errorCode, '0');
                  assert.equal(data.command, 'delete-consumer');
                  done();
                });
              });
            });
          });
        });
      });
    });

    it('update recurring payment', function (done) {
      /** add client **/
      var client = mockData.fakeClient();
      mpGateway.addCustomer(client).then(data => {
        var cId = data.result.customerId;

        /** add card **/
        var card = mockData.fakeAddCard(cId);
        mpGateway.addCard(card).then(data => {
          var token = data.result.token;

          /** create recurring payment **/
          var recurringPayment = mockData.fakeRecurringPaymentWithToken(cId, token);
          mpGateway.recurringPayment(recurringPayment).then(data => {
            var orderID = data.orderID;

            /** update recurring payment **/
            var updateRecurringPayment = mockData.fakeUpdateRecurringPayment(orderID);
            mpGateway.updateRecurringPayment(updateRecurringPayment).then(data => {
              assert.equal(data.errorCode, '0');
              assert.equal(data.command, 'modify-recurring');

              /** cancel recurring payment **/
              var cancelRecurringPayment = mockData.fakeCancelRecurringPayment(orderID);
              mpGateway.cancelRecurringPayment(cancelRecurringPayment).then(data => {
                assert.equal(data.errorCode, '0');
                assert.equal(data.command, 'cancel-recurring');

                /** delete card **/
                var deletedCard = mockData.fakeDeleteCard(cId, token);
                mpGateway.deleteCard(deletedCard).then(data => {
                  assert.equal(data.errorCode, '0');
                  assert.equal(data.command, 'delete-card-onfile');

                  /** delete client **/
                  var deleteCustomer = mockData.fakeDeleteCustomer(cId);
                  mpGateway.deleteCustomer(deleteCustomer).then(data => {
                    assert.equal(data.errorCode, '0');
                    assert.equal(data.command, 'delete-consumer');
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
      /** add client **/
      var client = mockData.fakeClient();
      mpGateway.addCustomer(client).then(data => {
        var cId = data.result.customerId;

        /** add card **/
        var card = mockData.fakeAddCard(cId);
        mpGateway.addCard(card).then(data => {
          var token = data.result.token;

          /** create recurring payment **/
          var recurringPayment = mockData.fakeRecurringPaymentWithToken(cId, token);
          mpGateway.recurringPayment(recurringPayment).then(data => {
            var orderID = data.orderID;

            /** cancel recurring payment **/
            var cancelRecurringPayment = mockData.fakeCancelRecurringPayment(orderID);
            mpGateway.cancelRecurringPayment(cancelRecurringPayment).then(data => {
              assert.equal(data.errorCode, '0');
              assert.equal(data.command, 'cancel-recurring');

              /** delete card **/
              var deletedCard = mockData.fakeDeleteCard(cId, token);
              mpGateway.deleteCard(deletedCard).then(data => {
                assert.equal(data.errorCode, '0');
                assert.equal(data.command, 'delete-card-onfile');

                /** delete client **/
                var deleteCustomer = mockData.fakeDeleteCustomer(cId);
                mpGateway.deleteCustomer(deleteCustomer).then(data => {
                  assert.equal(data.errorCode, '0');
                  assert.equal(data.command, 'delete-consumer');
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
