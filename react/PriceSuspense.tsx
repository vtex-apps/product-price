import React from 'react'
import { useProductSummary } from 'vtex.product-summary-context/ProductSummaryContext'

import PriceLoadingSpinner from './components/PriceLoadingSpinner'
import { StorefrontFC } from './types'

const PriceSuspense: StorefrontFC = ({ children }) => {
  const { isPriceLoading } = useProductSummary()

  return <>{isPriceLoading ? <PriceLoadingSpinner /> : children}</>
}

export default PriceSuspense
