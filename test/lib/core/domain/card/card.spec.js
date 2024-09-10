import dotenv from 'dotenv'
import Gateway from '../../../../../lib/core/maxipago'
import * as addCardMock from './mocks/addCardMock'
import * as deleteCardMock from './mocks/deleteCardMock'
import * as zeroDollarMock from './mocks/zeroDollarMock'
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
    const zeroDollar = zeroDollarMock.fakeZeroDollar()
    const scope = nock(baseURL)
      .post(postXMLEndpoint, (body) => {
        expect(body).toEqual(
          zeroDollarMock.validZeroDollarXML(
            merchantId,
            merchantKey,
            zeroDollar,
          ),
        )
        return true
      })
      .reply(200)
    await gateway.zeroDollar(zeroDollar)
    scope.done()
  })

  it('should add card', async () => {
    const card = addCardMock.fakeAddCard()
    const scope = nock(baseURL)
      .post(postAPIEndpoint, (body) => {
        expect(body).toEqual(
          addCardMock.validAddCardXML(merchantId, merchantKey, card),
        )
        return true
      })
      .reply(200)
    await gateway.addCard(card)
    scope.done()
  })

  it('should delete card', async () => {
    const deleteCard = deleteCardMock.fakeDeleteCard()
    const scope = nock(baseURL)
      .post(postAPIEndpoint, (body) => {
        expect(body).toEqual(
          deleteCardMock.validDeleteCardXML(
            merchantId,
            merchantKey,
            deleteCard,
          ),
        )
        return true
      })
      .reply(200)
    await gateway.deleteCard(deleteCard)
    scope.done()
  })
})
