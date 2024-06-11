import { useReadContract } from 'wagmi'

const abi = [
  {
    type: 'function',
    name: 'allowance',
    inputs: [
      { name: 'owner', type: 'address' },
      { name: 'spender', type: 'address' },
    ],
    outputs: [{ name: '', type: 'uint256' }],
    stateMutability: 'view',
  },
] as const

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
    scopeKey: JSON.stringify({ name: 'allowance', owner, spender }),
    query: {
      enabled: !!address && !!owner && !!spender,
      staleTime: 3_000_000_000,
    },
  })
}
