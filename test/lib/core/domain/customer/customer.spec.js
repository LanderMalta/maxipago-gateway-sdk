import dotenv from 'dotenv'
import Gateway from '../../../../../lib/core/maxipago'
import * as addBasicCustomerMock from '../customer/mocks/addBasicCustomerMock'
import * as addFullCustomerMock from '../customer/mocks/addFullCustomerMock'
import * as updateCustomerMock from '../customer/mocks/updateCustomerMock'
import * as deleteCustomerMock from '../customer/mocks/deleteCustomerMock'
import { describe, it, expect } from 'vitest'
import nock from 'nock'

dotenv.config({ path: '../.env' })

const baseURL = 'https://testapi.maxipago.net'
const postAPIEndpoint = '/UniversalAPI/postAPI'
const merchantId = process.env.MP_TEST_ID
const merchantKey = process.env.MP_TEST_KEY
const gateway = new Gateway(merchantId, merchantKey, 'development')

describe('Customer Requests', function () {
  it('should add customer basic data', async () => {
    const customer = addBasicCustomerMock.fakeAddBasicCustomerJSON()
    const scope = nock(baseURL)
      .post(postAPIEndpoint, (body) => {
        expect(body).toEqual(
          addBasicCustomerMock.validAddBasicCustomerXML(
            merchantId,
            merchantKey,
            customer,
          ),
        )
        return true
      })
      .reply(200)
    await gateway.addCustomer(customer)
    scope.done()
  })

  it('should add customer full data', async () => {
    const customer = addFullCustomerMock.fakeAddFullCustomerJSON()
    const scope = nock(baseURL)
      .post(postAPIEndpoint, (body) => {
        expect(body).toEqual(
          addFullCustomerMock.validAddFullCustomerXML(
            merchantId,
            merchantKey,
            customer,
          ),
        )
        return true
      })
      .reply(200)
    await gateway.addCustomer(customer)
    scope.done()
  })

  it('should update customer data', async () => {
    const customer = updateCustomerMock.fakeUpdateCustomerJSON()
    const scope = nock(baseURL)
      .post(postAPIEndpoint, (body) => {
        expect(body).toEqual(
          updateCustomerMock.validUpdateCustomerXML(
            merchantId,
            merchantKey,
            customer,
          ),
        )
        return true
      })
      .reply(200)
    await gateway.updateCustomer(customer)
    scope.done()
  })

  it('should delete customer data', async () => {
    const customer = deleteCustomerMock.fakeDeleteCustomerJSON()
    const scope = nock(baseURL)
      .post(postAPIEndpoint, (body) => {
        expect(body).toEqual(
          deleteCustomerMock.validDeleteCustomerXML(
            merchantId,
            merchantKey,
            customer,
          ),
        )
        return true
      })
      .reply(200)
    await gateway.deleteCustomer(customer)
    scope.done()
  })
})
