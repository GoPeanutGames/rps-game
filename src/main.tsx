import React from 'react'
import ReactDOM from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { RouterProvider, createRouter } from '@tanstack/react-router'
import { WalletProvider } from '@feat/WalletProvider.tsx'
import { ThemeProvider } from '@design/ThemeProvider.tsx'
import { routeTree } from './routeTree.gen.ts'

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
        <ThemeProvider>
          <RouterProvider router={router} />
        </ThemeProvider>
      </WalletProvider>
    </QueryClientProvider>
  </React.StrictMode>,
)
