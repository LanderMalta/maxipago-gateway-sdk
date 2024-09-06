const fakeZeroDollar = function () {
  const id = Math.floor(Math.random() * (10000 - 100)) + 100
  return {
    processorID: '1',
    referenceNum: 'PONumber-' + id,

    transactionDetail: {
      payType: {
        creditCard: {
          number: '4111111111111111',
          expMonth: '12',
          expYear: '2020',
          cvvNumber: '999',
        },
      },
    },
    payment: {
      chargeTotal: '00.00',
    },
  }
}

const validZeroDollarXML = function (merchantId, merchantKey, zeroDollar) {
  return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<transaction-request>
  <version>3.1.1.15</version>
  <verification>
    <merchantId>${merchantId}</merchantId>
    <merchantKey>${merchantKey}</merchantKey>
  </verification>
  <order>
    <zeroDollar>
      <processorID>${zeroDollar.processorID}</processorID>
      <referenceNum>${zeroDollar.referenceNum}</referenceNum>
      <transactionDetail>
        <payType>
          <creditCard>
            <number>${zeroDollar.transactionDetail.payType.creditCard.number}</number>
            <expMonth>${zeroDollar.transactionDetail.payType.creditCard.expMonth}</expMonth>
            <expYear>${zeroDollar.transactionDetail.payType.creditCard.expYear}</expYear>
            <cvvNumber>${zeroDollar.transactionDetail.payType.creditCard.cvvNumber}</cvvNumber>
          </creditCard>
        </payType>
      </transactionDetail>
      <payment>
        <chargeTotal>${zeroDollar.payment.chargeTotal}</chargeTotal>
      </payment>
    </zeroDollar>
  </order>
</transaction-request>`
}

export { fakeZeroDollar, validZeroDollarXML }
