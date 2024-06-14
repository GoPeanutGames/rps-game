import { useContext } from 'react'
import { useAccount, useConfig } from 'wagmi'
import { getPublicClient, getWalletClient } from 'wagmi/actions'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { ERC20Context } from './ERC20Context'
import { abi } from './erc20.abi'

export function useApprove() {
  const queryClient = useQueryClient()
  const config = useConfig()

  const { address } = useContext(ERC20Context)
  const { address: account } = useAccount()

  return useMutation({
    mutationKey: ['erc20', { scope: 'approve', address, account }],
    mutationFn: async ({
      spender,
      value,
    }: {
      /**
       *  The account allowed to transfer tokens from the owner's account.
       */
      spender: Address

      /**
       *  The amount of tokens to be approved to spend.
       */
      value: bigint
    }) => {
      if (!address) throw new Error('ERC20 context is not set')
      if (!config) throw new Error('Wagmi context is not set')

      const publicClient = getPublicClient(config)
      if (!publicClient) throw new Error('Failed accessing public client')

      const walletClient = await getWalletClient(config)
      if (!walletClient) throw new Error('Failed accessing wallet client')

      const { result, request } = await publicClient.simulateContract({
        account,
        address,
        abi,
        functionName: 'approve',
        args: [spender, value],
      })

      const hash = await walletClient.writeContract(request)
      const receipt = await publicClient.waitForTransactionReceipt({ hash })

      return { result, receipt }
    },
    onSuccess: (_, { spender }) => {
      queryClient.invalidateQueries({
        queryKey: [
          'readContract',
          {
            address,
            functionName: 'allowance',
            args: [account, spender],
          },
        ],
      })
    },
  })
}
