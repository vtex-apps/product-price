import React from 'react'
import { defineMessages } from 'react-intl'
import { useCssHandles, CssHandlesTypes } from 'vtex.css-handles'

import { useInstallments } from './components/InstallmentsContext'
import InstallmentsRenderer, {
  CSS_HANDLES,
} from './components/InstallmentsRenderer'

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
  /** Used to override default CSS handles */
  classes?: CssHandlesTypes.CustomClasses<typeof CSS_HANDLES>
}

function InstallmentsListItem({
  message = messages.default.id,
  markers = [],
  classes,
}: Props) {
  const { handles } = useCssHandles(CSS_HANDLES, { classes })
  const { installment } = useInstallments() ?? {}

  if (!installment) {
    return null
  }

  return (
    <InstallmentsRenderer
      message={message}
      markers={markers}
      installment={installment}
      handles={handles}
    />
  )
}

InstallmentsListItem.schema = {
  title: 'admin/installments-list-item.title',
}

export default InstallmentsListItem
