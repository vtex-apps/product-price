import React, { useContext } from 'react'

import { BasicPriceProps } from './types'
import InstallmentsRenderer from './components/InstallmentsRenderer'
import InstallmentsContext from './components/InstallmentsContext'

function InstallmentsListItem(props: BasicPriceProps) {
  const { installments } = useContext(InstallmentsContext) ?? {}

  if (!installments) {
    return null
  }

  return <InstallmentsRenderer {...props} installments={installments} />
}

export default InstallmentsListItem
