import { Flex, FlexProps } from '@chakra-ui/react'

export function PageContent(props: FlexProps) {
  return (
    <Flex
      h='100%'
      flexDir='column'
      justifyContent='center'
      alignItems='center'
      gap='24px'
      {...props}
    />
  )
}
