import React, { useContext } from 'react'
import { defineMessages } from 'react-intl'
import { ProductContext } from 'vtex.product-context'
import { FormattedCurrency } from 'vtex.format-currency'
import { useCssHandles } from 'vtex.css-handles'
import { IOMessageWithMarkers } from 'vtex.native-types'

import { StorefrontFC } from './types'

interface Props {
  label: string
  markers: string[]
}

const CSS_HANDLES = ['listPrice'] as const

const ListPrice: StorefrontFC<Props> = props => {
  const { label, markers } = props
  const { selectedItem } = useContext(ProductContext)
  const handles = useCssHandles(CSS_HANDLES)
  const listPrice = selectedItem.sellers[0].commertialOffer.ListPrice
  return (
    <div className={handles.listPrice}>
      <IOMessageWithMarkers
        label={label}
        markers={markers}
        componentName={CSS_HANDLES[0]}
        values={{
          listPrice: <FormattedCurrency value={listPrice} />,
        }}
      />
    </div>
  )
}

const messages = defineMessages({
  title: {
    defaultMessage: '',
    id: 'admin/listPrice.title',
  },
  description: {
    defaultMessage: '',
    id: 'admin/listPrice.description',
  },
  default: {
    defaultMessage: '',
    id: 'store/listPrice.default',
  },
})

ListPrice.schema = {
  title: messages.title.id,
  description: messages.description.id,
  default: messages.default.id,
}

export default ListPrice
