import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    hmr: {
      overlay: true,
    },
    watch: {
      usePolling: true,
    },
  },
  build: {
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: {
          'pdf': ['pdfjs-dist'],
          'vendor': [
            'react',
            'react-dom',
            'react-dropzone',
            '@headlessui/react',
            '@heroicons/react'
          ]
        }
      }
    }
  }
});