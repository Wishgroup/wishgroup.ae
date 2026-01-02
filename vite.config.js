import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { copyFileSync } from 'fs'

// Plugin to copy .htaccess to dist after build
const copyHtaccessPlugin = () => {
  return {
    name: 'copy-htaccess',
    writeBundle() {
      try {
        copyFileSync(
          path.resolve(__dirname, '.htaccess'),
          path.resolve(__dirname, 'dist', '.htaccess')
        )
        console.log('✓ .htaccess copied to dist/')
      } catch (error) {
        console.warn('⚠ Could not copy .htaccess:', error.message)
      }
    },
  }
}

export default defineConfig({
  plugins: [react(), copyHtaccessPlugin()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 4000,
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
    minify: 'terser',
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          three: ['three', '@react-three/fiber', '@react-three/drei'],
        },
      },
    },
  },
  base: './', // Use relative paths for better cPanel compatibility
})

