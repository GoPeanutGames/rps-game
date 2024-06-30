import { useContext } from 'react'
import { RPSContext } from './RPSContext'
import { useAccount } from 'wagmi'
import { useQuery } from '@tanstack/react-query'
import { keccak256, toHex } from 'viem'

export function useSecret() {
  const { address } = useContext(RPSContext)
  const { address: account } = useAccount()

  return useQuery({
    queryKey: ['rps', { scope: 'secret', address, account }],
    queryFn: () => {
      try {
        const key = keccak256(toHex(`rps-${address}-${account}`))
        let secret = localStorage.getItem(key)

        if (secret) {
          return secret as `0x${string}`
        }

        const bytes = new Uint8Array(32)
        crypto.getRandomValues(bytes)
        secret = keccak256(bytes)

        localStorage.setItem(key, secret)
        return secret as `0x${string}`
      } catch (error) {
        throw new Error(String(error))
      }
    },
    enabled: !!address && !!account,
    staleTime: 13_300_000,
  })
}
