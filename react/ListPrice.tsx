import React from 'react'
import { defineMessages, FormattedNumber } from 'react-intl'
import { useProduct } from 'vtex.product-context'
import { FormattedCurrency } from 'vtex.format-currency'
import { useCssHandles, CssHandlesTypes } from 'vtex.css-handles'
import { IOMessageWithMarkers } from 'vtex.native-types'

import { getDefaultSeller } from './modules/seller'
import { hideProductPrice } from './modules/hideProductPrice'

const CSS_HANDLES = [
  'listPrice',
  'listPriceValue',
  'listPriceWithTax',
  'listPriceWithUnitMultiplier',
  'taxPercentage',
  'taxValue',
  'unitMultiplier',
  'measurementUnit',
] as const

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

interface Props {
  message?: string
  markers?: string[]
  /** Used to override default CSS handles */
  classes?: CssHandlesTypes.CustomClasses<typeof CSS_HANDLES>
  alwaysShow?: boolean
}

function ListPrice({
  message = messages.default.id,
  markers = [],
  classes,
  alwaysShow = false,
}: Props) {
  const { handles, withModifiers } = useCssHandles(CSS_HANDLES, { classes })
  const productContextValue = useProduct()

  const seller = getDefaultSeller(productContextValue?.selectedItem?.sellers)

  const commercialOffer = seller?.commertialOffer

  if (
    !commercialOffer ||
    hideProductPrice({
      alwaysShow,
      availableQuantity: commercialOffer.AvailableQuantity,
    })
  ) {
    return null
  }

  const listPriceValue = commercialOffer.ListPrice
  const sellingPriceValue = commercialOffer.Price
  const { taxPercentage } = commercialOffer
  const listPriceWithTax = listPriceValue + listPriceValue * taxPercentage

  const measurementUnit =
    productContextValue?.selectedItem?.measurementUnit ?? ''

  const unitMultiplier = productContextValue?.selectedItem?.unitMultiplier ?? 1
  const listPriceWithUnitMultiplier = commercialOffer.ListPrice * unitMultiplier

  const taxValue = commercialOffer.Tax

  const hasMeasurementUnit = measurementUnit && measurementUnit !== 'un'
  const hasUnitMultiplier = unitMultiplier !== 1

  if (listPriceValue <= sellingPriceValue) {
    return null
  }

  const containerClasses = withModifiers('listPrice', [
    alwaysShow && commercialOffer.AvailableQuantity <= 0 ? 'isUnavailable' : '',
  ])


  return (
    <span className={containerClasses}>
      <IOMessageWithMarkers
        message={message}
        markers={markers}
        handleBase="listPrice"
        values={{
          hasMeasurementUnit,
          hasUnitMultiplier,
          listPriceValue: (
            <span
              key="listPriceValue"
              className={`${handles.listPriceValue} strike`}
            >
              De: <FormattedCurrency value={listPriceValue} />
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
          listPriceWithUnitMultiplier: (
            <span
              key="listPriceWithUnitMultiplier"
              className={`${handles.listPriceWithUnitMultiplier} strike`}
            >
              <FormattedCurrency value={listPriceWithUnitMultiplier} />
            </span>
          ),
          taxPercentage: (
            <span key="taxPercentage" className={handles.taxPercentage}>
              <FormattedNumber value={taxPercentage} style="percent" />
            </span>
          ),
          taxValue: (
            <span key="taxValue" className={handles.taxValue}>
              <FormattedCurrency value={taxValue} />
            </span>
          ),
          unitMultiplier: (
            <span key="unitMultiplier" className={handles.unitMultiplier}>
              <FormattedNumber value={unitMultiplier} />
            </span>
          ),
          measurementUnit: (
            <span key="measurementUnit" className={handles.measurementUnit}>
              {measurementUnit}
            </span>
          ),
        }}
      />
    </span>
  )
}

ListPrice.schema = {
  title: messages.title.id,
}

export default ListPrice
