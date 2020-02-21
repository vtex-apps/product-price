/* eslint-disable react/display-name */
import React, { FC } from 'react'
import { IOMessage } from 'vtex.native-types'
import { useCssHandles } from 'vtex.css-handles'

interface Props {
  label: string
  componentName: string
  markers: string[]
  rest: any
}

const IOMessageWithMarkers: FC<Props> = ({
  label,
  markers = [],
  componentName,
  rest,
}) => {
  const CSS_HANDLES = markers.map(marker => {
    return `${componentName}_${marker}`
  })
  const handles = useCssHandles(CSS_HANDLES)
  const markersComponents = {}
  markers.reduce((acc: any, marker) => {
    acc[marker] = (...chunks: any) => (
      <span className={handles[`${componentName}_${marker}`]}>{chunks}</span>
    )
  }, markersComponents)
  return (
    <IOMessage
      id={label}
      values={{
        ...markersComponents,
        ...rest,
      }}
    />
  )
}

export default IOMessageWithMarkers
