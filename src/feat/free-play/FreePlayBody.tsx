import { useCallback, useMemo, useState } from 'react'
import { useAccount } from 'wagmi'
import { AnimatePresence, motion, MotionConfig } from 'framer-motion'
import { Button, Text, useToast } from '@chakra-ui/react'
import { useFreePlay } from '@lib/rps/free'
import { RPSPick } from '@lib/rps/types'
import rock from '@assets/rock.webp'
import paper from '@assets/paper.webp'
import scissors from '@assets/scissors.webp'

export function FreePlayBody() {
  const toast = useToast()

  const { address: account } = useAccount()
  const [pick, setPick] = useState<RPSPick>(0)

  const {
    data,
    mutate: confirmMutate,
    isPending: isConfirming,
    reset: resetConfirm,
    isIdle,
    isError,
  } = useFreePlay()

  const confirm = useCallback(
    (payload: Parameters<typeof confirmMutate>[0]) => {
      confirmMutate(payload, {
        onError: error =>
          toast({
            status: 'error',
            title: 'Failed to initiate a free game',
            description: error.message,
            isClosable: true,
            duration: 15_000,
          }),
      })
    },
    [confirmMutate, toast],
  )

  const opponentPick = useMemo(() => {
    return data?.result.pick1
  }, [data])

  const isWin = useMemo(() => {
    return data && account && data?.result.winner == account
  }, [data, account])

  const reset = useCallback(() => {
    setPick(0)
    resetConfirm()
  }, [setPick, resetConfirm])

  return (
    <MotionConfig transition={{ duration: 0.62 }}>
      <motion.div
        style={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '24px',
        }}
      >
        <AnimatePresence mode='popLayout'>
          <Text
            textStyle='header'
            key='header'
          >
            Free mode
          </Text>

          <motion.div
            key='player'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              display: 'flex',
              gap: '12px',
              justifyContent: 'space-between',
            }}
          >
            <motion.div
              whileHover={{ scale: isIdle ? 1.12 : 1 }}
              animate={{
                opacity: pick > 0 && pick !== 1 ? 0.32 : 1,
              }}
              transition={{ duration: 0.2 }}
              style={{
                width: 144,
                height: 160,
                background: `url(${rock})`,
                cursor: isIdle ? 'pointer' : 'default',
              }}
              onClick={() => isIdle && setPick(1)}
            />

            <motion.div
              whileHover={{ scale: isIdle ? 1.12 : 1 }}
              animate={{
                opacity: pick > 0 && pick !== 2 ? 0.32 : 1,
              }}
              transition={{ duration: 0.2 }}
              style={{
                width: 144,
                height: 160,
                background: `url(${paper})`,
                cursor: isIdle ? 'pointer' : 'default',
              }}
              onClick={() => isIdle && setPick(2)}
            />

            <motion.div
              whileHover={{ scale: isIdle ? 1.12 : 1 }}
              animate={{
                opacity: pick > 0 && pick !== 3 ? 0.32 : 1,
              }}
              transition={{ duration: 0.2 }}
              style={{
                width: 144,
                height: 160,
                background: `url(${scissors})`,
                cursor: isIdle ? 'pointer' : 'default',
              }}
              onClick={() => isIdle && setPick(3)}
            />
          </motion.div>

          {isIdle && !pick && (
            <motion.div
              key='choose'
              initial={{ opacity: 1 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <Text
                textStyle='note'
                lineHeight='40px'
              >
                Choose your option to start a round
              </Text>
            </motion.div>
          )}

          {isIdle && pick && (
            <motion.div
              key='confirm'
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <Button
                colorScheme='funky'
                onClick={() => confirm({ pick })}
              >
                Confirm
              </Button>
            </motion.div>
          )}

          {isConfirming && (
            <motion.div
              key='await-opponent'
              initial={{ opacity: 1 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <Text
                textStyle='note'
                lineHeight='40px'
              >
                Awaiting for the opponent
              </Text>
            </motion.div>
          )}

          {isError && (
            <motion.div
              key='error-note'
              initial={{ opacity: 1 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <Text
                textStyle='note'
                lineHeight='40px'
              >
                Some attempts fails due to throttling, try later
              </Text>
            </motion.div>
          )}

          {!isIdle && opponentPick && (
            <motion.div
              key='game-result'
              initial={{ opacity: 1 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={{
                width: '100%',
              }}
            >
              <Text
                w='full'
                textAlign='center'
                textStyle='note'
                lineHeight='40px'
                bgGradient={
                  isWin
                    ? 'linear(to-l, #addf3900, #addf39ff, #addf3900)'
                    : 'linear(to-l, #ff000000, #ff0000ff, #ff000000)'
                }
                color='black'
              >
                {isWin ? 'Congratulations, you won!' : 'Good luck next time...'}
              </Text>
            </motion.div>
          )}

          <motion.div
            key='opponent'
            initial={{ opacity: 0 }}
            animate={{ opacity: isIdle ? 0.1 : 1 }}
            exit={{ opacity: 0 }}
            style={{
              display: 'flex',
              gap: '12px',
              justifyContent: 'space-between',
            }}
          >
            <motion.div
              animate={{
                opacity: opponentPick !== 1 ? 0.32 : 1,
              }}
              transition={{ duration: 0.2 }}
              style={{
                width: 144,
                height: 160,
                background: `url(${rock})`,
              }}
            />

            <motion.div
              animate={{
                opacity: opponentPick !== 2 ? 0.32 : 1,
              }}
              transition={{ duration: 0.2 }}
              style={{
                width: 144,
                height: 160,
                background: `url(${paper})`,
              }}
            />

            <motion.div
              animate={{
                opacity: opponentPick !== 3 ? 0.32 : 1,
              }}
              transition={{ duration: 0.2 }}
              style={{
                width: 144,
                height: 160,
                background: `url(${scissors})`,
              }}
            />
          </motion.div>

          <motion.div
            key='restart'
            initial={{ opacity: 0 }}
            animate={{ opacity: isError || opponentPick ? 1 : 0 }}
            style={{
              pointerEvents: isError || opponentPick ? 'all' : 'none',
            }}
          >
            <Button onClick={() => reset()}>Play again</Button>
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </MotionConfig>
  )
}
