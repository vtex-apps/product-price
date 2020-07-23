import React from 'react'
import { defineMessages } from 'react-intl'

import { BasicPriceProps } from './types'
import { useInstallments } from './components/InstallmentsContext'
import InstallmentsRenderer from './components/InstallmentsRenderer'

function InstallmentsListItem(props: BasicPriceProps) {
  const { installments } = useInstallments() ?? {}

  if (!installments) {
    return null
  }

  return <InstallmentsRenderer {...props} installments={installments} />
}

defineMessages({
  title: {
    id: 'admin/installments-list-item.title',
  },
  titleMessage: {
    id: 'admin/installments.title',
  },
  description: {
    id: 'admin/installments.description',
  },
  default: {
    id: 'store/installments.default',
  },
})

InstallmentsListItem.schema = {
  title: 'admin/installments-list-item.title',
}

export default InstallmentsListItem
