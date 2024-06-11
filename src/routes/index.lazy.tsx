import { chakra, Flex, Text } from "@chakra-ui/react";
import { createLazyFileRoute } from "@tanstack/react-router";
import { motion } from 'framer-motion'
import human from '@design/human.webp'
import ai from '@design/ai.webp'

export const Route = createLazyFileRoute('/')({
  component: Home,
})

function Home() {
  return (
    <Flex
      flexDir='column'
      h='100%'
      justifyContent='center'
      gap='40px'
    >
      <Text textStyle='header' textAlign='center'>
        Select your opponent
      </Text>

      <Flex
        w='full'
        justifyContent='space-between'
        p='40px'
      >
        <Flex flexDir='column' gap='24px' alignItems='center'>
          <motion.div
            whileHover={{ boxShadow: '0 0 12px 24px rgba(255, 255, 120, 1)' }}
            style={{
              width: 240,
              height: 240,
              borderRadius: '50%',
              cursor: 'pointer',
              position: 'relative',
              overflow: 'visible',
            }}
          >
            <chakra.div
              width='280px'
              height='280px'
              display='block'
              position='relative'
              left='50%'
              top='50%'
              transform='translate(-50%, -50%)'
              background={`url(${human})`}
            />
          </motion.div>

          <Text textStyle='label'>
            Human
          </Text>
        </Flex>

        <Flex flexDir='column' gap='24px' alignItems='center'>
          <motion.div
            whileHover={{ boxShadow: '0 0 12px 24px rgba(120, 255, 120, 1)' }}
            style={{
              width: 240,
              height: 240,
              borderRadius: '50%',
              cursor: 'pointer',
              position: 'relative',
              overflow: 'visible',
            }}
          >
            <chakra.div
              width='280px'
              height='280px'
              display='block'
              position='relative'
              left='50%'
              top='50%'
              transform='translate(-50%, -50%)'
              background={`url(${ai})`}
            />
          </motion.div>

          <Text textStyle='label'>
            Computer
          </Text>
        </Flex>
      </Flex>

      <Text textStyle='note' textAlign='center'>
        Choose <b>Human</b> to play with another player or choose <b>Computer</b> to fight with a PC, betting your <b>$PRS</b>.
      </Text>
    </Flex>
  )
}
