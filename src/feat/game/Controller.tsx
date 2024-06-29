import { forwardRef } from 'react'
import { useAccount } from 'wagmi'
import { motion, HTMLMotionProps } from 'framer-motion'
import { Text } from '@chakra-ui/react'
import { RPSInput } from '@design/RPSInput'
import { useShortAddr } from '@utils/useShortAddr'

interface PlayerProps extends Omit<HTMLMotionProps<'div'>, 'children'> {}

export const Controller = forwardRef<HTMLDivElement, PlayerProps>(
  function Controller({ style, ...props }, ref) {
    const { address: account } = useAccount()

    const displayAddr = useShortAddr(account)

    return (
      <motion.div
        initial={{ opacity: 0, scale: 1.24 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 1.24 }}
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
          ...style,
        }}
        {...props}
        ref={ref}
      >
        <RPSInput />

        <Text
          textStyle='note'
          w='fit-content'
          height='24px'
        >
          {displayAddr} (You)
        </Text>
      </motion.div>
    )
  },
)
