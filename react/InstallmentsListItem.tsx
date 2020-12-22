import React from 'react'
import { defineMessages } from 'react-intl'

import { useInstallments } from './components/InstallmentsContext'
import InstallmentsRenderer from './components/InstallmentsRenderer'

const messages = defineMessages({
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

interface Props {
  message?: string
  markers?: string[]
}

function InstallmentsListItem({
  message = messages.default.id,
  markers = [],
}: Props) {
  const { installment } = useInstallments() ?? {}

  if (!installment) {
    return null
  }

  return (
    <InstallmentsRenderer
      message={message}
      markers={markers}
      installment={installment}
    />
  )
}

InstallmentsListItem.schema = {
  title: 'admin/installments-list-item.title',
}

export default InstallmentsListItem
