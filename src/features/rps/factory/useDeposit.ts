import { useContext } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useAccount, useConfig } from 'wagmi'
import { getPublicClient, getWalletClient } from 'wagmi/actions'
import { RPSFactoryContext } from './RPSFactoryContext'
import { abi } from './rps-factory.abi'
import { hexToBool } from 'viem'

export function useDeposit() {
  const queryClient = useQueryClient()
  const config = useConfig()

  const { address } = useContext(RPSFactoryContext)
  const { address: account } = useAccount()

  return useMutation({
    mutationKey: ['rps-factory', { scope: 'deposit', address, account }],
    mutationFn: async ({
      value,
    }: {
      /**
       *  The amount of source tokens to deposit, effectively converting into
       *  $RPS tokens.
       */
      value: bigint
    }) => {
      if (!address) throw new Error('RPSFactory context is not set')
      if (!config) throw new Error('Wagmi context is not set')

      const publicClient = getPublicClient(config)
      if (!publicClient) throw new Error('Failed accessing public client')

      const walletClient = await getWalletClient(config)
      if (!walletClient) throw new Error('Failed accessing wallet client')

      const { request } = await publicClient.simulateContract({
        account,
        address,
        abi,
        functionName: 'deposit',
        args: [value],
      })

      const hash = await walletClient.writeContract(request)
      const receipt = await publicClient.waitForTransactionReceipt({ hash })

      const result = hexToBool(receipt.logs[0].data)

      return { result, receipt }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [
          'readContract',
          { address, functionName: 'balances', args: [account] },
        ],
      })
    },
  })
}
