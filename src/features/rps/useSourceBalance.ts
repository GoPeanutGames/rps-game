import { useRPS } from './useRPS'
import { abi } from './sourceAbi'
import { useReadContract } from 'wagmi'

export function useSourceBalance(account?: Address) {
  const { sourceAddress } = useRPS()
  return useReadContract({
    abi,
    address: sourceAddress,
    functionName: 'balanceOf',
    args: [account as Address],
    query: {
      enabled: !!account,
    },
  })
}
