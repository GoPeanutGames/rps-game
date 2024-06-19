import {
  chakra,
  Box,
  BoxProps,
  Link,
  Text,
  type HTMLChakraProps,
  LinkProps,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalFooter,
  Button,
  useToast,
  InputGroup,
  Input,
  InputRightAddon,
  Alert,
  AlertIcon,
  AlertDescription,
} from '@chakra-ui/react'
import { CoinIcon } from '@design/CoinIcon'
import { useBalanceOf, useGameCreate } from '@feat/rps/factory'
import { createLazyFileRoute, useNavigate } from '@tanstack/react-router'
import { useCallback, useMemo, useState } from 'react'
import { formatEther, parseEther } from 'viem'
import { useAccount } from 'wagmi'

export const Route = createLazyFileRoute('/game/')({
  component: GamesIndex,
})

function GamesIndex() {
  return (
    <>
      <GamesHelper my='8' />
      <GamesTable h='72vh' />
    </>
  )
}

function GamesHelper(props: Omit<BoxProps, 'children'>) {
  return (
    <Box
      display='flex'
      flexDir='column'
      gap='4px'
      textAlign='center'
      {...props}
    >
      <Text>
        Select a game from the list below to start playing immediately.
      </Text>

      <Text fontSize='sm'>
        Looking for a game you have joined before?
        <Link
          variant='funky'
          pl='2'
        >
          Search your games
        </Link>
      </Text>

      <Text fontSize='sm'>
        Can&apos;t find a game that suit your budget?
        <Link
          variant='funky'
          pl='2'
        >
          Join a game by stake
        </Link>
      </Text>

      <Text fontSize='sm'>
        Can&apos;t find a game that suits your needs?
        <CreateGameDialog
          variant='funky'
          pl='2'
        >
          Create a new game
        </CreateGameDialog>
      </Text>
    </Box>
  )
}

function CreateGameDialog(props: Omit<LinkProps, 'onClick' | 'href'>) {
  const navigate = useNavigate()
  const toast = useToast()

  const { isOpen, onOpen, onClose } = useDisclosure()
  const [stake, setStake] = useState<string>('')

  const { address: account } = useAccount()
  const { data: balance } = useBalanceOf({ account })

  const isUnderflow = useMemo(() => {
    return Number(stake) <= 0
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

          navigate({ to: `/game/${data.result.address}` })
        },
      })
    },
    [mutate, toast, navigate],
  )

  return (
    <>
      <Link
        {...props}
        onClick={onOpen}
      />

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
                <CoinIcon
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
                    Minimum stake amount is 0.000 <CoinIcon />
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

function GamesTable(props: Omit<HTMLChakraProps<'form'>, 'children'>) {
  return <chakra.form {...props}></chakra.form>
}
