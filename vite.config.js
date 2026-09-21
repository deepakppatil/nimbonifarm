import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
    /**
   * Public base path.
   *
   * GitHub Pages serves a project site from https://user.github.io/<repo>/,
   * not from the domain root — so every asset URL needs a prefix, or the
   * deployed site loads its HTML and then 404s on all of its CSS and JS.
   *
   * Default '/' is correct once a custom domain is attached. For the
   * *.github.io address, build with BASE_PATH=/<repo>/ — the included GitHub
   * Actions workflow does this automatically when no custom domain is set.
   */
  base: process.env.BASE_PATH || '/',

  server: {
    // Required so the sandboxed preview host can reach the dev server.
    host: '0.0.0.0',
    port: 5173,
    strictPort: true,
    allowedHosts: true,
  },
  preview: {
    host: '0.0.0.0',
    port: 4173,
    allowedHosts: true,
  },
  build: {
    target: 'es2020',
    assetsInlineLimit: 2048,
  },
})
