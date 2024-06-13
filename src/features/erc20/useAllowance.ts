import { useReadContract } from 'wagmi'
import { abi } from './erc20.abi'

export function useAllowance({
  address,
  owner,
  spender,
}: {
  /**
   *  Address of the ERC20 contract.
   */
  address?: Address

  /**
   *  Owner address.
   */
  owner?: Address

  /**
   *  Spender address.
   */
  spender?: Address
}) {
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
