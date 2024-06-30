import { useContext } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useAccount, useConfig } from 'wagmi'
import { getPublicClient, getWalletClient } from 'wagmi/actions'
import { RPSContext } from './RPSContext'
import { abi } from './rps.abi'

export function usePick() {
  const queryClient = useQueryClient()
  const config = useConfig()

  const { address } = useContext(RPSContext)
  const { address: account } = useAccount()

  return useMutation({
    mutationKey: ['rps', { scope: 'pick', address, account }],
    mutationFn: async ({ encryptedPick }: { encryptedPick: `0x${string}` }) => {
      if (!address) throw new Error('RPS context is not set')
      if (!config) throw new Error('Wagmi context is not set')

      const publicClient = getPublicClient(config)
      if (!publicClient) throw new Error('Failed accessing public client')

      const walletClient = await getWalletClient(config)
      if (!walletClient) throw new Error('Failed accessing wallet client')

      const { request } = await publicClient.simulateContract({
        abi,
        account,
        address,
        functionName: 'pick',
        args: [encryptedPick],
      })

      const hash = await walletClient.writeContract(request)
      const receipt = await publicClient.waitForTransactionReceipt({ hash })

      return { receipt }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['readContract', { address }],
      })
    },
  })
}
