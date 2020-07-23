import { Installments } from '../components/InstallmentsContext'

export const visaInstallments: Installments[] = [
  {
    Value: 44,
    InterestRate: 0,
    TotalValuePlusInterestRate: 44,
    NumberOfInstallments: 1,
    PaymentSystemName: 'Visa',
  },
  {
    Value: 22,
    InterestRate: 0,
    TotalValuePlusInterestRate: 44,
    NumberOfInstallments: 2,
    PaymentSystemName: 'Visa',
  },
  {
    Value: 14.7,
    InterestRate: 0,
    TotalValuePlusInterestRate: 44,
    NumberOfInstallments: 3,
    PaymentSystemName: 'Visa',
  },
  {
    Value: 11,
    InterestRate: 0,
    TotalValuePlusInterestRate: 44,
    NumberOfInstallments: 4,
    PaymentSystemName: 'Visa',
  },
]

export const masterCardInstallments: Installments[] = [
  {
    Value: 44,
    InterestRate: 0,
    TotalValuePlusInterestRate: 44,
    NumberOfInstallments: 1,
    PaymentSystemName: 'Mastercard',
  },
  {
    Value: 22,
    InterestRate: 0,
    TotalValuePlusInterestRate: 44,
    NumberOfInstallments: 2,
    PaymentSystemName: 'Mastercard',
  },
  {
    Value: 14.7,
    InterestRate: 0,
    TotalValuePlusInterestRate: 44,
    NumberOfInstallments: 3,
    PaymentSystemName: 'Mastercard',
  },
  {
    Value: 11,
    InterestRate: 0,
    TotalValuePlusInterestRate: 44,
    NumberOfInstallments: 4,
    PaymentSystemName: 'Mastercard',
  },
]

export const installmentsList: Installments[] = [
  {
    Value: 44,
    InterestRate: 0,
    TotalValuePlusInterestRate: 44,
    NumberOfInstallments: 1,
    PaymentSystemName: 'American Express',
  },
  ...visaInstallments,
  ...masterCardInstallments,
  {
    Value: 40.5,
    InterestRate: 0,
    TotalValuePlusInterestRate: 40.5,
    NumberOfInstallments: 1,
    PaymentSystemName: 'Boleto Bancário',
  },
  {
    Value: 44,
    InterestRate: 0,
    TotalValuePlusInterestRate: 44,
    NumberOfInstallments: 1,
    PaymentSystemName: 'Vale',
  },
  {
    Value: 44,
    InterestRate: 0,
    TotalValuePlusInterestRate: 44,
    NumberOfInstallments: 1,
    PaymentSystemName: 'Promissory',
  },
  {
    Value: 44,
    InterestRate: 0,
    TotalValuePlusInterestRate: 44,
    NumberOfInstallments: 1,
    PaymentSystemName: 'Customer Credit',
  },
  {
    Value: 22,
    InterestRate: 0,
    TotalValuePlusInterestRate: 44,
    NumberOfInstallments: 2,
    PaymentSystemName: 'Customer Credit',
  },
  {
    Value: 15.1,
    InterestRate: 1,
    TotalValuePlusInterestRate: 45.3,
    NumberOfInstallments: 3,
    PaymentSystemName: 'Customer Credit',
  },
  {
    Value: 44,
    InterestRate: 0,
    TotalValuePlusInterestRate: 44,
    NumberOfInstallments: 1,
    PaymentSystemName: 'Free',
  },
]

export const installmentsListMastercardMax = [
  ...visaInstallments,
  ...masterCardInstallments,
  {
    Value: 44,
    InterestRate: 0,
    TotalValuePlusInterestRate: 44,
    NumberOfInstallments: 14,
    PaymentSystemName: 'Visa',
  },
  {
    Value: 44,
    InterestRate: 0,
    TotalValuePlusInterestRate: 44,
    NumberOfInstallments: 15,
    PaymentSystemName: 'Mastercard',
  },
]
