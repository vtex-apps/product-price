import React, { PropsWithChildren, useMemo } from 'react'
import { useCssHandles, CssHandlesTypes } from 'vtex.css-handles'
import { ProductTypes, useProduct } from 'vtex.product-context'
import { Installment } from 'vtex.product-context/react/ProductTypes'

import { InstallmentsContextProvider } from './components/InstallmentsContext'
import pickInstallmentsList, {
  clusterInstallments,
} from './modules/pickInstallments'
import { getDefaultSeller } from './modules/seller'

const CSS_HANDLES = ['installmentsListContainer'] as const

interface Props {
  paymentSystemName?: string
  installmentsToShow?: number[]
  /** Used to override default CSS handles */
  classes?: CssHandlesTypes.CustomClasses<typeof CSS_HANDLES>
}

function InstallmentsList({
  paymentSystemName,
  installmentsToShow,
  classes,
  children,
}: PropsWithChildren<Props>) {
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

  let pickedInstallments: Installment[] = []

  if (paymentSystemName) {
    const installmentsByPaymentSystem = clusterInstallments(
      commercialOffer.Installments,
      'PaymentSystemName'
    )

    if (!installmentsByPaymentSystem[paymentSystemName]) {
      return null
    }

    pickedInstallments = installmentsByPaymentSystem[paymentSystemName]
  } else {
    pickedInstallments = pickInstallmentsList(
      commercialOffer.Installments,
      'PaymentSystemName'
    )
  }

  const filteredInstallments = installmentsToShow
    ? pickedInstallments.filter(option =>
        installmentsToShow.includes(option.NumberOfInstallments)
      )
    : pickedInstallments

  return (
    <div className={handles.installmentsListContainer}>
      {filteredInstallments.map((inst, i) => {
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
