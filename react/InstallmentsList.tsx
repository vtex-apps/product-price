import React, { PropsWithChildren, useMemo } from 'react'
import { useCssHandles } from 'vtex.css-handles'
import { ProductTypes, useProduct } from 'vtex.product-context'

import { InstallmentsContextProvider } from './components/InstallmentsContext'
import pickInstallments from './modules/pickInstallments'
import { getFirstAvailableSeller } from './modules/seller'

const CSS_HANDLES = ['installmentsListContainer'] as const

function InstallmentsList({ children }: PropsWithChildren<{}>) {
  const productContextValue = useProduct()
  const handles = useCssHandles(CSS_HANDLES)

  const availableSeller = getFirstAvailableSeller(
    productContextValue?.selectedItem?.sellers
  )

  const commercialOffer = availableSeller?.commertialOffer

  if (
    !commercialOffer?.Installments ||
    commercialOffer.Installments?.length === 0
  ) {
    return null
  }

  const pickedInstallments = pickInstallments(
    commercialOffer.Installments,
    'PaymentSystemName'
  )

  return (
    <div className={handles.installmentsListContainer}>
      {pickedInstallments.map((inst, i) => {
        return (
          <InstallmentsItem installment={inst} key={i}>
            {children}
          </InstallmentsItem>
        )
      })}
    </div>
  )
}

interface Props {
  installment: ProductTypes.Installment
}

function InstallmentsItem(props: PropsWithChildren<Props>) {
  const { installment, children } = props
  const contextValue = useMemo(() => ({ installment }), [installment])

  return (
    <InstallmentsContextProvider value={contextValue}>
      {children}
    </InstallmentsContextProvider>
  )
}

export default InstallmentsList
