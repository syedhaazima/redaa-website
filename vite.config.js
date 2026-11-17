import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// base './' lets the built site run from any folder or sub-path (Netlify, Vercel, cPanel).
export default defineConfig({
  base: './',
  plugins: [react()],
  server: { open: true },
});
