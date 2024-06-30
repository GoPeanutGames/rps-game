import { ReactElement, cloneElement, useCallback, useContext } from 'react'
import {
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
import { useAddrToId, useGameLeave } from '@lib/rps/factory'

export function LeaveGameDialog({ trigger }: { trigger?: ReactElement }) {
  const { isOpen, onOpen, onClose } = useDisclosure()

  const { address: gameAddress } = useContext(RPSContext)
  const { data: gameId } = useAddrToId({ gameAddress })

  const toast = useToast()

  const { mutate, isPending } = useGameLeave()

  const leave = useCallback(
    (payload: Parameters<typeof mutate>[0]) => {
      mutate(payload, {
        onError: error =>
          toast({
            status: 'error',
            title: 'Failed to leave the game',
            description: error.message,
            isClosable: true,
            duration: 15_000,
          }),
        onSuccess: () => {
          toast({
            status: 'success',
            title: 'You have left the game',
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
          <ModalHeader>Leave game #{gameId?.toString()}</ModalHeader>

          <ModalBody>
            <Text
              variant='help'
              mb='4'
            >
              Your stakes would be returned once you leave the game.
            </Text>
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
              onClick={() => typeof gameId !== 'undefined' && leave({ gameId })}
              isLoading={isPending}
            >
              Leave
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
