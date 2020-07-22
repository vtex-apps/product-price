import React from 'react'
import { FormattedNumber } from 'react-intl'
import { useCssHandles } from 'vtex.css-handles'
import { FormattedCurrency } from 'vtex.format-currency'
import { IOMessageWithMarkers } from 'vtex.native-types'

import { BasicPriceProps } from '../types'

export interface Installments {
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

interface Props extends BasicPriceProps {
  installments: Installments
}

function InstallmentsRenderer(props: Props) {
  const { message, markers, installments } = props
  const handles = useCssHandles(CSS_HANDLES)

  const {
    Value,
    NumberOfInstallments,
    InterestRate,
    TotalValuePlusInterestRate,
  } = installments
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

export default InstallmentsRenderer
