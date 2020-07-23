import React, { useContext } from 'react'
import { useCssHandles } from 'vtex.css-handles'
import { ProductContext } from 'vtex.product-context'

import InstallmentsContext, {
  Installments,
} from './components/InstallmentsContext'
import pickInstallments from './modules/pickInstallments'

const CSS_HANDLES = ['installmentsListContainer'] as const

interface Props {
  children: React.ReactElement[]
}

function InstallmentsList(props: Props) {
  const { children } = props
  const { selectedItem } = useContext(ProductContext)
  const handles = useCssHandles(CSS_HANDLES)

  const commercialOffer = selectedItem?.sellers[0]?.commertialOffer

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

  if (React.Children.toArray(children).length !== 1) {
    if (process.env.NODE_ENV !== 'production') {
      console.error('InstallmentsList accepts only one element as children')
    }

    return null
  }

  return (
    <div
      className={`${handles.installmentsListContainer} flex flex-column items-center`}
    >
      {pickedInstallments.map((inst: Installments, i: number) => {
        return (
          <InstallmentsContext.Provider value={{ installments: inst }} key={i}>
            {React.cloneElement(children[0])}
          </InstallmentsContext.Provider>
        )
      })}
    </div>
  )
}

export default InstallmentsList
