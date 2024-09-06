import dotenv from 'dotenv'
import Gateway from '../../../../../lib/core/maxipago'
import * as addRecurringPaymentMock from './mocks/addRecurringPaymentMock'
import * as addRecurringPaymentWithTokenMock from './mocks/addRecurringPaymentWithTokenMock'
import * as updateRecurringPaymentMock from './mocks/updateRecurringPaymentMock'
import * as cancelRecurringPaymentMock from './mocks/cancelRecurringPaymentMock'
import { describe, it, expect } from 'vitest'
import nock from 'nock'

dotenv.config({ path: '../.env' })

const baseURL = 'https://testapi.maxipago.net'
const postXMLEndpoint = '/UniversalAPI/postXML'
const postAPIEndpoint = '/UniversalAPI/postAPI'
const merchantId = process.env.MP_TEST_ID
const merchantKey = process.env.MP_TEST_KEY
const gateway = new Gateway(merchantId, merchantKey, 'development')

describe('Recurring Payment Requests', function () {
  it('should recurring payment', async () => {
    const recurringPayment = addRecurringPaymentMock.fakeAddRecurringPayment()
    const scope = nock(baseURL)
      .post(postXMLEndpoint, (body) => {
        expect(body).toEqual(
          addRecurringPaymentMock.validAddRecurringPaymentXML(
            merchantId,
            merchantKey,
            recurringPayment,
          ),
        )
        return true
      })
      .reply(200)
    await gateway.recurringPayment(recurringPayment)
    scope.done()
  })

  it('should recurring payment with token', async () => {
    const recurringPayment =
      addRecurringPaymentWithTokenMock.fakeAddRecurringPaymentWithToken()
    const scope = nock(baseURL)
      .post(postXMLEndpoint, (body) => {
        expect(body).toEqual(
          addRecurringPaymentWithTokenMock.validAddRecurringPaymentWithTokenXML(
            merchantId,
            merchantKey,
            recurringPayment,
          ),
        )
        return true
      })
      .reply(200)
    await gateway.recurringPayment(recurringPayment)
    scope.done()
  })

  it('should update recurring payment', async () => {
    const recurringPayment =
      updateRecurringPaymentMock.fakeUpdateRecurringPayment()
    const scope = nock(baseURL)
      .post(postAPIEndpoint, (body) => {
        expect(body).toEqual(
          updateRecurringPaymentMock.validUpdateRecurringPaymentXML(
            merchantId,
            merchantKey,
            recurringPayment,
          ),
        )
        return true
      })
      .reply(200)
    await gateway.updateRecurringPayment(recurringPayment)
    scope.done()
  })

  it('should cancel recurring payment', async () => {
    const cancelRecurringPayment =
      cancelRecurringPaymentMock.fakeCancelRecurringPayment()
    const scope = nock(baseURL)
      .post(postAPIEndpoint, (body) => {
        expect(body).toEqual(
          cancelRecurringPaymentMock.validCancelRecurringPaymentXML(
            merchantId,
            merchantKey,
            cancelRecurringPayment,
          ),
        )
        return true
      })
      .reply(200)
    await gateway.cancelRecurringPayment(cancelRecurringPayment)
    scope.done()
  })
})
