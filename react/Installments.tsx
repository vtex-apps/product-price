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
  if (
    !commercialOffer?.Installments ||
    commercialOffer?.Installments?.length === 0
  ) {
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
        : current,
    {}
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
            <span
              key="installmentsNumber"
              className={handles.installmentsNumber}
            >
              <FormattedNumber value={NumberOfInstallments} />
            </span>
          ),
          installmentValue: (
            <span key="installmentValue" className={handles.installmentValue}>
              <FormattedCurrency value={Value} />
            </span>
          ),
          installmentsTotalValue: (
            <span
              key="installmentsTotalValue"
              className={handles.installmentsTotalValue}
            >
              <FormattedCurrency value={TotalValuePlusInterestRate} />
            </span>
          ),
          interestRate: (
            <span key="interestRate" className={handles.interestRate}>
              <FormattedNumber value={InterestRate} style="percent" />
            </span>
          ),
          hasInterest,
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
  default: {
    id: 'store/installments.default',
  },
})

Installments.schema = {
  title: messages.title.id,
}

export default Installments
