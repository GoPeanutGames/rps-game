import { useContext } from 'react'
import { useMutation } from '@tanstack/react-query'
import { useAccount, useConfig } from 'wagmi'
import { RPSFactoryContext } from './RPSFactoryContext'
import { getPublicClient, getWalletClient } from 'wagmi/actions'
import { abi } from './rps-factory.abi'
import { getAddress, hexToBigInt } from 'viem'

export function useGameCreate() {
  const config = useConfig()

  const { address } = useContext(RPSFactoryContext)
  const { address: account } = useAccount()

  return useMutation({
    mutationKey: ['rps-factory', { scope: 'create', address, account }],
    mutationFn: async ({ stake }: { stake: bigint }) => {
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
        functionName: 'createGame',
        args: [stake],
      })

      const hash = await walletClient.writeContract(request)
      const receipt = await publicClient.waitForTransactionReceipt({ hash })

      const event = receipt.logs[0]
      if (!event) {
        throw new Error('Failed to parse response')
      }

      const result = {
        id: hexToBigInt(event.topics[1]!),
        address: getAddress(`0x${event.topics[2]!.slice(26)}`),
        stake: hexToBigInt(event.topics[3]!),
      }

      return { result, receipt }
    },
  })
}
