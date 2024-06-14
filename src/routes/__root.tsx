import { Outlet, createRootRoute } from '@tanstack/react-router'
import { useAccount } from 'wagmi'
import { AnimatePresence } from 'framer-motion'
import { useWeb3Modal } from '@web3modal/wagmi/react'
import { Button, Container, Flex, Text } from '@chakra-ui/react'
import { SplashScreen } from '@design/splash-screen/SplashScreen'
import { RPSRouterContext, RPSRouterProvider } from '@feat/rps/router'
import { RPSFactoryProvider } from '@feat/rps/factory'
import { RPSFreeProvider } from '@feat/rps/free'

export const Route = createRootRoute({
  component: Root,
})

const routerAddress = import.meta.env.VITE_RPS_ROUTER_ADDRESS
if (!routerAddress) {
  throw new Error('VITE_RPS_ROUTER_ADDRESS is not set')
}

function Root() {
  const { address: account } = useAccount()
  const { open } = useWeb3Modal()

  return (
    <Container
      maxW='container.xl'
      h='100vh'
      fontFamily='"Sora", serif'
      position='relative'
      display='flex'
      flexDir='column'
    >
      <AnimatePresence>
        {!account && (
          <SplashScreen>
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

      {account && (
        <RPSRouterProvider address={routerAddress}>
          <RPSRouterContext.Consumer>
            {({ factory }) => (
              <RPSFreeProvider address={factory}>
                <RPSFactoryProvider address={factory}>
                  <Outlet />
                </RPSFactoryProvider>
              </RPSFreeProvider>
            )}
          </RPSRouterContext.Consumer>
        </RPSRouterProvider>
      )}
    </Container>
  )
}
