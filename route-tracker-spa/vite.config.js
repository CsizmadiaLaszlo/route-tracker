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
};

export default defineConfig(config);
