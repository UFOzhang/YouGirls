<template>
  <div class="chat-container">
    <van-nav-bar title="聊天界面" left-text="返回" left-arrow @click-left="onClickLeft">
      <template #right>
        <van-icon name="ellipsis" @click="showPopover = true" />
      </template>
    </van-nav-bar>

    <!-- 女友信息 -->
    <div v-if="girlfriendStore.isGirlfriendSelected" class="girlfriend-info">
      <img :src="girlfriendStore.getCurrentGirlfriend?.avatar" alt="女友头像" class="girlfriend-avatar" />
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

      <div v-else>
        <!-- 聊天记录 -->
        <div v-for="message in girlfriendStore.getChatHistory" :key="message.id" class="message-item" :class="{
          'message-sent': message.sender === 'user',
          'message-received': message.sender === 'girlfriend',
        }">
          <img v-if="message.sender === 'girlfriend'"
            :src="message.avatar || girlfriendStore.getCurrentGirlfriend?.avatar" alt="头像" class="message-avatar" />
          <div class="message-content">
            <div class="message-text">{{ message.content }}</div>
            <div class="message-time">{{ formatTime(message.timestamp) }}</div>
          </div>
          <img v-if="message.sender === 'user'" src="../assets/imgs/default_user.png" alt="头像" class="message-avatar" />
        </div>
      </div>
    </div>

    <!-- 输入区域 -->
    <div v-if="girlfriendStore.isGirlfriendSelected" class="chat-input">
      <van-field v-model="message" placeholder="请输入消息" @keyup.enter="sendMessage">
        <template #button>
          <van-button size="small" type="primary" @click="sendMessage" :disabled="!message.trim()">发送</van-button>
        </template>
      </van-field>
    </div>

    <!-- 更多操作弹出层 -->
    <van-popup v-model:show="showPopover" position="bottom" :style="{ height: '20%' }">
      <van-cell-group>
        <van-cell title="清空聊天记录" icon="delete-o" @click="clearChatHistory" />
        <van-cell title="更换女友" icon="user-o" @click="goToSelection" />
      </van-cell-group>
    </van-popup>
  </div>
</template>

<script setup>
import { ref, onMounted, nextTick } from 'vue'
import { useRouter } from 'vue-router'
import { showToast } from 'vant'
import { useGirlfriendStore } from '@/stores/girlfriend'

const router = useRouter()
const girlfriendStore = useGirlfriendStore()
const message = ref('')
const showPopover = ref(false)
const chatContentRef = ref(null)

const onClickLeft = () => {
  router.go(-1)
}

const goToSelection = () => {
  router.push('/persona')
}

const sendMessage = async () => {
  if (!message.value.trim()) return

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
  } catch (error) {
    console.error('回复失败:', error)
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
})
</script>

<style scoped>
.chat-container {
  height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: #f5f5f5;
}

.girlfriend-info {
  display: flex;
  align-items: center;
  padding: 10px 16px;
  background: linear-gradient(90deg, #ff6b8b 0%, #ff8fa3 100%);
  color: white;
}

.girlfriend-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 10px;
  border: 2px solid white;
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
}

.message-sent {
  flex-direction: row-reverse;
}

.message-avatar {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  margin: 0 10px;
}

.message-content {
  max-width: 70%;
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
</style>
