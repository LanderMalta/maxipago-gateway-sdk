import axios from 'axios'
import buildDeleteCardXML from '../../builder/card/deleteCardBuilder'
import formatMaxiPagoResponse from '../../../utils/formatMaxiPagoResponse'

export async function deleteCard(
  deleteCard,
  maxiPagoBaseURL,
  maxiPagoPostApiEndpoint,
  maxiPagoAuth,
  maxiPagoHeaders,
  xmlOptions,
) {
  const cardXML = buildDeleteCardXML(deleteCard, maxiPagoAuth, xmlOptions)
  const xmlResponse = await axios.post(
    maxiPagoBaseURL + maxiPagoPostApiEndpoint,
    cardXML,
    maxiPagoHeaders,
  )
  const jsonResponse = formatMaxiPagoResponse(xmlResponse)
  return jsonResponse
}
