import { defineConfig } from 'vite';
import { resolve } from 'node:path';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// Two separate apps in one project:
//   /         → customer ordering app   (index.html → src/main.jsx)
//   /admin/   → Admin / Staff Portal    (admin/index.html → src/admin/main.jsx)
export default defineConfig({
  // GitHub Pages serves the site from /cafe-demo/; local dev stays at /.
  base: process.env.GITHUB_PAGES ? '/cafe-demo/' : '/',
  plugins: [react(), tailwindcss()],
  build: {
    rollupOptions: {
      input: {
        customer: resolve(import.meta.dirname, 'index.html'),
        admin: resolve(import.meta.dirname, 'admin/index.html'),
      },
    },
  },
});
