import { WagmiProvider } from 'wagmi'
import { blast, blastSepolia } from 'viem/chains'
import { defaultWagmiConfig } from '@web3modal/wagmi/react/config'
import { createWeb3Modal } from '@web3modal/wagmi/react'

const projectId = import.meta.env.VITE_WALLET_CONNECT_PROJECT_ID
if (!projectId) {
  throw new Error('VITE_WALLET_CONNECT_PROJECT_ID is not set')
}

const metadata = {
  name: 'PeanutGames - RPS',
  description: 'PeanutGames - Rock Paper Scissors game',
  url: 'https://rps.peanutgames.com',
  icons: ['https://avatars.githubusercontent.com/u/37784886'],
}

const chains = import.meta.env.PROD
  ? ([blast] as const)
  : ([blastSepolia] as const)

const wagmiConfig = defaultWagmiConfig({
  projectId,
  chains,
  metadata,
})

createWeb3Modal({
  wagmiConfig,
  projectId,
})

export function Web3Provider({ children }: { children?: Children }) {
  return <WagmiProvider config={wagmiConfig}>{children}</WagmiProvider>
}
