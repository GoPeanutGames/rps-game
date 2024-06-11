import { useEffect, useMemo, useState } from 'react'
import { formatEther, parseEther } from 'viem'
import { useAccount } from 'wagmi'
import {
  Button,
  CardBody,
  CardFooter,
  CardHeader,
  Flex,
  Input,
  InputGroup,
  InputRightAddon,
  Text,
  useToast,
} from '@chakra-ui/react'
import { useSourceBalance } from '@feat/rps/useSourceBalance'
import { useBalanceOf } from '@feat/rps/useBalanceOf'
import { useDeposit } from '@feat/rps/useDeposit'
import { useRPS } from '@feat/rps/useRPS'
import { useAllowance } from '@feat/erc20/useAllowance'
import { useApprove } from '@feat/erc20/useApprove'

export function DepositDialog() {
  const toast = useToast()
  const { address: rpsAddress, sourceAddress } = useRPS()
  const { address: account } = useAccount()

  const { data: balance } = useBalanceOf(account)
  const { data: sourceBalance } = useSourceBalance(account)

  const { data: allowance } = useAllowance({
    address: sourceAddress,
    owner: account,
    spender: rpsAddress,
  })

  const [amount, setAmount] = useState<string>('')

  const isUnderflow = useMemo(() => {
    return Number(amount) < 0.0001
  }, [amount])

  const isInsufficientBalance = useMemo(() => {
    if (!sourceBalance) return true
    return parseEther(amount) > sourceBalance
  }, [amount, sourceBalance])

  const isInvalid = useMemo(() => {
    return isUnderflow || isInsufficientBalance
  }, [isUnderflow, isInsufficientBalance])

  const {
    write: approve,
    error: approveError,
    isPending: isApproving,
  } = useApprove({ address: sourceAddress })

  useEffect(() => {
    if (!approveError) return
    toast({
      title: 'Approve failed',
      description: approveError.toString(),
      status: 'error',
      duration: 9000,
      isClosable: true,
    })
  }, [toast, approveError])

  const {
    data: receipt,
    write: deposit,
    writeError: depositError,
    isLoading: isDepositing,
  } = useDeposit()

  useEffect(() => {
    if (!depositError) return
    toast({
      title: 'Deposit failed',
      description: depositError.toString(),
      status: 'error',
      duration: 9000,
      isClosable: true,
    })
  }, [toast, depositError])

  useEffect(() => {
    if (!receipt) return
    toast({
      title: 'Deposited',
      description: 'Funds were deposited succesfully',
      status: 'success',
      duration: 9000,
      isClosable: true,
    })
  }, [toast, receipt])

  return (
    <>
      <CardHeader>Select amount to deposit</CardHeader>

      <CardBody>
        <Text pb='4'>Current balance: {formatEther(balance || 0n)} $RPS</Text>

        <InputGroup>
          <Input
            type='number'
            bg='white'
            value={amount}
            onChange={e => {
              const { value } = e.target
              if (!/^\d*\.?\d*$/.test(value)) return
              setAmount(value)
            }}
            isInvalid={isInvalid}
          />
          <InputRightAddon>$DNUTZ</InputRightAddon>
        </InputGroup>

        <Text
          pt='4'
          textAlign='right'
        >
          Available {formatEther(sourceBalance || 0n)} $DNUTZ
        </Text>
      </CardBody>

      <CardFooter>
        <Flex
          flexDir='column'
          alignItems='center'
          gap='2'
        >
          {(allowance || 0n) >= parseEther(amount) ? (
            <Button
              onClick={() => deposit(parseEther(amount))}
              isDisabled={isInvalid}
              isLoading={isDepositing}
            >
              Deposit
            </Button>
          ) : (
            <Button
              onClick={() =>
                approve({ spender: rpsAddress, value: parseEther(amount) })
              }
              isDisabled={isInvalid}
              isLoading={isApproving}
            >
              Approve
            </Button>
          )}

          {isInsufficientBalance && (
            <Text
              color='tomato'
              fontStyle='italic'
              fontSize='small'
            >
              Current $DNUTZ balance is insufficient
            </Text>
          )}

          {isUnderflow && (
            <Text
              color='tomato'
              fontStyle='italic'
              fontSize='small'
            >
              Minimum amount is 0.0001 $DNUTZ
            </Text>
          )}
        </Flex>
      </CardFooter>
    </>
  )
}
