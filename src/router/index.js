import { createRouter, createWebHistory } from 'vue-router'
import MainLayout from '../layouts/MainLayout.vue'
import HomeView from '../views/home/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import PersonManage from '../views/mine/PersonManage.vue'
import MessageView from '../views/MessageView.vue'
import ChatView from '../views/ChatView.vue'
import VoiceView from '../views/VoiceView.vue'
import PersonaView from '../views/PersonaView.vue'
import SettingsView from '../views/SettingsView.vue'
import GirlSelection from '../views/GirlSelection.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'main',
      component: MainLayout,
      redirect: '/home', // 默认重定向到 home
      children: [
        {
          path: '/home',
          name: 'home',
          component: HomeView,
        },
        {
          path: '/about',
          name: 'about',
          component: AboutView,
        },
        {
          path: '/profile',
          name: 'profile',
          component: PersonManage,
        },
        {
          path: '/message',
          name: 'message',
          component: MessageView,
        },
        {
          path: '/chat',
          name: 'chat',
          component: ChatView,
        },
        {
          path: '/voice',
          name: 'voice',
          component: VoiceView,
        },
        {
          path: '/persona',
          name: 'persona',
          component: PersonaView,
        },
        {
          path: '/settings',
          name: 'settings',
          component: SettingsView,
        },
        {
          path: '/girl-selection',
          name: 'girl-selection',
          component: GirlSelection,
        },
      ],
    },
  ],
})

export default router
