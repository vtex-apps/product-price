import { FC } from 'react'

export interface BasicPriceProps {
  message: string
  markers: string[]
}
export interface StorefrontFC<P = {}> extends FC<P> {
  getSchema?(props: P): object
  schema?: object
}
