import {
  installmentsList,
  visaInstallments,
  installmentsListMastercardMax,
} from 'installments-list-mock'

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

  it('should pick MasterCard because the NumberOfInstallments is bigger', () => {
    const pickedInstallments = pickInstallments(
      installmentsListMastercardMax,
      'PaymentSystemName'
    )

    expect(pickedInstallments[0].PaymentSystemName).toBe('Mastercard')

    let maxNumberOfInstallments = pickedInstallments[0].NumberOfInstallments
    let index = 0

    for (let i = 1; i < pickedInstallments.length; i++) {
      if (
        maxNumberOfInstallments < pickedInstallments[i].NumberOfInstallments
      ) {
        maxNumberOfInstallments = pickedInstallments[i].NumberOfInstallments
        index = i
      }
    }

    expect(pickedInstallments[index].NumberOfInstallments).toBe(15)
  })
})
