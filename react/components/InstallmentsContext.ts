import { createContext, useContext } from 'react'
import { ProductTypes } from 'vtex.product-context'

const InstallmentsContext = createContext<
  { installment: ProductTypes.Installment } | undefined
>(undefined)

export const InstallmentsContextProvider = InstallmentsContext.Provider

export function useInstallments() {
  return useContext(InstallmentsContext)
}
