import { Button, Text } from '@chakra-ui/react'
import { MyGamesTable } from '@feat/games/MyGamesTable'
import {
  PageContainer,
  PageContent,
  PageFooter,
  PageHeader,
} from '@feat/layout'
import { createLazyFileRoute, useNavigate } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/games/my')({
  component: MyGames,
})

function MyGames() {
  const navigate = useNavigate()

  return (
    <PageContainer>
      <PageHeader
        appendLeft={
          <Button
            size='sm'
            onClick={() => navigate({ to: '/games' })}
          >
            Back
          </Button>
        }
      />

      <PageContent>
        <Text my='4'>Your games</Text>
        <MyGamesTable h='86vh' />
      </PageContent>

      <PageFooter />
    </PageContainer>
  )
}
