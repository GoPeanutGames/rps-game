import { useContext } from 'react'
import { useReadContract } from 'wagmi'
import { RPSContext } from './RPSContext'
import { abi } from './rps.abi'

export function useCanLeave() {
  const { address } = useContext(RPSContext)
  return useReadContract({
    abi,
    address,
    functionName: 'canLeave',
    query: {
      enabled: !!address,
      staleTime: 1_000_000,
    },
  })
}
