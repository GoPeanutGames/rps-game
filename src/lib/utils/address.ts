import { getAddress } from 'viem'

export function hexToAddress(hex?: `0x${string}`): Address | undefined {
  return hex ? getAddress(`0x${hex.slice(26)}`) : undefined
}

export function addrShortify(address?: Address) {
  return address ? `${address.slice(0, 6)}..${address.slice(-4)}` : undefined
}
