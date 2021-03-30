import React, { PropsWithChildren, useMemo } from 'react'
import { useCssHandles, CssHandlesTypes } from 'vtex.css-handles'
import { ProductTypes, useProduct } from 'vtex.product-context'

import { InstallmentsContextProvider } from './components/InstallmentsContext'
import pickInstallments from './modules/pickInstallments'
import { getDefaultSeller } from './modules/seller'

const CSS_HANDLES = ['installmentsListContainer'] as const

interface Props {
  /** Used to override default CSS handles */
  classes?: CssHandlesTypes.CustomClasses<typeof CSS_HANDLES>
}

function InstallmentsList({ classes, children }: PropsWithChildren<Props>) {
  const { handles } = useCssHandles(CSS_HANDLES, { classes })
  const productContextValue = useProduct()

  const seller = getDefaultSeller(productContextValue?.selectedItem?.sellers)

  const commercialOffer = seller?.commertialOffer

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

interface ItemProps {
  installment: ProductTypes.Installment
}

function InstallmentsItem(props: PropsWithChildren<ItemProps>) {
  const { installment, children } = props
  const contextValue = useMemo(() => ({ installment }), [installment])

  return (
    <InstallmentsContextProvider value={contextValue}>
      {children}
    </InstallmentsContextProvider>
  )
}

export default InstallmentsList
