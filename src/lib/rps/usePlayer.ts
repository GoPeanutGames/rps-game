import { useContext } from 'react'
import { useReadContract } from 'wagmi'
import { RPSContext } from './RPSContext'
import { abi } from './rps.abi'

export function usePlayer({ playerId }: { playerId?: 0 | 1 }) {
  const { address } = useContext(RPSContext)

  return useReadContract({
    abi,
    address,
    functionName: 'player',
    args: [playerId ? BigInt(playerId) : 0n],
    query: {
      enabled: !!address && typeof playerId !== 'undefined',
      staleTime: 16_000_000,
    },
  })
}
