import { useCallback, useContext, useMemo, useState } from 'react'
import { formatEther, parseEther } from 'viem'
import { useAccount } from 'wagmi'
import { useQueryClient } from '@tanstack/react-query'
import {
  Alert,
  AlertDescription,
  AlertIcon,
  Box,
  Button,
  Input,
  InputGroup,
  InputLeftAddon,
  InputRightAddon,
  Text,
  useToast,
} from '@chakra-ui/react'
import { RPSFactoryContext, useDeposit } from '@lib/rps/factory'
import {
  ERC20Context,
  useAllowance,
  useSymbol,
  useBalanceOf as useERC20Balance,
  useApprove,
} from '@lib/erc20'
import { RPSIcon } from '@design/icons/RPSIcon'

export function WalletDeposit() {
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
        <InputRightAddon>
          <Text
            as='span'
            w='80px'
          >
            {symbol}
          </Text>
        </InputRightAddon>
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
          <Text
            as='span'
            w='80px'
          >
            <RPSIcon boxSize='6' />
          </Text>
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
