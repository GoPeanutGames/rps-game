import { formatEther } from 'viem'
import { useAccount } from 'wagmi'
import { Link } from '@tanstack/react-router'
import { MotionConfig, motion } from 'framer-motion'
import { Flex, FlexProps } from '@chakra-ui/react'
import { useBalanceOf } from '@lib/rps/factory'
import { RPSBalance } from '@design/RPSBalance'

export function PageHeader({
  appendLeft,
  appendRight,
  ...props
}: Omit<FlexProps, 'children'> & {
  appendLeft?: Children
  appendRight?: Children
}) {
  const { address: account } = useAccount()
  const { data: balance } = useBalanceOf({ account })

  return (
    <MotionConfig
      transition={{
        duration: 0.16,
        x: { type: 'spring', bounce: 0.64 },
      }}
      reducedMotion='user'
    >
      <Flex
        h='48px'
        gap='24px'
        justifyContent='space-between'
        alignItems='stretch'
        flexShrink='0'
        flexGrow='0'
        {...props}
      >
        <motion.div
          initial={{ x: -512 }}
          animate={{ x: 0 }}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 12,
          }}
        >
          {appendLeft}
        </motion.div>

        <motion.div
          initial={{ x: 512 }}
          animate={{ x: 0 }}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 12,
          }}
        >
          {appendRight}

          <Link to='/wallet'>
            <RPSBalance
              whileHover={{ scale: 1.06 }}
              iconProps={{ color: 'funky.500' }}
              balance={formatEther(balance || 0n)}
              cursor='pointer'
              my='2'
              ml='2'
            />
          </Link>
        </motion.div>
      </Flex>
    </MotionConfig>
  )
}
