import { useContext } from 'react'
import { RPSFactoryContext } from './RPSFactoryContext'
import { useReadContract } from 'wagmi'
import { abi } from './rps-factory.abi'

export function useStakes({ gameId }: { gameId?: bigint }) {
  const { address } = useContext(RPSFactoryContext)
  return useReadContract({
    abi,
    address,
    functionName: 'stakes',
    args: [gameId!],
    query: {
      enabled: !!address && typeof gameId !== 'undefined',
      staleTime: Infinity,
    },
  })
}
