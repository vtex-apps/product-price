import React, { useContext } from 'react'
import { defineMessages } from 'react-intl'
import { useCssHandles } from 'vtex.css-handles'
import { ProductContext } from 'vtex.product-context'

import InstallmentsContext, {
  Installments,
} from './components/InstallmentsContext'

const CSS_HANDLES = ['installmentsListContainer'] as const

interface Props {
  children: React.ReactElement[]
}

function InstallmentsList(props: Props) {
  const { children } = props
  const { selectedItem } = useContext(ProductContext)
  const handles = useCssHandles(CSS_HANDLES)

  const commertialOffer = selectedItem?.sellers[0]?.commertialOffer

  if (
    !commertialOffer?.Installments ||
    commertialOffer.Installments?.length === 0
  ) {
    return null
  }

  const sortedInstallments = commertialOffer.Installments.concat().sort(
    (a: Installments, b: Installments) =>
      a.NumberOfInstallments - b.NumberOfInstallments
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
      {sortedInstallments.map((inst: Installments, i: number) => {
        return (
          <InstallmentsContext.Provider value={{ installments: inst }} key={i}>
            {React.cloneElement(children[0])}
          </InstallmentsContext.Provider>
        )
      })}
    </div>
  )
}

defineMessages({
  title: {
    id: 'admin/installments-list.title',
  },
  titleMessage: {
    id: 'admin/installments.title',
  },
  description: {
    id: 'admin/installments.description',
  },
  default: {
    id: 'store/installments.default',
  },
})

InstallmentsList.schema = {
  title: 'admin/installments-list.title',
}

export default InstallmentsList
