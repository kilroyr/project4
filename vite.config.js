// vite.config.js

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

export default defineConfig({
  // Configure proxy to backend server 
  server: {
    proxy: {
      "/api": "http://localhost:3000",
    },
  },

  // Add react plugin  
  plugins: [react()],

  // Add optimizeDeps for bcrypt
  optimizeDeps: {
    include: ['react-router-dom', 'bcrypt.js'] ,
  },
})
