import dotenv from 'dotenv'
import Gateway from '../../../../../lib/core/maxipago'
import * as recurringMock from './recurringMock'
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
    const recurringPayment = recurringMock.fakeRecurringPayment()
    const scope = nock(baseURL)
      .post(postXMLEndpoint, (body) => {
        expect(body).toEqual(
          recurringMock.validRecurringPaymentXML(
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
    const recurringPayment = recurringMock.fakeRecurringPaymentWithToken()
    const scope = nock(baseURL)
      .post(postXMLEndpoint, (body) => {
        expect(body).toEqual(
          recurringMock.validRecurringPaymentWithTokenXML(
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
    const recurringPayment = recurringMock.fakeUpdateRecurringPayment()
    const scope = nock(baseURL)
      .post(postAPIEndpoint, (body) => {
        expect(body).toEqual(
          recurringMock.validUpdateRecurringPaymentXML(
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
    const cancelRecurringPayment = recurringMock.fakeCancelRecurringPayment()
    const scope = nock(baseURL)
      .post(postAPIEndpoint, (body) => {
        expect(body).toEqual(
          recurringMock.validCancelRecurringPaymentXML(
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
