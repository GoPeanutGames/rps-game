import {
  Card,
  CardHeader,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from '@chakra-ui/react'
import { DepositDialog } from './DepositDialog'

export function UserBalanceScreen() {
  return (
    <Card variant='funky'>
      <Tabs
        isFitted
        colorScheme='black'
      >
        <TabList>
          <Tab>Deposit</Tab>
          <Tab>Withdraw</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <DepositDialog />
          </TabPanel>
          <TabPanel>
            <CardHeader>Select amount to withdraw</CardHeader>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Card>
  )
}
