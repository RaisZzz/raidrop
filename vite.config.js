import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import dts from 'vite-plugin-dts'
import { libInjectCss } from 'vite-plugin-lib-inject-css'

export default defineConfig({
  plugins: [vue(), dts(), libInjectCss()],
  build: {
    lib: {
      entry: './src/index.ts',
      name: 'RaiDrop',
      fileName: (format) => `raidrop.${format}.js`,
      formats: ['es', 'cjs', 'umd']
    },
    rollupOptions: {
      external: ['vue'],
      output: {
        globals: {
          vue: 'Vue'
        },
        assetsInlineLimit: 0
      }
    }
  }
})
