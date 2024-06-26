import { useContext } from 'react'
import { RPSFactoryContext } from './RPSFactoryContext'
import { useReadContract } from 'wagmi'
import { abi } from './rps-factory.abi'

export function useAddrToId({ gameAddress }: { gameAddress?: Address }) {
  const { address } = useContext(RPSFactoryContext)
  return useReadContract({
    abi,
    address,
    functionName: 'instances',
    args: [gameAddress!],
    query: {
      enabled: !!address && typeof gameAddress !== 'undefined',
      staleTime: Infinity,
    },
  })
}
