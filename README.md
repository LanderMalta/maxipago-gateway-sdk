
# maxiPago!- gateway SDK


 NodeJS SDK for maxiPago! payment gateway.
According to the [maxiPago! API Docs](http://developers.maxipago.com/apidocs/), this SDK performs the following actions:
 1. Receive  maxiPago requests in JSON format and transform into XML format.
 3. Communicate and process the request with maxiPago! gateway.
 4. Returns the received maxiPago! XML result in JSON format.

### Installation 
```sh
$ npm install maxipago-gateway-sdk --save
```

# Usage
First import or require maxiPago! SDK library.
```js
var maxipago = require('maxipago-gateway-sdk');
or use EJS 6
import maxipago from 'maxipago-gateway-sdk';
```
---
---
---
#### GATEWAY
---

This method build an gateway to make you able to make requests on maxiPago! platform.
###### Method:
* **.builtGateway(*maxiPagoID*, *maxiPagoKEY*, *maxiPagoEnv*)**

###### Params:
* **maxiPagoID** = *your maxipago ID*
* **maxiPagoKEY**= *your maxipago KEY.*
* **maxiPagoEnv**= *set maxipago enviorement (true= maxiPagoEnv / false=production).* 

###### Example:
```js
var maxiPagoID = 'MaxiPagoID';
var maxiPagoKEY = 'MaxiPagoKEY';
var maxiPagoEnv = '';
var mpGateway = maxipago.buildGateway(maxiPagoID, maxiPagoKEY, maxiPagoEnv);
``` 
---
---
---
#### CUSTOMERS
---
## Adding Customer

 
This method add your customer on maxiPago! platform.
###### Method:
* **.addCustomer(*addCustomerJSON* , *callback*);**

###### Params:
* **addCustomerJSON** = *your customer data in JSON format*.
* **callback** = *callback to get maxiPago! processed data.*

###### Example:
```js
var addCustomerJSON = 
{
  "customerIdExt": 5358,
  "firstName": "Kylee Hilpert",
  "lastName": "Bauch",
  "address1": "42837 Flatley Union",
  "address2": "6749 Hudson Prairie",
  "city": "Arnostad",
  "state": "Arizona",
  "zip": "658388059",
  "country": "PR",
  "phone": "730.900.4976",
  "email": "Erna_Harris55@gmail.com",
  "dob": "06/26/2018",
  "sex": "M"
};
mpGateway.addCustomer(addCustomerJSON, function (err, data) {
   //err is maxiPago! error message.
   //data is maxiPago! response converted in JSON format.
});
```
----
## Updating Customer

This method update previously added customer on maxiPago! platform.
###### Method:
* **.updateCustomer(*updateCustomerJSON*, *callback*);**

###### Params:
* **updateCustomerJSON** = *your updated customer data in JSON format.*
* **callback** = *callback to get maxiPago! processed data.*
* 
###### Example:
```js
var updateCustomerJSON =
{
  "customerIdExt": 5254,
  "firstName": "Tatum Goodwin updated",
  "lastName": "Corwin updated",
  "customerId": "119679"
};
mpGateway.updateCustomer(updateCustomerJSON, function (err, data) {
   //err is maxiPago! error message.
   //data is maxiPago! response converted in JSON format.
});
```
----
## Deleting Customer
This method delete previously added customer on maxiPago! platform.
###### Method:
* **.deleteCustomer(*deleteCustomerJSON*, *callback*);**

###### Params:
* **deleteCustomerJSON** = *your updated customer data in JSON format.*
* **callback** = *callback to get maxiPago! processed data.*

###### Example:
```js
var deleteCustomerJSON = { customerId: '119679'};
mpGateway.deleteCustomer(deleteCustomerJSON, function (err, data) {
   //err is maxiPago! error message.
   //data is maxiPago! response converted in JSON format.
});
```
---
---
---
#### CARDS
---
## Adding Card

This method add an card for previously added customer on maxiPago! platform.
###### Method:
* **.addCard(*addCardJSON*, *callback*);**

###### Params:
* **addCardJSON** = *your card data in JSON format.*
* **callback** = *callback to get maxiPago! processed data.*

###### Example:
```js
var addCardJSON = 
{
  "customerId": "119720",
  "creditCardNumber": "4111111111111111",
  "expirationMonth": 12,
  "expirationYear": 2020,
  "billingName": "Corwin"
};
mpGateway.addCard(addCardJSON, function (err, data) {
   //err is maxiPago! error message.
   //data is maxiPago! response converted in JSON format.
});
```

----
## Deleting Card

This method delete an card previously added on maxiPago! platform.
###### Method:
* **.deleteCard(*deleteCardJSON*, *callback*);**

###### Params:
* **deleteCardJSON** = *your card data in JSON format.*
* **callback** = *callback to get maxiPago! processed data.*

###### Example:
```js
var deleteCardJSON = 
{
  "customerId": "119722",
  "token": "+adHuFvmSms="
};
mpGateway.deleteCard(deleteCardJSON, function (err, data) {
   //err is maxiPago! error message.
   //data is maxiPago! response converted in JSON format.
});
```
---
---
---
#### PAYMENTS
---
## Auth

This method add an sale authorization for previously card added on maxiPago! platform.
###### Method:
* **.auth(*authJSON*, *callback*);**

###### Params:
* **authJSON** = *your authorization data in JSON format.*
* **callback** = *callback to get maxiPago! processed data.*

###### Example:
```js
var authJSON = 	
{
  "processorID": "1",
  "referenceNum": "PONumber-8959",
  "billing": {},
  "transactionDetail": {
    "payType": {
      "creditCard": {
        "number": "4111111111111111",
        "expMonth": "12",
        "expYear": "2020",
        "cvvNumber": ""
      }
    }
  },
  "payment": {
    "currencyCode": "BRL",
    "chargeTotal": "10.00"
  },
  "saveOnFile": {
    "customerToken": "119766"
  }
};
mpGateway.auth(authJSON, function (err, data) {
   //err is maxiPago! error message.
   //data is maxiPago! response converted in JSON format.
});
```
You can also request an authorization using card token:
```js
var authJSON = 
{
  "processorID": "1",
  "referenceNum": "PONumber-2861",
  "transactionDetail": {
    "payType": {
      "onFile": {
        "customerId": "119790",
        "token": "XN7N7qSfZKc="
      }
    }
  },
  "payment": {
    "currencyCode": "BRL",
    "chargeTotal": "10.00"
  }
};
mpGateway.auth(authJSON, function (err, data) {
   //err is maxiPago! error message.
   //data is maxiPago! response converted in JSON format.
});
```
----
## Capture

This method capture an sale authorization previously added on maxiPago! platform.
###### Method:
* **.capture(*captureJSON*, *callback*);**

###### Params:
* **captureJSON** = *your capture data in JSON format.*
* **callback** = *callback to get maxiPago! processed data.*

###### Example:
```js
var captureJSON = 
{
  "orderID": "0A0104A3:01659FE61095:AE1B:34012394",
  "referenceNum": "PONumber-5918",
  "payment": {
    "chargeTotal": "10.00"
  }
}
mpGateway.capture(captureJSON, function (err, data) {  
   //err is maxiPago! error message.
   //data is maxiPago! response converted inf JSON format.
});
```
----
## Void

This method void an previously capture requested on maxiPago! platform.
###### Method:
* **.void(*voidJSON*, *callback*);**

###### Params:
* **voidJSON** = *your void data in JSON format.*
* **callback** = *callback to get maxiPago! processed data.*

###### Example:
```js
var voidJSON = {transactionID: '2203293'};
mpGateway.void(voidJSON, function (err, data) {
   //err is maxiPago! error message.
   //data is maxiPago! response converted in JSON format.
});
```
----
## Return Payment

This method return an capture previously requested on maxiPago! platform.
###### Method:
* **.returnPayment(*returnPaymentJSON*, *callback*);**

###### Params:
* **returnPaymentJSON** = *your return payment data in JSON format.*
* **callback** = *callback to get maxiPago! processed data.*

###### Example:
```js
var returnPaymentJSON =
{
  "orderID": "0A0104A3:0165A0D725D2:51BC:3AA3973C",
  "referenceNum": "PONumber-5441",
  "payment": {
    "chargeTotal": "10.00"
  }
};

mpGateway.returnPayment(returnPaymentJSON, function (err, data) {
   //err is maxiPago! error message.
   //data is maxiPago! response converted inf JSON format.
});
```
---
---
---
#### RECURRING PAYMENTS
---
## Adding Recurring Payment

This method add an recurring payment maxiPago! platform.
###### Method:
* **.recurringPayment(*recurringPaymentJSON*, *callback*);**

###### Params:
* **recurringPaymentJSON** = *your recurring payment data in JSON format.*
* **callback** = *callback to get maxiPago! processed data.*

###### Example:
```js
var recurringPaymentJSON = 
{
  "processorID": "1",
  "referenceNum": "PONumber-6058",
  "billing": {
    "name": "Bailey Hahn",
    "address": "63849 Towne Plain",
    "address2": "06249 Cummings Plains",
    "city": "Cummingsland",
    "state": "Kansas",
    "postalcode": "458932184",
    "country": "UY",
    "phone": "032.912.6510",
    "email": "Susie94@hotmail.com"
  },
  "shipping": {
    "name": "Rosemary Barton DDS",
    "address": "6695 Beahan View",
    "address2": "9255 Brielle Harbors",
    "city": "West Willis",
    "state": "Massachusetts",
    "postalcode": "142042357",
    "country": "US",
    "phone": "245.009.3441",
    "email": "Kari61@hotmail.com"
  },
  "transactionDetail": {
    "payType": {
      "creditCard": {
        "number": "4111111111111111",
        "expMonth": "12",
        "expYear": "2020",
        "cvvNumber": ""
      }
    }
  },
  "payment": {
    "currencyCode": "BRL",
    "chargeTotal": "11.00"
  },
  "recurring": {
    "action": "new",
    "startDate": "2018-09-04",
    "frequency": "1",
    "period": "monthly",
    "installments": "10",
    "failureThreshold": "5"
  }
};
mpGateway.recurringPayment(recurringPaymentJSON, function (err, data) {
   //err is maxiPago! error message.
   //data is maxiPago! response converted in JSON format.
});
```
You can request an recurring payment using card token:
```js
var recurringPaymentJSON = 
{
  "processorID": "1",
  "referenceNum": "PONumber-5268",
  "billing": {
    "name": "Lyla Schulist",
    "address": "76180 Dicki Summit",
    "address2": "4073 Sydni Union",
    "city": "Port Eleonoreside",
    "state": "Florida",
    "postalcode": "771760064",
    "country": "TD",
    "phone": "810.135.7471",
    "email": "Corine.Will63@gmail.com"
  },
  "shipping": {
    "name": "Edna Wolf PhD",
    "address": "327 Moore Rapids",
    "address2": "7913 Bruen Junction",
    "city": "Lebsackburgh",
    "state": "Indiana",
    "postalcode": "506219721",
    "country": "NZ",
    "phone": "434.540.4613",
    "email": "Craig.OKeefe33@gmail.com"
  },
  "transactionDetail": {
    "payType": {
      "onFile": {
        "customerId": "119903",
        "token": "lmHDTV334BQ="
      }
    }
  },
  "payment": {
    "currencyCode": "BRL",
    "chargeTotal": "11.00"
  },
  "recurring": {
    "action": "new",
    "startDate": "2018-09-04",
    "frequency": "1",
    "period": "monthly",
    "installments": "10",
    "failureThreshold": "5"
  }
}
mpGateway.recurringPayment(recurringPaymentJSON, function (err, data) {
   //err is maxiPago! error message.
   //data is maxiPago! response converted in JSON format.
});
```
----
## Updating Recurring Payment
This method update an recurring payment  previously added maxiPago! platform.
###### Method:
* **.updateRecurringPayment(*updateRecurringPaymentJSON*, *callback*);**

###### Params:
* **updateRecurringPaymentJSON** = *your recurring payment data in JSON format.*
* **callback** = *callback to get maxiPago! processed data.*

###### Example:
```js
var updateRecurringPaymentJSON = 
{
  "orderID": "0A0104A3:0165A003EA9E:CA3E:788D2E4F",
  "paymentInfo": {
    "cardInfo": {
      "softDescriptor": "RECSDNAME"
    }
  },
  "recurring": {
    "processorID": "1",
    "action": "disable",
    "installments": "11",
    "nextFireDate": "2018-09-04",
    "fireDay": "20",
    "period": "quarterly"
  },
  "billingInfo": {
    "name": "Dr. Adonis Wiegand",
    "address1": "77459 Ignacio Flat",
    "address2": "873 Alexandrine Meadow",
    "city": "South Genestad",
    "zip": "775927405",
    "country": "GL",
    "email": "Muriel.Senger83@hotmail.com",
    "phone": "363.469.7941"
  },
  "shippingInfo": {
    "name": "Dayton Zboncak",
    "address1": "61508 Rempel Glens",
    "address2": "11020 Jaden Plains",
    "city": "Port Easter",
    "zip": "127344175",
    "country": "BF",
    "email": "Leda.Cruickshank@yahoo.com",
    "phone": "801.057.6041"
  }
};
mpGateway.void(updateRecurringPaymentJSON, function (err, data) {
   //err is maxiPago! error message.
   //data is maxiPago! response converted in JSON format.
});
```
----
## Canceling Recurring Payment
This method cancel an previously recurring payment added on maxiPago! platform.
###### Method:
* **.cancelRecurringPayment(*cancelRecurringPaymentJSON*, *callback*);**

###### Params:
* **cancelRecurringPaymentJSON** = *your recurring payment data in JSON format.*
* **callback** = *callback to get maxiPago! processed data.*

###### Example:
```js
var cancelRecurringPaymentJSON = {"orderID":"0A0104A3:0165A0AC8533:9B78:5B51BACC"};
mpGateway.cancelRecurringPayment(cancelRecurringPaymentJSON, function (err, data) {
   //err is maxiPago! error message.
   //data is maxiPago! response converted in JSON format.
});
```
----
----
----

# License
MIT
