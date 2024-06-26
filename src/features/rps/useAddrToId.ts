import { useContext } from 'react'
import { RPSContext } from './RPSContext'
import { useReadContract } from 'wagmi'
import { abi } from './rps.abi'

export function useAddrToId({ userAddress }: { userAddress?: Address }) {
  const { address } = useContext(RPSContext)
  return useReadContract({
    abi,
    address,
    functionName: 'addrToId',
    args: [userAddress!],
    query: {
      enabled: !!address && !!userAddress,
      staleTime: 15_000_000,
    },
  })
}
