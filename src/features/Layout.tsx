import { useAccount } from 'wagmi'
import { AnimatePresence } from 'framer-motion'
import { Container, Flex, Text } from '@chakra-ui/react'
import { ConnectBtn } from '@feat/wallet/ConnectBtn'
import { FrontScreen } from '@design/front-screen/FrontScreen'

export function Layout({ children }: { children: Children }) {
  const { address: account } = useAccount()

  return (
    <Container maxW='container.xl'>
      <AnimatePresence>
        {!account && (
          <FrontScreen>
            <Flex
              h='fit-content'
              w='100%'
              flexDir='column'
              alignItems='center'
              gap='4'
            >
              <ConnectBtn colorScheme='green'>Connect Wallet</ConnectBtn>
              <Text
                textAlign='center'
                color='#ffffff8a'
              >
                Start by connecting your wallet
              </Text>
            </Flex>
          </FrontScreen>
        )}
      </AnimatePresence>

      {children}
    </Container>
  )
}
