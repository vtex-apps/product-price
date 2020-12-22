import React from 'react'
import { defineMessages } from 'react-intl'
import { IOMessageWithMarkers } from 'vtex.native-types'
import { useProduct } from 'vtex.product-context'
import { useCssHandles, applyModifiers } from 'vtex.css-handles'

import { getFirstAvailableSeller } from './modules/seller'

const CSS_HANDLES = ['sellerNameContainer', 'sellerName'] as const

const messages = defineMessages({
  title: {
    id: 'admin/seller-name.title',
  },
  description: {
    id: 'admin/seller-name.description',
  },
  default: {
    id: 'store/seller-name.default',
  },
})

interface Props {
  message?: string
  markers?: string[]
}

function ProductSellerName({
  message = messages.default.id,
  markers = [],
}: Partial<Props>) {
  const handles = useCssHandles(CSS_HANDLES)
  const productContextValue = useProduct()

  const productSeller = getFirstAvailableSeller(
    productContextValue?.selectedItem?.sellers
  )

  if (!productSeller) {
    return null
  }

  const containerClasses = applyModifiers(
    handles.sellerNameContainer,
    productSeller.sellerDefault ? 'isDefaultSeller' : ''
  )

  return (
    <span className={containerClasses}>
      <IOMessageWithMarkers
        message={message}
        markers={markers}
        handleBase="sellerName"
        values={{
          sellerName: (
            <span key="sellerName" className={handles.sellerName}>
              {productSeller.sellerName}
            </span>
          ),
        }}
      />
    </span>
  )
}

ProductSellerName.schema = {
  title: messages.title.id,
}

export default ProductSellerName
