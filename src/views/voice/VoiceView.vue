<template>
  <div class="voice-container">
    <van-nav-bar title="语音互动" left-text="返回" left-arrow @click-left="goBack" />

    <div class="voice-content">
      <div class="voice-header">
        <van-image round width="80" height="80" :src="girlfriendStore.getCurrentGirlfriend?.avatar || defaultAvatar"
          class="girlfriend-avatar" />
        <h2 class="girlfriend-name">
          {{ girlfriendStore.getCurrentGirlfriend?.name || '未选择女友' }}
        </h2>
        <p class="girlfriend-status">{{ voiceStatus }}</p>
      </div>

      <div class="voice-controls">
        <div class="control-buttons">
          <van-button class="control-btn" round :icon="isListening ? 'stop' : 'volume-o'"
            :type="isListening ? 'danger' : 'primary'" @click="toggleListening">
            {{ isListening ? '停止识别' : '开始说话' }}
          </van-button>

          <van-button class="control-btn" round icon="play-circle-o" type="success" @click="playSampleVoice">
            试听示例
          </van-button>
        </div>

        <div class="voice-settings">
          <van-cell-group title="语音设置">
            <van-cell title="语音播报">
              <template #right-icon>
                <van-switch v-model="isVoiceEnabled" size="20" />
              </template>
            </van-cell>
            <van-cell title="语速">
              <template #right-icon>
                <van-slider v-model="speechRate" :min="0.5" :max="2" :step="0.1" @change="saveSettings"
                  style="width: 120px" />
              </template>
            </van-cell>
            <van-cell title="音量">
              <template #right-icon>
                <van-slider v-model="speechVolume" :min="0" :max="1" :step="0.1" @change="saveSettings"
                  style="width: 120px" />
              </template>
            </van-cell>
          </van-cell-group>
        </div>
      </div>

      <div class="voice-history" v-if="voiceHistory.length > 0">
        <h3 class="section-title">语音记录</h3>
        <div class="history-list">
          <div v-for="(record, index) in voiceHistory" :key="index" class="history-item">
            <p class="record-text">{{ record.text }}</p>
            <p class="record-time">{{ record.time }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { showToast } from 'vant'
import { useGirlfriendStore } from '@/stores/girlfriend'
import defaultAvatar from '@/assets/imgs/avatar/boy_moren.svg'

const router = useRouter()
const girlfriendStore = useGirlfriendStore()

// 语音状态
const isListening = ref(false)
const isVoiceEnabled = ref(true)
const speechRate = ref(1.0)
const speechVolume = ref(0.8)
const voiceStatus = ref('准备就绪')
const voiceHistory = ref([])

const goBack = () => {
  router.back()
}

// 切换语音识别
const toggleListening = () => {
  if (!girlfriendStore.isGirlfriendSelected) {
    showToast('请先选择一位女友')
    return
  }

  isListening.value = !isListening.value

  if (isListening.value) {
    startListening()
  } else {
    stopListening()
  }
}

// 开始语音识别
const startListening = () => {
  voiceStatus.value = '正在聆听...'
  showToast('开始语音识别')

  // 模拟语音识别过程
  setTimeout(() => {
    if (isListening.value) {
      const sampleText = '你好，今天过得怎么样？'
      voiceHistory.value.unshift({
        text: sampleText,
        time: new Date().toLocaleTimeString(),
      })

      // 播放女友回复
      if (isVoiceEnabled.value) {
        playGirlfriendVoice(sampleText)
      }

      voiceStatus.value = '识别完成'
      isListening.value = false
    }
  }, 3000)
}

// 停止语音识别
const stopListening = () => {
  voiceStatus.value = '已停止'
  showToast('停止语音识别')
}

// 播放女友语音
const playGirlfriendVoice = (text) => {
  try {
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
    showToast('语音播放失败')
  }
}

// 播放示例语音
const playSampleVoice = () => {
  if (!girlfriendStore.isGirlfriendSelected) {
    showToast('请先选择一位女友')
    return
  }

  const sampleText = '你好，我是你的AI女友，很高兴认识你！'
  playGirlfriendVoice(sampleText)

  voiceHistory.value.unshift({
    text: sampleText,
    time: new Date().toLocaleTimeString(),
  })
}

// 保存语音设置
const saveSettings = () => {
  const settings = {
    enabled: isVoiceEnabled.value,
    rate: speechRate.value,
    volume: speechVolume.value,
  }

  localStorage.setItem('voiceSettings', JSON.stringify(settings))
  showToast('设置已保存')
}

// 组件挂载时恢复设置
onMounted(() => {
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
.voice-container {
  min-height: 100vh;
  background-color: #f5f5f5;
}

.voice-content {
  padding: 20px;
}

.voice-header {
  text-align: center;
  padding: 30px 0;
  background: white;
  border-radius: 12px;
  margin-bottom: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.girlfriend-avatar {
  margin-bottom: 15px;
}

.girlfriend-name {
  font-size: 20px;
  font-weight: 600;
  color: #ff6b8b;
  margin: 0 0 5px 0;
}

.girlfriend-status {
  font-size: 14px;
  color: #6b7280;
  margin: 0;
}

.control-buttons {
  display: flex;
  gap: 15px;
  margin-bottom: 30px;
}

.control-btn {
  flex: 1;
  height: 50px;
}

.voice-settings {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.section-title {
  font-size: 18px;
  font-weight: 600;
  color: #2d3748;
  margin: 0 0 15px 0;
}

.voice-history {
  margin-top: 30px;
}

.history-list {
  background: white;
  border-radius: 12px;
  padding: 15px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.history-item {
  padding: 10px 0;
  border-bottom: 1px solid #f0f0f0;
}

.history-item:last-child {
  border-bottom: none;
}

.record-text {
  font-size: 14px;
  color: #2d3748;
  margin: 0 0 5px 0;
}

.record-time {
  font-size: 12px;
  color: #9ca3af;
  margin: 0;
}
</style>
