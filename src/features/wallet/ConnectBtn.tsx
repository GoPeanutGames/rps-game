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
          />
          <chakra.span fontFamily='monospace'>{displayAddress}</chakra.span>
        </>
      ) : (
        children
      )}
    </Button>
  )
}
