import React from 'react'
import { useCssHandles } from 'vtex.css-handles'
import { ProductSummaryContext } from 'vtex.product-summary-context'
import classNames from 'classnames'

import PriceLoadingSpinner from './components/PriceLoadingSpinner'
import { StorefrontFC } from './types'

const CSS_HANDLES = [
  'priceSuspense',
  'priceSuspenseFallbackWrapper',
  'priceSuspenseContentWrapper',
] as const

interface PriceSuspenseProps {
  Fallback?: StorefrontFC
}

const PriceSuspense: StorefrontFC<PriceSuspenseProps> = ({
  children,
  Fallback,
}) => {
  const { isPriceLoading } = ProductSummaryContext.useProductSummary()
  const handles = useCssHandles(CSS_HANDLES)

  const contentWrapperClasses = classNames(
    handles.priceSuspenseContentWrapper,
    {
      dn: isPriceLoading,
    }
  )

  return (
    <div className={`relative ${handles.priceSuspense}`}>
      {isPriceLoading && (
        <div className={handles.priceSuspenseFallbackWrapper}>
          {Fallback ? <Fallback /> : <PriceLoadingSpinner />}
        </div>
      )}
      <div className={contentWrapperClasses}>{children}</div>
    </div>
  )
}

export default PriceSuspense
