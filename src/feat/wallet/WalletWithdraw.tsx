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
import { useBalanceOf, useSplitFee, useWithdraw } from '@lib/rps/factory'
import { ERC20Context, useSymbol } from '@lib/erc20'
import { RPSIcon } from '@design/icons/RPSIcon'

export function WalletWithdraw() {
  const { address: account } = useAccount()
  const { address: erc20Address } = useContext(ERC20Context)

  const { data: balance } = useBalanceOf({ account })
  const { data: symbol } = useSymbol()

  const [amountIn, setAmountIn] = useState<string>('')

  const isOverflow = useMemo(() => {
    return (balance || 0n) < parseEther(amountIn)
  }, [amountIn, balance])

  const isInvalid = useMemo(() => {
    return isOverflow
  }, [isOverflow])

  const { data: split } = useSplitFee({ value: parseEther(amountIn) })

  const queryClient = useQueryClient()
  const toast = useToast()

  const { mutate: withdrawMutate, isPending: isWithdrawing } = useWithdraw()

  const withdraw = useCallback(
    (payload: Parameters<typeof withdrawMutate>[0]) => {
      withdrawMutate(payload, {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: [
              'readContract',
              {
                address: erc20Address,
                functionName: 'balanceOf',
                args: [account],
              },
            ],
          })

          toast({
            status: 'success',
            title: 'Withdrawn succesfully',
            description: 'Funds are succesfully withdrawn',
            isClosable: true,
            duration: 3_600,
          })
        },
        onError: error =>
          toast({
            status: 'error',
            title: 'Failed to withdraw',
            description: error.message,
            isClosable: true,
            duration: 15_000,
          }),
      })
    },
    [queryClient, toast, withdrawMutate, erc20Address, account],
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
            <RPSIcon boxSize='6' />
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
        onClick={() => balance && setAmountIn(formatEther(balance))}
      >
        Available: {formatEther(balance || 0n)}
      </Text>

      <InputGroup>
        <InputLeftAddon fontFamily='monospace'>&ensp;&ensp;TO</InputLeftAddon>
        <Input
          bg='white'
          value={formatEther(split?.[1] || 0n)}
          isDisabled
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
      >
        Protocol fee: {formatEther(split?.[0] || 0n)}
      </Text>

      <Button
        isLoading={isWithdrawing}
        isDisabled={isInvalid}
        onClick={() => withdraw({ value: parseEther(amountIn) })}
      >
        Withdraw
      </Button>

      <Box h='48px'>
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
