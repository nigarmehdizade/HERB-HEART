import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
// vite.config.js
export default {
  server: { proxy: {
    '/api': 'http://localhost:5000'
  },
    port: 3000,
    hmr: {
      port: 3000,
    },
  },
};
