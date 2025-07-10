import { defineConfig } from 'vite';

export default defineConfig({
  root: '.',
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: './index.html'
      }
    }
  },
  server: {
    port: 3000,
    host: true,
    open: true
  },
  preview: {
    port: 3001,
    host: true
  },
  optimizeDeps: {
    include: ['gsap']
  },
  define: {
    'import.meta.env.APP_NAME': JSON.stringify('Breach Protocol'),
    'import.meta.env.APP_VERSION': JSON.stringify('0.1.0'),
    'import.meta.env.EDUCATIONAL_MODE': JSON.stringify(true)
  }
}); 