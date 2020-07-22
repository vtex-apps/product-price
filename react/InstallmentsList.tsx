import React, { useContext } from 'react'
import { defineMessages } from 'react-intl'
import { useCssHandles } from 'vtex.css-handles'
import { ProductContext } from 'vtex.product-context'

import { BasicPriceProps } from './types'
import InstallmentsRenderer, {
  Installments,
} from './components/InstallmentsRenderer'

const CSS_HANDLES = ['installmentsListContainer'] as const

function InstallmentsList(props: BasicPriceProps) {
  const { message, markers } = props
  const { selectedItem } = useContext(ProductContext)
  const handles = useCssHandles(CSS_HANDLES)

  const commertialOffer = selectedItem?.sellers[0]?.commertialOffer

  if (
    !commertialOffer?.Installments ||
    commertialOffer.Installments?.length === 0
  ) {
    return null
  }

  const sortedInstallments = commertialOffer.Installments.sort(
    (a: Installments, b: Installments) =>
      a.NumberOfInstallments - b.NumberOfInstallments
  )

  return (
    <div
      className={`${handles.installmentsListContainer} flex flex-column items-center`}
    >
      {sortedInstallments.map((inst: Installments, i: number) => {
        return (
          <InstallmentsRenderer
            key={i}
            message={message}
            markers={markers}
            installments={inst}
          />
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
