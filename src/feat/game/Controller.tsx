import { forwardRef, useCallback, useMemo, useState } from 'react'
import { encodePacked, keccak256, zeroAddress } from 'viem'
import { useAccount } from 'wagmi'
import { motion, HTMLMotionProps } from 'framer-motion'
import {
  Button,
  ButtonProps,
  Link,
  Text,
  TextProps,
  useToast,
} from '@chakra-ui/react'
import { RPSInput } from '@design/RPSInput'
import { useShortAddr } from '@utils/useShortAddr'
import { RPSPick } from '@lib/rps/types'
import {
  useAddrToId,
  useCommit,
  usePick,
  useSecret,
  useWatchGameResult,
} from '@lib/rps'

interface PlayerProps extends Omit<HTMLMotionProps<'div'>, 'children'> {}

type GamePhase = 'picking' | 'commiting' | 'finalized'

export const Controller = forwardRef<HTMLDivElement, PlayerProps>(
  function Controller({ style, ...props }, ref) {
    const { address: account } = useAccount()
    const { data: playerId } = useAddrToId({ userAddress: account })

    const displayAddr = useShortAddr(account)
    const [phase, setPhase] = useState<GamePhase>('picking')

    const [pick, setPick] = useState<RPSPick>(0)

    const [winner, setWinner] = useState<Address>()
    const finalizePick = useCallback(
      ({ picks, winner }: { picks: RPSPick[]; winner: Address }) => {
        if (!playerId) return
        setPhase('finalized')
        setWinner(winner)
        setPick(picks[playerId])
      },
      [playerId, setPhase, setPick, setWinner],
    )

    useWatchGameResult({
      onLogs: logs => {
        const { pick0, pick1, winner } = logs[0]
        finalizePick({ picks: [pick0, pick1], winner })
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
          value={pick}
          onChange={setPick}
          disabled={phase === 'finalized'}
        />

        {phase === 'picking' &&
          (pick ? (
            <ConfirmButton
              pick={pick}
              onSuccess={() => setPhase('commiting')}
            />
          ) : (
            <Text
              lineHeight='32px'
              w='full'
              textAlign='center'
            >
              Select your option
            </Text>
          ))}

        {phase === 'commiting' &&
          (pick ? (
            <CommitButton
              onSuccess={result => {
                if (result) {
                  finalizePick(result)
                } else {
                  setPhase('finalized')
                }
              }}
              pick={pick}
            />
          ) : (
            <Text
              lineHeight='32px'
              w='full'
              textAlign='center'
            >
              Prove your pick by selecting the same option again
            </Text>
          ))}

        {phase === 'finalized' && (
          <Status
            w='full'
            lineHeight='32px'
            textAlign='center'
            account={account}
            winner={winner}
            onReset={() => {
              setPick(0)
              setPhase('picking')
            }}
          />
        )}

        <Text
          textStyle='note'
          w='fit-content'
          height='24px'
        >
          {displayAddr} (You)
        </Text>
      </motion.div>
    )
  },
)

function ConfirmButton({
  pick,
  onSuccess,
  ...props
}: Omit<ButtonProps, 'onClick' | 'isLoading' | 'isDisabled'> & {
  pick?: RPSPick
  onSuccess: () => void
}) {
  const toast = useToast()
  const { mutate, isPending } = usePick()

  const { data: salt } = useSecret()
  const encryptedPick = useMemo(() => {
    if (!pick || !salt) return
    return keccak256(encodePacked(['uint8', 'bytes32'], [pick, salt]))
  }, [pick, salt])

  const confirmPick = useCallback(
    (payload: Parameters<typeof mutate>[0]) => {
      mutate(payload, {
        onError: error =>
          toast({
            status: 'error',
            title: 'Failed to confirm a pick',
            description: error.message,
            isClosable: true,
            duration: 15_000,
          }),
        onSuccess: () => {
          toast({
            status: 'success',
            title: 'Your pick is confirmed',
            isClosable: true,
            duration: 4_200,
          })

          onSuccess()
        },
      })
    },
    [mutate, toast, onSuccess],
  )

  return (
    <Button
      colorScheme='funky'
      size='sm'
      w='full'
      {...props}
      isDisabled={!encryptedPick}
      isLoading={isPending}
      onClick={() => encryptedPick && confirmPick({ encryptedPick })}
    >
      Confirm pick
    </Button>
  )
}

function CommitButton({
  pick,
  onSuccess,
  ...props
}: Omit<ButtonProps, 'onClick' | 'isLoading' | 'isDisabled'> & {
  pick?: RPSPick
  onSuccess: (result?: { picks: RPSPick[]; winner: Address }) => void
}) {
  const toast = useToast()
  const { mutate, isPending } = useCommit()

  const { data: salt } = useSecret()

  const confirmCommit = useCallback(
    (payload: Parameters<typeof mutate>[0]) => {
      mutate(payload, {
        onError: error =>
          toast({
            status: 'error',
            title: 'Failed to confirm a pick',
            description: error.message,
            isClosable: true,
            duration: 15_000,
          }),
        onSuccess: data => {
          toast({
            status: 'success',
            title: 'Your pick is confirmed',
            isClosable: true,
            duration: 4_200,
          })

          onSuccess(
            data.result
              ? {
                  picks: [data.result.pick0, data.result.pick1],
                  winner: data.result.winner,
                }
              : undefined,
          )
        },
      })
    },
    [mutate, toast, onSuccess],
  )

  return (
    <Button
      colorScheme='funky'
      size='sm'
      w='full'
      {...props}
      isDisabled={!pick || !salt}
      isLoading={isPending}
      onClick={() => pick && salt && confirmCommit({ pick, salt })}
    >
      Prove pick
    </Button>
  )
}

function Status({
  winner,
  account,
  onReset,
  ...props
}: Omit<TextProps, 'children'> & {
  winner?: Address
  account?: Address
  onReset: () => void
}) {
  if (!winner || !account) {
    return <Text {...props}>Awaiting for game results</Text>
  }

  if (winner === zeroAddress) {
    return (
      <Text
        bgGradient='linear(to-l, gray.800, gray.600, gray.800)'
        {...props}
      >
        No one won,&nbsp;
        <Link
          variant='funky'
          onClick={onReset}
        >
          restart
        </Link>
        &nbsp;the game
      </Text>
    )
  }

  if (winner === account) {
    return (
      <Text
        {...props}
        bgGradient='linear(to-l, #addf3900, #addf39ff, #addf3900)'
        color='black'
      >
        Congratulations, you won the game
      </Text>
    )
  }

  return (
    <Text
      {...props}
      bgGradient='linear(to-l, #ff000000, #ff0000ff, #ff000000)'
      color='black'
    >
      Good luck next time
    </Text>
  )
}
