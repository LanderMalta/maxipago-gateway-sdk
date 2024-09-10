import axios from 'axios'
import buildVoidXML from '../../builder/transaction/voidBuilder'
import formatMaxiPagoResponse from '../../../utils/formatMaxiPagoResponse'

export async function _void(
  _void,
  maxiPagoBaseURL,
  maxiPagoPostXMLEndpoint,
  maxiPagoApiVersion,
  maxiPagoAuth,
  maxiPagoHeaders,
  xmlOptions,
) {
  const voidXML = buildVoidXML(
    _void,
    maxiPagoApiVersion,
    maxiPagoAuth,
    xmlOptions,
  )
  const xmlResponse = await axios.post(
    maxiPagoBaseURL + maxiPagoPostXMLEndpoint,
    voidXML,
    maxiPagoHeaders,
  )
  const jsonResponse = formatMaxiPagoResponse(xmlResponse)
  return jsonResponse
}
