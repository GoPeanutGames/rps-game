import { useContext } from 'react'
import { createLazyFileRoute, useNavigate } from '@tanstack/react-router'
import { Button } from '@chakra-ui/react'
import {
  PageContainer,
  PageContent,
  PageFooter,
  PageHeader,
} from '@feat/layout'
import { FreePlayBody } from '@feat/free-play/FreePlayBody'
import { RPSRouterContext } from '@lib/rps/router'
import { RPSFreeProvider } from '@lib/rps/free'

export const Route = createLazyFileRoute('/freeplay')({
  component: FreePlay,
})

function FreePlay() {
  const { factory } = useContext(RPSRouterContext)

  const navigate = useNavigate({ from: '/freeplay' })

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
        <RPSFreeProvider address={factory}>
          <FreePlayBody />
        </RPSFreeProvider>
      </PageContent>

      <PageFooter />
    </PageContainer>
  )
}
