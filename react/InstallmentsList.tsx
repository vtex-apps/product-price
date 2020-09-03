import React, { useMemo } from 'react'
import { useCssHandles } from 'vtex.css-handles'
import { useProduct } from 'vtex.product-context'

import {
  Installments,
  InstallmentsContextProvider,
} from './components/InstallmentsContext'
import pickInstallments from './modules/pickInstallments'

const CSS_HANDLES = ['installmentsListContainer'] as const

interface Props {
  children: React.ReactElement[]
}

function InstallmentsList(props: Props) {
  const { children } = props
  const productContextValue = useProduct()
  const handles = useCssHandles(CSS_HANDLES)

  const commercialOffer =
    productContextValue?.selectedItem?.sellers[0]?.commertialOffer

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
      {pickedInstallments.map((inst: Installments, i: number) => {
        return (
          <InstallmentsItem installments={inst} key={i}>
            {children}
          </InstallmentsItem>
        )
      })}
    </div>
  )
}

interface InstallmentsItemProps {
  children: React.ReactNode
  installments: Installments
}

function InstallmentsItem(props: InstallmentsItemProps) {
  const { installments, children } = props
  const contextValue = useMemo(() => ({ installments }), [installments])

  return (
    <InstallmentsContextProvider value={contextValue}>
      {children}
    </InstallmentsContextProvider>
  )
}

export default InstallmentsList
