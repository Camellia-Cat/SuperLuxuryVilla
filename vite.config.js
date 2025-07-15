import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import tailwind from 'tailwindcss'
import autoprefixer from 'autoprefixer'
import { templateCompilerOptions } from '@tresjs/core'
export default defineConfig({
  plugins: [vue({
    ...templateCompilerOptions
  })],
  css: {
    postcss: {
      plugins: [tailwind(), autoprefixer()],
    },
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    }
  },
  server: {
    port: 3000,
    open: true
  }
})