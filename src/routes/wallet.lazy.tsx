import { useContext } from 'react'
import { createLazyFileRoute, useRouter } from '@tanstack/react-router'
import { RPSFactoryContext } from '@lib/rps/factory'
import { ERC20Provider } from '@lib/erc20'
import { Button } from '@chakra-ui/react'
import {
  PageContainer,
  PageContent,
  PageFooter,
  PageHeader,
} from '@feat/layout'
import { WalletBody } from '@feat/wallet'

export const Route = createLazyFileRoute('/wallet')({
  component: Wallet,
})

function Wallet() {
  const { history } = useRouter()
  const { source } = useContext(RPSFactoryContext)

  return (
    <ERC20Provider address={source}>
      <PageContainer>
        <PageHeader
          appendLeft={
            <Button
              size='sm'
              onClick={() => history.back()}
            >
              Back
            </Button>
          }
        />

        <PageContent>
          <WalletBody />
        </PageContent>

        <PageFooter />
      </PageContainer>
    </ERC20Provider>
  )
}
