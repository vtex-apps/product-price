import React, { useContext } from 'react'
import { defineMessages } from 'react-intl'
import { ProductContext } from 'vtex.product-context'

import { StorefrontFC, BasicPriceProps } from './types'
import InstallmentsRenderer from './components/InstallmentsRenderer'

interface Installment {
  Value: number
  InterestRate: number
  TotalValuePlusInterestRate: number
  NumberOfInstallments: number
}

const Installments: StorefrontFC<BasicPriceProps> = props => {
  const { message, markers } = props
  const { selectedItem } = useContext(ProductContext)
  const commercialOffer = selectedItem?.sellers[0]?.commertialOffer

  if (
    !commercialOffer?.Installments ||
    commercialOffer?.Installments?.length === 0
  ) {
    return null
  }

  const installments = commercialOffer.Installments.reduce(
    (previous: Installment, current: Installment) =>
      previous.NumberOfInstallments > current.NumberOfInstallments
        ? previous
        : current,
    {}
  )

  return (
    <InstallmentsRenderer
      message={message}
      markers={markers}
      installments={installments}
    />
  )
}

const messages = defineMessages({
  title: {
    id: 'admin/installments.title',
  },
  description: {
    id: 'admin/installments.description',
  },
  default: {
    id: 'store/installments.default',
  },
})

Installments.schema = {
  title: messages.title.id,
}

export default Installments
