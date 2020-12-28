import React, { PropsWithChildren } from 'react'
import { useCssHandles, CssHandlesTypes } from 'vtex.css-handles'
import { ProductSummaryContext } from 'vtex.product-summary-context'

import PriceLoadingSpinner, {
  CSS_HANDLES as LoadingSpinnerHandles,
} from './components/PriceLoadingSpinner'

const CSS_HANDLES = [
  'priceSuspense',
  'priceSuspenseFallbackWrapper',
  'priceSuspenseContentWrapper',
  ...LoadingSpinnerHandles,
] as const

interface PriceSuspenseProps {
  Fallback?: React.ComponentType
  /** Used to override default CSS handles */
  classes?: CssHandlesTypes.CustomClasses<typeof CSS_HANDLES>
}

function PriceSuspense({
  children,
  Fallback,
  classes,
}: PropsWithChildren<PriceSuspenseProps>) {
  const { isPriceLoading } = ProductSummaryContext.useProductSummary()
  const { handles } = useCssHandles(CSS_HANDLES, { classes })

  return (
    <div className={`relative ${handles.priceSuspense}`}>
      {isPriceLoading && (
        <div className={handles.priceSuspenseFallbackWrapper}>
          {Fallback ? <Fallback /> : <PriceLoadingSpinner handles={handles} />}
        </div>
      )}
      <div
        className={`${handles.priceSuspenseContentWrapper} ${
          isPriceLoading ? 'dn' : ''
        }`}
      >
        {children}
      </div>
    </div>
  )
}

export default PriceSuspense
