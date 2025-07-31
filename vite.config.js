import {
  defineConfig, loadEnv
} from 'vite'
import react from '@vitejs/plugin-react'
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {

  const env = loadEnv(mode, process.cwd(), '');

  return {
    base: env.BASE_DIR,
    build: { outDir: path.join(__dirname, "dist") },
    server: {
      host: env.MAP_SERVER_HOST,
      port: env.MAP_SERVER_PORT,
      cors: false,
      proxy: {
        '/apiMooe': {
          target: env.BASE_DIR,
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
  }
});