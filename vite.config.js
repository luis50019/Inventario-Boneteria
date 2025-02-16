import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import viteBasicSslPlugin from '@vitejs/plugin-basic-ssl'

export default defineConfig({
  plugins: [react(),viteBasicSslPlugin()],
  server:{
    host:'0.0.0.0',
    port:5173,
  }
})
