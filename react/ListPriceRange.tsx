import React, { useContext } from 'react'
import { defineMessages } from 'react-intl'
import { ProductContext } from 'vtex.product-context'
import { FormattedCurrency } from 'vtex.format-currency'
import { useCssHandles } from 'vtex.css-handles'
import { IOMessageWithMarkers } from 'vtex.native-types'

import { StorefrontFC, PriceRangeProps } from './types'

const CSS_HANDLES = [
  'listPriceRange',
  'listPriceRangeMinValue',
  'listPriceRangeMaxValue',
  'listPriceRangeUniqueValue',
] as const

const ListPriceRange: StorefrontFC<PriceRangeProps> = props => {
  const { message, noRangeMessage, markers } = props
  const handles = useCssHandles(CSS_HANDLES)
  const { product } = useContext(ProductContext)

  const priceRange = product?.priceRange
  if (!priceRange) {
    return null
  }

  if (
    priceRange.listPrice.lowPrice === priceRange.sellingPrice.lowPrice &&
    priceRange.listPrice.highPrice === priceRange.sellingPrice.highPrice
  ) {
    return null
  }

  const minPrice = priceRange.listPrice.lowPrice
  const maxPrice = priceRange.listPrice.highPrice
  const hasRange = minPrice !== maxPrice

  if (hasRange) {
    return (
      <span className={handles.listPriceRange}>
        <IOMessageWithMarkers
          message={message}
          markers={markers}
          handleBase="listPriceRange"
          values={{
            minPriceValue: (
              <span className={`${handles.listPriceRangeMinValue} strike`}>
                <FormattedCurrency value={minPrice} />
              </span>
            ),
            maxPriceValue: (
              <span className={`${handles.listPriceRangeMaxValue} strike`}>
                <FormattedCurrency value={maxPrice} />
              </span>
            ),
          }}
        />
      </span>
    )
  }

  return (
    <span className={handles.listPriceRange}>
      <IOMessageWithMarkers
        message={noRangeMessage}
        markers={markers}
        handleBase="listPriceRange"
        values={{
          listPriceValue: (
            <span className={`${handles.listPriceRangeUniqueValue} strike`}>
              <FormattedCurrency value={maxPrice} />
            </span>
          ),
        }}
      />
    </span>
  )
}

const messages = defineMessages({
  title: {
    id: 'admin/list-price-range.title',
  },
  messageTitle: {
    id: 'admin/list-price-range-message.title',
  },
  messageDescription: {
    id: 'admin/list-price-range-message.description',
  },
  noRangeMessageTitle: {
    id: 'admin/list-price-range-no-range-message.title',
  },
  noRangeMessageDescription: {
    id: 'admin/list-price-range-no-range-message.description',
  },
})

ListPriceRange.schema = {
  title: messages.title.id,
  type: 'object',
  properties: {
    message: {
      title: messages.messageTitle.id,
      description: messages.messageDescription.id,
    },
    noRangeMessage: {
      title: messages.noRangeMessageTitle.id,
      description: messages.noRangeMessageDescription.id,
    },
  },
}

export default ListPriceRange
