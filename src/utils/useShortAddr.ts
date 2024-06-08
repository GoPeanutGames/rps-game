import { useMemo } from 'react'

export function useShortAddr(address?: Address) {
  return useMemo(() => {
    if (!address) return ''
    return `${address.slice(0, 6)}..${address.slice(-4)}`
  }, [address])
}
