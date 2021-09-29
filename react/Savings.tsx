import React from 'react'
import { defineMessages, useIntl, IntlFormatters } from 'react-intl'
import { useProduct } from 'vtex.product-context'
import { FormattedCurrency } from 'vtex.format-currency'
import { useCssHandles, CssHandlesTypes } from 'vtex.css-handles'
import { IOMessageWithMarkers } from 'vtex.native-types'
import { ProductSummaryContext } from 'vtex.product-summary-context'

import { getDefaultSeller } from './modules/seller'
import { hideProductPrice } from './modules/hideProductPrice'

const CSS_HANDLES = [
  'savings',
  'previousPriceValue',
  'newPriceValue',
  'savingsValue',
  'savingsWithTax',
  'previousPriceValueWithQuantity',
  'newPriceValueWithQuantity',
  'savingsValueWithQuantity',
  'savingsWithTaxWithQuantity',
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
  minimumPercentage?: number
  /** Used to override default CSS handles */
  classes?: CssHandlesTypes.CustomClasses<typeof CSS_HANDLES>
  alwaysShow?: boolean
}

function Savings({
  message = messages.default.id,
  markers = [],
  minimumPercentage = 0,
  percentageStyle = 'locale',
  classes,
  alwaysShow = false,
}: Props) {
  const { handles, withModifiers } = useCssHandles(CSS_HANDLES, { classes })
  const { formatNumber } = useIntl()
  const productContextValue = useProduct()
  const productSummaryValue = ProductSummaryContext.useProductSummary()

  const seller = getDefaultSeller(productContextValue?.selectedItem?.sellers)
  const quantity = productContextValue?.selectedQuantity || 1

  const commercialOffer = seller?.commertialOffer

  if (
    !commercialOffer ||
    hideProductPrice({
      alwaysShow,
      availableQuantity: commercialOffer.AvailableQuantity,
    }) ||
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
  if (savingsValue <= 0 || savingsPercentage < minimumPercentage / 100) {
    return null
  }

  const containerClasses = withModifiers('savings', [
    alwaysShow && commercialOffer.AvailableQuantity <= 0 ? 'isUnavailable' : '',
  ])


  const previousPriceValueWithQuantity = commercialOffer.ListPrice * quantity
  const newPriceValueWithQuantity = commercialOffer.Price * quantity
  const savingsValueWithQuantity = savingsValue * quantity
  const savingsWithTaxWithQuantity = savingsWithTax * quantity


  return (
    <span className={containerClasses}>
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
          previousPriceValueWithQuantity: (
            <span
              key="previousPriceValue"
              className={handles.previousPriceValueWithQuantity}
            >
              <FormattedCurrency value={previousPriceValueWithQuantity} />
            </span>
          ),
          newPriceValueWithQuantity: (
            <span key="newPriceValue" className={handles.newPriceValueWithQuantity}>
              <FormattedCurrency value={newPriceValueWithQuantity} />
            </span>
          ),
          savingsValueWithQuantity: (
            <span key="savingsValue" className={handles.savingsValueWithQuantity}>
              <FormattedCurrency value={savingsValueWithQuantity} />
            </span>
          ),
          savingsWithTaxWithQuantity: (
            <span key="savingsWithTax" className={handles.savingsWithTaxWithQuantity}>
              <FormattedCurrency value={savingsWithTaxWithQuantity} />
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
