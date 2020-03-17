import React, { useContext } from 'react'
import { defineMessages } from 'react-intl'
import { ProductContext } from 'vtex.product-context'
import { FormattedCurrency } from 'vtex.format-currency'
import { useCssHandles } from 'vtex.css-handles'
import { IOMessageWithMarkers } from 'vtex.native-types'

import { StorefrontFC } from './types'

interface Props {
  message: string
  markers: string[]
}

const CSS_HANDLES = ['sellingPrice', 'sellingPriceValue']

const SellingPrice: StorefrontFC<Props> = props => {
  const { message, markers } = props
  const handles = useCssHandles(CSS_HANDLES)
  const { selectedItem } = useContext(ProductContext)

  if (!selectedItem) {
    return null
  }

  const commercialOffer = selectedItem?.sellers[0]?.commertialOffer
  if (!commercialOffer) {
    return null
  }

  const sellingPriceValue = commercialOffer.Price

  return (
    <div className={handles.sellingPrice}>
      <IOMessageWithMarkers
        message={message}
        markers={markers}
        handleBase="sellingPrice"
        values={{
          sellingPriceValue: (
            <span className={handles.sellingPriceValue}>
              <FormattedCurrency value={sellingPriceValue} />
            </span>
          ),
        }}
      />
    </div>
  )
}

const messages = defineMessages({
  title: {
    id: 'admin/selling-price.title',
  },
  description: {
    id: 'admin/selling-price.description',
  },
})

SellingPrice.schema = {
  title: messages.title.id,
}

export default SellingPrice
