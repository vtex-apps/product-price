import React from 'react'
import { defineMessages, FormattedNumber } from 'react-intl'
import { useProduct } from 'vtex.product-context'
import { FormattedCurrency } from 'vtex.format-currency'
import { useCssHandles, CssHandlesTypes } from 'vtex.css-handles'
import { IOMessageWithMarkers } from 'vtex.native-types'

import { getDefaultSeller } from './modules/seller'

const CSS_HANDLES = [
  'spotPriceSavings',
  'previousPriceValue',
  'newSpotPriceValue',
  'spotPriceSavingsValue',
  'spotPriceSavingsWithTax',
  'spotPriceSavingsPercentage',
] as const

const messages = defineMessages({
  title: {
    id: 'admin/spot-price-savings.title',
  },
  description: {
    id: 'admin/spot-price-savings.description',
  },
  default: {
    id: 'store/spot-price-savings.default',
  },
})

interface Props {
  message?: string
  markers?: string[]
  /** Used to override default CSS handles */
  classes?: CssHandlesTypes.CustomClasses<typeof CSS_HANDLES>
}

function SpotPriceSavings({
  message = messages.default.id,
  markers = [],
  classes,
}: Props) {
  const { handles } = useCssHandles(CSS_HANDLES, { classes })
  const productContextValue = useProduct()

  const seller = getDefaultSeller(productContextValue?.selectedItem?.sellers)

  const commercialOffer = seller?.commertialOffer

  if (!commercialOffer || commercialOffer?.AvailableQuantity <= 0) {
    return null
  }

  const previousPriceValue = commercialOffer.ListPrice
  const spotPriceValue = commercialOffer.spotPrice

  const spotPriceSavingsValue = previousPriceValue - spotPriceValue
  const spotPriceSavingsWithTax =
    spotPriceSavingsValue +
    spotPriceSavingsValue * commercialOffer.taxPercentage

  const spotPriceSavingsPercentage = spotPriceSavingsValue / previousPriceValue

  if (spotPriceSavingsValue <= 0) {
    return null
  }

  return (
    <span className={handles.spotPriceSavings}>
      <IOMessageWithMarkers
        message={message}
        markers={markers}
        handleBase="savings"
        values={{
          previousPriceValue: (
            <span
              key="previousPriceValue"
              className={handles.previousPriceValue}
            >
              <FormattedCurrency value={previousPriceValue} />
            </span>
          ),
          newSpotPriceValue: (
            <span key="newSpotPriceValue" className={handles.newSpotPriceValue}>
              <FormattedCurrency value={spotPriceValue} />
            </span>
          ),
          spotPriceSavingsValue: (
            <span
              key="spotPriceSavingsValue"
              className={handles.spotPriceSavingsValue}
            >
              <FormattedCurrency value={spotPriceSavingsValue} />
            </span>
          ),
          spotPriceSavingsWithTax: (
            <span
              key="spotPriceSavingsWithTax"
              className={handles.spotPriceSavingsWithTax}
            >
              <FormattedNumber value={spotPriceSavingsWithTax} />
            </span>
          ),
          spotPriceSavingsPercentage: (
            <span
              key="spotPriceSavingsPercentage"
              className={handles.spotPriceSavingsPercentage}
            >
              <FormattedNumber
                value={spotPriceSavingsPercentage}
                style="percent"
              />
            </span>
          ),
        }}
      />
    </span>
  )
}

SpotPriceSavings.schema = {
  title: messages.title.id,
}

export default SpotPriceSavings
