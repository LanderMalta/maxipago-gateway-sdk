import dotenv from 'dotenv'
import Gateway from '../../../../../lib/core/maxipago'
import * as authMock from './mocks/authMock'
import * as authWithTokenMock from './mocks/authWithTokenMock'
import * as captureMock from './mocks/captureMock'
import * as voidMock from './mocks/voidMock'
import * as saleMock from './mocks/saleMock'
import * as saleWithFraudcheckMock from './mocks/saleWithFraudcheckMock'
import * as saleWithTokenMock from './mocks/saleWithTokenMock'
import * as saleWithTokenAndFraudcheckMock from './mocks/saleWithTokenAndFraudcheckMock'
import * as returnPaymentMock from './mocks/returnPaymentMock'
import * as transactionQueryMock from './mocks/transactionQueryMock'
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
    const auth = authMock.fakeAuth()
    const scope = nock(baseURL)
      .post(postXMLEndpoint, (body) => {
        expect(body).toEqual(
          authMock.validAuthXML(merchantId, merchantKey, auth),
        )
        return true
      })
      .reply(200)
    await gateway.auth(auth)
    scope.done()
  })

  it('should auth transaction with token', async () => {
    const auth = authWithTokenMock.fakeAuthWithToken()
    const scope = nock(baseURL)
      .post(postXMLEndpoint, (body) => {
        expect(body).toEqual(
          authWithTokenMock.validAuthWithTokenXML(
            merchantId,
            merchantKey,
            auth,
          ),
        )
        return true
      })
      .reply(200)
    await gateway.auth(auth)
    scope.done()
  })

  it('should capture transaction', async () => {
    const capture = captureMock.fakeCapture()
    const scope = nock(baseURL)
      .post(postXMLEndpoint, (body) => {
        expect(body).toEqual(
          captureMock.validCaptureXML(merchantId, merchantKey, capture),
        )
        return true
      })
      .reply(200)
    await gateway.capture(capture)
    scope.done()
  })

  it('should void transaction', async () => {
    const _void = voidMock.fakeVoid()
    const scope = nock(baseURL)
      .post(postXMLEndpoint, (body) => {
        expect(body).toEqual(
          voidMock.validVoidXML(merchantId, merchantKey, _void),
        )
        return true
      })
      .reply(200)
    await gateway.void(_void)
    scope.done()
  })

  it('should sale transaction', async () => {
    const sale = saleMock.fakeSale()
    const scope = nock(baseURL)
      .post(postXMLEndpoint, (body) => {
        expect(body).toEqual(
          saleMock.validSaleXML(merchantId, merchantKey, sale),
        )
        return true
      })
      .reply(200)
    await gateway.sale(sale)
    scope.done()
  })

  it('should sale with fraudcheck transaction', async () => {
    const sale = saleWithFraudcheckMock.fakeSaleWithFraudcheck()
    const scope = nock(baseURL)
      .post(postXMLEndpoint, (body) => {
        expect(body).toEqual(
          saleWithFraudcheckMock.validSaleWithFraudcheckXML(
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
    const sale = saleWithTokenMock.fakeSaleWithToken()
    const scope = nock(baseURL)
      .post(postXMLEndpoint, (body) => {
        expect(body).toEqual(
          saleWithTokenMock.validSaleWithTokenXML(
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

  it('should sale using token and fraudcheck transaction', async () => {
    const sale = saleWithTokenAndFraudcheckMock.fakeSaleWithTokenAndFraudcheck()
    const scope = nock(baseURL)
      .post(postXMLEndpoint, (body) => {
        expect(body).toEqual(
          saleWithTokenAndFraudcheckMock.validSaleWithTokenAndFraudcheckXML(
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
    const returnPayment = returnPaymentMock.fakeReturnPayment()
    const scope = nock(baseURL)
      .post(postXMLEndpoint, (body) => {
        expect(body).toEqual(
          returnPaymentMock.validReturnPaymentXML(
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
    const transactionQuery = transactionQueryMock.fakeTransactionQuery()
    const scope = nock(baseURL)
      .post(postReportsEndpoint, (body) => {
        expect(body).toEqual(
          transactionQueryMock.validTransactionQueryXML(
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
