
# MaxiPago - Gateway SDK


 NodeJS SDK for MaxiPago payment gateway.
According to the [MaxiPago API Docs](http://developers.maxipago.com/apidocs/), this SDK performs the following steps:
 1. Receive  MaxiPago requests in JSON format and transform into XML format.
 3. Communicate and process the request with MaxiPago gateway.
 4. Returns the received MaxiPago XML result in JSON format.

---

# Installation 
```sh
$ npm install maxipago-gateway-sdk --save
```

---

# Usage
Import maxipago-gateway-sdk into your context.
```js
import maxipago from 'maxipago-gateway-sdk';
```


Instantiate the gateway

```js
var maxiPagoID = 'YOUR MaxiPagoID';
var maxiPagoKEY = 'YOUR MaxiPagoKEY';
var maxiPagoEnv = 'development';
var mpGateway = maxipago.buildGateway(maxiPagoID, maxiPagoKEY, maxiPagoEnv);
``` 
This method build an gateway to make you able to make requests on MaxiPago platform.
###### Method:
* **.builtGateway(*maxiPagoID*, *maxiPagoKEY*, *maxiPagoEnv*)**

###### Params:
* **maxiPagoID** = *your maxipago ID*
* **maxiPagoKEY**= *your maxipago KEY.*
* **maxiPagoEnv**= *URL maxipago enviorement, when 'development' calls testapi.maxipago.net, when  'production' calls api.maxipago.net).* 

---

# Requests

<details>
<summary>Customers</summary>

<p>

* 
  <details>
    <summary>Add Customer</summary>
  <p>

  This method add your customer on MaxiPago platform.
  ###### Method:
  * **.addCustomer(*addCustomerJSON*);**
  ###### Params:
  * **addCustomerJSON** = *your customer data in JSON format*.
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
  let maxiPagoJsonResponse = mpGateway.addCustomer(addCustomerJSON);
  ```

  </p>
  </details>

* 
  <details>
  <summary>Update Customer</summary>
  <p>

  This method update previously added customer on MaxiPago platform.

  ###### Method:
  * **.updateCustomer(*updateCustomerJSON*);**
  ###### Params:
  * **updateCustomerJSON** = *your updated customer data in JSON format.*

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
  mpGateway.updateCustomer(updateCustomerJSON)


  });
  ```
  </p>
  </details>

* 
  <details>
    <summary>Delete Customer</summary>
    <p>
    
  This method delete previously added customer on MaxiPago platform.

  ###### Method:
  * **.deleteCustomer(*deleteCustomerJSON*);**
  ###### Params:
  * **deleteCustomerJSON** = *your updated customer data in JSON format.*
  ###### Example:
  ```js
  var deleteCustomerJSON = { customerId: '119679'};
  let maxiPagoJsonResponse = mpGatewaydeleteCustomer(deleteCustomerJSON);


  });
  ```

  </p>
  </details>
</p>
</details>

</br>

<details>
<summary>Cards</summary>
<p>

* 
  <details>
    <summary>Add Card</summary>
    <p>

  This method add an card for previously added customer on MaxiPago platform.

  ###### Method:
  * **.addCard(*addCardJSON*);**
  ###### Params:
  * **addCardJSON** = *your card data in JSON format.*
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
  let maxiPagoJsonResponse = mpGatewayaddCard(addCardJSON);

  ```
  </p>
  </details>

* 
  <details>
    <summary>Delete Card</summary>
    <p>

  This method delete an card previously added on MaxiPago platform.

  ###### Method:
  * **.deleteCard(*deleteCardJSON*);**
  ###### Params:
  * **deleteCardJSON** = *your card data in JSON format.*
  ###### Example:
  ```js
  var deleteCardJSON = 
  {
    "customerId": "119722",
    "token": "+adHuFvmSms="
  };
  let maxiPagoJsonResponse = mpGatewaydeleteCard(deleteCardJSON);
  ```

  </p>
  </details>
</p>
</details>

</br>

<details>
<summary>Payments</summary>
<p>

* 
  <details>
    <summary>Auth</summary>
      <p>

  This method add an sale authorization for previously card added on MaxiPago platform.

  ###### Method:
  * **.auth(*authJSON*);**
  ###### Params:
  * **authJSON** = *your authorization data in JSON format.*
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
  let maxiPagoJsonResponse = mpGatewayauth(authJSON);
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
  let maxiPagoJsonResponse = mpGatewayauth(authJSON);
  ```
  </p>
  </details>

* 
  <details>
    <summary>Capture</summary>
    <p>

  This method capture an sale authorization previously added on MaxiPago platform.

  ###### Method:
  * **.capture(*captureJSON*);**
  ###### Params:
  * **captureJSON** = *your capture data in JSON format.*
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
  let maxiPagoJsonResponse = mpGatewaycapture(captureJSON);
  ```
  </p>
  </details>

* 
  <details>
    <summary>Void</summary>
    <p>

  This method void an previously capture requested on MaxiPago platform.

  ###### Method:
  * **.void(*voidJSON*);**
  ###### Params:
  * **voidJSON** = *your void data in JSON format.*
  ###### Example:
  ```js
  var voidJSON = {transactionID: '2203293'};
  let maxiPagoJsonResponse = mpGatewayvoid(voidJSON);
  ```
  </p>
  </details>

* 
  <details>
    <summary>Return Payment</summary>
    <p>

  This method return an capture previously requested on MaxiPago platform.

  ###### Method:
  * **.returnPayment(*returnPaymentJSON*);**
  ###### Params:
  * **returnPaymentJSON** = *your return payment data in JSON format.*
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

  let maxiPagoJsonResponse = mpGatewayreturnPayment(returnPaymentJSON);
  ```

  </p>
  </details>
</p>
</details>

</br>

<details>
<summary>Recurring Payments</summary>
<p>

* 
  <details>
    <summary>Add Recurring Payment</summary>
      <p>

  This method add an recurring payment MaxiPago platform.

  ###### Method:
  * **.recurringPayment(*recurringPaymentJSON*);**
  ###### Params:
  * **recurringPaymentJSON** = *your recurring payment data in JSON format.*
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
  let maxiPagoJsonResponse = mpGatewayrecurringPayment(recurringPaymentJSON);
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
  let maxiPagoJsonResponse = mpGatewayrecurringPayment(recurringPaymentJSON);
  ```
  </p>
  </details>

* 
  <details>
    <summary>Update Recurring Payment</summary>
    <p>

  This method update an recurring payment  previously added MaxiPago platform.

  ###### Method:
  * **.updateRecurringPayment(*updateRecurringPaymentJSON*);**
  ###### Params:
  * **updateRecurringPaymentJSON** = *your recurring payment data in JSON format.*
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
  let maxiPagoJsonResponse = mpGatewayvoid(updateRecurringPaymentJSON);
  ```

  </p>
  </details>

* 
  <details>
    <summary>Canceling Recurring Payment</summary>
    <p>

  This method cancel an previously recurring payment added on MaxiPago platform.

  ###### Method:
  * **.cancelRecurringPayment(*cancelRecurringPaymentJSON*);**
  ###### Params:
  * **cancelRecurringPaymentJSON** = *your recurring payment data in JSON format.*
  ###### Example:
  ```js
  var cancelRecurringPaymentJSON = {"orderID":"0A0104A3:0165A0AC8533:9B78:5B51BACC"};
  let maxiPagoJsonResponse = mpGatewaycancelRecurringPayment(cancelRecurringPaymentJSON);
  ```

  </p>
  </details>
</p>
</details>

---

# Internal Dependencies
 * **dotenv** - To work with internal environment variables.
 * **moment** - To work correctly with datas and time zones.
 * **xml-js**- To convert JSON to  XML
 * **axios** -  To make MaxiPago Requests.
 * **xml2js** - To convert XML to JSON
 * **faker** - To create fake tests data.

---

# Contributing
 We would love for you to contribute to the project and help make it even better than it is today!

 - [Building and Testing](#running)
 - [Found a Bug?](#issue)
 - [Missing a Feature?](#feature)
 - [Commit Message Guidelines](#commit)

## <a name="running"></a> Building and Testing
##### Building
 - Fork and clone the repository to your machine and install the project dependencies.

```sh
$ npm install
```
##### Testing
- Make a copy of `.env-example` and rename it to `.env`
- Fill in your test MaxiPago settings the `.env` file
- Run the tests with:

```sh
$ npm run test
```

> :warning:  Warning, the tests make real calls to testapi.maxipago.net with fake data. Be sure you have internet connection, be patient with timeout and be careful with your MaxiPago settings!

## <a name="issue"></a> Found a Bug?

If you find a bug in the source code, you can help us by submitting an issue to our [GitHub Repository][github].
Even better, you can submit a Pull Request with a fix.


## <a name="feature"></a> Missing a Feature?
You can *request* a new feature by submitting an issue to our GitHub Repository.
If you would like to *implement* a new feature, please consider the size of the change in order to determine the right steps to proceed:

* For a **Major Feature**, first open an issue and outline your proposal so that it can be discussed.
  This process allows us to better coordinate our efforts, prevent duplication of work, and help you to craft the change so that it is successfully accepted into the project.

  **Note**: Adding a new topic to the documentation, or significantly re-writing a topic, counts as a major feature.

* **Small Features** can be crafted and directly submitted as a Pull Request.


## <a href="commit"></a>Commit Message Header

```
<type>: <short summary>
  │           │
  │           └─⫸ Summary in present tense. Not capitalized. No period at the end.
  │   
  └─⫸ Commit Type: build|ci|docs|feat|fix|perf|refactor|test
```

The `<type>` and `<summary>` fields are mandatory.


##### Type

Must be one of the following:

* **build**: Changes that affect the build system or external dependencies (example scopes: gulp, broccoli, npm)
* **ci**: Changes to our CI configuration files and scripts (example scopes: Circle, BrowserStack, SauceLabs)
* **docs**: Documentation only changes
* **feat**: A new feature
* **fix**: A bug fix
* **perf**: A code change that improves performance
* **refactor**: A code change that neither fixes a bug nor adds a feature
* **test**: Adding missing tests or correcting existing tests


##### Summary

Use the summary field to provide a succinct description of the change:

* use the imperative, present tense: "change" not "changed" nor "changes"
* don't capitalize the first letter
* no dot (.) at the end
---

# License
MIT
