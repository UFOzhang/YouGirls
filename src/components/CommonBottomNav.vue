<template>
  <div class="bottom-nav">
    <van-tabbar v-model="active" fixed safe-area-inset-bottom @change="onChange">
      <van-tabbar-item
        v-for="(item, index) in tabbarList"
        :key="index"
        :icon="item.icon"
        :name="item.name"
        @click="playVideoAnimation"
      >
        {{ item.text }}
      </van-tabbar-item>
    </van-tabbar>

    <!-- 视频动画组件 -->
    <VideoAnimation ref="videoAnimationRef" />
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import VideoAnimation from '@/components/VideoAnimation.vue'

const route = useRoute()
const router = useRouter()
const active = ref('home')
const videoAnimationRef = ref(null)

const tabbarList = [
  { name: 'home', icon: 'wap-home-o', text: '首页' },
  { name: 'chat', icon: 'chat-o', text: '聊天' },
  { name: 'persona', icon: 'user-o', text: '人设' },
  { name: 'voice', icon: 'volume-o', text: '语音' },
  { name: 'mine', icon: 'contact', text: '我的' },
]

// 监听路由变化，更新选中的tab
watch(
  () => route.name,
  (newVal) => {
    active.value = newVal
  },
  { immediate: true },
)

const onChange = (name) => {
  router.push({ name })
}

// 播放视频动画（随机选择一个视频）
const playVideoAnimation = () => {
  if (videoAnimationRef.value) {
    videoAnimationRef.value.showVideoAnimation()
  }
}
</script>

<style scoped>
.bottom-nav {
  position: relative;
}

:deep(.van-tabbar) {
  background: linear-gradient(90deg, #ff6b8b 0%, #ff8fa3 100%);
  box-shadow: 0 -2px 12px rgba(0, 0, 0, 0.1);
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  overflow: hidden;
}

:deep(.van-tabbar-item) {
  color: rgba(255, 255, 255, 0.7);
}

:deep(.van-tabbar-item--active) {
  color: white;
  font-weight: 600;
}

:deep(.van-tabbar-item__icon) {
  font-size: 20px;
}

:deep(.van-tabbar-item__text) {
  font-size: 12px;
  margin-top: 2px;
}
</style>
