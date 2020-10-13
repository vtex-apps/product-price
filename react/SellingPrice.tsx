import React from 'react'
import { defineMessages, FormattedNumber } from 'react-intl'
import { useProduct } from 'vtex.product-context'
import { FormattedCurrency } from 'vtex.format-currency'
import { IOMessageWithMarkers } from 'vtex.native-types'
import { useCssHandles, applyModifiers } from 'vtex.css-handles'

import { StorefrontFC, BasicPriceProps } from './types'

const CSS_HANDLES = [
  'sellingPrice',
  'sellingPriceValue',
  'sellingPriceWithTax',
  'taxPercentage',
] as const

const SellingPrice: StorefrontFC<BasicPriceProps> = props => {
  const { message, markers, multiplyQuantity = false } = props
  const handles = useCssHandles(CSS_HANDLES)
  const productContextValue = useProduct()

  const selectedQuantity = productContextValue?.selectedQuantity ?? 1

  const commercialOffer =
    productContextValue?.selectedItem?.sellers[0]?.commertialOffer

  if (!commercialOffer || commercialOffer?.AvailableQuantity <= 0) {
    return null
  }

  const listPriceValue: number = multiplyQuantity
    ? commercialOffer.ListPrice * selectedQuantity
    : commercialOffer.ListPrice

  const sellingPriceValue = multiplyQuantity
    ? commercialOffer.Price * selectedQuantity
    : commercialOffer.Price

  const { taxPercentage } = commercialOffer
  const sellingPriceWithTax =
    sellingPriceValue + sellingPriceValue * taxPercentage

  const hasListPrice = sellingPriceValue !== listPriceValue

  const containerClasses = applyModifiers(
    handles.sellingPrice,
    hasListPrice ? 'hasListPrice' : ''
  )

  return (
    <span className={containerClasses}>
      <IOMessageWithMarkers
        message={message}
        markers={markers}
        handleBase="sellingPrice"
        values={{
          sellingPriceValue: (
            <span key="sellingPriceValue" className={handles.sellingPriceValue}>
              <FormattedCurrency value={sellingPriceValue} />
            </span>
          ),
          sellingPriceWithTax: (
            <span
              key="sellingPriceWithTax"
              className={handles.sellingPriceWithTax}
            >
              <FormattedCurrency value={sellingPriceWithTax} />
            </span>
          ),
          taxPercentage: (
            <span key="taxPercentage" className={handles.taxPercentage}>
              <FormattedNumber value={taxPercentage} style="percent" />
            </span>
          ),
          hasListPrice,
        }}
      />
    </span>
  )
}

const messages = defineMessages({
  title: {
    id: 'admin/selling-price.title',
  },
  description: {
    id: 'admin/selling-price.description',
  },
  default: {
    id: 'store/selling-price.default',
  },
})

SellingPrice.schema = {
  title: messages.title.id,
}

export default SellingPrice
