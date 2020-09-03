import React from 'react'
import { defineMessages } from 'react-intl'
import { IOMessageWithMarkers } from 'vtex.native-types'
import { useProduct } from 'vtex.product-context'
import { useCssHandles } from 'vtex.css-handles'

import { StorefrontFC, BasicPriceProps } from './types'

const CSS_HANDLES = ['sellerNameContainer', 'sellerName'] as const

const ProductSellerName: StorefrontFC<Partial<BasicPriceProps>> = ({
  message,
  markers,
}) => {
  const handles = useCssHandles(CSS_HANDLES)
  const productContextValue = useProduct()

  const productSeller = productContextValue?.selectedItem?.sellers[0]

  if (!productSeller) {
    return null
  }

  return (
    <span className={handles.sellerNameContainer}>
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

ProductSellerName.schema = {
  title: messages.title.id,
}

export default ProductSellerName
