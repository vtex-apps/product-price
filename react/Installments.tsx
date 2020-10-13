import React from 'react'
import { defineMessages } from 'react-intl'
import { useProduct, ProductTypes } from 'vtex.product-context'

import { StorefrontFC, BasicPriceProps } from './types'
import InstallmentsRenderer from './components/InstallmentsRenderer'

const Installments: StorefrontFC<BasicPriceProps> = props => {
  const { message, markers, multiplyQuantity = false } = props
  const productContextValue = useProduct()
  const commercialOffer =
    productContextValue?.selectedItem?.sellers[0]?.commertialOffer
  const selectedQuantity = productContextValue?.selectedQuantity ?? 1

  if (
    !commercialOffer?.Installments ||
    commercialOffer?.Installments?.length === 0
  ) {
    return null
  }

  let maxInstallments: ProductTypes.Installment | undefined

  commercialOffer.Installments.forEach(installmentOption => {
    const currentValueIsEmpty =
      !maxInstallments || Object.keys(maxInstallments).length === 0

    if (
      currentValueIsEmpty ||
      installmentOption.NumberOfInstallments >
        (maxInstallments?.NumberOfInstallments ?? 0)
    ) {
      maxInstallments = installmentOption
    }
  })

  return (
    <InstallmentsRenderer
      message={message}
      markers={markers}
      installments={maxInstallments ?? {}}
      multiplyQuantity={multiplyQuantity}
      selectedQuantity={selectedQuantity}
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
