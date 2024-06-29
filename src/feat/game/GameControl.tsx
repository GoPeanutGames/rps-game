import { forwardRef, useContext, useMemo } from 'react'
import { useAccount } from 'wagmi'
import { motion, AnimatePresence, HTMLMotionProps } from 'framer-motion'
import { Button, Text } from '@chakra-ui/react'
import { useAddrToId, useBalanceOf, useStakes } from '@lib/rps/factory'
import {
  RPSContext,
  useCanJoin,
  useCanLeave,
  useAddrToId as useAccountToId,
} from '@lib/rps'
import { JoinGameDialog } from './JoinGameDialog'
import { Link } from '@tanstack/react-router'

export function GameControll() {
  const { data: canJoin } = useCanJoin()
  const { data: canLeave } = useCanLeave()

  const { address: gameAddress } = useContext(RPSContext)
  const { data: gameId } = useAddrToId({ gameAddress })
  const { data: stakes } = useStakes({ gameId })

  const { address: account } = useAccount()
  const { data: balance } = useBalanceOf({ account })

  const isNotEnoughFunds = useMemo(() => {
    return typeof stakes === 'undefined' || typeof balance === 'undefined'
      ? undefined
      : stakes > balance
  }, [stakes, balance])

  const { data: playerId } = useAccountToId({ userAddress: account })

  const isParticipant = useMemo(() => {
    return typeof playerId === 'number' && playerId >= 0
  }, [playerId])

  return (
    <AnimatePresence mode='popLayout'>
      {canJoin && !isParticipant && (
        <Controll key='join'>
          {isNotEnoughFunds ? (
            <Text h='40px'>
              Not enough funds,&nbsp;
              <Link to='/wallet'>
                <Text
                  as='span'
                  color='funky.300'
                >
                  deposit
                </Text>
              </Link>
              &nbsp;to join
            </Text>
          ) : (
            <JoinGameDialog trigger={<Button>Join</Button>} />
          )}
        </Controll>
      )}

      {canLeave && isParticipant && (
        <Controll key='leave'>
          <Button>Leave</Button>
        </Controll>
      )}
    </AnimatePresence>
  )
}

const Controll = forwardRef<HTMLDivElement, HTMLMotionProps<'div'>>(
  function Controll(props, ref) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        {...props}
        ref={ref}
      />
    )
  },
)
