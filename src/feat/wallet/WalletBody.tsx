import { useContext } from 'react'
import { useAccount } from 'wagmi'
import {
  ERC20Context,
  useSymbol,
  useBalanceOf as useERC20Balance,
} from '@lib/erc20'
import { useBalanceOf } from '@lib/rps/factory'
import {
  Card,
  CardBody,
  CardHeader,
  Link,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from '@chakra-ui/react'
import { RPSIcon } from '@design/icons/RPSIcon'
import { formatEther } from 'viem'
import { WalletDeposit } from './WalletDeposit'
import { WalletWithdraw } from './WalletWithdraw'

export function WalletBody() {
  const { address: account } = useAccount()
  const { address: erc20Address } = useContext(ERC20Context)

  const { data: symbol } = useSymbol()
  const { data: erc20balance } = useERC20Balance({ account })

  const { data: balance } = useBalanceOf({ account })

  return (
    <Card
      variant='funky'
      w='560px'
    >
      <CardHeader>Wallet</CardHeader>

      <CardBody
        px='16'
        fontSize='sm'
      >
        <Text>
          Current balance of <RPSIcon /> tokens: {formatEther(balance || 0n)}
        </Text>

        <Text>
          Current balance of&nbsp;
          <Link
            variant='funky'
            href={`https://blastexplorer.io/address/${erc20Address}`}
          >
            {symbol}
          </Link>
          &nbsp;tokens: {formatEther(erc20balance || 0n)}
        </Text>

        <Text
          variant='help'
          my='4'
        >
          The <RPSIcon color='black' /> token is a direct derivative of the{' '}
          {symbol} token and can&apos;t be directly transferred nor traded.
        </Text>

        <Tabs
          colorScheme='funky'
          size='sm'
          isFitted
        >
          <TabList>
            <Tab>Deposit</Tab>
            <Tab>Withdraw</Tab>
          </TabList>

          <TabPanels>
            <TabPanel>
              <WalletDeposit />
            </TabPanel>
            <TabPanel>
              <WalletWithdraw />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </CardBody>
    </Card>
  )
}
