import React from 'react'
import { defineMessages } from 'react-intl'
import { useProduct } from 'vtex.product-context'

import InstallmentsRenderer from './components/InstallmentsRenderer'
import { getFirstAvailableSeller } from './modules/seller'

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

interface Props {
  message?: string
  markers?: string[]
}

function Installments({ message = messages.default.id, markers = [] }: Props) {
  const productContextValue = useProduct()
  const availableSeller = getFirstAvailableSeller(
    productContextValue?.selectedItem?.sellers
  )

  const commercialOffer = availableSeller?.commertialOffer

  if (
    !commercialOffer?.Installments ||
    commercialOffer?.Installments?.length === 0
  ) {
    return null
  }

  let [maxInstallment] = commercialOffer.Installments

  commercialOffer.Installments.forEach(installmentOption => {
    const currentValueIsEmpty =
      !maxInstallment || Object.keys(maxInstallment).length === 0

    if (
      currentValueIsEmpty ||
      installmentOption.NumberOfInstallments >
        (maxInstallment?.NumberOfInstallments ?? 0)
    ) {
      maxInstallment = installmentOption
    }
  })

  return (
    <InstallmentsRenderer
      message={message}
      markers={markers}
      installment={maxInstallment}
    />
  )
}

Installments.schema = {
  title: messages.title.id,
}

export default Installments
