import { useContext } from 'react'
import { useToast } from '@chakra-ui/react'
import { useQueryClient } from '@tanstack/react-query'
import { RPSContext } from '@lib/rps'
import {
  useWatchGameJoinedByAddr,
  useWatchGameLeftByAddr,
} from '@lib/rps/factory'

/**
 *  Acts as a top level watcher for in-game events to invalidate
 *  related queries and update game rendering state.
 */
export function useWatchGame() {
  const queryClient = useQueryClient()
  const toast = useToast()

  const { address: gameAddress } = useContext(RPSContext)

  useWatchGameJoinedByAddr({
    gameAddress,
    onLogs: logs => {
      queryClient.invalidateQueries({
        queryKey: ['readContract', { address: gameAddress }],
      })

      logs.map(log =>
        toast({
          status: 'info',
          position: 'top',
          title: `Player ${log.player.slice(8)} joined the game`,
          isClosable: true,
          duration: 4_200,
        }),
      )
    },
  })

  useWatchGameLeftByAddr({
    gameAddress,
    onLogs: logs => {
      queryClient.invalidateQueries({
        queryKey: ['readContract', { address: gameAddress }],
      })

      logs.map(log =>
        toast({
          status: 'info',
          position: 'top',
          title: `Player ${log.player.slice(0)} left the game`,
          isClosable: true,
          duration: 4_200,
        }),
      )
    },
  })
}
