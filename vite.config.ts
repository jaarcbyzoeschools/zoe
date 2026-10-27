import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

export default defineConfig({
  plugins: [
    tailwindcss(),
    react(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(import.meta.dirname, './src'),
      '@components': path.resolve(import.meta.dirname, './src/components'),
      '@pages': path.resolve(import.meta.dirname, './src/pages'),
      '@services': path.resolve(import.meta.dirname, './src/services'),
      '@store': path.resolve(import.meta.dirname, './src/store'),
      '@type': path.resolve(import.meta.dirname, './src/type'),
      '@utils': path.resolve(import.meta.dirname, './src/utils'),
      '@hooks': path.resolve(import.meta.dirname, './src/hooks'),
      '@layouts': path.resolve(import.meta.dirname, './src/layouts'),
      '@middleware': path.resolve(import.meta.dirname, './src/middleware'),
      '@constants': path.resolve(import.meta.dirname, './src/constants'),
    },
  },
  server: {
    port: 5173,
    open: true,
  },
})