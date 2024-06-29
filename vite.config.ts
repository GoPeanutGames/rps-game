import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { TanStackRouterVite } from '@tanstack/router-vite-plugin'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), TanStackRouterVite()],
  resolve: {
    alias: {
      // Frequently used modules can be specified first
      '@utils': path.resolve(__dirname, './src/lib/utils'),
      '@design': path.resolve(__dirname, './src/lib/design'),

      '@assets': path.resolve(__dirname, './src/assets'),
      '@lib': path.resolve(__dirname, './src/lib'),
      '@feat': path.resolve(__dirname, './src/feat'),
    },
  },
})
