import { useCallback, useContext, useMemo, useState } from 'react'
import { createLazyFileRoute, useNavigate } from '@tanstack/react-router'
import { useQueryClient } from '@tanstack/react-query'
import { useAccount } from 'wagmi'
import { formatEther, parseEther } from 'viem'
import {
  Alert,
  AlertDescription,
  AlertIcon,
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  Input,
  InputGroup,
  InputLeftAddon,
  InputRightAddon,
  Link,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  useToast,
} from '@chakra-ui/react'
import { useBalanceOf } from '@feat/rps/factory/useBalanceOf'
import { RPSFactoryContext } from '@feat/rps/factory'
import {
  ERC20Context,
  ERC20Provider,
  useAllowance,
  useApprove,
  useBalanceOf as useERC20Balance,
  useSymbol,
} from '@feat/erc20'
import { CoinBalance } from '@design/CoinBalance'
import { CoinIcon } from '@design/CoinIcon'
import { useDeposit } from '@feat/rps/factory/useDeposit'

export const Route = createLazyFileRoute('/wallet')({
  component: Wallet,
})

function Wallet() {
  return (
    <RPSFactoryContext.Consumer>
      {({ source }) => (
        <ERC20Provider address={source}>
          <Box
            flex='0 0 48px'
            h='48px'
            py='2'
            display='flex'
            justifyContent='space-between'
            sx={{ position: 'relative' }}
          >
            <WalletHeader />
          </Box>

          <Box
            flex='1 1 100%'
            display='flex'
            flexDir='column'
            alignItems='center'
            justifyContent='center'
          >
            <WalletBody />
          </Box>

          <Box
            h='48px'
            flex='1 1 48px'
          />
        </ERC20Provider>
      )}
    </RPSFactoryContext.Consumer>
  )
}

function WalletBody() {
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
          Current balance of <CoinIcon /> tokens: {formatEther(balance || 0n)}
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
          The <CoinIcon color='black' /> token is a direct derivative of the{' '}
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

function WalletDeposit() {
  const { address: account } = useAccount()
  const { address: rpsAddress } = useContext(RPSFactoryContext)
  const { address: erc20Address } = useContext(ERC20Context)

  const { data: symbol } = useSymbol()
  const { data: erc20balance } = useERC20Balance({ account })
  const { data: allowance } = useAllowance({
    owner: account,
    spender: rpsAddress,
  })

  const [amountIn, setAmountIn] = useState<string>('')

  const isUnderflow = useMemo(() => {
    return Number(amountIn) < 0.0001
  }, [amountIn])

  const isOverflow = useMemo(() => {
    return (erc20balance || 0n) < parseEther(amountIn)
  }, [amountIn, erc20balance])

  const isInvalid = useMemo(() => {
    return isUnderflow || isOverflow
  }, [isUnderflow, isOverflow])

  const queryClient = useQueryClient()
  const toast = useToast()

  const { mutate: approveMutate, isPending: isApproving } = useApprove()

  const approve = useCallback(
    (payload: Parameters<typeof approveMutate>[0]) => {
      approveMutate(payload, {
        onSuccess: () =>
          toast({
            status: 'success',
            title: 'Approved succesfully',
            description: 'The spending is approved succesfully',
            isClosable: true,
            duration: 3_600,
          }),
        onError: error =>
          toast({
            status: 'error',
            title: 'Failed to approve',
            description: error.message,
            isClosable: true,
            duration: 15_000,
          }),
      })
    },
    [toast, approveMutate],
  )

  const { mutate: depositMutate, isPending: isDepositing } = useDeposit()

  const deposit = useCallback(
    (payload: Parameters<typeof depositMutate>[0]) => {
      depositMutate(payload, {
        onSuccess: () => {
          // This resets both the `balanceOf` and `allowance`
          queryClient.invalidateQueries({
            queryKey: [
              'readContract',
              {
                address: erc20Address,
                args: [account],
              },
            ],
          })

          toast({
            status: 'success',
            title: 'Deposited succesfully',
            description: 'Funds are succesfully deposited',
            isClosable: true,
            duration: 3_600,
          })
        },
        onError: error =>
          toast({
            status: 'error',
            title: 'Failed to deposit',
            description: error.message,
            isClosable: true,
            duration: 15_000,
          }),
      })
    },
    [queryClient, toast, depositMutate, erc20Address, account],
  )

  return (
    <Box
      display='flex'
      flexDir='column'
      gap='4'
    >
      <InputGroup>
        <InputLeftAddon fontFamily='monospace'>FROM</InputLeftAddon>
        <Input
          bg='white'
          value={amountIn}
          onChange={e => {
            const { value } = e.target
            if (!/^\d*\.?\d*$/.test(value)) return
            setAmountIn(value)
          }}
        />
        <InputRightAddon>{symbol}</InputRightAddon>
      </InputGroup>

      <Text
        _hover={{ color: 'funky.500' }}
        transition='.32s ease'
        mt='-2'
        fontSize='xs'
        textAlign='right'
        cursor='pointer'
        onClick={() => erc20balance && setAmountIn(formatEther(erc20balance))}
      >
        Available: {formatEther(erc20balance || 0n)}
      </Text>

      <InputGroup>
        <InputLeftAddon fontFamily='monospace'>&ensp;&ensp;TO</InputLeftAddon>
        <Input
          bg='white'
          value={amountIn}
          isDisabled
        />
        <InputRightAddon>
          <CoinIcon
            boxSize='6'
            mr='27.5px'
          />
        </InputRightAddon>
      </InputGroup>

      {(allowance || 0n) < parseEther(amountIn) && (
        <Button
          isLoading={isApproving}
          isDisabled={isInvalid}
          onClick={() =>
            rpsAddress &&
            approve({ spender: rpsAddress, value: parseEther(amountIn) })
          }
        >
          Approve
        </Button>
      )}

      {(allowance || 0n) >= parseEther(amountIn) && (
        <Button
          isLoading={isDepositing}
          isDisabled={isInvalid}
          onClick={() => deposit({ value: parseEther(amountIn) })}
        >
          Deposit
        </Button>
      )}

      <Box h='48px'>
        {Number(amountIn) > 0 && isUnderflow && (
          <Alert status='error'>
            <AlertIcon />
            <AlertDescription>
              Minimum amount to deposit is 0.0001 {symbol}
            </AlertDescription>
          </Alert>
        )}

        {isOverflow && (
          <Alert status='error'>
            <AlertIcon />
            <AlertDescription>Insufficient balance</AlertDescription>
          </Alert>
        )}
      </Box>
    </Box>
  )
}

function WalletWithdraw() {
  return <div>Withdrawal</div>
}

function WalletHeader() {
  const navigate = useNavigate({ from: '/wallet' })

  const { address: account } = useAccount()
  const { data: balance } = useBalanceOf({ account })

  return (
    <>
      <Button
        size='sm'
        onClick={() => navigate({ to: '/' })}
      >
        Back
      </Button>

      <CoinBalance
        iconProps={{
          color: 'funky.500',
        }}
        sx={{
          position: 'absolute',
          right: 0,
        }}
        balance={formatEther(balance || 0n)}
      />
    </>
  )
}
