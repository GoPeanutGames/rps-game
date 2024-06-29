import { createLazyFileRoute, useNavigate } from '@tanstack/react-router'
import {
  PageContainer,
  PageContent,
  PageFooter,
  PageHeader,
} from '@feat/layout'
import { Button } from '@chakra-ui/react'
import { GamesHelper } from '@feat/games/GamesHelper'
import { GamesTable } from '@feat/games/GamesTable'

export const Route = createLazyFileRoute('/games/')({
  component: GamesIndex,
})

function GamesIndex() {
  const navigate = useNavigate()

  return (
    <PageContainer>
      <PageHeader
        appendLeft={
          <Button
            size='sm'
            onClick={() => navigate({ to: '/' })}
          >
            Back
          </Button>
        }
      />

      <PageContent>
        <GamesHelper my='4' />
        <GamesTable h='72vh' />
      </PageContent>

      <PageFooter />
    </PageContainer>
  )
}
