import { useContext } from 'react'
import { useReadContract } from 'wagmi'
import { RPSContext } from './RPSContext'
import { abi } from './rps.abi'

export function useActivePlayers() {
  const { address } = useContext(RPSContext)

  return useReadContract({
    abi,
    address,
    functionName: 'activePlayers',
    query: {
      enabled: !!address,
      staleTime: 15_300_000,
    },
  })
}
