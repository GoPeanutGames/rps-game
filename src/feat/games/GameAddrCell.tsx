import { IconButton, chakra, useClipboard, useToast } from '@chakra-ui/react'
import { CopyIcon } from '@design/icons/CopyIcon'

export function GameAddrCell({ addr }: { addr: Address }) {
  const { onCopy } = useClipboard(addr)
  const toast = useToast()

  return (
    <chakra.span fontFamily='monospace'>
      {addr.slice(0, 8)}
      ..
      {addr.slice(-8)}
      <IconButton
        colorScheme='blue'
        aria-label='copy address'
        icon={<CopyIcon boxSize='3' />}
        size='xs'
        ml='3'
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
      />
    </chakra.span>
  )
}
