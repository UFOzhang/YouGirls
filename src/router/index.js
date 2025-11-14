import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/home/HomeView.vue'
import ChatView from '../views/ChatView.vue'
import PersonaView from '../views/PersonaView.vue'
import PersonManage from '../views/mine/PersonManage.vue'

const router = createRouter({
  // 使用 Hash 模式而不是 History 模式，以便在 GitHub Pages 上正常工作
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: { title: '首页' },
    },
    {
      path: '/chat',
      name: 'chat',
      component: ChatView,
      meta: { title: '聊天' },
    },
    {
      path: '/persona',
      name: 'persona',
      component: PersonaView,
      meta: { title: '人设' },
    },
    {
      path: '/mine',
      name: 'mine',
      component: PersonManage,
      meta: { title: '我的' },
    },
  ],
})

export default router
