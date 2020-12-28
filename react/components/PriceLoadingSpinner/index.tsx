import React from 'react'
import { CssHandlesTypes } from 'vtex.css-handles'

import styles from './styles.css'

export const CSS_HANDLES = ['priceLoading'] as const

interface Props {
  handles: CssHandlesTypes.CssHandlesBag<typeof CSS_HANDLES>['handles']
}

function PriceLoadingSpinner({ handles }: Props) {
  return (
    <div className={`${handles.priceLoading} flex items-end w-100 h1 pr6`}>
      <div className={styles.priceSpinner} />
    </div>
  )
}

export default PriceLoadingSpinner
