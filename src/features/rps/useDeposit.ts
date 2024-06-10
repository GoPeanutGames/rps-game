import { useEffect, useState } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { useWaitForTransactionReceipt, useWriteContract } from 'wagmi'
import { useRPS } from './useRPS'
import { abi } from './rpsFreeAbi'

export function useDeposit() {
  const queryClient = useQueryClient()
  const { address } = useRPS()

  const [error, onError] = useState<Error>()

  const { data: hash, writeContract } = useWriteContract()
  const write = (amount: bigint) =>
    writeContract(
      {
        abi,
        address,
        functionName: 'deposit',
        args: [amount],
      },
      { onError },
    )

  const { data, ...query } = useWaitForTransactionReceipt({ hash })

  useEffect(() => {
    if (!data) return
    queryClient.invalidateQueries({
      predicate: query =>
        (query.queryKey[1] as { scopeKey: string })?.scopeKey === 'balance',
    })
  }, [queryClient, data])

  return { data, ...query, write, writeError: error }
}
