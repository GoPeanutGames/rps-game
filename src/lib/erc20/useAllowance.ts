import { useContext } from 'react'
import { useReadContract } from 'wagmi'
import { ERC20Context } from './ERC20Context'
import { abi } from './erc20.abi'

export function useAllowance({
  owner,
  spender,
}: {
  /**
   *  Owner address.
   */
  owner?: Address

  /**
   *  Spender address.
   */
  spender?: Address
}) {
  const { address } = useContext(ERC20Context)
  return useReadContract({
    abi,
    address,
    functionName: 'allowance',
    args: [owner as Address, spender as Address],
    query: {
      enabled: !!address && !!owner && !!spender,
      staleTime: 3_000_000_000,
    },
  })
}
