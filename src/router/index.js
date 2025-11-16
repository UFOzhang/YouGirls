import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/home/HomeView.vue'
import ChatView from '../views/chat/ChatView.vue'
import PersonaView from '../views/persons/PersonaView.vue'
import PersonManage from '../views/mine/PersonManage.vue'
import VoiceView from '../views/voice/VoiceView.vue'
import SettingsView from '../views/settings/SettingsView.vue'
import AboutView from '../views/about/AboutView.vue'
import GamesView from '../views/games/GamesView.vue'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    // 添加重定向路由，防止访问 /home 时出现 404
    {
      path: '/home',
      redirect: '/',
    },
    {
      path: '/chat',
      name: 'chat',
      component: ChatView,
    },
    {
      path: '/persona',
      name: 'persona',
      component: PersonaView,
    },
    {
      path: '/mine',
      name: 'mine',
      component: PersonManage,
    },
    {
      path: '/voice',
      name: 'voice',
      component: VoiceView,
    },
    {
      path: '/settings',
      name: 'settings',
      component: SettingsView,
    },
    {
      path: '/about',
      name: 'about',
      component: AboutView,
    },
    {
      path: '/games',
      name: 'games',
      component: GamesView,
    },
  ],
})

export default router
