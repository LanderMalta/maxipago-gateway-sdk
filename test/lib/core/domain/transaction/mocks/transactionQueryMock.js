const fakeTransactionQuery = function () {
  return {
    filterOptions: {
      transactionId: 2997111,
    },
  }
}

const validTransactionQueryXML = function (
  merchantId,
  merchantKey,
  transactionQuery,
) {
  return `<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?>
<rapi-request>
  <verification>
    <merchantId>${merchantId}</merchantId>
    <merchantKey>${merchantKey}</merchantKey>
  </verification>
  <command>transactionDetailReport</command>
  <request>
    <filterOptions>
      <transactionId>${transactionQuery.filterOptions.transactionId}</transactionId>
    </filterOptions>
  </request>
</rapi-request>`
}

export { fakeTransactionQuery, validTransactionQueryXML }
