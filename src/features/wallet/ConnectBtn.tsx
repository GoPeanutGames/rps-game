import { chakra, Button, ButtonProps } from '@chakra-ui/react'
import { useWeb3Modal } from '@web3modal/wagmi/react'
import { useAccount } from 'wagmi'
import { useShortAddr } from '@utils/useShortAddr'
import { Avatar } from './Avatar'

export function ConnectBtn({
  children,
  ...props
}: Omit<ButtonProps, 'onClick'>) {
  const { open } = useWeb3Modal()
  const { address: account } = useAccount()

  const displayAddress = useShortAddr(account)

  return (
    <Button
      display='flex'
      gap='4'
      {...props}
      onClick={() => open()}
    >
      {account ? (
        <>
          <Avatar
            address={account}
            flexShrink='0'
            w={{ base: '20px', md: '32px' }}
            h={{ base: '20px', md: '32px' }}
          />
          <chakra.span
            display={{ base: 'none', md: 'block' }}
            fontFamily='monospace'
          >
            {displayAddress}
          </chakra.span>
        </>
      ) : (
        children
      )}
    </Button>
  )
}
