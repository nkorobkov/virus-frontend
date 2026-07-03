import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Served from the root of a custom domain (public/CNAME), so the base is '/'.
  base: '/',
  build: {
    // gh-pages deploy publishes this directory (see the "deploy" npm script).
    outDir: 'build',
  },
  css: {
    preprocessorOptions: {
      // Bulma 0.9.x's own .sass files emit many @import/color deprecation
      // warnings; quietDeps hides warnings originating from node_modules.
      scss: { quietDeps: true },
      sass: { quietDeps: true },
    },
  },
  // Keep the existing REACT_APP_* environment variables working (exposed on
  // import.meta.env), alongside Vite's native VITE_* prefix.
  envPrefix: ['VITE_', 'REACT_APP_'],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/setupTests.js',
  },
});
