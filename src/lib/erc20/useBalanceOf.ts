import { useContext } from 'react'
import { useReadContract } from 'wagmi'
import { ERC20Context } from './ERC20Context'
import { abi } from './erc20.abi'

export function useBalanceOf({
  account,
}: {
  /**
   *  Account to fetch the balance of.
   */
  account?: Address
}) {
  const { address } = useContext(ERC20Context)
  return useReadContract({
    address,
    abi,
    functionName: 'balanceOf',
    args: [account as Address],
    query: {
      enabled: !!address && !!account,
      staleTime: 2_200_000,
    },
  })
}
