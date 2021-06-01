import {
  installmentsList,
  visaInstallments,
  installmentsListMastercardMax,
} from 'installments-list-mock'

import pickInstallmentsList, {
  pickMaxInstallmentsOption,
  pickMaxInstallmentsOptionWithNoInterest,
} from '../modules/pickInstallments'

describe('pickInstallmentsList', () => {
  it('should pick installments of the payment method with the biggest amount of options', () => {
    const pickedInstallments = pickInstallmentsList(
      installmentsList,
      'PaymentSystemName'
    )

    expect(pickedInstallments).toHaveLength(visaInstallments.length)
    expect(pickedInstallments).toEqual(visaInstallments)
  })

  it('should pick MasterCard because the NumberOfInstallments is bigger', () => {
    const pickedInstallments = pickInstallmentsList(
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

describe('pickMaxInstallmentsOption', () => {
  it('should pick the installments plan with the highest NumberOfInstallments', () => {
    const pickedInstallmentsPlan = pickMaxInstallmentsOption(
      installmentsListMastercardMax
    )

    expect(pickedInstallmentsPlan.NumberOfInstallments).toBe(15)
    expect(pickedInstallmentsPlan.PaymentSystemName).toBe('Mastercard')
  })

  it('should pick the installments plan with the highest NumberOfInstallments, from a certain payment system', () => {
    const pickedInstallmentsPlan = pickMaxInstallmentsOption(installmentsList, {
      paymentSystemName: 'Customer Credit',
    })

    expect(pickedInstallmentsPlan.NumberOfInstallments).toBe(3)
    expect(pickedInstallmentsPlan.PaymentSystemName).toBe('Customer Credit')
  })

  it('should pick an installments plan with a certain number of installments', () => {
    const pickedInstallmentsPlan = pickMaxInstallmentsOption(
      installmentsListMastercardMax,
      {
        installmentsQuantity: 14,
      }
    )

    expect(pickedInstallmentsPlan.NumberOfInstallments).toBe(14)
  })
})

describe('pickMaxInstallmentsOptionWithNoInterest', () => {
  it('should pick the installments plan with the highest NumberOfInstallments and no interest', () => {
    const pickedInstallmentsPlan = pickMaxInstallmentsOptionWithNoInterest(
      installmentsListMastercardMax
    )

    expect(pickedInstallmentsPlan.NumberOfInstallments).toBe(14)
    expect(pickedInstallmentsPlan.PaymentSystemName).toBe('Visa')
    expect(pickedInstallmentsPlan.InterestRate).toBe(0)
  })

  it('should pick the installments plan with the second highest NumberOfInstallments and no interest, due to filtering rules', () => {
    const pickedInstallmentsPlan = pickMaxInstallmentsOptionWithNoInterest(
      installmentsList,
      {
        paymentSystemName: 'Customer Credit',
      }
    )

    expect(pickedInstallmentsPlan.NumberOfInstallments).toBe(2)
    expect(pickedInstallmentsPlan.PaymentSystemName).toBe('Customer Credit')
    expect(pickedInstallmentsPlan.InterestRate).toBe(0)
  })

  it("should pick the installments plan with the highest NumberOfInstallments overall, if there isn't an option with no interest", () => {
    const pickedInstallmentsPlan = pickMaxInstallmentsOptionWithNoInterest(
      visaInstallments
    )

    expect(pickedInstallmentsPlan.NumberOfInstallments).toBe(4)
    expect(pickedInstallmentsPlan.PaymentSystemName).toBe('Visa')
  })
})
