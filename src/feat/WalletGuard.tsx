import { useAccount } from 'wagmi'
import { useWeb3Modal } from '@web3modal/wagmi/react'
import { motion, AnimatePresence } from 'framer-motion'
import { SplashScreen } from '@design/SplashScreen'
import { Button, Flex, Text } from '@chakra-ui/react'

/**
 *  Makes sure that the nested content is only available if a wallet
 *  connection is established. If no connection is available shows the
 *  splash screen with `Connect` button.
 */
export function WalletGuard({ children }: { children?: Children }) {
  const { address: account } = useAccount()
  const { open } = useWeb3Modal()

  return (
    <AnimatePresence>
      {account ? (
        <motion.div key='content'>{children}</motion.div>
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
  )
}
