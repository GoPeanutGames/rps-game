import { chakra } from '@chakra-ui/react'
import { motion } from 'framer-motion'
import bg from './bg.webp'
import rps from './rps.webp'
import robotLeft from './robotLeft.webp'
import robotRight from './robotRight.webp'

export function SplashScreen({ children }: { children?: Children }) {
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
        backgroundImage: `url(${bg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <motion.div
        initial={{ right: -650 }}
        animate={{ right: -100 }}
        exit={{ right: -800 }}
        style={{
          position: 'absolute',
          bottom: -100,
          width: 762,
          height: 863,
          background: `url(${robotRight})`,
        }}
      />

      <motion.div
        initial={{ left: -650 }}
        animate={{ left: -150 }}
        exit={{ left: -850 }}
        style={{
          position: 'absolute',
          bottom: -100,
          width: 857,
          height: 863,
          background: `url(${robotLeft})`,
        }}
      />

      <motion.div
        initial={{ top: -180 }}
        animate={{ top: 80 }}
        exit={{ top: -300 }}
        transition={{ duration: 0.32 }}
        style={{
          position: 'absolute',
          left: '50%',
          translateX: '-50%',
          width: 595,
          height: 281,
          background: `url(${rps})`,
        }}
      />

      <chakra.div
        w='fit-content'
        position='absolute'
        left='50%'
        bottom='16%'
        transform='translateX(-50%)'
      >
        {children}
      </chakra.div>
    </motion.div>
  )
}
