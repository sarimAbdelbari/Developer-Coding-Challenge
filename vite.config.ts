import path from "path"
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite' // Ensure this plugin is correctly installed and used if you added it.

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()], // tailwindcss() was added here
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})