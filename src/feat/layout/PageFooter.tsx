import { Flex, FlexProps } from '@chakra-ui/react'

export function PageFooter(props: FlexProps) {
  return (
    <Flex
      h='48px'
      flexShrink='0'
      flexGrow='0'
      {...props}
    />
  )
}
