import {
  Outlet,
  createLazyFileRoute,
  useNavigate,
} from '@tanstack/react-router'
import { useAccount } from 'wagmi'
import { Box, Button } from '@chakra-ui/react'
import { motion } from 'framer-motion'
import { useBalanceOf } from '@feat/rps/factory'
import { CoinBalance } from '@design/CoinBalance'
import { formatEther } from 'viem'

export const Route = createLazyFileRoute('/game')({
  component: GameRoot,
})

function GameRoot() {
  const navigate = useNavigate({ from: '/game' })

  const { address: account } = useAccount()
  const { data: balance } = useBalanceOf({ account })

  return (
    <>
      <Button
        size='sm'
        position='absolute'
        top='0'
        left='0'
        my='2'
        mx='4'
        onClick={() => navigate({ to: '/' })}
      >
        Home
      </Button>

      <CoinBalance
        as={motion.div}
        whileHover={{ scale: 1.1 }}
        iconProps={{
          color: 'funky.500',
        }}
        sx={{
          position: 'absolute',
          right: 0,
          top: 0,
          my: 2,
          mx: 4,
          cursor: 'pointer',
        }}
        balance={formatEther(balance || 0n)}
        onClick={() => navigate({ to: '/wallet' })}
      />

      <Box
        h='100%'
        w='100%'
        pt='48px'
        pb='32px'
      >
        <Outlet />
      </Box>
    </>
  )
}
