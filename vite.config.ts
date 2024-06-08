import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@design': path.resolve(__dirname, './src/design'),
      '@feat': path.resolve(__dirname, './src/features'),
      '@util': path.resolve(__dirname, './src/util'),
    },
  },
})
