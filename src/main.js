import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

// 引入 Vant 组件样式
import 'vant/lib/index.css'

// 引入 Vant 触摸事件模拟器
import '@vant/touch-emulator'

import App from './App.vue'
import router from './router'

// 清理可能存在的错误路由历史
if (typeof window !== 'undefined') {
  // 检查当前URL是否包含 /home，如果是则重定向到 /
  if (window.location.pathname.includes('/home')) {
    window.history.replaceState(null, '', '/')
  }
}

// 创建应用实例
const app = createApp(App)

// 创建 Pinia 实例
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

// 使用插件
app.use(pinia)
app.use(router)

// 挂载应用
app.mount('#app')
