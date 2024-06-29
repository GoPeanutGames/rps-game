import { Outlet, createRootRoute } from '@tanstack/react-router'
import { useAccount } from 'wagmi'
import { useWeb3Modal } from '@web3modal/wagmi/react'
import { Button, Flex, Text } from '@chakra-ui/react'
import { AnimatePresence, MotionConfig } from 'framer-motion'
import { SplashScreen } from '@design/SplashScreen'
import { PageBG } from '@feat/layout/PageBG'

export const Route = createRootRoute({
  component: Root,
})

function Root() {
  const { address: account } = useAccount()
  const { open } = useWeb3Modal()

  return (
    <MotionConfig
      transition={{ duration: 0.32 }}
      reducedMotion='user'
    >
      <PageBG>
        <AnimatePresence>
          {account ? (
            <Outlet />
          ) : (
            <SplashScreen key='splash'>
              <Flex
                flexDir='column'
                gap='2'
              >
                <Button onClick={() => open()}>Connect</Button>
                <Text fontStyle='italic'>Connect your wallet to start</Text>
              </Flex>
            </SplashScreen>
          )}
        </AnimatePresence>
      </PageBG>
    </MotionConfig>
  )
}
