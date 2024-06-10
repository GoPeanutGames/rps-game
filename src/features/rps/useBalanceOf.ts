import { useReadContract } from 'wagmi'
import { useRPS } from './useRPS'
import { abi } from './rpsFreeAbi'

export function useBalanceOf(account?: Address) {
  const { address } = useRPS()
  return useReadContract({
    abi,
    address,
    functionName: 'balances',
    args: [account as Address],
    scopeKey: 'balance',
    query: {
      enabled: !!account,
    },
  })
}
