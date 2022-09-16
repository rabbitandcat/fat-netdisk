import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 9999,
    open: true,
    proxy: {
      '/haha': {
        target: 'http://localhost:9000/api/v1',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/haha/, '')
      },
    }
  }
})
