import { useContext } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useAccount, useConfig } from 'wagmi'
import { getPublicClient, getWalletClient } from 'wagmi/actions'
import { RPSFreeContext } from './RPSFreeContext'
import { RPSPick } from '../types'
import { abi } from './rps-free.abi'

export function useFreePlay() {
  const queryClient = useQueryClient()
  const config = useConfig()

  const { address } = useContext(RPSFreeContext)
  const { address: account } = useAccount()

  return useMutation({
    mutationKey: ['rps-free', { scope: 'playFreeStake', address, account }],
    mutationFn: async ({ pick }: { pick: RPSPick }) => {
      if (!pick) throw new Error('`None` is unavailable variant')
      if (!address) throw new Error('RPSFactory context is not set')
      if (!config) throw new Error('Wagmi context is not set')

      const publicClient = getPublicClient(config)
      if (!publicClient) throw new Error('Failed accessing public client')

      const walletClient = await getWalletClient(config)
      if (!walletClient) throw new Error('Failed accessing wallet client')

      const { request } = await publicClient.simulateContract({
        abi,
        account,
        address,
        functionName: 'playFreeStake',
        args: [pick],
        gas: 250_000n,
      })

      const hash = await walletClient.writeContract(request)
      const receipt = await publicClient.waitForTransactionReceipt({ hash })

      // This is a work around, since we can't read the game result from
      // simulation (not exactly sure why, may be because simulation happens
      // in another block). Games that user won contain at least one mint
      // event.
      const result = receipt.logs.length > 0

      return { result, receipt }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [
          'readContract',
          {
            address,
            functionName: 'balances',
            args: [account],
          },
        ],
      })
    },
  })
}
