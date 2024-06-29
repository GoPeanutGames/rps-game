import { useContext } from 'react'
import { RPSContext } from '@lib/rps'
import { useAddrToId, useStakes } from '@lib/rps/factory'
import {
  Flex,
  FlexProps,
  Link,
  Text,
  useClipboard,
  useToast,
} from '@chakra-ui/react'
import { formatEther } from 'viem'
import { CopyIcon } from '@design/icons/CopyIcon'
import { RPSIcon } from '@design/icons/RPSIcon'

export function GameInfo(props: Omit<FlexProps, 'children'>) {
  const { address: gameAddress } = useContext(RPSContext)
  const { data: gameId } = useAddrToId({ gameAddress })
  const { data: stakes, isLoading: isLoadingStakes } = useStakes({ gameId })

  const { onCopy } = useClipboard(gameAddress || '')
  const toast = useToast()

  return (
    <Flex
      flexDirection='column'
      gap='0px'
      {...props}
    >
      <Text
        textAlign='center'
        fontSize='sm'
      >
        <Link
          variant='funky'
          onClick={e => {
            e.preventDefault()
            e.stopPropagation()
            onCopy()
            toast({
              status: 'info',
              description: 'Game address is copied',
              isClosable: true,
              duration: 3200,
            })
          }}
        >
          {gameAddress} <CopyIcon />
        </Link>
      </Text>

      <Text
        textAlign='center'
        fontSize='sm'
      >
        Stakes: {isLoadingStakes ? 'loading...' : formatEther(stakes || 0n)}
        {!isLoadingStakes && <RPSIcon ml='1' />}
      </Text>
    </Flex>
  )
}
