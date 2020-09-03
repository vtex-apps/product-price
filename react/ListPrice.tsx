import React from 'react'
import { defineMessages, FormattedNumber } from 'react-intl'
import { useProduct } from 'vtex.product-context'
import { FormattedCurrency } from 'vtex.format-currency'
import { useCssHandles } from 'vtex.css-handles'
import { IOMessageWithMarkers } from 'vtex.native-types'

import { StorefrontFC, BasicPriceProps } from './types'

const CSS_HANDLES = [
  'listPrice',
  'listPriceValue',
  'listPriceWithTax',
  'taxPercentage',
] as const

const ListPrice: StorefrontFC<BasicPriceProps> = props => {
  const { message, markers } = props
  const handles = useCssHandles(CSS_HANDLES)
  const productContextValue = useProduct()

  const commercialOffer =
    productContextValue?.selectedItem?.sellers[0]?.commertialOffer

  if (!commercialOffer || commercialOffer?.AvailableQuantity <= 0) {
    return null
  }

  const listPriceValue: number = commercialOffer.ListPrice
  const sellingPriceValue = commercialOffer.Price
  const { taxPercentage } = commercialOffer
  const listPriceWithTax = listPriceValue + listPriceValue * taxPercentage

  if (listPriceValue <= sellingPriceValue) {
    return null
  }

  return (
    <span className={handles.listPrice}>
      <IOMessageWithMarkers
        message={message}
        markers={markers}
        handleBase="listPrice"
        values={{
          listPriceValue: (
            <span
              key="listPriceValue"
              className={`${handles.listPriceValue} strike`}
            >
              <FormattedCurrency value={listPriceValue} />
            </span>
          ),
          listPriceWithTax: (
            <span
              key="listPriceWithTax"
              className={`${handles.listPriceWithTax} strike`}
            >
              <FormattedCurrency value={listPriceWithTax} />
            </span>
          ),
          taxPercentage: (
            <span key="taxPercentage" className={handles.taxPercentage}>
              <FormattedNumber value={taxPercentage} style="percent" />
            </span>
          ),
        }}
      />
    </span>
  )
}

const messages = defineMessages({
  title: {
    id: 'admin/list-price.title',
  },
  description: {
    id: 'admin/list-price.description',
  },
  default: {
    id: 'store/list-price.default',
  },
})

ListPrice.schema = {
  title: messages.title.id,
}

export default ListPrice
