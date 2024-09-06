import xmlBuilder from '../../../utils/xmlBuilder'
import formatObject from '../../../utils/formatObject'
import captureModel from '../../model/transaction/captureModel'

export default function buildCaptureXML(
  capture,
  mpAPIVersion,
  maxiPagoAuth,
  xmlOptions,
) {
  const data = {}
  data.version = mpAPIVersion
  data.verification = maxiPagoAuth
  data.order = {
    capture: formatObject(capture, captureModel),
  }
  return xmlBuilder(xmlOptions).buildObject({
    'transaction-request': data,
  })
}
