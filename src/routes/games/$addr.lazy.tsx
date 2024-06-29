import { Button } from '@chakra-ui/react'
import { createLazyFileRoute, useNavigate } from '@tanstack/react-router'
import { RPSProvider } from '@lib/rps'
import {
  PageContainer,
  PageContent,
  PageFooter,
  PageHeader,
} from '@feat/layout'
import { GameContainer } from '@feat/game/GameContainer'

export const Route = createLazyFileRoute('/games/$addr')({
  component: GamePage,
})

function GamePage() {
  const { addr } = Route.useParams()
  const navigate = useNavigate()

  return (
    <RPSProvider address={addr as Address}>
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
          <GameContainer />
        </PageContent>

        <PageFooter />
      </PageContainer>
    </RPSProvider>
  )
}
