<template>
  <div class="chat-container">
    <van-nav-bar title="聊天界面" left-text="返回" left-arrow @click-left="onClickLeft">
      <template #right>
        <van-icon name="ellipsis" @click="showPopover = true" />
      </template>
    </van-nav-bar>

    <!-- 女友信息 -->
    <div
      v-if="girlfriendStore.isGirlfriendSelected"
      class="girlfriend-info"
      @click="playVideoAnimation"
    >
      <img
        :src="girlfriendStore.getCurrentGirlfriend?.avatar"
        alt="女友头像"
        class="girlfriend-avatar"
      />
      <div class="girlfriend-details">
        <h3 class="girlfriend-name">{{ girlfriendStore.getCurrentGirlfriend?.name }}</h3>
        <p class="girlfriend-status">在线</p>
      </div>
    </div>

    <!-- 聊天内容区域 -->
    <div class="chat-content" ref="chatContentRef">
      <div v-if="!girlfriendStore.isGirlfriendSelected" class="no-girlfriend">
        <van-empty description="请先选择一位女友开始聊天">
          <van-button round type="primary" @click="goToSelection">选择女友</van-button>
        </van-empty>
      </div>
      <div v-else-if="girlfriendStore.getChatHistory.length === 0" class="game-promotion">
        <van-notice-bar
          text="和女友一起玩游戏可以增进感情哦~ 点击右上角菜单进入游戏"
          left-icon="gem-o"
          :scrollable="false"
        />
      </div>

      <div v-else>
        <!-- 聊天记录 -->
        <div
          v-for="message in girlfriendStore.getChatHistory"
          :key="message.id"
          class="message-item"
          :class="{
            'message-sent': message.sender === 'user',
            'message-received': message.sender === 'girlfriend',
          }"
        >
          <img
            v-if="message.sender === 'girlfriend'"
            :src="message.avatar || girlfriendStore.getCurrentGirlfriend?.avatar"
            alt="头像"
            class="message-avatar"
            @click="playVideoAnimation"
          />
          <div class="message-content">
            <div class="message-text">{{ message.content }}</div>
            <div class="message-time">{{ formatTime(message.timestamp) }}</div>
          </div>
          <img
            v-if="message.sender === 'user'"
            src="../assets/imgs/avatar/boy_moren.svg"
            alt="头像"
            class="message-avatar"
          />
        </div>
      </div>
    </div>

    <!-- 输入区域 -->
    <div v-if="girlfriendStore.isGirlfriendSelected" class="chat-input">
      <van-field v-model="message" placeholder="请输入消息" @keyup.enter="sendMessage">
        <template #button>
          <van-button size="small" type="primary" @click="sendMessage" :disabled="!message.trim()"
            >发送</van-button
          >
        </template>
      </van-field>
    </div>

    <!-- 更多操作弹出层 -->
    <van-popup v-model:show="showPopover" position="bottom" :style="{ height: '20%' }">
      <van-cell-group>
        <van-cell title="清空聊天记录" icon="delete-o" @click="clearChatHistory" />
        <van-cell title="更换女友" icon="user-o" @click="goToSelection" />
        <van-cell title="语音设置" icon="volume-o" @click="goToVoiceSettings" />
        <van-cell title="互动游戏" icon="gem-o" @click="goToGames" />
      </van-cell-group>
    </van-popup>

    <!-- 消息发送动画 -->
    <div v-if="isSending" class="sending-overlay">
      <div class="sending-content">
        <van-loading type="spinner" color="#ff6b8b" />
        <span class="sending-text">发送中...</span>
      </div>
    </div>

    <!-- 视频动画组件 -->
    <VideoAnimation ref="videoAnimationRef" />
  </div>
</template>

<script setup>
import { ref, onMounted, nextTick } from 'vue'
import { useRouter } from 'vue-router'
import { showToast } from 'vant'
import { useGirlfriendStore } from '@/stores/girlfriend'
import VideoAnimation from '@/components/VideoAnimation.vue'

const router = useRouter()
const girlfriendStore = useGirlfriendStore()
const message = ref('')
const showPopover = ref(false)
const chatContentRef = ref(null)
const isSending = ref(false)
const videoAnimationRef = ref(null)

// 语音设置
const isVoiceEnabled = ref(true)
const speechRate = ref(1.0)
const speechVolume = ref(0.8)

const onClickLeft = () => {
  router.go(-1)
}

const goToSelection = () => {
  router.push('/persona')
}

const goToVoiceSettings = () => {
  router.push('/voice')
}

const goToGames = () => {
  router.push('/games')
}

const sendMessage = async () => {
  if (!message.value.trim()) return

  // 显示发送中动画
  isSending.value = true

  // 添加用户消息到聊天记录
  const userMessage = {
    id: Date.now(),
    sender: 'user',
    content: message.value,
    timestamp: new Date(),
  }

  girlfriendStore.addChatMessage(userMessage)

  // 清空输入框
  const currentMessage = message.value
  message.value = ''

  // 滚动到底部
  scrollToBottom()

  // 模拟女友回复
  try {
    await girlfriendStore.simulateGirlfriendReply(currentMessage)
    // 滚动到底部
    scrollToBottom()

    // 如果开启了语音播报，则播放女友回复
    if (isVoiceEnabled.value) {
      const lastMessage = girlfriendStore.getChatHistory[girlfriendStore.getChatHistory.length - 1]
      if (lastMessage && lastMessage.sender === 'girlfriend') {
        playGirlfriendVoice(lastMessage.content)
      }
    }
  } catch (error) {
    console.error('回复失败:', error)
    showToast('回复失败，请重试')
  } finally {
    // 隐藏发送中动画
    isSending.value = false
  }
}

const clearChatHistory = () => {
  girlfriendStore.chatHistory = []
  showPopover.value = false
  showToast('聊天记录已清空')
}

const formatTime = (timestamp) => {
  // 确保 timestamp 是 Date 对象
  const date = new Date(timestamp)
  return date.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })
}

const scrollToBottom = () => {
  nextTick(() => {
    if (chatContentRef.value) {
      chatContentRef.value.scrollTop = chatContentRef.value.scrollHeight
    }
  })
}

// 播放女友语音
const playGirlfriendVoice = (text) => {
  try {
    // 从本地存储获取语音设置
    const savedSettings = localStorage.getItem('voiceSettings')
    if (savedSettings) {
      try {
        const settings = JSON.parse(savedSettings)
        isVoiceEnabled.value = settings.enabled !== false
        speechRate.value = settings.rate || 1.0
        speechVolume.value = settings.volume || 0.8
      } catch (e) {
        console.error('恢复语音设置失败:', e)
      }
    }

    if (!isVoiceEnabled.value) return

    // 设置语音参数
    const utterance = new SpeechSynthesisUtterance(text)
    utterance.rate = speechRate.value
    utterance.volume = speechVolume.value

    // 根据女友类型设置不同的语音参数
    const girlfriendType = girlfriendStore.getCurrentGirlfriend?.name || '温柔学姐'
    switch (girlfriendType) {
      case '温柔学姐':
        utterance.rate = 0.9
        utterance.pitch = 1.2
        break
      case '可爱少女':
        utterance.rate = 1.2
        utterance.pitch = 1.8
        break
      case '高冷御姐':
        utterance.rate = 0.8
        utterance.pitch = 0.8
        break
      default:
        utterance.rate = 1.0
        utterance.pitch = 1.0
    }

    // 获取中文语音
    const voices = window.speechSynthesis.getVoices()
    const chineseVoices = voices.filter(
      (voice) => voice.lang.includes('zh') || voice.lang.includes('Chinese'),
    )

    if (chineseVoices.length > 0) {
      utterance.voice = chineseVoices[0]
    }

    window.speechSynthesis.speak(utterance)
  } catch (error) {
    console.error('语音播放失败:', error)
  }
}

// 播放视频动画
const playVideoAnimation = () => {
  if (videoAnimationRef.value) {
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

// 组件挂载时滚动到底部
onMounted(() => {
  scrollToBottom()

  // 如果没有选择女友，提示用户选择
  if (!girlfriendStore.isGirlfriendSelected) {
    showToast({
      message: '请先选择一位女友开始聊天',
      duration: 2000,
    })
  }

  // 从本地存储恢复语音设置
  const savedSettings = localStorage.getItem('voiceSettings')
  if (savedSettings) {
    try {
      const settings = JSON.parse(savedSettings)
      isVoiceEnabled.value = settings.enabled !== false
      speechRate.value = settings.rate || 1.0
      speechVolume.value = settings.volume || 0.8
    } catch (e) {
      console.error('恢复语音设置失败:', e)
    }
  }
})
</script>

<style scoped>
.chat-container {
  height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: #f5f5f5;
  position: relative;
}

.game-promotion {
  padding: 10px 16px 0;
}

.girlfriend-info {
  display: flex;
  align-items: center;
  padding: 10px 16px;
  background: linear-gradient(90deg, #ff6b8b 0%, #ff8fa3 100%);
  color: white;
  cursor: pointer;
}

.girlfriend-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 10px;
  border: 2px solid white;
  animation: pulse 2s infinite;
  cursor: pointer;
}

.girlfriend-details {
  flex: 1;
}

.girlfriend-name {
  font-size: 16px;
  font-weight: 500;
  margin: 0;
}

.girlfriend-status {
  font-size: 12px;
  opacity: 0.9;
  margin: 2px 0 0;
}

.chat-content {
  flex: 1;
  overflow-y: auto;
  padding: 10px;
  background-color: #f5f5f5;
}

.no-girlfriend {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
}

.message-item {
  display: flex;
  margin-bottom: 15px;
  align-items: flex-start;
  animation: fadeInUp 0.3s ease;
}

.message-sent {
  flex-direction: row-reverse;
}

.message-avatar {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  margin: 0 10px;
  cursor: pointer;
}

.message-content {
  max-width: 70%;
  position: relative;
}

.message-sent .message-content {
  background-color: #ff6b8b;
  color: white;
  border-radius: 18px 4px 18px 18px;
}

.message-received .message-content {
  background-color: white;
  color: #333;
  border-radius: 4px 18px 18px 18px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.message-text {
  padding: 10px 15px;
  word-wrap: break-word;
  line-height: 1.4;
}

.message-time {
  font-size: 10px;
  color: #999;
  text-align: right;
  margin-top: 4px;
  padding: 0 10px;
}

.chat-input {
  padding: 10px;
  background: #fff;
  border-top: 1px solid #f0f0f0;
}

/* 发送中动画 */
.sending-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.sending-content {
  background: white;
  padding: 20px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.sending-text {
  margin-left: 10px;
  font-size: 16px;
  color: #333;
}

/* 动画效果 */
@keyframes pulse {
  0% {
    transform: scale(1);
  }

  50% {
    transform: scale(1.05);
  }

  100% {
    transform: scale(1);
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
</style>
