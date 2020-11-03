import React from 'react'
import { defineMessages, FormattedNumber } from 'react-intl'
import { useProduct } from 'vtex.product-context'
import { FormattedCurrency } from 'vtex.format-currency'
import { useCssHandles } from 'vtex.css-handles'
import { IOMessageWithMarkers } from 'vtex.native-types'
import { useProductSummary } from 'vtex.product-summary-context/ProductSummaryContext'

import { StorefrontFC, BasicPriceProps, SavingsProps } from './types'

const CSS_HANDLES = [
  'savings',
  'previousPriceValue',
  'newPriceValue',
  'savingsValue',
  'savingsWithTax',
  'savingsPercentage',
] as const

const Savings: StorefrontFC<BasicPriceProps & SavingsProps> = props => {
  const { message, markers, compactMode } = props
  const compacted = !!(
    typeof compactMode !== 'undefined' && compactMode === true
  )

  const handles = useCssHandles(CSS_HANDLES)
  const productContextValue = useProduct()
  const productSummaryValue = useProductSummary()

  const commercialOffer =
    productContextValue?.selectedItem?.sellers[0]?.commertialOffer

  if (
    !commercialOffer ||
    commercialOffer?.AvailableQuantity <= 0 ||
    productSummaryValue?.isLoading
  ) {
    return null
  }

  const previousPriceValue = commercialOffer.ListPrice
  const newPriceValue = commercialOffer.Price
  const savingsValue = previousPriceValue - newPriceValue
  const savingsWithTax =
    savingsValue + savingsValue * commercialOffer.taxPercentage

  const savingsPercentage = savingsValue / previousPriceValue

  if (savingsValue <= 0) {
    return null
  }

  return (
    <span className={handles.savings}>
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
          newPriceValue: (
            <span key="newPriceValue" className={handles.newPriceValue}>
              <FormattedCurrency value={newPriceValue} />
            </span>
          ),
          savingsValue: (
            <span key="savingsValue" className={handles.savingsValue}>
              <FormattedCurrency value={savingsValue} />
            </span>
          ),
          savingsWithTax: (
            <span key="savingsWithTax" className={handles.savingsWithTax}>
              <FormattedCurrency value={savingsWithTax} />
            </span>
          ),
          savingsPercentage: (
            <span key="savingsPercentage" className={handles.savingsPercentage}>
              {compacted ? (
                <span>
                  <FormattedNumber value={savingsPercentage * 100} />%
                </span>
              ) : (
                <FormattedNumber value={savingsPercentage} style="percent" />
              )}
            </span>
          ),
        }}
      />
    </span>
  )
}

const messages = defineMessages({
  title: {
    id: 'admin/savings.title',
  },
  description: {
    id: 'admin/savings.description',
  },
  default: {
    id: 'store/savings.default',
  },
})

Savings.schema = {
  title: messages.title.id,
}

export default Savings
