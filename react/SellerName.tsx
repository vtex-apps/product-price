import React from 'react'
import { defineMessages } from 'react-intl'
import { IOMessageWithMarkers } from 'vtex.native-types'
import { useProduct } from 'vtex.product-context'
import { useCssHandles, CssHandlesTypes } from 'vtex.css-handles'

import { getDefaultSeller } from './modules/seller'

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
  /** Used to override default CSS handles */
  classes?: CssHandlesTypes.CustomClasses<typeof CSS_HANDLES>
}

function ProductSellerName({
  message = messages.default.id,
  markers = [],
  classes,
}: Partial<Props>) {
  const { handles, withModifiers } = useCssHandles(CSS_HANDLES, { classes })
  const productContextValue = useProduct()

  const seller = getDefaultSeller(productContextValue?.selectedItem?.sellers)

  if (!seller) {
    return null
  }

  const containerClasses = withModifiers(
    'sellerNameContainer',
    seller.sellerDefault ? 'isDefaultSeller' : ''
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
              {seller.sellerName}
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
