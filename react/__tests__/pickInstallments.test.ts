import { installmentsList, visaInstallments } from 'installments-list-mock'

import pickInstallments from '../modules/pickInstallments'

describe('pickInstallments', () => {
  it('should pick installments of the paymentmethod with the biggest amount', () => {
    const pickedInstallments = pickInstallments(
      installmentsList,
      'PaymentSystemName'
    )

    expect(pickedInstallments).toHaveLength(visaInstallments.length)
    expect(pickedInstallments).toEqual(visaInstallments)
  })
})
