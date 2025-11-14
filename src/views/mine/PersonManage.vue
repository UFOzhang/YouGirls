<template>
  <div class="person-container">
    <van-nav-bar title="我的" left-text="返回" left-arrow @click-left="goBack" />
    <div class="profile-header" @click="playVideoAnimation">
      <van-image round width="80" height="80" :src="girlfriendStore.isGirlfriendSelected
        ? girlfriendStore.getCurrentGirlfriend?.avatar
        : defaultAvatar
        " class="avatar" :class="{ 'avatar-pulse': girlfriendStore.isGirlfriendSelected }" />
      <div class="user-info">
        <h2 class="username">
          {{
            girlfriendStore.isGirlfriendSelected
              ? girlfriendStore.getCurrentGirlfriend?.name
              : '未选择女友'
          }}
        </h2>
        <p class="user-status">
          {{ girlfriendStore.isGirlfriendSelected ? '已选择女友' : '请先选择一位女友' }}
        </p>
      </div>
    </div>

    <!-- 聊天统计 -->
    <van-cell-group class="profile-section" v-if="girlfriendStore.isGirlfriendSelected">
      <van-cell title="累计聊天" :value="girlfriendStore.getChatStats.totalMessages + ' 条'" icon="chat-o" />
      <van-cell title="聊天时长" :value="formatChatTime(girlfriendStore.getChatStats.totalTime)" icon="clock-o" />
    </van-cell-group>

    <van-cell-group class="profile-section">
      <van-cell title="选择女友" is-link icon="user-o" @click="goToSelection" />
      <van-cell title="聊天记录" is-link icon="chat-o" @click="goToChat" />
      <van-cell title="语音互动" is-link icon="volume-o" @click="goToVoice" />
      <van-cell title="系统设置" is-link icon="setting-o" @click="goToSettings" />
    </van-cell-group>

    <van-cell-group class="profile-section">
      <van-cell title="关于我们" is-link icon="info-o" @click="goToAbout" />
      <van-cell title="意见反馈" is-link icon="comment-o" @click="goToFeedback" />
    </van-cell-group>

    <div class="action-buttons">
      <van-button v-if="girlfriendStore.isGirlfriendSelected" type="danger" block round @click="showExitDialog = true"
        class="action-btn">
        退出当前
      </van-button>
      <van-button v-else type="primary" block round @click="goToSelection" class="action-btn">
        选择女友
      </van-button>
    </div>

    <!-- 退出确认对话框 -->
    <van-dialog v-model:show="showExitDialog" title="确认退出" message="确定要退出当前女友吗？退出后将清空聊天记录。" show-cancel-button
      @confirm="exitGirlfriend" @cancel="showExitDialog = false" />

    <!-- 视频动画组件 -->
    <VideoAnimation ref="videoAnimationRef" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { showToast } from 'vant'
import { useGirlfriendStore } from '@/stores/girlfriend'
import VideoAnimation from '@/components/VideoAnimation.vue'
import defaultAvatar from '@/assets/imgs/avatar/boy_moren.svg'

const router = useRouter()
const girlfriendStore = useGirlfriendStore()
const showExitDialog = ref(false)
const videoAnimationRef = ref(null)
const goBack = () => {
  router.back()
}

const goToSelection = () => {
  router.push('/persona')
}

const goToChat = () => {
  if (girlfriendStore.isGirlfriendSelected) {
    router.push('/chat')
  } else {
    // 如果没有选择女友，先跳转到选择页面
    router.push('/persona')
  }
}

const goToVoice = () => {
  router.push('/voice')
}

const goToSettings = () => {
  router.push('/settings')
}

const goToAbout = () => {
  router.push('/about')
}

const goToFeedback = () => {
  // 可以创建一个反馈页面
  showToast('意见反馈页面开发中')
}

const exitGirlfriend = () => {
  // 清除女友选择
  girlfriendStore.clearSelection()
  showExitDialog.value = false

  // 显示提示（使用透明背景）
  showToast('已退出当前女友，聊天记录已清空')
}

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

// 播放视频动画
const playVideoAnimation = () => {
  if (girlfriendStore.isGirlfriendSelected && videoAnimationRef.value) {
    // 根据当前选择的女友类型选择对应的视频
    const girlfriendName = girlfriendStore.getCurrentGirlfriend?.name
    let videoIndex = 0

    switch (girlfriendName) {
      case '温柔学姐':
        videoIndex = 0
        break
      case '可爱少女':
        videoIndex = 1
        break
      case '高冷御姐':
        videoIndex = 2
        break
      case '定制女友':
        videoIndex = 3
        break
      default:
        videoIndex = Math.floor(Math.random() * 4)
    }

    videoAnimationRef.value.showVideoAnimation(videoIndex)
  }
}
</script>

<style scoped>
.person-container {
  min-height: 100vh;
  background-color: #f5f5f5;
  position: relative;
}

.profile-header {
  display: flex;
  align-items: center;
  padding: 30px 20px;
  background: linear-gradient(90deg, #ff6b8b 0%, #ff8fa3 100%);
  color: white;
  position: relative;
  overflow: hidden;
  cursor: pointer;
}

.profile-header::before {
  content: '';
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: radial-gradient(circle, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0) 70%);
  animation: rotate 10s linear infinite;
}

.avatar {
  border: 3px solid white;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  position: relative;
  z-index: 2;
}

.avatar-pulse {
  animation: pulse 2s infinite;
}

.user-info {
  margin-left: 20px;
  position: relative;
  z-index: 2;
}

.username {
  font-size: 20px;
  font-weight: 600;
  margin: 0 0 5px 0;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
}

.user-status {
  font-size: 14px;
  opacity: 0.9;
  margin: 0;
}

.profile-section {
  margin: 15px 0;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  animation: slideInUp 0.5s ease;
}

.action-buttons {
  padding: 20px;
}

.action-btn {
  height: 50px;
  font-size: 16px;
  font-weight: 500;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.action-btn:active {
  transform: scale(0.98);
}

/* 动画效果 */
@keyframes pulse {
  0% {
    transform: scale(1);
    box-shadow: 0 0 0 0 rgba(255, 107, 139, 0.4);
  }

  70% {
    transform: scale(1.05);
    box-shadow: 0 0 0 10px rgba(255, 107, 139, 0);
  }

  100% {
    transform: scale(1);
    box-shadow: 0 0 0 0 rgba(255, 107, 139, 0);
  }
}

@keyframes rotate {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
}

@keyframes slideInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
