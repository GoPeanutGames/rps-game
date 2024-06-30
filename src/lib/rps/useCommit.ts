import { useContext } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useAccount, useConfig } from 'wagmi'
import { getPublicClient, getWalletClient } from 'wagmi/actions'
import { RPSContext } from './RPSContext'
import { abi } from './rps.abi'
import { RPSPick } from './types'
import { hexToNumber } from 'viem'
import { hexToAddress } from '@utils/address'

export function useCommit() {
  const queryClient = useQueryClient()
  const config = useConfig()

  const { address } = useContext(RPSContext)
  const { address: account } = useAccount()

  return useMutation({
    mutationKey: ['rps', { scope: 'pick', address, account }],
    mutationFn: async ({
      pick,
      salt,
    }: {
      pick: RPSPick
      salt: `0x${string}`
    }) => {
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
        functionName: 'commit',
        args: [pick, salt],
      })

      const hash = await walletClient.writeContract(request)
      const receipt = await publicClient.waitForTransactionReceipt({ hash })

      const log = receipt.logs[0]
      console.log({ logs: receipt.logs })

      if (!log) {
        return { receipt }
      }

      const result = {
        pick0: hexToNumber(log.topics[1]!),
        pick1: hexToNumber(log.topics[2]!),
        winner: hexToAddress(log.topics[3]!) as Address,
      }

      return { result, receipt }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['readContract', { address }],
      })
    },
  })
}
