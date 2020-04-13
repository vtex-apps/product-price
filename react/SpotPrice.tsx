import React, { useContext } from 'react'
import { defineMessages } from 'react-intl'
import { ProductContext } from 'vtex.product-context'
import { FormattedCurrency } from 'vtex.format-currency'
import { useCssHandles } from 'vtex.css-handles'
import { IOMessageWithMarkers } from 'vtex.native-types'

import { StorefrontFC, BasicPriceProps } from './types'

const CSS_HANDLES = ['spotPrice', 'spotPriceValue'] as const

const SpotPrice: StorefrontFC<BasicPriceProps> = props => {
  const { message, markers } = props
  const handles = useCssHandles(CSS_HANDLES)
  const { selectedItem } = useContext(ProductContext)

  const commercialOffer = selectedItem?.sellers[0]?.commertialOffer
  if (!commercialOffer) {
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

const messages = defineMessages({
  title: {
    id: 'admin/spot-price.title',
  },
  description: {
    id: 'admin/spot-price.description',
  },
})

SpotPrice.schema = {
  title: messages.title.id,
}

export default SpotPrice
