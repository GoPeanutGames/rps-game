import { useContext } from 'react'
import { RPSContext } from './RPSContext'
import { useReadContract } from 'wagmi'
import { abi } from './rps.abi'

export function useCanJoin() {
  const { address } = useContext(RPSContext)
  return useReadContract({
    abi,
    address,
    functionName: 'canJoin',
    query: {
      enabled: !!address,
      staleTime: 14_000_000,
    },
  })
}
