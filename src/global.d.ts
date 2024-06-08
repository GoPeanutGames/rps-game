import { ReactElement } from 'react'

declare global {
  type Child = boolean | string | ReactElement | JSX.Element
  type Children = Child | Child[]

  type Address = `0x${string}`
}

export {}
