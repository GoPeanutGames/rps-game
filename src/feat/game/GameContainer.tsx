import { useAccount } from 'wagmi'
import { Box, Flex, Text } from '@chakra-ui/react'
import { AnimatePresence } from 'framer-motion'
import { useAddrToId } from '@lib/rps'
import { useWatchGame } from './useWatchGame'
import { GameControll } from './GameControl'
import { Controller } from './Controller'
import { GameStatus } from './GameStatus'
import { Player } from './Player'
import { GameInfo } from './GameInfo'

export function GameContainer() {
  const { address: account } = useAccount()
  const { data: playerId } = useAddrToId({ userAddress: account })

  useWatchGame()

  return (
    <Flex
      w='full'
      flexDirection='column'
      alignItems='center'
      justifyContent='center'
      gap='32px'
    >
      <Text textStyle='header'>Betting mode</Text>

      <GameInfo mt='-12px' />

      <AnimatePresence mode='popLayout'>
        {playerId === 0 ? (
          <Controller key='controller-0' />
        ) : (
          <Player
            key='player-0'
            idx={0}
          />
        )}
      </AnimatePresence>

      <Box
        h='40px'
        w='full'
      >
        <GameStatus />
      </Box>

      <AnimatePresence mode='popLayout'>
        {playerId === 1 ? (
          <Controller
            key='controller-1'
            style={{ flexDirection: 'column-reverse', alignItems: 'flex-end' }}
          />
        ) : (
          <Player
            key='player-1'
            idx={1}
            style={{ flexDirection: 'column-reverse', alignItems: 'flex-end' }}
          />
        )}
      </AnimatePresence>

      <Flex
        h='40px'
        w='full'
        justifyContent='center'
      >
        <GameControll />
      </Flex>
    </Flex>
  )
}
