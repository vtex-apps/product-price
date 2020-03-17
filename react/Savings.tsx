import React, { useContext } from 'react'
import { defineMessages, FormattedNumber } from 'react-intl'
import { ProductContext } from 'vtex.product-context'
import { FormattedCurrency } from 'vtex.format-currency'
import { useCssHandles } from 'vtex.css-handles'
import { IOMessageWithMarkers } from 'vtex.native-types'

import { StorefrontFC } from './types'

interface Props {
  message: string
  markers: string[]
}

const CSS_HANDLES = [
  'savings',
  'previousPriceValue',
  'newPriceValue',
  'savingsValue',
  'savingsPercentage',
] as const

const Savings: StorefrontFC<Props> = props => {
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

  const previousPriceValue = commercialOffer.ListPrice
  const newPriceValue = commercialOffer.Price
  const savingsValue = previousPriceValue - newPriceValue
  const savingsPercentage = savingsValue / previousPriceValue
  if (savingsValue === 0) {
    return null
  }

  return (
    <div className={handles.savings}>
      <IOMessageWithMarkers
        message={message}
        markers={markers}
        handleBase="listPrice"
        values={{
          previousPriceValue: (
            <span className={handles.previousPriceValue}>
              <FormattedCurrency value={previousPriceValue} />
            </span>
          ),
          newPriceValue: (
            <span className={handles.newPriceValue}>
              <FormattedCurrency value={newPriceValue} />
            </span>
          ),
          savingsValue: (
            <span className={handles.savingsValue}>
              <FormattedCurrency value={savingsValue} />
            </span>
          ),
          savingsPercentage: (
            <span className={handles.savingsPercentage}>
              <FormattedNumber value={savingsPercentage} style="percent" />
            </span>
          ),
        }}
      />
    </div>
  )
}

const messages = defineMessages({
  title: {
    id: 'admin/savings.title',
  },
  description: {
    id: 'admin/savings.description',
  },
})

Savings.schema = {
  title: messages.title.id,
}

export default Savings
