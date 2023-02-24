import React from 'react'
import { defineMessages, FormattedNumber } from 'react-intl'
import { useProduct } from 'vtex.product-context'
import { FormattedCurrency } from 'vtex.format-currency'
import { useCssHandles, CssHandlesTypes } from 'vtex.css-handles'
import { IOMessageWithMarkers } from 'vtex.native-types'

import { getDefaultSeller } from './modules/seller'
import { hideProductPrice } from './modules/hideProductPrice'
import { useRuntime } from 'vtex.render-runtime'
import './styles.css'
const CSS_HANDLES = [
  'listPrice',
  'listPriceValue',
  'listPriceWithTax',
  'listPriceWithUnitMultiplier',
  'taxPercentage',
  'taxValue',
  'unitMultiplier',
  'measurementUnit',
  'productPricePerUnit',
  'discountInsideContainer'
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
  alwaysShow = false,
}: Props) {

  const {
    culture: { country },
  } = useRuntime()
  const isCoCountry = country === 'COL';

  const { handles } = useCssHandles(CSS_HANDLES)
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

  //UnitPrice
  const sizeItems = productContextValue?.product?.properties?.filter(item => item.name === 'Tamaño');
  const sizeItemsValue = sizeItems?.map(element => element.values[0])[0]?.trim().toLowerCase();
  const unitsItems = productContextValue?.product?.properties?.filter(item => item.name === 'Unidades');
  const unitMeasure = Number(unitsItems?.map(element => element.values[0])[0]?.trim().split('pack')[0]);

  const mlUnits = 'ml';
  const litersUnits = 'l'
  let pricePerUnit;
  let unitValue = '';

  if (sizeItemsValue?.includes(mlUnits || litersUnits)) {
    const sizeValue = parseInt(sizeItemsValue?.split(mlUnits || litersUnits)[0]);
    //Delete numbers
    unitValue = sizeItemsValue.replace(/\d+/g, '')

    if (sizeValue && unitMeasure && sellingPriceValue) {
      
      pricePerUnit = (sellingPriceValue / (sizeValue*unitMeasure)).toFixed(2);

      //Replace point by comma COL
      if (isCoCountry) {
        pricePerUnit = pricePerUnit.replace(".", ",");
      }

    }
  }

  if (listPriceValue <= sellingPriceValue) {
    return null
  }


  return (
    <span >
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
              className={`${handles.discountInsideContainer} strike `}
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

      <span key="unitPrice"className={handles.productPricePerUnit} >{typeof pricePerUnit !== 'undefined' ? `($${pricePerUnit}/${unitValue})` : ''}</span>
    </span>
  )
}

ListPrice.schema = {
  title: messages.title.id,
}

export default ListPrice
