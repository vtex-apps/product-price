import React from 'react'
import { defineMessages } from 'react-intl'
import { useProduct } from 'vtex.product-context'
import { FormattedCurrency } from 'vtex.format-currency'
import { useCssHandles } from 'vtex.css-handles'
import { IOMessageWithMarkers } from 'vtex.native-types'

import { getFirstAvailableSeller } from './modules/seller'

const CSS_HANDLES = ['spotPrice', 'spotPriceValue'] as const

const messages = defineMessages({
  title: {
    id: 'admin/spot-price.title',
  },
  description: {
    id: 'admin/spot-price.description',
  },
  default: {
    id: 'store/spot-price.default',
  },
})

interface Props {
  message?: string
  markers?: string[]
}

function SpotPrice({ message = messages.default.id, markers = [] }: Props) {
  const handles = useCssHandles(CSS_HANDLES)
  const productContextValue = useProduct()

  const availableSeller = getFirstAvailableSeller(
    productContextValue?.selectedItem?.sellers
  )

  const commercialOffer = availableSeller?.commertialOffer

  if (!commercialOffer || commercialOffer?.AvailableQuantity <= 0) {
    return null
  }

  const spotPriceValue = commercialOffer.spotPrice
  const sellingPriceValue = commercialOffer.SellingPrice

  if (spotPriceValue === sellingPriceValue) {
    return null
  }

  return (
    <span className={handles.spotPrice}>
      <IOMessageWithMarkers
        message={message}
        markers={markers}
        handleBase="spotPrice"
        values={{
          spotPriceValue: (
            <span key="spotPriceValue" className={handles.spotPriceValue}>
              <FormattedCurrency value={spotPriceValue} />
            </span>
          ),
        }}
      />
    </span>
  )
}

SpotPrice.schema = {
  title: messages.title.id,
}

export default SpotPrice
