import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/

export const config = {
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: "https://localhost:7227",
        changeOrigin: true,
        secure: false,
      }
    }
  },
  preview: {
    watch: {
      usePolling: true,
    },
    host: true,
    strictPort: true,
    port: 3000,
    proxy: {
      '/api': {
        target: "http://backend:80",
        changeOrigin: true,
        secure: false,
      }
    }
  },
};

// noinspection JSCheckFunctionSignatures
export default defineConfig(config);
