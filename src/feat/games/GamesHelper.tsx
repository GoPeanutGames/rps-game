import { Link as Nav } from '@tanstack/react-router'
import { Box, BoxProps, Link, Text } from '@chakra-ui/react'
import { CreateGameDialog } from './CreateGameDialog'

export function GamesHelper(props: Omit<BoxProps, 'children'>) {
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
        <Nav to='/games/my'>
          <Link
            variant='funky'
            pl='2'
            as='span'
          >
            Search your games
          </Link>
        </Nav>
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
          trigger={
            <Link
              variant='funky'
              pl='2'
            >
              Create a new game
            </Link>
          }
        />
      </Text>
    </Box>
  )
}
