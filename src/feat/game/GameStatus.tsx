import { forwardRef } from 'react'
import { motion, AnimatePresence, HTMLMotionProps } from 'framer-motion'
import { Text } from '@chakra-ui/react'
import { useActivePlayers } from '@lib/rps'

export function GameStatus() {
  const { data: active, isLoading: isLoadingPlayers } = useActivePlayers()

  return (
    <AnimatePresence mode='popLayout'>
      {isLoadingPlayers && (
        <Status key='awaiting-join'>
          <Text
            w='full'
            textAlign='center'
            textStyle='note'
            lineHeight='40px'
            bgGradient='linear(to-l, gray.800, gray.700, gray.800)'
          >
            Loading game status
          </Text>
        </Status>
      )}

      {active! < 2n && (
        <Status key='awaiting-join'>
          <Text
            w='full'
            textAlign='center'
            textStyle='note'
            lineHeight='40px'
            bgGradient='linear(to-l, gray.800, gray.700, gray.800)'
          >
            Awaiting for players to join the game
          </Text>
        </Status>
      )}

      {active! == 2n && (
        <Status key='awaiting-pick'>
          <Text
            w='full'
            textAlign='center'
            textStyle='note'
            lineHeight='40px'
            bgGradient='linear(to-l, gray.800, gray.600, gray.800)'
          >
            Players are picking
          </Text>
        </Status>
      )}
    </AnimatePresence>
  )
}

const Status = forwardRef<HTMLDivElement, HTMLMotionProps<'div'>>(
  function Status(props, ref) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        style={{ width: '100%' }}
        {...props}
        ref={ref}
      />
    )
  },
)
