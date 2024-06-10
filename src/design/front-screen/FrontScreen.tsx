import { Box, Flex, Img, useBreakpointValue } from '@chakra-ui/react'
import { motion } from 'framer-motion'
import rps from './rps.webp'
import robotLeft from './robotLeft.webp'
import robotRight from './robotRight.webp'

export function FrontScreen({ children }: { children?: Children }) {
  const rightAnim = useBreakpointValue({
    base: { scale: 0.6, bottom: -100, right: -120 },
    sm: { scale: 0.8, bottom: -100, right: -100 },
    md: { scale: 1.1, bottom: -30, right: -30 },
    lg: { scale: 1.7, bottom: 100, right: 100 },
  })

  const leftAnim = useBreakpointValue({
    base: { scale: 0.65, bottom: 150, left: -120 },
    sm: { scale: 0.8, bottom: 150, left: -100 },
    md: { scale: 1.2, bottom: 0, left: 0 },
    lg: { scale: 1.8, bottom: 100, left: 100 },
  })

  return (
    <motion.div
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.62 }}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        overflow: 'hidden',
        backgroundImage: 'url("/bg.webp")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <motion.div
        initial={{ right: -500, bottom: 500 }}
        animate={rightAnim}
        transition={{ duration: 0.62 }}
        style={{ position: 'absolute' }}
      >
        <Img
          src={robotRight}
          w='400px'
        />
      </motion.div>

      <motion.div
        initial={{ left: -500, bottom: -500 }}
        animate={leftAnim}
        transition={{ duration: 0.62 }}
        style={{ position: 'absolute' }}
      >
        <Img
          src={robotLeft}
          w='400px'
        />
      </motion.div>

      <Flex
        w='100%'
        h='100%'
        flexDir='column'
        justify='center'
        align='center'
        position='relative'
      >
        <Box flex='0 1 120px' />
        <motion.div
          initial={{ y: -500 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.32 }}
        >
          <Img src={rps} />
        </motion.div>
        <Box flex='1 1 100%' />
        {children}
        <Box flex='0 1 320px' />
      </Flex>
    </motion.div>
  )
}
