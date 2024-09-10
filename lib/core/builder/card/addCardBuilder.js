import xmlBuilder from '../../../utils/xmlBuilder'
import formatObject from '../../../utils/formatObject'
import addCardModel from '../../model/card/addCardModel'

export default function buildAddCardXML(card, maxiPagoAuth, xmlOptions) {
  const data = {}
  data.verification = maxiPagoAuth
  data.command = 'add-card-onfile'
  card.expirationMonth = ('00' + card.expirationMonth).slice(-2)
  data.request = formatObject(card, addCardModel)
  return xmlBuilder(xmlOptions).buildObject({
    'api-request': data,
  })
}
