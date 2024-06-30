import { useContext } from 'react'
import { useReadContract } from 'wagmi'
import { RPSContext } from './RPSContext'
import { abi } from './rps.abi'

export function useIsFinalized() {
  const { address } = useContext(RPSContext)
  return useReadContract({
    abi,
    address,
    functionName: 'isFinalized',
    query: {
      enabled: !!address,
      staleTime: 1_000_000,
    },
  })
}
