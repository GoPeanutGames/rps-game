import { useContext } from 'react'
import { useReadContract } from 'wagmi'
import { RPSFactoryContext } from './RPSFactoryContext'
import { abi } from './rps-factory.abi'

export function useSplitFee({
  value,
}: {
  /**
   *  Amount of tokens to be calculated fee against.
   */
  value?: bigint
}) {
  const { address } = useContext(RPSFactoryContext)
  return useReadContract({
    abi,
    address,
    functionName: 'splitFee',
    args: [value as bigint],
    query: {
      enabled: !!address && !!value,
      staleTime: 20_000_000_000,
    },
  })
}
