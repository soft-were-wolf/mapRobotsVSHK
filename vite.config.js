import {
  defineConfig
} from 'vite'
import react from '@vitejs/plugin-react'
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  base: '/robotsMapVSHK',
  build: { outDir: path.join(__dirname, "dist") },
  server: {
    host: "10.1.242.61",
    port: 9081,
    cors: false,
    proxy: {
      '/apiMooe': {
        target: "http://10.0.90.52",
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/apiMooe/, '')
      }
    }
  },
  plugins: [react()],
  define: {
    'process.env': process.env,
  }
})