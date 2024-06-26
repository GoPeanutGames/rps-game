import { ReactNode } from 'react'

declare global {
  type Children = ReactNode
  type Address = `0x${string}`
}

export {}
