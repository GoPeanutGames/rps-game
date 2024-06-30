import { useContext } from 'react'
import { useAccount, useConfig } from 'wagmi'
import { keepPreviousData, useInfiniteQuery } from '@tanstack/react-query'
import { RPSRouterContext } from './RPSRouterContext'
import { abi } from './rps-router.abi'
import { getPublicClient } from 'wagmi/actions'
import { Game } from '../types'

export function useFetchGamesByPlayer(
  {
    playerAddr,
    perPage = 20,
  }: {
    playerAddr?: Address
    perPage?: number
  } = {
    perPage: 20,
  },
) {
  const { address } = useContext(RPSRouterContext)
  const { address: account } = useAccount()
  const config = useConfig()

  return useInfiniteQuery({
    queryKey: [
      'read-contract',
      {
        account,
        address,
        functionName: 'hasPlayers',
        perPage,
        playerAddr,
      },
    ],
    queryFn: async ({ pageParam = 0 }) => {
      const publicClient = getPublicClient(config)
      if (!publicClient) {
        throw new Error('Failed accessing public client')
      }

      const limit = BigInt(perPage)
      const offset = BigInt(pageParam) * limit

      const games = await publicClient.readContract({
        abi,
        account,
        address: address!,
        functionName: 'hasPlayers',
        args: [[playerAddr!], offset, limit],
      })

      return {
        games: games.map((g, i) => ({ id: offset + BigInt(i), ...g }) as Game),
        hasMore: !!games.length,
      }
    },
    initialPageParam: 0,
    getNextPageParam: (_, groups) => groups.length,
    placeholderData: keepPreviousData,
    enabled: !!address && !!account && perPage > 0 && !!playerAddr,
    staleTime: 20_000_000,
  })
}
