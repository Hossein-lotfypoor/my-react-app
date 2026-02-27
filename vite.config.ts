import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  // دقت کن: بین دو اسلش و حروف کوچک
  base: "/my-react-app/", 
  plugins: [
    react(),
    tailwindcss()
  ],
})
