import { Box, Flex, Img } from '@chakra-ui/react'
import { motion } from 'framer-motion'
import rps from './rps.webp'
import robotLeft from './robotLeft.webp'
import robotRight from './robotRight.webp'

export function FrontScreen({ children }: { children?: Children }) {
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
        initial={{ right: -650, bottom: -280, rotate: 10 }}
        animate={{ right: -100, bottom: -120, rotate: 0 }}
        transition={{ duration: 0.62 }}
        style={{ position: 'absolute' }}
      >
        <Img src={robotRight} />
      </motion.div>

      <motion.div
        initial={{ x: -650, bottom: -230, rotate: -10 }}
        animate={{ x: -100, bottom: -100, rotate: 0 }}
        transition={{ duration: 0.62 }}
        style={{ position: 'absolute' }}
      >
        <Img src={robotLeft} />
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
