import dotenv from 'dotenv'
import Gateway from '../../../../../lib/core/maxipago'
import * as cardMock from './cardMock'
import { describe, it, expect } from 'vitest'
import nock from 'nock'

dotenv.config({ path: '../.env' })

const baseURL = 'https://testapi.maxipago.net'
const postXMLEndpoint = '/UniversalAPI/postXML'
const postAPIEndpoint = '/UniversalAPI/postAPI'
const merchantId = process.env.MP_TEST_ID
const merchantKey = process.env.MP_TEST_KEY
const gateway = new Gateway(merchantId, merchantKey, 'development')

describe('Card Requests', function () {
  it('should zero dollar transaction', async () => {
    const zeroDollar = cardMock.fakeZeroDollar()
    const scope = nock(baseURL)
      .post(postXMLEndpoint, (body) => {
        expect(body).toEqual(
          cardMock.validZeroDollarXML(merchantId, merchantKey, zeroDollar),
        )
        return true
      })
      .reply(200)
    await gateway.zeroDollar(zeroDollar)
    scope.done()
  })

  it('should add card', async () => {
    const card = cardMock.fakeAddCard()
    const scope = nock(baseURL)
      .post(postAPIEndpoint, (body) => {
        expect(body).toEqual(
          cardMock.validAddCardXML(merchantId, merchantKey, card),
        )
        return true
      })
      .reply(200)
    await gateway.addCard(card)
    scope.done()
  })

  it('should delete card', async () => {
    const deleteCard = cardMock.fakeDeleteCard()
    const scope = nock(baseURL)
      .post(postAPIEndpoint, (body) => {
        expect(body).toEqual(
          cardMock.validDeleteCardXML(merchantId, merchantKey, deleteCard),
        )
        return true
      })
      .reply(200)
    await gateway.deleteCard(deleteCard)
    scope.done()
  })
})
