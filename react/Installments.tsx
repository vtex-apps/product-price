import React from 'react'
import { defineMessages } from 'react-intl'
import { useCssHandles, CssHandlesTypes } from 'vtex.css-handles'
import { useProduct } from 'vtex.product-context'

import InstallmentsRenderer, {
  CSS_HANDLES,
} from './components/InstallmentsRenderer'
import { getDefaultSeller } from './modules/seller'

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
  /** Used to override default CSS handles */
  classes?: CssHandlesTypes.CustomClasses<typeof CSS_HANDLES>
}

function Installments({
  message = messages.default.id,
  markers = [],
  classes,
}: Props) {
  const productContextValue = useProduct()
  const { handles } = useCssHandles(CSS_HANDLES, { classes })
  const seller = getDefaultSeller(productContextValue?.selectedItem?.sellers)

  const commercialOffer = seller?.commertialOffer

  if (
    !commercialOffer?.Installments ||
    commercialOffer?.Installments?.length === 0
  ) {
    return null
  }

  let [maxInstallmentOption] = commercialOffer.Installments

  commercialOffer.Installments.forEach(installmentOption => {
    if (
      installmentOption.NumberOfInstallments >
      maxInstallmentOption.NumberOfInstallments
    ) {
      maxInstallmentOption = installmentOption
    }
  })

  return (
    <InstallmentsRenderer
      message={message}
      markers={markers}
      installment={maxInstallmentOption}
      handles={handles}
    />
  )
}

Installments.schema = {
  title: messages.title.id,
}

export default Installments
