import { useContext } from 'react'
import { useAccount, useConfig } from 'wagmi'
import { keepPreviousData, useInfiniteQuery } from '@tanstack/react-query'
import { RPSRouterContext } from './RPSRouterContext'
import { abi } from './rps-router.abi'
import { getPublicClient } from 'wagmi/actions'
import { Game } from '../types'

export function useFetchOpenGames(
  {
    perPage = 20,
  }: {
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
        functionName: 'open',
        perPage,
      },
    ],
    queryFn: async ({ pageParam = 0 }) => {
      const publicClient = getPublicClient(config)
      if (!publicClient) {
        throw new Error('Failed accessing public client')
      }

      const limit = BigInt(perPage)
      const offset = BigInt(pageParam) * limit

      return (
        await publicClient.readContract({
          abi,
          account,
          address: address!,
          functionName: 'open',
          args: [offset, limit],
        })
      ).map(
        (game, i) =>
          ({
            id: offset + BigInt(i),
            ...game,
          }) as Game,
      )
    },
    initialPageParam: 0,
    getNextPageParam: (_, groups) => groups.length,
    placeholderData: keepPreviousData,
    enabled: !!address && !!account && perPage > 0,
    staleTime: 20_000_000,
  })
}
