import React, { useContext } from 'react'
import { defineMessages, FormattedNumber } from 'react-intl'
import { ProductContext } from 'vtex.product-context'
import { FormattedCurrency } from 'vtex.format-currency'
import { useCssHandles } from 'vtex.css-handles'
import { IOMessageWithMarkers } from 'vtex.native-types'

import { StorefrontFC } from './types'

interface Props {
  message: string
  markers: string[]
}

interface Installment {
  Value: number
  InterestRate: number
  TotalValuePlusInterestRate: number
  NumberOfInstallments: number
}

const CSS_HANDLES = [
  'installments',
  'installmentsNumber',
  'installmentValue',
  'installmentsTotalValue',
  'interestRate',
] as const

const Installments: StorefrontFC<Props> = props => {
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

  const {
    Value,
    InterestRate,
    TotalValuePlusInterestRate,
    NumberOfInstallments,
  } = commertialOffer.Installments.reduce(
    (previous: Installment, current: Installment) =>
      previous.NumberOfInstallments > current.NumberOfInstallments
        ? previous
        : current
  )

  return (
    <div className={handles.installments}>
      <IOMessageWithMarkers
        message={message}
        markers={markers}
        handleBase="listPrice"
        values={{
          installmentsNumber: (
            <span className={handles.installmentsNumber}>
              <FormattedNumber value={NumberOfInstallments} style="unit" />
            </span>
          ),
          installmentValue: (
            <span className={handles.installmentValue}>
              <FormattedCurrency value={Value} />
            </span>
          ),
          installmentsTotalValue: (
            <span className={handles.installmentsTotalValue}>
              <FormattedCurrency value={TotalValuePlusInterestRate} />
            </span>
          ),
          interestRate: (
            <span className={handles.interestRate}>
              <FormattedNumber value={InterestRate} style="percent" />
            </span>
          ),
        }}
      />
    </div>
  )
}

const messages = defineMessages({
  title: {
    id: 'admin/installments.title',
  },
  description: {
    id: 'admin/installments.description',
  },
})

Installments.schema = {
  title: messages.title.id,
}

export default Installments
