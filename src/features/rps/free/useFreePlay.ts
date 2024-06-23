import { useContext } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useAccount, useConfig } from 'wagmi'
import { getPublicClient, getWalletClient } from 'wagmi/actions'
import { RPSFreeContext } from './RPSFreeContext'
import { RPSPick } from '../types'
import { abi } from './rps-free.abi'
import { getAddress, hexToNumber } from 'viem'

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

      const event = receipt.logs[0]
      if (!event) {
        throw new Error('Failed to parse response')
      }

      const result = {
        pick0: hexToNumber(event.topics[1]!) as RPSPick,
        pick1: hexToNumber(event.topics[2]!) as RPSPick,
        winner: getAddress(`0x${event.topics[3]!.slice(26)}`),
      }

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
