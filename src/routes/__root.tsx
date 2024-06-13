import { Outlet, createRootRoute } from '@tanstack/react-router'
import { useAccount } from 'wagmi'
import { AnimatePresence } from 'framer-motion'
import { useWeb3Modal } from '@web3modal/wagmi/react'
import { Button, Container, Flex, Text } from '@chakra-ui/react'
import { SplashScreen } from '@design/splash-screen/SplashScreen'

export const Route = createRootRoute({
  component: Root,
})

function Root() {
  const { address: account } = useAccount()
  const { open } = useWeb3Modal()

  return (
    <Container
      w='container.xl'
      h='100vh'
      fontFamily='"Sora", serif'
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

      {account && <Outlet />}
    </Container>
  )
}
