import { createContext, useContext } from 'react'

export interface Installments {
  Value: number
  InterestRate: number
  TotalValuePlusInterestRate: number
  NumberOfInstallments: number
  PaymentSystemName: string
}

const InstallmentsContext = createContext<
  { installments: Installments } | undefined
>(undefined)

export const InstallmentsContextProvider = InstallmentsContext.Provider

export function useInstallments() {
  return useContext(InstallmentsContext)
}
