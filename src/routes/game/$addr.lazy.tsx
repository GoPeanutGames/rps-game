import {
  Alert,
  AlertDescription,
  AlertIcon,
  Box,
  Button,
  ButtonProps,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Skeleton,
  Text,
  useDisclosure,
  useToast,
} from '@chakra-ui/react'
import {
  RPSContext,
  RPSProvider,
  useAddrToId,
  useCanJoin,
  usePlayer,
} from '@feat/rps'
import { RPSPick } from '@feat/rps/types'
import { createLazyFileRoute } from '@tanstack/react-router'
import {
  AnimatePresence,
  HTMLMotionProps,
  motion,
  MotionConfig,
} from 'framer-motion'
import rock from '@design/rock.webp'
import paper from '@design/paper.webp'
import scissors from '@design/scissors.webp'
import { forwardRef, useCallback, useContext, useMemo } from 'react'
import { useAccount } from 'wagmi'
import {
  useBalanceOf,
  useAddrToId as useGameAddrToId,
  useGameJoin,
  useStakes,
  useWatchGameJoinedByAddr,
} from '@feat/rps/factory'
import { formatEther, zeroAddress } from 'viem'
import { CoinIcon } from '@design/CoinIcon'
import { useQueryClient } from '@tanstack/react-query'
import { useShortAddr } from '@utils/useShortAddr'

export const Route = createLazyFileRoute('/game/$addr')({
  component: GamePage,
})

function GamePage() {
  const { addr } = Route.useParams()

  return (
    <RPSProvider address={addr as Address}>
      <GameWatcher />
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
          <Text
            textStyle='header'
            key='header'
          >
            Betting mode
          </Text>
          <PlayerController
            playerId={0}
            key='player-0'
          />
          <GameFlow />
          <PlayerController
            playerId={1}
            key='player-1'
          />
          <FlowControl />
        </motion.div>
      </MotionConfig>
    </RPSProvider>
  )
}

/**
 *  This component is used to watch on-chain events and invalidate
 *  related queries to keep UI is up to date.
 */
function GameWatcher() {
  const queryClient = useQueryClient()
  const toast = useToast()

  const { address: gameAddress } = useContext(RPSContext)

  useWatchGameJoinedByAddr({
    gameAddress,
    onEvent: logs => {
      queryClient.invalidateQueries({
        queryKey: ['readContract', { address: gameAddress }],
      })

      logs.map(l => {
        const playerAddress = l.topics[3]
        toast({
          status: 'info',
          position: 'top',
          title: `Player ${playerAddress.slice(0, 8)} joined the game`,
          isClosable: true,
          duration: 4_200,
        })
      })
    },
  })

  return null
}

function GameFlow() {
  const { address: account } = useAccount()
  const { data: playerId } = useAddrToId({ userAddress: account })

  const isParticipant = useMemo(() => {
    return typeof playerId === 'number' && playerId > -1
  }, [playerId])

  const { data: canJoin } = useCanJoin()

  return (
    <AnimatePresence mode='popLayout'>
      {!isParticipant ? (
        canJoin ? (
          <motion.div
            key='join-note'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <JoinGameDialog />
          </motion.div>
        ) : (
          <motion.div
            key='observing'
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <Text
              textStyle='note'
              lineHeight='40px'
            >
              You are observer
            </Text>
          </motion.div>
        )
      ) : (
        <motion.div
          key='participant'
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <Text
            textStyle='note'
            lineHeight='40px'
          >
            You are participant
          </Text>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

const PlayerController = forwardRef<
  HTMLDivElement,
  Omit<HTMLMotionProps<'div'>, 'children'> & { playerId: 0 | 1 }
>(({ playerId, ...props }, ref) => {
  const { address: account } = useAccount()
  const { data: address, isPending: isLoadingAddress } = usePlayer({
    playerId: playerId,
  })

  const displayAddress = useShortAddr(address)

  const isZeroAddress = useMemo(() => {
    return address === zeroAddress
  }, [address])

  const canPick = useMemo(() => {
    return account === address
  }, [address, account])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{
        display: 'flex',
        width: '456px',
        flexDirection: playerId ? 'column-reverse' : 'column',
        gap: '12px',
      }}
      {...props}
      ref={ref}
    >
      <PickGroup
        key={`player-${playerId}-pick`}
        pick={0}
        onPick={console.log}
        canPick={canPick}
      />

      <Skeleton
        w='100%'
        isLoaded={!isLoadingAddress}
      >
        <Text
          lineHeight='40px'
          textStyle='note'
          textAlign={playerId ? 'right' : 'left'}
        >
          {isZeroAddress ? 'No player' : displayAddress}
          {address === account && (
            <Text
              as='span'
              pl='2'
            >
              (You)
            </Text>
          )}
        </Text>
      </Skeleton>
    </motion.div>
  )
})

const PickGroup = forwardRef<
  HTMLDivElement,
  Omit<HTMLMotionProps<'div'>, 'children'> & {
    pick: RPSPick
    canPick: boolean
    onPick: (pick: RPSPick) => void
  }
>(({ pick, canPick, onPick, ...props }, ref) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{
        display: 'flex',
        gap: '12px',
        justifyContent: 'space-between',
      }}
      {...props}
      ref={ref}
    >
      <motion.div
        whileHover={canPick ? { scale: 1.12, cursor: 'pointer' } : {}}
        animate={{
          opacity: pick > 0 && pick !== 1 ? 0.32 : 1,
        }}
        transition={{ duration: 0.2 }}
        style={{
          width: 144,
          height: 160,
          background: `url(${rock})`,
        }}
        onClick={() => canPick && onPick(1)}
      />

      <motion.div
        whileHover={canPick ? { scale: 1.12, cursor: 'pointer' } : {}}
        animate={{
          opacity: pick > 0 && pick !== 2 ? 0.32 : 1,
        }}
        transition={{ duration: 0.2 }}
        style={{
          width: 144,
          height: 160,
          background: `url(${paper})`,
          cursor: canPick ? 'pointer' : 'default',
        }}
        onClick={() => canPick && onPick(2)}
      />

      <motion.div
        whileHover={{ scale: canPick ? 1.12 : 1 }}
        animate={{
          opacity: pick > 0 && pick !== 3 ? 0.32 : 1,
        }}
        transition={{ duration: 0.2 }}
        style={{
          width: 144,
          height: 160,
          background: `url(${scissors})`,
          cursor: canPick ? 'pointer' : 'default',
        }}
        onClick={() => canPick && onPick(3)}
      />
    </motion.div>
  )
})

function FlowControl() {
  return <AnimatePresence mode='popLayout'></AnimatePresence>
}

function JoinGameDialog(props: Omit<ButtonProps, 'onClick'>) {
  const { isOpen, onOpen, onClose } = useDisclosure()

  const { address: gameAddress } = useContext(RPSContext)
  const { data: gameId } = useGameAddrToId({ gameAddress })
  const { data: stakes } = useStakes({ gameId })

  const { address: account } = useAccount()
  const { data: balance } = useBalanceOf({ account })

  const isNotEnoughFunds = useMemo(() => {
    if (typeof stakes === 'undefined' || typeof balance === 'undefined')
      return false
    return stakes > balance
  }, [stakes, balance])

  const toast = useToast()
  const { mutate, isPending } = useGameJoin()
  const join = useCallback(
    (payload: Parameters<typeof mutate>[0]) => {
      mutate(payload, {
        onError: error =>
          toast({
            status: 'error',
            title: 'Failed to join a game',
            description: error.message,
            isClosable: true,
            duration: 15_000,
          }),
        onSuccess: () => {
          toast({
            status: 'success',
            title: 'Game is joined',
            isClosable: true,
            duration: 4_200,
          })
          onClose()
        },
      })
    },
    [mutate, toast, onClose],
  )

  return (
    <>
      <Button
        {...props}
        onClick={onOpen}
      >
        Join
      </Button>

      <Modal
        isOpen={isOpen}
        onClose={onClose}
        isCentered
        size='lg'
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Join game #{gameId?.toString()}</ModalHeader>

          <ModalBody>
            <Text>The amount to be secured to join the game:</Text>

            <Text
              w='100%'
              textAlign='center'
              fontSize='32px'
              fontWeight='900'
              my='4'
            >
              {formatEther(stakes || 0n)} <CoinIcon />
            </Text>

            <Text
              variant='help'
              mb='4'
            >
              This amount is secured from your $RPS balance and becomes a part
              of the game&apos;s bank.
              <br />
              The stakes can be returned by leaving a non-finalized game.
            </Text>

            <Box h='48px'>
              {isNotEnoughFunds && (
                <Alert status='error'>
                  <AlertIcon />
                  <AlertDescription>
                    Your balance is insufficient to join the game
                  </AlertDescription>
                </Alert>
              )}
            </Box>
          </ModalBody>

          <ModalFooter gap='12px'>
            <Button
              size='sm'
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button
              size='sm'
              colorScheme='funky'
              isDisabled={isNotEnoughFunds}
              onClick={() => typeof gameId !== 'undefined' && join({ gameId })}
              isLoading={isPending}
            >
              Join
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
