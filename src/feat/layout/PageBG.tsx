import { Flex, FlexProps } from '@chakra-ui/react'

export function PageBG(props: FlexProps) {
  return (
    <Flex
      w='100vw'
      h='100vh'
      overflow='hidden'
      {...props}
    />
  )
}
