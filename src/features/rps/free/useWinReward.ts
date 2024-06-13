import { useContext } from 'react'
import { RPSFreeContext } from './RPSFreeContext'
import { useReadContract } from 'wagmi'
import { abi } from './rps-free.abi'

export function useWinReward() {
  const { address } = useContext(RPSFreeContext)
  return useReadContract({
    abi,
    address,
    functionName: 'winReward',
    query: {
      enabled: !!address,
      staleTime: 14_000_000_000,
    },
  })
}
