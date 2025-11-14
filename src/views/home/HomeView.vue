<template>
  <div class="home-container">
    <CommonTopNav />

    <div class="home-content">
      <div class="welcome-section">
        <h1 class="welcome-title">欢迎回来</h1>
        <p class="welcome-subtitle">今天想和谁聊天呢？</p>
      </div>

      <div class="action-buttons">
        <van-button
          class="action-btn"
          round
          @click="handleButtonClick('chat')"
          :class="{ 'click-effect': showClickEffect && lastClicked === 'chat' }"
          :style="
            lastClicked === 'chat' ? { '--click-x': clickX + 'px', '--click-y': clickY + 'px' } : {}
          "
        >
          <van-icon name="chat-o" size="24" />
          <span>开始聊天</span>
        </van-button>

        <van-button
          class="action-btn"
          round
          @click="handleButtonClick('persona')"
          :class="{ 'click-effect': showClickEffect && lastClicked === 'persona' }"
          :style="
            lastClicked === 'persona'
              ? { '--click-x': clickX + 'px', '--click-y': clickY + 'px' }
              : {}
          "
        >
          <van-icon name="user-o" size="24" />
          <span>选择女友</span>
        </van-button>

        <van-button
          class="action-btn"
          round
          @click="handleButtonClick('voice')"
          :class="{ 'click-effect': showClickEffect && lastClicked === 'voice' }"
          :style="
            lastClicked === 'voice'
              ? { '--click-x': clickX + 'px', '--click-y': clickY + 'px' }
              : {}
          "
        >
          <van-icon name="volume-o" size="24" />
          <span>语音互动</span>
        </van-button>

        <van-button
          class="action-btn"
          round
          @click="handleButtonClick('settings')"
          :class="{ 'click-effect': showClickEffect && lastClicked === 'settings' }"
          :style="
            lastClicked === 'settings'
              ? { '--click-x': clickX + 'px', '--click-y': clickY + 'px' }
              : {}
          "
        >
          <van-icon name="setting-o" size="24" />
          <span>系统设置</span>
        </van-button>
      </div>

      <div class="stats-section">
        <div class="stat-card">
          <van-icon name="chat-o" size="24" color="#ff6b8b" />
          <div class="stat-info">
            <p class="stat-value">{{ chatStats.totalMessages }}</p>
            <p class="stat-label">累计消息</p>
          </div>
        </div>

        <div class="stat-card">
          <van-icon name="clock-o" size="24" color="#4a90e2" />
          <div class="stat-info">
            <p class="stat-value">{{ formatChatTime(chatStats.totalTime) }}</p>
            <p class="stat-label">聊天时长</p>
          </div>
        </div>
      </div>
    </div>

    <CommonBottomNav />

    <!-- 点击波纹效果 -->
    <div
      v-if="showClickEffect"
      class="click-effect-overlay"
      :style="{ left: clickX + 'px', top: clickY + 'px' }"
    ></div>

    <!-- 视频动画组件 -->
    <VideoAnimation ref="videoAnimationRef" />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useGirlfriendStore } from '@/stores/girlfriend'
import CommonTopNav from '@/components/CommonTopNav.vue'
import CommonBottomNav from '@/components/CommonBottomNav.vue'
import VideoAnimation from '@/components/VideoAnimation.vue'

const router = useRouter()
const girlfriendStore = useGirlfriendStore()
const showClickEffect = ref(false)
const clickX = ref(0)
const clickY = ref(0)
const lastClicked = ref('')
const videoAnimationRef = ref(null)

// 计算聊天统计数据
const chatStats = computed(() => {
  return girlfriendStore.getChatStats
})

// 格式化聊天时长
const formatChatTime = (seconds) => {
  if (!seconds) return '0分钟'

  const minutes = Math.floor(seconds / 60)
  const hours = Math.floor(minutes / 60)

  if (hours > 0) {
    return `${hours}小时${minutes % 60}分钟`
  }
  return `${minutes}分钟`
}

// 按钮点击事件
const handleButtonClick = (type) => {
  // 获取点击位置
  const event = window.event
  if (event) {
    clickX.value = event.clientX
    clickY.value = event.clientY
    showClickEffect.value = true
    lastClicked.value = type

    // 隐藏动画效果
    setTimeout(() => {
      showClickEffect.value = false
    }, 600)
  }

  // 根据按钮类型执行相应操作
  switch (type) {
    case 'chat':
      if (girlfriendStore.isGirlfriendSelected) {
        router.push('/chat')
      } else {
        router.push('/persona')
      }
      break
    case 'persona':
      router.push('/persona')
      break
    case 'voice':
      router.push('/voice')
      break
    case 'settings':
      router.push('/settings')
      break
  }

  // 播放视频动画（随机选择一个视频）
  if (videoAnimationRef.value) {
    videoAnimationRef.value.showVideoAnimation()
  }
}
</script>

<style scoped>
.home-container {
  min-height: 100vh;
  background: linear-gradient(180deg, #fdf7fa 0%, #f8f9fa 100%);
  position: relative;
  overflow: hidden;
}

.home-content {
  padding: 20px;
  padding-top: 80px;
  padding-bottom: 80px;
}

.welcome-section {
  text-align: center;
  margin-bottom: 40px;
  animation: fadeInDown 0.8s ease;
}

.welcome-title {
  font-size: 28px;
  font-weight: 700;
  color: #ff6b8b;
  margin-bottom: 10px;
}

.welcome-subtitle {
  font-size: 16px;
  color: #6b7280;
  margin: 0;
}

.action-buttons {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin-bottom: 40px;
}

.action-btn {
  height: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: white;
  border: none;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.action-btn:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 16px rgba(255, 107, 139, 0.15);
}

.action-btn:active {
  transform: scale(0.98);
}

.action-btn .van-icon {
  margin-bottom: 8px;
}

.action-btn span {
  font-size: 14px;
  font-weight: 500;
  color: #2d3748;
}

.stats-section {
  display: flex;
  gap: 16px;
  margin-bottom: 30px;
}

.stat-card {
  flex: 1;
  background: white;
  border-radius: 12px;
  padding: 20px;
  display: flex;
  align-items: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  animation: fadeInUp 0.8s ease;
}

.stat-info {
  margin-left: 12px;
}

.stat-value {
  font-size: 20px;
  font-weight: 700;
  color: #2d3748;
  margin: 0 0 4px 0;
}

.stat-label {
  font-size: 12px;
  color: #6b7280;
  margin: 0;
}

/* 点击波纹效果 */
.click-effect-overlay {
  position: fixed;
  width: 0;
  height: 0;
  border-radius: 50%;
  background: rgba(255, 107, 139, 0.2);
  transform: translate(-50%, -50%);
  pointer-events: none;
  z-index: 9999;
  animation: rippleEffect 0.6s ease-out;
}

@keyframes rippleEffect {
  0% {
    width: 0;
    height: 0;
    opacity: 0.5;
  }
  100% {
    width: 300px;
    height: 300px;
    opacity: 0;
  }
}

/* 按钮点击效果 */
.click-effect {
  animation: buttonClick 0.3s ease;
}

@keyframes buttonClick {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(0.95);
  }
  100% {
    transform: scale(1);
  }
}

@keyframes fadeInDown {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* 响应式设计 */
@media (max-width: 320px) {
  .action-btn {
    height: 90px;
  }

  .welcome-title {
    font-size: 24px;
  }
}
</style>
