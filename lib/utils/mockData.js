var faker = require("faker");
var moment = require("moment");

var _fakeClient = function() {
  var id = Math.floor(Math.random() * (10000 - 100)) + 100;
  return {
    customerIdExt: id,
    firstName: faker.name.findName(),
    lastName: faker.name.lastName()
  };
};
var _fakeFullClient = function() {
  var client = _fakeClient();
  client.address1 = faker.address.streetAddress();
  client.address2 = faker.address.streetAddress();
  client.city = faker.address.city();
  client.state = faker.address.state();
  client.zip = faker.address.zipCode("#########");
  client.country = faker.address.countryCode();
  client.phone = faker.phone.phoneNumberFormat(3);
  client.email = faker.internet.email();
  client.dob = moment(faker.date.past()).format("MM/DD/YYYY");
  client.sex = client.customerIdExt % 2 === 0 ? "M" : "F";
  return client;
};
var _fakeDeleteCustomer = function(customerId) {
  return {
    customerId: customerId
  };
};

var _fakeZeroDollar = function(customerId) {
  var id = Math.floor(Math.random() * (10000 - 100)) + 100;
  return {
    processorID: "1",
    referenceNum: "PONumber-" + id,

    transactionDetail: {
      payType: {
        creditCard: {
          number: "4111111111111111",
          expMonth: "12",
          expYear: "2020",
          cvvNumber: "999"
        }
      }
    },
    payment: {
      chargeTotal: "00.00"
    }
  };
};
var _fakeAddCard = function(customerId) {
  return {
    customerId: customerId,
    creditCardNumber: "4111111111111111",
    expirationMonth: 12,
    expirationYear: 2020,
    billingName: faker.name.findName()
  };
};
var _fakeDeleteCard = function(customerId, token) {
  return {
    customerId: customerId,
    token: token
  };
};

var _fakeAuth = function(customerId, customerName) {
  var id = Math.floor(Math.random() * (10000 - 100)) + 100;
  return {
    processorID: "1",
    referenceNum: "PONumber-" + id,
    billing: {
      name: customerName
    },
    transactionDetail: {
      payType: {
        creditCard: {
          number: "4111111111111111",
          expMonth: "12",
          expYear: "2020",
          cvvNumber: ""
        }
      }
    },
    payment: {
      currencyCode: "BRL",
      chargeTotal: "10.00"
    },
    saveOnFile: {
      customerToken: customerId
    }
  };
};
var _fakeAuthWithToken = function(customerId, token) {
  var id = Math.floor(Math.random() * (10000 - 100)) + 100;
  return {
    processorID: "1",
    referenceNum: "PONumber-" + id,
    transactionDetail: {
      payType: {
        onFile: {
          customerId: customerId,
          token: token
        }
      }
    },
    payment: {
      currencyCode: "BRL",
      chargeTotal: "10.00"
    }
  };
};
var _fakeCapture = function(orderId, referenceNum) {
  return {
    orderID: orderId,
    referenceNum: referenceNum,
    payment: {
      chargeTotal: "10.00"
    }
  };
};
var _fakeVoid = function(transactionID) {
  return {
    transactionID: transactionID
  };
};
var _fakeSale = function(forValidSale, customerId, customerName, customerDocument, fraudCheck) {
  var id = Math.floor(Math.random() * (10000 - 100)) + 100;
  if (!fraudCheck) {
    return {
      processorID: "1",
      referenceNum: "PONumber-" + id,
      transactionDetail: {
        payType: {
          creditCard: {
            number: "4111111111111111",
            expMonth: "12",
            expYear: "2020",
            cvvNumber: ""
          }
        }
      },
      payment: {
        currencyCode: "BRL",
        chargeTotal: forValidSale ? "10.00" : "15.33"
      },
      saveOnFile: {
        customerToken: customerId
      }
    };
  } else {
    return {
      processorID: "1",
      referenceNum: "PONumber-" + id,
      fraudCheck: "Y",
      billing: {
        id: "1",
        type: "Individual",
        name: customerName,
        address: "address test",
        district: "district test",
        gender: "M",
        birthDate: "1989-02-23",
        city: "Franca",
        state: "SP",
        country: "BR",
        postalcode: "14405016",
        email: "magamais@magazineluiza.com.br",
        phones: {
          $: { phoneCount: "1" },
          phone: {
            phoneType: "Mobile",
            phoneCountryCode: "55",
            phoneAreaCode: "16",
            phoneNumber: "999999999",
            phoneExtension: ""
          }
        },
        documents: {
          $: { documentCount: "1" },
          document: {
            documentType: "CPF",
            documentValue: customerDocument
          }
        }
      },
      shipping: {
        name: customerName,
        address: "address test",
        city: "Franca",
        state: "SP",
        district: "district test",
        postalcode: "14405016",
        country: "BR",
        id: "1",
        type: "Individual",
        gender: "M",
        phones: {
          $: { phoneCount: "1" },
          phone: {
            phoneType: "Mobile",
            phoneCountryCode: "55",
            phoneAreaCode: "16",
            phoneNumber: "999999999",
            phoneExtension: ""
          }
        },
        documents: {
          $: { documentCount: "1" },
          document: {
            documentType: "CPF",
            documentValue: customerDocument
          }
        }
      },
      transactionDetail: {
        payType: {
          creditCard: {
            number: "4111111111111111",
            expMonth: "12",
            expYear: "2020",
            cvvNumber: ""
          }
        }
      },
      payment: {
        currencyCode: "BRL",
        chargeTotal: forValidSale ? "10.00" : "15.33"
      },
      fraudDetails: {
        fraudProcessorID: "98",
        fraudToken: "12345",
        websiteId: "Android"
      },
      saveOnFile: {
        customerToken: customerId
      }
    };
  }
};
var _fakeSaleWithToken = function(forValidSale, customerId, customerName, customerDocument, fraudCheck, token) {
  var id = Math.floor(Math.random() * (10000 - 100)) + 100;
  if (!fraudCheck) {
    return {
      processorID: "1",
      referenceNum: "PONumber-" + id,
      transactionDetail: {
        payType: {
          onFile: {
            customerId: customerId,
            token: token
          }
        }
      },
      payment: {
        currencyCode: "BRL",
        chargeTotal: "10.00"
      }
    };
  } else {
    return {
      processorID: "1",
      referenceNum: "PONumber-" + id,
      fraudCheck: "Y",
      billing: {
        id: "1",
        type: "Individual",
        name: customerName,
        address: "address test",
        district: "district test",
        gender: "M",
        birthDate: "1989-02-23",
        city: "Franca",
        state: "SP",
        country: "BR",
        postalcode: "14405016",
        email: "magamais@magazineluiza.com.br",
        phones: {
          $: { phoneCount: "1" },
          phone: {
            phoneType: "Mobile",
            phoneCountryCode: "55",
            phoneAreaCode: "16",
            phoneNumber: "999999999",
            phoneExtension: ""
          }
        },
        documents: {
          $: { documentCount: "1" },
          document: {
            documentType: "CPF",
            documentValue: customerDocument
          }
        }
      },
      shipping: {
        name: customerName,
        address: "address test",
        city: "Franca",
        state: "SP",
        district: "district test",
        postalcode: "14405016",
        country: "BR",
        id: "1",
        type: "Individual",
        gender: "M",
        phones: {
          $: { phoneCount: "1" },
          phone: {
            phoneType: "Mobile",
            phoneCountryCode: "55",
            phoneAreaCode: "16",
            phoneNumber: "999999999",
            phoneExtension: ""
          }
        },
        documents: {
          $: { documentCount: "1" },
          document: {
            documentType: "CPF",
            documentValue: customerDocument
          }
        }
      },
      transactionDetail: {
        payType: {
          onFile: {
            customerId: customerId,
            token: token
          }
        }
      },
      payment: {
        currencyCode: "BRL",
        chargeTotal: forValidSale ? "10.00" : "15.33"
      },
      fraudDetails: {
        fraudProcessorID: "98",
        fraudToken: "12345",
        websiteId: "Android"
      },
      saveOnFile: {
        customerToken: customerId
      }
    };
  }
};
var _fakeReturnPayment = function(orderId, referenceNum) {
  return {
    orderID: orderId,
    referenceNum: referenceNum,
    payment: {
      chargeTotal: "10.00"
    }
  };
};

var _fakeRecurringPayment = function() {
  var id = Math.floor(Math.random() * (10000 - 100)) + 100;
  var tomorrow = moment()
    .add(1, "days")
    .format("YYYY-MM-DD");
  return {
    processorID: "1",
    referenceNum: "PONumber-" + id,
    billing: {
      name: faker.name.findName(),
      address: faker.address.streetAddress(),
      address2: faker.address.streetAddress(),
      city: faker.address.city(),
      state: faker.address.state(),
      postalcode: faker.address.zipCode("#########"),
      country: faker.address.countryCode(),
      phone: faker.phone.phoneNumberFormat(3),
      email: faker.internet.email()
    },
    shipping: {
      name: faker.name.findName(),
      address: faker.address.streetAddress(),
      address2: faker.address.streetAddress(),
      city: faker.address.city(),
      state: faker.address.state(),
      postalcode: faker.address.zipCode("#########"),
      country: faker.address.countryCode(),
      phone: faker.phone.phoneNumberFormat(3),
      email: faker.internet.email()
    },
    transactionDetail: {
      payType: {
        creditCard: {
          number: "4111111111111111",
          expMonth: "12",
          expYear: "2020",
          cvvNumber: ""
        }
      }
    },
    payment: {
      currencyCode: "BRL",
      chargeTotal: "11.00"
    },
    recurring: {
      action: "new",
      startDate: tomorrow,
      frequency: "1",
      period: "monthly",
      installments: "10",
      failureThreshold: "5"
    }
  };
};
var _fakeRecurringPaymentWithToken = function(customerId, token) {
  var id = Math.floor(Math.random() * (10000 - 100)) + 100;
  var tomorrow = moment()
    .add(1, "days")
    .format("YYYY-MM-DD");
  return {
    processorID: "1",
    referenceNum: "PONumber-" + id,
    billing: {
      name: faker.name.findName(),
      address: faker.address.streetAddress(),
      address2: faker.address.streetAddress(),
      city: faker.address.city(),
      state: faker.address.state(),
      postalcode: faker.address.zipCode("#########"),
      country: faker.address.countryCode(),
      phone: faker.phone.phoneNumberFormat(3),
      email: faker.internet.email()
    },
    shipping: {
      name: faker.name.findName(),
      address: faker.address.streetAddress(),
      address2: faker.address.streetAddress(),
      city: faker.address.city(),
      state: faker.address.state(),
      postalcode: faker.address.zipCode("#########"),
      country: faker.address.countryCode(),
      phone: faker.phone.phoneNumberFormat(3),
      email: faker.internet.email()
    },
    transactionDetail: {
      payType: {
        onFile: {
          customerId: customerId,
          token: token
        }
      }
    },
    payment: {
      currencyCode: "BRL",
      chargeTotal: "11.00"
    },
    recurring: {
      action: "new",
      startDate: tomorrow,
      frequency: "1",
      period: "monthly",
      installments: "10",
      failureThreshold: "5"
    }
  };
};
var _fakeUpdateRecurringPayment = function(orderID) {
  var fiveDaysAhead = moment()
    .add(1, "days")
    .format("YYYY-MM-DD");
  return {
    orderID: orderID,
    paymentInfo: {
      cardInfo: {
        softDescriptor: "RECSDNAME"
      }
    },
    recurring: {
      processorID: "1",
      action: "disable",
      installments: "11",
      nextFireDate: fiveDaysAhead,
      fireDay: "20",
      period: "quarterly"
    },
    billingInfo: {
      name: faker.name.findName(),
      address1: faker.address.streetAddress(),
      address2: faker.address.streetAddress(),
      city: faker.address.city(),
      zip: faker.address.zipCode("#########"),
      country: faker.address.countryCode(),
      email: faker.internet.email(),
      phone: faker.phone.phoneNumberFormat(3)
    },
    shippingInfo: {
      name: faker.name.findName(),
      address1: faker.address.streetAddress(),
      address2: faker.address.streetAddress(),
      city: faker.address.city(),
      zip: faker.address.zipCode("#########"),
      country: faker.address.countryCode(),
      email: faker.internet.email(),
      phone: faker.phone.phoneNumberFormat(3)
    }
  };
};
var _fakeCancelRecurringPayment = function(orderID) {
  return {
    orderID: orderID
  };
};

var _fakeTransactionQuery = function() {
  return {
    filterOptions: {
      transactionId: 2997111
    }
  };
};

exports.fakeClient = _fakeClient;
exports.fakeFullClient = _fakeFullClient;
exports.fakeDeleteCustomer = _fakeDeleteCustomer;
exports.fakeZeroDollar = _fakeZeroDollar;
exports.fakeAddCard = _fakeAddCard;
exports.fakeDeleteCard = _fakeDeleteCard;
exports.fakeAuth = _fakeAuth;
exports.fakeAuthWithToken = _fakeAuthWithToken;
exports.fakeCapture = _fakeCapture;
exports.fakeVoid = _fakeVoid;
exports.fakeSale = _fakeSale;
exports.fakeSaleWithToken = _fakeSaleWithToken;
exports.fakeReturnPayment = _fakeReturnPayment;
exports.fakeRecurringPayment = _fakeRecurringPayment;
exports.fakeRecurringPaymentWithToken = _fakeRecurringPaymentWithToken;
exports.fakeUpdateRecurringPayment = _fakeUpdateRecurringPayment;
exports.fakeCancelRecurringPayment = _fakeCancelRecurringPayment;
exports.fakeTransactionQuery = _fakeTransactionQuery;
