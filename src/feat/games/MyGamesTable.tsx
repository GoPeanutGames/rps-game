import { useCallback, useMemo } from 'react'
import { formatEther } from 'viem'
import { useNavigate } from '@tanstack/react-router'
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table'
import {
  Progress,
  Table,
  TableContainer,
  TableContainerProps,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react'
import { Game } from '@lib/rps/types'
import { GameAddrCell } from './GameAddrCell'
import { useFetchGamesByPlayer } from '@lib/rps/router'
import { useAccount } from 'wagmi'

const columnHelper = createColumnHelper<Game>()
const columns = [
  columnHelper.accessor('id', {
    header: 'ID',
    cell: ({ row }) => row.original.id.toString(),
    size: 48,
  }),
  columnHelper.accessor('addr', {
    header: 'Address',
    cell: ({ row }) => <GameAddrCell addr={row.original.addr} />,
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

export function MyGamesTable(props: Omit<TableContainerProps, 'children'>) {
  const navigate = useNavigate({ from: '/games/my' })

  const { address: account } = useAccount()

  const { data, fetchNextPage, isLoading, isFetching } = useFetchGamesByPlayer({
    playerAddr: account,
    perPage: 20,
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
      {(isFetching || isLoading) && (
        <Progress
          hasStripe
          size='sm'
          isIndeterminate
          position='sticky'
          top='41px'
        />
      )}

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
              onClick={() => navigate({ to: `/games/${row.original.addr}` })}
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
