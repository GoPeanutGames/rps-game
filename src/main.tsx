import React from 'react'
import ReactDOM from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { RouterProvider, createRouter } from '@tanstack/react-router'
import { routeTree } from './routeTree.gen.ts'
import { WalletProvider } from '@feat/WalletProvider.tsx'
import { RPSProvider } from '@feat/rps/RPSProvider.tsx'
import { ThemeProvider } from '@design/ThemeProvider.tsx'

const queryClient = new QueryClient()

const router = createRouter({ routeTree })

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <WalletProvider>
        <RPSProvider>
          <ThemeProvider>
            <RouterProvider router={router} />
          </ThemeProvider>
        </RPSProvider>
      </WalletProvider>
    </QueryClientProvider>
  </React.StrictMode>,
)
