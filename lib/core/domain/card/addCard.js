import axios from 'axios'
import buildAddCardXML from '../../builder/card/addCardBuilder'
import formatMaxiPagoResponse from '../../../utils/formatMaxiPagoResponse'

export async function addCard(
  card,
  maxiPagoBaseURL,
  maxiPagoPostApiEndpoint,
  maxiPagoAuth,
  maxiPagoHeaders,
  xmlOptions,
) {
  const cardXML = buildAddCardXML(card, maxiPagoAuth, xmlOptions)
  const xmlResponse = await axios.post(
    maxiPagoBaseURL + maxiPagoPostApiEndpoint,
    cardXML,
    maxiPagoHeaders,
  )
  const jsonResponse = formatMaxiPagoResponse(xmlResponse)
  return jsonResponse
}
