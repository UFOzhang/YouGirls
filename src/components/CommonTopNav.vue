<template>
  <div class="top-nav">
    <van-nav-bar
      :title="title"
      :left-text="showBack ? '返回' : ''"
      :left-arrow="showBack"
      @click-left="onClickLeft"
      fixed
      safe-area-inset-top
      @click="playVideoAnimation"
    >
      <template #right>
        <van-icon v-if="showMenu" name="ellipsis" size="20" @click="showPopover = true" />
      </template>
    </van-nav-bar>

    <!-- 更多操作弹出层 -->
    <van-popup v-model:show="showPopover" position="bottom" :style="{ height: '30%' }" round>
      <van-cell-group>
        <van-cell
          v-for="(item, index) in menuItems"
          :key="index"
          :title="item.title"
          :icon="item.icon"
          @click="handleMenuItemClick(item.action)"
        />
      </van-cell-group>
    </van-popup>

    <!-- 视频动画组件 -->
    <VideoAnimation ref="videoAnimationRef" />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import VideoAnimation from '@/components/VideoAnimation.vue'

const route = useRoute()
const router = useRouter()
const showPopover = ref(false)
const videoAnimationRef = ref(null)

// 菜单项
const menuItems = [
  { title: '设置', icon: 'setting-o', action: 'settings' },
  { title: '关于', icon: 'info-o', action: 'about' },
  { title: '反馈', icon: 'comment-o', action: 'feedback' },
]

// 计算属性：页面标题
const title = computed(() => {
  const routeMap = {
    home: 'AI女友',
    chat: '聊天界面',
    persona: '选择女友',
    voice: '语音互动',
    mine: '个人中心',
  }
  return routeMap[route.name] || 'AI女友'
})

// 计算属性：是否显示返回按钮
const showBack = computed(() => {
  return route.name !== 'home'
})

// 计算属性：是否显示菜单按钮
const showMenu = computed(() => {
  return route.name === 'home' || route.name === 'chat' || route.name === 'persona'
})

const onClickLeft = () => {
  if (showBack.value) {
    router.back()
  }
}

const handleMenuItemClick = (action) => {
  showPopover.value = false

  switch (action) {
    case 'settings':
      router.push('/settings')
      break
    case 'about':
      router.push('/about')
      break
    case 'feedback':
      // 可以创建一个反馈页面
      alert('意见反馈功能开发中')
      break
  }
}

// 播放视频动画（随机选择一个视频）
const playVideoAnimation = () => {
  if (videoAnimationRef.value) {
    videoAnimationRef.value.showVideoAnimation()
  }
}
</script>

<style scoped>
.top-nav {
  position: relative;
}

:deep(.van-nav-bar) {
  background: linear-gradient(90deg, #ff6b8b 0%, #ff8fa3 100%);
}

:deep(.van-nav-bar__title) {
  color: white;
  font-weight: 600;
}

:deep(.van-nav-bar__text) {
  color: white;
}

:deep(.van-icon) {
  color: white;
}

:deep(.van-popup) {
  background: #f8f9fa;
}
</style>
