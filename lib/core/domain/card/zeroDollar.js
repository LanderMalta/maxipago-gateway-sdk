import axios from 'axios'
import buildZeroDollarXML from '../../builder/card/zeroDollarBuilder'
import formatMaxiPagoResponse from '../../../utils/formatMaxiPagoResponse'

export async function zeroDollar(
  zeroDollar,
  maxiPagoBaseURL,
  maxiPagoPostXMLEndpoint,
  maxiPagoApiVersion,
  maxiPagoAuth,
  maxiPagoHeaders,
  xmlOptions,
) {
  const zeroDollarXML = buildZeroDollarXML(
    zeroDollar,
    maxiPagoApiVersion,
    maxiPagoAuth,
    xmlOptions,
  )
  const xmlResponse = await axios.post(
    maxiPagoBaseURL + maxiPagoPostXMLEndpoint,
    zeroDollarXML,
    maxiPagoHeaders,
  )
  const jsonResponse = formatMaxiPagoResponse(xmlResponse)
  return jsonResponse
}
