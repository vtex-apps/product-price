import React from 'react'
import { defineMessages } from 'react-intl'
import { useProduct } from 'vtex.product-context'
import { FormattedCurrency } from 'vtex.format-currency'
import { useCssHandles, CssHandlesTypes } from 'vtex.css-handles'
import { IOMessageWithMarkers } from 'vtex.native-types'

import { getDefaultSeller } from './modules/seller'
import { hideProductPrice } from './modules/hideProductPrice'

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
  /** Used to override default CSS handles */
  classes?: CssHandlesTypes.CustomClasses<typeof CSS_HANDLES>
  alwaysShow?: boolean
}

function SpotPrice({
  message = messages.default.id,
  markers = [],
  classes,
  alwaysShow = false,
}: Props) {
  const { handles, withModifiers } = useCssHandles(CSS_HANDLES, { classes })
  const productContextValue = useProduct()

  const seller = getDefaultSeller(productContextValue?.selectedItem?.sellers)

  const commercialOffer = seller?.commertialOffer

  if (!commercialOffer) {
    return null
  }

  const { AvailableQuantity } = commercialOffer

  if (hideProductPrice({ alwaysShow, AvailableQuantity })) {
    return null
  }

  const spotPriceValue = commercialOffer.spotPrice
  const sellingPriceValue = commercialOffer.SellingPrice

  if (spotPriceValue === sellingPriceValue) {
    return null
  }

  const containerClasses = withModifiers('spotPrice', [
    alwaysShow && AvailableQuantity <= 0 ? 'isUnavailable' : '',
  ])

  return (
    <span className={containerClasses}>
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
