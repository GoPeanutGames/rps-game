import { useContext } from 'react'
import { useReadContract } from 'wagmi'
import { RPSFactoryContext } from './RPSFactoryContext'
import { abi } from './rps-factory.abi'

export function useBalanceOf({
  account,
}: {
  /**
   *  Address to fetch balance of.
   */
  account?: Address
}) {
  const { address } = useContext(RPSFactoryContext)
  return useReadContract({
    abi,
    address,
    functionName: 'balances',
    args: [account as Address],
    query: {
      enabled: !!address && !!account,
      staleTime: 1_000_000,
    },
  })
}
