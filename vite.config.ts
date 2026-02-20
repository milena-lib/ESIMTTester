import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
const protocol = process.env.VITE_API_PROTOCOL || 'http';
const apiPort = process.env.VITE_API_PORT || '3000';
const apiHost = process.env.VITE_API_HOST || 'localhost';

export default defineConfig({
  plugins: [react()],
  server: {
    open: true,
    port: 5173,      // React dev server port
    proxy: {
      '/api': {
        target: `${protocol}://${apiHost}:${apiPort}`,
        changeOrigin: true,
        secure: false,
      },
    },
  },
})

