import { useCallback, useMemo, useState } from 'react'
import { formatEther, parseEther } from 'viem'
import { useAccount } from 'wagmi'
import { createLazyFileRoute, useNavigate } from '@tanstack/react-router'
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table'
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
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  IconButton,
  useClipboard,
  Progress,
} from '@chakra-ui/react'
import { CoinIcon } from '@design/CoinIcon'
import { useBalanceOf, useGameCreate } from '@feat/rps/factory'
import { useFetchOpenGames } from '@feat/rps/router/useFetchOpenGames'
import { Game } from '@feat/rps/types'
import { CopyIcon } from '@design/icons/CopyIcon'

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
                    Minimum stake amount is 0.000000000000000001 <CoinIcon />
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

const columnHelper = createColumnHelper<Game>()
const columns = [
  columnHelper.accessor('id', {
    header: 'ID',
    cell: ({ row }) => row.original.id.toString(),
    size: 48,
  }),
  columnHelper.accessor('addr', {
    header: 'Address',
    cell: ({ row }) => <GameAddressCell addr={row.original.addr} />,
    size: 260,
  }),
  columnHelper.accessor('stakes', {
    header: 'Stakes',
    cell: ({ row }) => formatEther(row.original.stakes),
    size: 300,
  }),
  columnHelper.accessor('numPlayers', {
    header: 'Players',
    cell: ({ row }) => `${row.original.numPlayers} / 2`,
    size: 100,
  }),
]

function GameAddressCell({ addr }: { addr: Address }) {
  const { onCopy } = useClipboard(addr)
  const toast = useToast()

  return (
    <chakra.span fontFamily='monospace'>
      {addr.slice(0, 8)}
      ..
      {addr.slice(-8)}
      <IconButton
        colorScheme='blue'
        aria-label='copy address'
        icon={<CopyIcon boxSize='3' />}
        size='xs'
        ml='3'
        onClick={e => {
          e.preventDefault()
          e.stopPropagation()
          onCopy()
          toast({
            status: 'info',
            description: 'Game address is copied',
            isClosable: true,
            duration: 3200,
          })
        }}
      />
    </chakra.span>
  )
}

function GamesTable(props: Omit<HTMLChakraProps<'div'>, 'children'>) {
  const navigate = useNavigate({ from: '/game' })

  const { data, fetchNextPage, isFetching } = useFetchOpenGames({
    perPage: 12,
  })

  const games = useMemo(() => {
    return data?.pages?.flatMap(page => page.games) || []
  }, [data])

  const hasMore = useMemo(() => {
    if (!data) return true
    return data.pages[data.pages.length - 1].hasMore
  }, [data])

  const table = useReactTable({
    data: games,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  const onContainerScroll = useCallback(
    (el: HTMLDivElement) => {
      const { scrollHeight, scrollTop, clientHeight } = el
      if (
        scrollHeight - scrollTop - clientHeight < 10 &&
        !isFetching &&
        hasMore
      ) {
        fetchNextPage()
      }
    },
    [fetchNextPage, isFetching, hasMore],
  )

  return (
    <TableContainer
      position='relative'
      overflowY='auto'
      {...props}
      onScroll={e => onContainerScroll(e.target as HTMLDivElement)}
    >
      <Table
        display='grid'
        variant='striped'
        width='100%'
      >
        <Thead
          display='grid'
          position='sticky'
          top='0'
          zIndex='1'
        >
          {table.getHeaderGroups().map(hg => (
            <Tr
              key={hg.id}
              display='flex'
              w='100%'
              bg='var(--chakra-colors-chakra-body-bg)'
            >
              {hg.headers.map(h => (
                <Th
                  key={h.id}
                  display='flex'
                  w={`${h.getSize()}px`}
                >
                  {flexRender(h.column.columnDef.header, h.getContext())}
                </Th>
              ))}
            </Tr>
          ))}
          {isFetching && (
            <Progress
              hasStripe
              size='sm'
              isIndeterminate
            />
          )}
        </Thead>

        <Tbody>
          {table.getRowModel().rows.map(row => (
            <Tr
              key={row.id}
              width='100%'
              display='flex'
              cursor='pointer'
              _hover={{
                td: {
                  color: 'funky.500',
                },
              }}
              onClick={() => navigate({ to: `/game/${row.original.addr}` })}
            >
              {row.getVisibleCells().map(cell => (
                <Td
                  key={cell.id}
                  display='flex'
                  w={`${cell.column.getSize()}px`}
                  transition='0.18s ease'
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </Td>
              ))}
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  )
}
