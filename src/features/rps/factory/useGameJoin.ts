import { useContext } from 'react'
import { useAccount, useConfig } from 'wagmi'
import { RPSFactoryContext } from './RPSFactoryContext'
import { useMutation } from '@tanstack/react-query'
import { getPublicClient, getWalletClient } from 'wagmi/actions'
import { abi } from './rps-factory.abi'

export function useGameJoin() {
  const config = useConfig()

  const { address } = useContext(RPSFactoryContext)
  const { address: account } = useAccount()

  return useMutation({
    mutationKey: ['rps-factory', { scope: 'join', address, account }],
    mutationFn: async ({ gameId }: { gameId: bigint }) => {
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
        functionName: 'joinGame',
        args: [gameId],
      })

      const hash = await walletClient.writeContract(request)
      const receipt = await publicClient.waitForTransactionReceipt({ hash })

      return { receipt }
    },
  })
}
