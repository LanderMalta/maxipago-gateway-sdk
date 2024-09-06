import axios from 'axios'
import buildCaptureXML from '../../builder/transaction/captureBuilder'
import formatMaxiPagoResponse from '../../../utils/formatMaxiPagoResponse'

export async function capture(
  capture,
  maxiPagoBaseURL,
  maxiPagoPostXMLEndpoint,
  maxiPagoApiVersion,
  maxiPagoAuth,
  maxiPagoHeaders,
  xmlOptions,
) {
  const captureXML = buildCaptureXML(
    capture,
    maxiPagoApiVersion,
    maxiPagoAuth,
    xmlOptions,
  )
  const xmlResponse = await axios.post(
    maxiPagoBaseURL + maxiPagoPostXMLEndpoint,
    captureXML,
    maxiPagoHeaders,
  )
  const jsonResponse = formatMaxiPagoResponse(xmlResponse)
  return jsonResponse
}
