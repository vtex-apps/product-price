import React, { useContext } from 'react'
import { defineMessages } from 'react-intl'
import { ProductContext } from 'vtex.product-context'
import { FormattedCurrency } from 'vtex.format-currency'
import { useCssHandles } from 'vtex.css-handles'
import { IOMessageWithMarkers } from 'vtex.native-types'

import { StorefrontFC } from './types'

interface Props {
  message: string
  markers: string[]
}

const CSS_HANDLES = ['listPrice', 'listPriceValue'] as const

const ListPrice: StorefrontFC<Props> = props => {
  const { message, markers } = props
  const handles = useCssHandles(CSS_HANDLES)
  const { selectedItem } = useContext(ProductContext)

  if (!selectedItem) {
    return null
  }

  const commertialOffer = selectedItem?.sellers[0]?.commertialOffer
  if (!commertialOffer) {
    return null
  }

  const listPriceValue = commertialOffer.ListPrice

  return (
    <div className={handles.listPrice}>
      <IOMessageWithMarkers
        message={message}
        markers={markers}
        handleBase="listPrice"
        values={{
          listPriceValue: (
            <span className={handles.listPriceValue}>
              <FormattedCurrency value={listPriceValue} />
            </span>
          ),
        }}
      />
    </div>
  )
}

const messages = defineMessages({
  title: {
    defaultMessage: '',
    id: 'admin/list-price.title',
  },
  description: {
    defaultMessage: '',
    id: 'admin/list-price.description',
  },
  default: {
    defaultMessage: '',
    id: 'store/list-price.default',
  },
})

ListPrice.schema = {
  title: messages.title.id,
  description: messages.description.id,
}

export default ListPrice
