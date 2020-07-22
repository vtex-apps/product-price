import { createContext } from 'react'

export interface Installments {
  Value: number
  InterestRate: number
  TotalValuePlusInterestRate: number
  NumberOfInstallments: number
}

const InstallmentsContext = createContext<
  { installments: Installments } | undefined
>(undefined)

export default InstallmentsContext
