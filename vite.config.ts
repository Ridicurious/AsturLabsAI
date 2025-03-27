import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  // base: '/AsturLabsAI/.', // Change this to your project name
  server: {
    proxy: {
      '/insights': { // Proxy requests to /insights to the public directory
        target: 'http://localhost:5173', // Your Vite dev server port.  Change if needed!
        changeOrigin: true,
        rewrite: (path) => path, // No rewrite necessary
      },
    },
  },
})
