import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // Replace 'engine-care-web' with your actual repository name
  base: '/engine-care-web/', 
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
