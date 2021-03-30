import React from 'react'
import { defineMessages, useIntl, IntlFormatters } from 'react-intl'
import { useProduct } from 'vtex.product-context'
import { FormattedCurrency } from 'vtex.format-currency'
import { useCssHandles, CssHandlesTypes } from 'vtex.css-handles'
import { IOMessageWithMarkers } from 'vtex.native-types'
import { ProductSummaryContext } from 'vtex.product-summary-context'

import { getDefaultSeller } from './modules/seller'

const CSS_HANDLES = [
  'savings',
  'previousPriceValue',
  'newPriceValue',
  'savingsValue',
  'savingsWithTax',
  'savingsPercentage',
] as const

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

// This is essentially a space char (" ") that doesn't allow line breaks
// It is needed because the formatNumber function returns it that way
const NON_BREAKING_SPACE_CHAR = String.fromCharCode(160)

interface GetFormattedSavingsPercentageParams {
  formatNumber: IntlFormatters['formatNumber']
  savingsPercentage: number
  percentageStyle: Props['percentageStyle']
}

function getFormattedSavingsPercentage({
  formatNumber,
  savingsPercentage,
  percentageStyle,
}: GetFormattedSavingsPercentageParams) {
  const formattedSavingsPercentage = formatNumber(savingsPercentage, {
    style: 'percent',
  })

  if (percentageStyle === 'compact') {
    return formattedSavingsPercentage.replace(
      `${NON_BREAKING_SPACE_CHAR}%`,
      '%'
    )
  }

  return formattedSavingsPercentage
}

interface Props {
  message?: string
  markers?: string[]
  percentageStyle?: 'locale' | 'compact'
  /** Used to override default CSS handles */
  classes?: CssHandlesTypes.CustomClasses<typeof CSS_HANDLES>
}

function Savings({
  message = messages.default.id,
  markers = [],
  percentageStyle = 'locale',
  classes,
}: Props) {
  const { handles } = useCssHandles(CSS_HANDLES, { classes })
  const { formatNumber } = useIntl()
  const productContextValue = useProduct()
  const productSummaryValue = ProductSummaryContext.useProductSummary()

  const seller = getDefaultSeller(productContextValue?.selectedItem?.sellers)

  const commercialOffer = seller?.commertialOffer

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
              {getFormattedSavingsPercentage({
                formatNumber,
                savingsPercentage,
                percentageStyle,
              })}
            </span>
          ),
        }}
      />
    </span>
  )
}

Savings.schema = {
  title: messages.title.id,
}

export default Savings
