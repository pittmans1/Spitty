import { fileURLToPath, URL } from 'node:url'
import { templateCompilerOptions } from '@tresjs/core'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue({
      ...templateCompilerOptions,
      template: {
        compilerOptions: tag => tag.startsWith('Tres') && tag !== 'TresCanvas',
      }
    }),
    vueJsx(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
