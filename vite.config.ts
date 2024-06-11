import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { TanStackRouterVite } from '@tanstack/router-vite-plugin'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), TanStackRouterVite()],
  resolve: {
    alias: {
      '@design': path.resolve(__dirname, './src/design'),
      '@feat': path.resolve(__dirname, './src/features'),
      '@utils': path.resolve(__dirname, './src/utils'),
    },
  },
})
