import React from 'react'
import { useCssHandles } from 'vtex.css-handles'
import { useProductSummary } from 'vtex.product-summary-context/ProductSummaryContext'

import PriceLoadingSpinner from './components/PriceLoadingSpinner'
import { StorefrontFC } from './types'

const CSS_HANDLES = [
  'priceSuspense',
  'priceSuspenseLoadingWrapper',
  'priceSuspenseCotentWrapper',
]

const PriceSuspense: StorefrontFC = ({ children }) => {
  const { isPriceLoading } = useProductSummary()
  const handles = useCssHandles(CSS_HANDLES)

  return (
    <div className={`relative ${handles.priceSuspense}`}>
      {isPriceLoading && (
        <div className={`absolute ${handles.priceSuspenseLoadingWrapper}`}>
          <PriceLoadingSpinner />
        </div>
      )}
      <div
        className={handles.priceSuspenseCotentWrapper}
        style={{ visibility: isPriceLoading ? 'hidden' : 'visible' }}
      >
        {children}
      </div>
    </div>
  )
}

export default PriceSuspense
