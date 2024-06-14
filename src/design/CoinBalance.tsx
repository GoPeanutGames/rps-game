import { Box, Text } from '@chakra-ui/react'
import { motion } from 'framer-motion'
import { CoinIcon } from './CoinIcon'

const MotionBox = motion(Box)

type ChakraBoxProps = Parameters<typeof MotionBox>[0]

export function CoinBalance({
  balance,
  iconProps,
  ...props
}: Omit<ChakraBoxProps, 'children'> & {
  iconProps?: Parameters<typeof CoinIcon>[0]
  balance?: string
}) {
  return (
    <MotionBox
      display='flex'
      flexFlow='row nowrap'
      alignItems='center'
      borderRadius='18px'
      bgGradient='linear(to-b, #00000064, #ffffff56)'
      sx={{
        position: 'relative',
      }}
      {...props}
    >
      <Box
        sx={{ position: 'absolute' }}
        top='2px'
        left='3px'
        right='3px'
        bottom='2px'
        borderRadius='16px'
        bgGradient='linear(to-b, #010f38, #233966)'
      />
      <CoinIcon
        {...iconProps}
        boxSize={10}
        m='-4px'
        position='relative'
      />
      <Text
        position='relative'
        w='fit-content'
        py='1'
        px='8'
        lineHeight='1'
        fontFamily='Chivo'
        fontSize='xl'
        letterSpacing='-0.2px'
      >
        {balance}
      </Text>
    </MotionBox>
  )
}
