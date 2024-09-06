import dotenv from 'dotenv'
import Gateway from '../../../../../lib/core/maxipago'
import * as transactionMock from './transactionMock'
import { describe, it, expect } from 'vitest'
import nock from 'nock'

dotenv.config({ path: '../.env' })

const baseURL = 'https://testapi.maxipago.net'
const postXMLEndpoint = '/UniversalAPI/postXML'
const postReportsEndpoint = '/ReportsAPI/servconst/ReportsAPI'
const merchantId = process.env.MP_TEST_ID
const merchantKey = process.env.MP_TEST_KEY
const gateway = new Gateway(merchantId, merchantKey, 'development')

describe('Sale Requests', function () {
  it('should auth transaction', async () => {
    const auth = transactionMock.fakeAuth()
    const scope = nock(baseURL)
      .post(postXMLEndpoint, (body) => {
        expect(body).toEqual(
          transactionMock.validAuthXML(merchantId, merchantKey, auth),
        )
        return true
      })
      .reply(200)
    await gateway.auth(auth)
    scope.done()
  })

  it('should auth transaction with token', async () => {
    const auth = transactionMock.fakeAuthWithToken()
    const scope = nock(baseURL)
      .post(postXMLEndpoint, (body) => {
        expect(body).toEqual(
          transactionMock.validAuthWithTokenXML(merchantId, merchantKey, auth),
        )
        return true
      })
      .reply(200)
    await gateway.auth(auth)
    scope.done()
  })

  it('should capture transaction', async () => {
    const capture = transactionMock.fakeCapture()
    const scope = nock(baseURL)
      .post(postXMLEndpoint, (body) => {
        expect(body).toEqual(
          transactionMock.validCaptureXML(merchantId, merchantKey, capture),
        )
        return true
      })
      .reply(200)
    await gateway.capture(capture)
    scope.done()
  })

  it('should void transaction', async () => {
    const _void = transactionMock.fakeVoid()
    const scope = nock(baseURL)
      .post(postXMLEndpoint, (body) => {
        expect(body).toEqual(
          transactionMock.validVoidXML(merchantId, merchantKey, _void),
        )
        return true
      })
      .reply(200)
    await gateway.void(_void)
    scope.done()
  })

  it('should sale transaction', async () => {
    const sale = transactionMock.fakeSale()
    const scope = nock(baseURL)
      .post(postXMLEndpoint, (body) => {
        expect(body).toEqual(
          transactionMock.validSaleXML(merchantId, merchantKey, sale),
        )
        return true
      })
      .reply(200)
    await gateway.sale(sale)
    scope.done()
  })

  it('should sale with fraudcheck transaction', async () => {
    const sale = transactionMock.fakeSaleWithFraudcheck()
    const scope = nock(baseURL)
      .post(postXMLEndpoint, (body) => {
        expect(body).toEqual(
          transactionMock.validSaleWithFraudcheckXML(
            merchantId,
            merchantKey,
            sale,
          ),
        )
        return true
      })
      .reply(200)
    await gateway.sale(sale)
    scope.done()
  })

  it('should sale using token transaction', async () => {
    const sale = transactionMock.fakeSaleWithToken()
    const scope = nock(baseURL)
      .post(postXMLEndpoint, (body) => {
        expect(body).toEqual(
          transactionMock.validSaleWithTokenXML(merchantId, merchantKey, sale),
        )
        return true
      })
      .reply(200)
    await gateway.sale(sale)
    scope.done()
  })

  it('should sale using token and fraudcheck transaction', async () => {
    const sale = transactionMock.fakeSaleWithTokenAndFraudcheck()
    const scope = nock(baseURL)
      .post(postXMLEndpoint, (body) => {
        expect(body).toEqual(
          transactionMock.validSaleWithTokenAndFraudcheckXML(
            merchantId,
            merchantKey,
            sale,
          ),
        )
        return true
      })
      .reply(200)
    await gateway.sale(sale)
    scope.done()
  })

  it('should return an captured transaction', async () => {
    const returnPayment = transactionMock.fakeReturnPayment()
    const scope = nock(baseURL)
      .post(postXMLEndpoint, (body) => {
        expect(body).toEqual(
          transactionMock.validReturnPaymentXML(
            merchantId,
            merchantKey,
            returnPayment,
          ),
        )
        return true
      })
      .reply(200)
    await gateway.returnPayment(returnPayment)
    scope.done()
  })

  it('should query transaction', async () => {
    const transactionQuery = transactionMock.fakeTransactionQuery()
    const scope = nock(baseURL)
      .post(postReportsEndpoint, (body) => {
        expect(body).toEqual(
          transactionMock.validTransactionQueryXML(
            merchantId,
            merchantKey,
            transactionQuery,
          ),
        )
        return true
      })
      .reply(
        200,
        `<?xml version="1.0" encoding="UTF-8"?>
<rapi-response>
    <header>
    </header>
    <result>
        <resultSetInfo>
        </resultSetInfo>
        <records>
            <record>
            </record>
        </records>
    </result>
</rapi-response>`,
      )
    await gateway.transactionQuery(transactionQuery)
    scope.done()
  })
})
