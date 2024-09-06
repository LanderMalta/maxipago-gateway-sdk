import dotenv from 'dotenv'
import Gateway from '../../../../../lib/core/maxipago'
import * as customerMock from '../customer/customerMock'
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
    const customer = customerMock.fakeAddBasicCustomerJSON()
    const scope = nock(baseURL)
      .post(postAPIEndpoint, (body) => {
        expect(body).toEqual(
          customerMock.validAddBasicCustomerXML(
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
    const customer = customerMock.fakeAddFullCustomerJSON()
    const scope = nock(baseURL)
      .post(postAPIEndpoint, (body) => {
        expect(body).toEqual(
          customerMock.validAddFullCustomerXML(
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
    const customer = customerMock.fakeUpdateCustomerJSON()
    const scope = nock(baseURL)
      .post(postAPIEndpoint, (body) => {
        expect(body).toEqual(
          customerMock.validUpdateCustomerXML(
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
    const customer = customerMock.fakeDeleteCustomerJSON()
    const scope = nock(baseURL)
      .post(postAPIEndpoint, (body) => {
        expect(body).toEqual(
          customerMock.validDeleteCustomerXML(
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
