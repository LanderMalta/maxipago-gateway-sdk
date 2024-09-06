# MaxiPago - Gateway SDK

This JavaScript library interfaces with the [MaxiPago API](https://www.maxipago.com/developers/apidocs/).

Key functionalities of this library include:

1. Accepting API requests in JSON format.
2. Converting those requests to XML and communicating with the MaxiPago API.
3. Returning the API response, transformed back into JSON format.

<details>
<summary style="font-size: 26px; font-weight: bold;">Install</summary>

### npm

<pre>
  <code id="npm-install">npm install maxipago-gateway-sdk --save</code>
</pre>

### yarn

<pre>
  <code id="yarn-add">yarn add maxipago-gateway-sdk</code>
</pre>

### pnpm

<pre>
  <code id="pnpm-add">pnpm add maxipago-gateway-sdk</code>
</pre>

</details>

---

<details>
<summary style="font-size: 26px; font-weight: bold;">Usage</summary>

### Import

To get started, import the `maxipago-gateway-sdk` into your project:

```js
import maxipago from 'maxipago-gateway-sdk'
```

### Build the gateway

Use this method to create a gateway that enables you to make requests to the MaxiPago API.

###### Method:

```js
maxipago.Gateway()
```

###### Params:

| Name        | Description                                                                                                                                               | Required |
| ----------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| merchantId  | Your MaxiPago merchant ID                                                                                                                                 | Yes      |
| merchantKey | Your MaxiPago merchant KEY                                                                                                                                | Yes      |
| maxiPagoEnv | MaxiPago enviorement. Use **'development'** for [testapi.maxipago.net](testapi.maxipago.net) or **'production'** for [api.maxipago.net](api.maxipago.net) | Yes      |

###### Example:

```js
const maxiPagoGateway = maxipago.Gateway(
  'youmaxipagoid',
  'youmaxipagostrongkey',
  'development',
)
```

</details>

---

<details>
<summary style="font-size: 26px; font-weight: bold;">Requests</summary>

According to the [MaxiPago API Docs](http://developers.maxipago.com/apidocs/), this library has the following mapped functionalities:

- <details>
  <summary style="font-size: 22px; font-weight: bold;">Customers</summary>

  - <details>
    <summary style="font-size: 18px; font-weight: bold;">Add Customer</summary>

    This method add your customer on MaxiPago API.

    ###### Method:

    - **.addCustomer(_addCustomerJSON_)**

    ###### Params:

    - **addCustomerJSON** = _your customer data in JSON format_.

    ###### Example:

    ```js
    const addCustomerJSON = {
      customerIdExt: 5358,
      firstName: 'Kylee Hilpert',
      lastName: 'Bauch',
      address1: '42837 Flatley Union',
      address2: '6749 Hudson Prairie',
      city: 'Arnostad',
      state: 'Arizona',
      zip: '658388059',
      country: 'PR',
      phone: '730.900.4976',
      email: 'Erna_Harris55@gmail.com',
      dob: '06/26/2018',
      sex: 'M',
    }
    const maxiPagoJsonResponse = maxiPagoGateway.addCustomer(addCustomerJSON)
    ```

    </details>

  - <details>
    <summary style="font-size: 18px; font-weight: bold;">Update Customer</summary>

    This method update previously added customer on MaxiPago API.

    ###### Method:

    - **.updateCustomer(_updateCustomerJSON_)**

    ###### Params:

    - **updateCustomerJSON** = _your updated customer data in JSON format._

    -

    ###### Example:

    ```js
    const updateCustomerJSON = {
      customerIdExt: 5254,
      firstName: 'Tatum Goodwin updated',
      lastName: 'Corwin updated',
      customerId: '119679',
    }
    const maxiPagoJsonResponse =
      maxiPagoGateway.updateCustomer(updateCustomerJSON)
    ```

    </details>

  - <details>
    <summary style="font-size: 18px; font-weight: bold;">Delete Customer</summary>
      
    This method delete previously added customer on MaxiPago API.

    ###### Method:

    - **.deleteCustomer(_deleteCustomerJSON_)**

    ###### Params:

    - **deleteCustomerJSON** = _your updated customer data in JSON format._

    ###### Example:

    ```js
    const deleteCustomerJSON = { customerId: '119679' }
    const maxiPagoJsonResponse =
      maxiPagoGateway.deleteCustomer(deleteCustomerJSON)
    ```

    </details>

    </details>

  - <details>
    <summary style="font-size: 22px; font-weight: bold;">Card</summary>

    - <details>
      <summary style="font-size: 18px; font-weight: bold;">Add Card</summary>

      This method add an card for previously added customer on MaxiPago API.

      ###### Method:

      - **.addCard(_addCardJSON_)**

      ###### Params:

      - **addCardJSON** = _your card data in JSON format._

      ###### Example:

      ```js
      const addCardJSON = {
        customerId: '119720',
        creditCardNumber: '4111111111111111',
        expirationMonth: 12,
        expirationYear: 2020,
        billingName: 'Corwin',
      }
      const maxiPagoJsonResponse = maxiPagoGateway.addCard(addCardJSON)
      ```

      </details>

    - <details>
      <summary style="font-size: 18px; font-weight: bold;">Delete Card</summary>

      This method delete an card previously added on MaxiPago API.

      ###### Method:

      - **.deleteCard(_deleteCardJSON_)**

      ###### Params:

      - **deleteCardJSON** = _your card data in JSON format._

      ###### Example:

      ```js
      const deleteCardJSON = {
        customerId: '119722',
        token: '+adHuFvmSms=',
      }
      const maxiPagoJsonResponse = maxiPagoGateway.deleteCard(deleteCardJSON)
      ```

      </details>

      </details>

    - <details>
      <summary style="font-size: 22px; font-weight: bold;">Payments</summary>

      - <details>
        <summary style="font-size: 18px; font-weight: bold;">Auth</summary>

        This method add an sale authorization for previously card added on MaxiPago API.

        ###### Method:

        - **.auth(_authJSON_)**

        ###### Params:

        - **authJSON** = _your authorization data in JSON format._

        ###### Example:

        ```js
        const authJSON = {
          processorID: '1',
          referenceNum: 'PONumber-8959',
          billing: {},
          transactionDetail: {
            payType: {
              creditCard: {
                number: '4111111111111111',
                expMonth: '12',
                expYear: '2020',
                cvvNumber: '',
              },
            },
          },
          payment: {
            currencyCode: 'BRL',
            chargeTotal: '10.00',
          },
          saveOnFile: {
            customerToken: '119766',
          },
        }
        const maxiPagoJsonResponse = maxiPagoGateway.auth(authJSON)
        ```

        You can also request an authorization using card token:

        ```js
        const authJSON = {
          processorID: '1',
          referenceNum: 'PONumber-2861',
          transactionDetail: {
            payType: {
              onFile: {
                customerId: '119790',
                token: 'XN7N7qSfZKc=',
              },
            },
          },
          payment: {
            currencyCode: 'BRL',
            chargeTotal: '10.00',
          },
        }
        const maxiPagoJsonResponse = maxiPagoGateway.auth(authJSON)
        ```

        </details>

      - <details>
        <summary style="font-size: 18px; font-weight: bold;">Capture</summary>

        This method capture an sale authorization previously added on MaxiPago API.

        ###### Method:

        - **.capture(_captureJSON_)**

        ###### Params:

        - **captureJSON** = _your capture data in JSON format._

        ###### Example:

        ```js
        const captureJSON = {
          orderID: '0A0104A3:01659FE61095:AE1B:34012394',
          referenceNum: 'PONumber-5918',
          payment: {
            chargeTotal: '10.00',
          },
        }
        const maxiPagoJsonResponse = maxiPagoGateway.capture(captureJSON)
        ```

        </details>

      - <details>
        <summary style="font-size: 18px; font-weight: bold;">Void</summary>

        This method void an previously capture requested on MaxiPago API.

        ###### Method:

        - **.void(_voidJSON_)**

        ###### Params:

        - **voidJSON** = _your void data in JSON format._

        ###### Example:

        ```js
        const voidJSON = { transactionID: '2203293' }
        const maxiPagoJsonResponse = maxiPagoGateway.void(voidJSON)
        ```

        </details>

      - <details>
          <summary style="font-size: 18px; font-weight: bold;">Return Payment</summary>

        This method return an capture previously requested on MaxiPago API.

        ###### Method:

        - **.returnPayment(_returnPaymentJSON_)**

        ###### Params:

        - **returnPaymentJSON** = _your return payment data in JSON format._

        ###### Example:

        ```js
        const returnPaymentJSON = {
          orderID: '0A0104A3:0165A0D725D2:51BC:3AA3973C',
          referenceNum: 'PONumber-5441',
          payment: {
            chargeTotal: '10.00',
          },
        }

        const maxiPagoJsonResponse =
          maxiPagoGateway.returnPayment(returnPaymentJSON)
        ```

        </details>

    - <details>
      <summary style="font-size: 22px; font-weight: bold;">Recurring Payments</summary>

      - <details>
        <summary style="font-size: 18px; font-weight: bold;">Add Recurring Payment</summary>

        This method add an recurring payment MaxiPago API.

        ###### Method:

        - **.recurringPayment(_recurringPaymentJSON_)**

        ###### Params:

        - **recurringPaymentJSON** = _your recurring payment data in JSON format._

        ###### Example:

        ```js
        const recurringPaymentJSON = {
          processorID: '1',
          referenceNum: 'PONumber-6058',
          billing: {
            name: 'Bailey Hahn',
            address: '63849 Towne Plain',
            address2: '06249 Cummings Plains',
            city: 'Cummingsland',
            state: 'Kansas',
            postalcode: '458932184',
            country: 'UY',
            phone: '032.912.6510',
            email: 'Susie94@hotmail.com',
          },
          shipping: {
            name: 'Rosemary Barton DDS',
            address: '6695 Beahan View',
            address2: '9255 Brielle Harbors',
            city: 'West Willis',
            state: 'Massachusetts',
            postalcode: '142042357',
            country: 'US',
            phone: '245.009.3441',
            email: 'Kari61@hotmail.com',
          },
          transactionDetail: {
            payType: {
              creditCard: {
                number: '4111111111111111',
                expMonth: '12',
                expYear: '2020',
                cvvNumber: '',
              },
            },
          },
          payment: {
            currencyCode: 'BRL',
            chargeTotal: '11.00',
          },
          recurring: {
            action: 'new',
            startDate: '2018-09-04',
            frequency: '1',
            period: 'monthly',
            installments: '10',
            failureThreshold: '5',
          },
        }
        const maxiPagoJsonResponse =
          maxiPagoGateway.recurringPayment(recurringPaymentJSON)
        ```

        You can request an recurring payment using card token:

        ```js
        const recurringPaymentJSON = {
          processorID: '1',
          referenceNum: 'PONumber-5268',
          billing: {
            name: 'Lyla Schulist',
            address: '76180 Dicki Summit',
            address2: '4073 Sydni Union',
            city: 'Port Eleonoreside',
            state: 'Florida',
            postalcode: '771760064',
            country: 'TD',
            phone: '810.135.7471',
            email: 'Corine.Will63@gmail.com',
          },
          shipping: {
            name: 'Edna Wolf PhD',
            address: '327 Moore Rapids',
            address2: '7913 Bruen Junction',
            city: 'Lebsackburgh',
            state: 'Indiana',
            postalcode: '506219721',
            country: 'NZ',
            phone: '434.540.4613',
            email: 'Craig.OKeefe33@gmail.com',
          },
          transactionDetail: {
            payType: {
              onFile: {
                customerId: '119903',
                token: 'lmHDTV334BQ=',
              },
            },
          },
          payment: {
            currencyCode: 'BRL',
            chargeTotal: '11.00',
          },
          recurring: {
            action: 'new',
            startDate: '2018-09-04',
            frequency: '1',
            period: 'monthly',
            installments: '10',
            failureThreshold: '5',
          },
        }
        const maxiPagoJsonResponse =
          maxiPagoGateway.recurringPayment(recurringPaymentJSON)
        ```

        </details>

      - <details>
        <summary style="font-size: 18px; font-weight: bold;">Update Recurring Payment</summary>

        This method update an recurring payment previously added MaxiPago API.

        ###### Method:

        - **.updateRecurringPayment(_updateRecurringPaymentJSON_)**

        ###### Params:

        - **updateRecurringPaymentJSON** = _your recurring payment data in JSON format._

        ###### Example:

        ```js
        const updateRecurringPaymentJSON = {
          orderID: '0A0104A3:0165A003EA9E:CA3E:788D2E4F',
          paymentInfo: {
            cardInfo: {
              softDescriptor: 'RECSDNAME',
            },
          },
          recurring: {
            processorID: '1',
            action: 'disable',
            installments: '11',
            nextFireDate: '2018-09-04',
            fireDay: '20',
            period: 'quarterly',
          },
          billingInfo: {
            name: 'Dr. Adonis Wiegand',
            address1: '77459 Ignacio Flat',
            address2: '873 Alexandrine Meadow',
            city: 'South Genestad',
            zip: '775927405',
            country: 'GL',
            email: 'Muriel.Senger83@hotmail.com',
            phone: '363.469.7941',
          },
          shippingInfo: {
            name: 'Dayton Zboncak',
            address1: '61508 Rempel Glens',
            address2: '11020 Jaden Plains',
            city: 'Port Easter',
            zip: '127344175',
            country: 'BF',
            email: 'Leda.Cruickshank@yahoo.com',
            phone: '801.057.6041',
          },
        }
        const maxiPagoJsonResponse = maxiPagoGateway.void(
          updateRecurringPaymentJSON,
        )
        ```

        </details>

      - <details>
        <summary style="font-size: 18px; font-weight: bold;">Canceling Recurring Payment</summary>

        This method cancel an previously recurring payment added on MaxiPago API.

        ###### Method:

        - **.cancelRecurringPayment(_cancelRecurringPaymentJSON_)**

        ###### Params:

        - **cancelRecurringPaymentJSON** = _your recurring payment data in JSON format._

        ###### Example:

        ```js
        const cancelRecurringPaymentJSON = {
          orderID: '0A0104A3:0165A0AC8533:9B78:5B51BACC',
        }
        const maxiPagoJsonResponse = maxiPagoGateway.cancelRecurringPayment(
          cancelRecurringPaymentJSON,
        )
        ```

        </details>

      </details>

  </details>

---

<details><summary style="font-size: 26px; font-weight: bold;">Internal Dependencies</summary>

- **@faker-js/faker** - To create fake data tests.
- **axios** - To make MaxiPago Requests.
- **dotenv** - To work with internal environment constiables.
- **moment** - To work correctly with dates and time zones.
- **react-native-xml2js** - To convert XML to JSON
- **xml-js**- To convert JSON to XMLrequests
- **xml2js**- To convert XML responses to JSON

</details>

---

<details><summary style="font-size: 26px; font-weight: bold;">Contributing</summary>

We would love for you to contribute to the project and help make it even better than it is today!

- [Building](#building)
- [Testing](#testing)
- [Found a Bug?](#issue)
- [Missing a Feature?](#feature)
- [Commit Guide](#commit-guide)

### <a name="building"></a>Building

- Fork and clone the repository to your machine and install the project dependencies.

```node
 pnpm install
```

### <a name="testing"></a>Testing

- Make a copy of `.env-example` file and rename it to `.env`.
- Fill in your test MaxiPago settings in `.env` file.
- Run the tests with:

```node
 pnpm run test
```

### <a name="testing"></a>Coverage

```node
 pnpm run test:cov
```

### <a name="issue"></a> Found a Bug?

If you find a bug in the source code, you can help us by submitting an [issue](https://github.com/LanderMalta/maxipago-gateway-sdk/issues). Even better, you can submit a [pull request](https://github.com/LanderMalta/maxipago-gateway-sdk/pulls) with a fix.

### <a name="feature"></a> Missing a Feature?

You can _request_ a new feature by submitting an [issue](https://github.com/LanderMalta/maxipago-gateway-sdk/issues) to our github repository.

If you would like to _implement_ a new feature, please consider the size of the change in order to determine the right steps to proceed:

- **Small Features** can be crafted and directly submitted as a [pull request](https://github.com/LanderMalta/maxipago-gateway-sdk/pulls).
  </br>

- For a **Major Feature**, first open an [issue](https://github.com/LanderMalta/maxipago-gateway-sdk/issues) and outline your proposal so that it can be discussed.
  This process allows us to better coordinate our efforts, prevent duplication of work, and help you to craft the change so that it is successfully accepted into the project.

### <a name="commit-guide"></a>Commit Guide

### Commit Message Header

```
<type>: <short summary>
  │           │
  │           └─⫸ Summary in present tense. Not capitalized. No period at the end.
  │
  └─⫸ Commit Type: build|ci|docs|feat|fix|perf|refactor|test
```

The `<type>` and `<summary>` fields are mandatory.

### Type

Must be one of the following:

- **build**: Changes that affect the build system or external dependencies (example scopes: gulp, broccoli, npm)
- **ci**: Changes to our CI configuration files and scripts (example scopes: Circle, BrowserStack, SauceLabs)
- **docs**: Documentation only changes
- **feat**: A new feature
- **fix**: A bug fix
- **perf**: A code change that improves performance
- **refactor**: A code change that neither fixes a bug nor adds a feature
- **test**: Adding missing tests or correcting existing tests

### Summary

Use the summary field to provide a succinct description of the change:

- use the imperative, present tense: "change" not "changed" nor "changes"
- don't capitalize the first constter
- no dot (.) at the end

</details>

---

<details><summary style="font-size: 26px; font-weight: bold;">License</summary>

MIT

</details>
