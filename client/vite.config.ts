import { defineConfig } from "vite";
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // fs: {
    //   // Add the path to allowlist node_modules directory for font-awesome
    //   allow: ['C:/Users/rd90/Desktop/finance-flow/']
    // },
    port: 3000,
    open: true,
    proxy: {
      "/api": {
        target: "http://localhost:3001",
        changeOrigin: true,
        secure: false,
      },
      "/auth": {
        target: "http://localhost:3001",
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
