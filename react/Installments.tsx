import React, { useContext } from 'react'
import { defineMessages, FormattedNumber } from 'react-intl'
import { ProductContext } from 'vtex.product-context'
import { FormattedCurrency } from 'vtex.format-currency'
import { useCssHandles } from 'vtex.css-handles'
import { IOMessageWithMarkers } from 'vtex.native-types'

import { StorefrontFC, BasicPriceProps } from './types'

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

const Installments: StorefrontFC<BasicPriceProps> = props => {
  const { message, markers } = props
  const handles = useCssHandles(CSS_HANDLES)
  const { selectedItem } = useContext(ProductContext)

  const commercialOffer = selectedItem?.sellers[0]?.commertialOffer
  if (!commercialOffer) {
    return null
  }

  const {
    Value,
    InterestRate,
    TotalValuePlusInterestRate,
    NumberOfInstallments,
  } = commercialOffer.Installments.reduce(
    (previous: Installment, current: Installment) =>
      previous.NumberOfInstallments > current.NumberOfInstallments
        ? previous
        : current
  )

  const hasInterest = InterestRate !== 0

  return (
    <span className={handles.installments}>
      <IOMessageWithMarkers
        message={message}
        markers={markers}
        handleBase="installments"
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
          hasInterest: hasInterest,
        }}
      />
    </span>
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
