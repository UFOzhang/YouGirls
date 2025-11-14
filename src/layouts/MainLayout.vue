<template>
  <div class="main-layout">
    <!-- 顶部导航栏 -->
    <CommonTopNav :title="currentTitle" />

    <!-- 页面内容区域 -->
    <div class="content-wrapper">
      <router-view />
    </div>

    <!-- 底部导航栏 -->
    <CommonBottomNav />
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import CommonTopNav from '@/components/CommonTopNav.vue'
import CommonBottomNav from '@/components/CommonBottomNav.vue'

const route = useRoute()

// 根据当前路由设置页面标题
const currentTitle = computed(() => {
  const titles = {
    home: 'AI女友',
    chat: '聊天',
    voice: '语音互动',
    persona: '选择女友风格',
    settings: '系统设置',
    about: '关于我们',
    mine: '个人中心',
  }
  return titles[route.name] || 'AI女友'
})
</script>

<style scoped>
.main-layout {
  height: 100vh;
  display: flex;
  flex-direction: column;
}

.content-wrapper {
  flex: 1;
  overflow-y: auto;
  padding-bottom: 50px; /* 为底部导航栏留出空间 */
}
</style>
