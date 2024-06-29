import {
  ReactElement,
  cloneElement,
  useCallback,
  useMemo,
  useState,
} from 'react'
import { formatEther, parseEther } from 'viem'
import { useAccount } from 'wagmi'
import { useNavigate } from '@tanstack/react-router'
import {
  Alert,
  AlertDescription,
  AlertIcon,
  Box,
  Button,
  Input,
  InputGroup,
  InputRightAddon,
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
import { useBalanceOf, useGameCreate } from '@lib/rps/factory'
import { RPSIcon } from '@design/icons/RPSIcon'

export function CreateGameDialog({ trigger }: { trigger?: ReactElement }) {
  const navigate = useNavigate()
  const toast = useToast()

  const { isOpen, onOpen, onClose } = useDisclosure()
  const [stake, setStake] = useState<string>('')

  const { address: account } = useAccount()
  const { data: balance } = useBalanceOf({ account })

  const isUnderflow = useMemo(() => {
    return parseEther(stake) <= 0n
  }, [stake])

  const isOverflow = useMemo(() => {
    return (balance || 0n) < parseEther(stake)
  }, [stake, balance])

  const { mutate, isPending } = useGameCreate()

  const create = useCallback(
    (payload: Parameters<typeof mutate>[0]) => {
      mutate(payload, {
        onError: error =>
          toast({
            status: 'error',
            title: 'Failed to create a game',
            description: error.message,
            isClosable: true,
            duration: 15_000,
          }),
        onSuccess: data => {
          toast({
            status: 'success',
            title: 'Game is created',
            isClosable: true,
            duration: 4_200,
          })

          navigate({ to: `/games/${data.result.address}` })
        },
      })
    },
    [mutate, toast, navigate],
  )

  return (
    <>
      {trigger && cloneElement(trigger, { onClick: onOpen })}

      <Modal
        isOpen={isOpen}
        onClose={onClose}
        isCentered
        closeOnOverlayClick={false}
        size='lg'
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>New game</ModalHeader>
          <ModalBody>
            <Text>Select stake amount:</Text>

            <InputGroup my='2'>
              <Input
                value={stake}
                onChange={e => {
                  const { value } = e.target
                  if (!/^\d*\.?\d*$/.test(value)) return
                  setStake(value)
                }}
              />
              <InputRightAddon>
                <RPSIcon
                  boxSize='6'
                  color='funky.500'
                />
              </InputRightAddon>
            </InputGroup>

            <Text
              _hover={{ color: 'funky.500' }}
              transition='.32s ease'
              fontSize='xs'
              textAlign='right'
              cursor='pointer'
              onClick={() => balance && setStake(formatEther(balance))}
            >
              Available: {formatEther(balance || 0n)}
            </Text>

            <Text
              variant='help'
              my='4'
            >
              When a player joins the game, this amount is immediately secured
              from his $RPS balance and becomes a part of the game&apos;s bank.
            </Text>

            <Text
              variant='help'
              my='4'
            >
              When a player leaves an unfinished game, secured stakes are
              returned.
            </Text>

            <Text
              variant='help'
              my='4'
            >
              Stake value can&apos;t be changed once the game is created.
            </Text>

            <Box h='48px'>
              {Number(stake) > 0 && isUnderflow && (
                <Alert status='error'>
                  <AlertIcon />
                  <AlertDescription>
                    Minimum stake amount is 0.000000000000000001 <RPSIcon />
                  </AlertDescription>
                </Alert>
              )}

              {isOverflow && (
                <Alert status='warning'>
                  <AlertIcon />
                  <AlertDescription>
                    Your balance is insufficient to join the game
                  </AlertDescription>
                </Alert>
              )}
            </Box>
          </ModalBody>
          <ModalFooter gap='2'>
            <Button
              size='sm'
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button
              size='sm'
              colorScheme='funky'
              isDisabled={!stake}
              onClick={() => create({ stake: parseEther(stake) })}
              isLoading={isPending}
            >
              Create
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
