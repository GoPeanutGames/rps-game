import { useCallback } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { useAccount, useWriteContract } from 'wagmi'

export const abi = [
  {
    type: 'error',
    name: 'ERC20InvalidApprover',
    inputs: [{ name: 'approver', type: 'address' }],
  },
  {
    type: 'error',
    name: 'ERC20InvalidSpender',
    inputs: [{ name: 'spender', type: 'address' }],
  },
  {
    type: 'function',
    name: 'approve',
    inputs: [
      { name: 'spender', type: 'address' },
      { name: 'value', type: 'uint256' },
    ],
    outputs: [{ name: '', type: 'bool' }],
    stateMutability: 'nonpayable',
  },
] as const

export function useApprove({
  address,
}: {
  /**
   *  Address of the ERC20 contract
   */
  address?: Address
}) {
  const queryClient = useQueryClient()
  const { address: owner } = useAccount()
  const { data, writeContract, writeContractAsync, ...mutation } =
    useWriteContract()

  const onSuccess = useCallback(
    (
      _data: `0x${string}`,
      { args: [spender] }: { args: readonly [`0x${string}`, bigint] },
    ) => {
      queryClient.invalidateQueries({
        predicate: ({ queryKey }) =>
          (queryKey[1] as { scopeKey: string })?.scopeKey ===
          JSON.stringify({ name: 'allowance', owner, spender }),
      })
    },
    [queryClient, owner],
  )

  function write({ spender, value }: { spender: Address; value: bigint }) {
    if (!address) throw new Error('ERC20 address is not specified')
    return writeContract(
      {
        abi,
        address,
        functionName: 'approve',
        args: [spender, value],
      },
      { onSuccess },
    )
  }

  function writeAsync({ spender, value }: { spender: Address; value: bigint }) {
    if (!address) throw new Error('ERC20 address is not specified')
    return writeContractAsync(
      {
        abi,
        address,
        functionName: 'approve',
        args: [spender, value],
      },
      { onSuccess },
    )
  }

  return { ...mutation, write, writeAsync }
}
