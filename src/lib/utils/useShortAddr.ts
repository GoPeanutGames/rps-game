import { useMemo } from 'react'
import { addrShortify } from './address'

export function useShortAddr(address?: Address) {
  return useMemo(() => addrShortify(address), [address])
}
