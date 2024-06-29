import { motion } from 'framer-motion'
import { Container } from '@chakra-ui/react'

const MotionContainer = motion(Container)

export function PageContainer(props: Parameters<typeof MotionContainer>[0]) {
  return (
    <MotionContainer
      maxW='container.md'
      h='100vh'
      fontFamily='"Sora", serif'
      position='relative'
      display='flex'
      flexDir='column'
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.2 }}
      {...props}
    />
  )
}
