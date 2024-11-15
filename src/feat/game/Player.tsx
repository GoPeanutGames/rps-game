import { forwardRef, useMemo, useState } from 'react'
import { motion, HTMLMotionProps } from 'framer-motion'
import { Text } from '@chakra-ui/react'
import { RPSInput } from '@design/RPSInput'
import { usePlayer, useWatchGameResult } from '@lib/rps'
import { zeroAddress } from 'viem'
import { useShortAddr } from '@utils/useShortAddr'
import { RPSPick } from '@lib/rps/types'

interface PlayerProps extends Omit<HTMLMotionProps<'div'>, 'children'> {
  idx: 0 | 1
}

export const Player = forwardRef<HTMLDivElement, PlayerProps>(function Player(
  { idx, style, ...props },
  ref,
) {
  const { data: playerAddr } = usePlayer({
    playerId: idx,
  })

  const isZeroAddress = useMemo(() => {
    return playerAddr === zeroAddress
  }, [playerAddr])

  const displayAddr = useShortAddr(playerAddr)

  const [pick, setPick] = useState<RPSPick>(0)

  useWatchGameResult({
    onLogs: logs => {
      const { pick0, pick1 } = logs[0]
      setPick([pick0, pick1][idx])
    },
  })

  return (
    <motion.div
      initial={{ opacity: 0, scale: 1.24 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.24 }}
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        ...style,
      }}
      {...props}
      ref={ref}
    >
      <RPSInput
        disabled
        value={pick}
      />

      <Text
        textStyle='note'
        w='fit-content'
        height='24px'
      >
        {isZeroAddress ? 'Unoccupied' : displayAddr}
      </Text>
    </motion.div>
  )
})
