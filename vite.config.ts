import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import AutoImport from "unplugin-auto-import/vite"
import Components from 'unplugin-vue-components/vite'


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      imports: ["vue", "vue-router"], // 自动导入 vue 和 vue-router 相关函数
      dts: "src/types/auto-import.d.ts" // 生成 auto-import.d.ts 全局声明
    }),
    Components({
      dts: "src/types/components.d.ts"
    })
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  }
})
