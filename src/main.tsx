import React from 'react'
import ReactDOM from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { WalletProvider } from '@feat/wallet/WalletProvider.tsx'
import { ThemeProvider } from '@design/ThemeProvider.tsx'
import { App } from './App.tsx'
import { RPSProvider } from '@feat/rps/RPSProvider.tsx'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <WalletProvider>
        <ThemeProvider>
          <RPSProvider>
            <App />
          </RPSProvider>
        </ThemeProvider>
      </WalletProvider>
    </QueryClientProvider>
  </React.StrictMode>,
)
