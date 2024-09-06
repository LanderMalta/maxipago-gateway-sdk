import xmlBuilder from '../../../utils/xmlBuilder'
import formatObject from '../../../utils/formatObject'
import deleteCardModel from '../../model/card/deleteCardModel'

export default function buildDeleteCardXML(card, maxiPagoAuth, xmlOptions) {
  const data = {}
  data.verification = maxiPagoAuth
  data.command = 'delete-card-onfile'
  data.request = formatObject(card, deleteCardModel)
  return xmlBuilder(xmlOptions).buildObject({
    'api-request': data,
  })
}
