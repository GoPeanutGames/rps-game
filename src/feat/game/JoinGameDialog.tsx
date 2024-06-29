import {
  ReactElement,
  cloneElement,
  useCallback,
  useContext,
  useMemo,
} from 'react'
import { formatEther } from 'viem'
import { useAccount } from 'wagmi'
import {
  Alert,
  AlertDescription,
  AlertIcon,
  Box,
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
  useToast,
} from '@chakra-ui/react'
import { RPSContext } from '@lib/rps'
import {
  useAddrToId,
  useBalanceOf,
  useGameJoin,
  useStakes,
} from '@lib/rps/factory'
import { RPSIcon } from '@design/icons/RPSIcon'

export function JoinGameDialog({ trigger }: { trigger?: ReactElement }) {
  const { isOpen, onOpen, onClose } = useDisclosure()

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
      {trigger && cloneElement(trigger, { onClick: onOpen })}

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
              {formatEther(stakes || 0n)} <RPSIcon />
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
