import React, { ReactNode } from 'react'
import ReactDOM from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { RouterProvider, createRouter } from '@tanstack/react-router'
import { ThemeProvider } from '@design/ThemeProvider'
import { Web3Provider } from '@feat/Web3Provider'
import { RPSComposedProvider } from '@feat/RPSComposedProvider'
import { routeTree } from './routeTree.gen.ts'

const queryClient = new QueryClient()

const router = createRouter({ routeTree })

declare global {
  type Children = ReactNode
  type Address = `0x${string}`
}

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <Web3Provider>
        <RPSComposedProvider>
          <ThemeProvider>
            <RouterProvider router={router} />
          </ThemeProvider>
        </RPSComposedProvider>
      </Web3Provider>
    </QueryClientProvider>
  </React.StrictMode>,
)
