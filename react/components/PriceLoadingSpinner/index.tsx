import React from 'react'
import { useCssHandles } from 'vtex.css-handles'

import styles from './styles.css'

const CSS_HANDLES = ['priceLoading'] as const

const PriceLoadingSpinner = () => {
  const handles = useCssHandles(CSS_HANDLES)

  return (
    <div className={`${handles.priceLoading} flex items-end w-100 h1 pr6`}>
      <div className={styles.priceSpinner} />
    </div>
  )
}

export default PriceLoadingSpinner
