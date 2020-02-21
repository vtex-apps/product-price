import { FC } from 'react'

export interface StorefrontFC<P = {}> extends FC<P> {
  getSchema?(props: P): object
  schema?: object
}
