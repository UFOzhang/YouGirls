<template>
  <div class="voice-container">
    <van-nav-bar title="语音互动" left-text="返回" left-arrow @click-left="onClickLeft" />

    <div class="voice-content">
      <div class="voice-icon">
        <van-icon name="volume-o" size="64" color="#42b983" />
      </div>
      <p class="voice-text">点击下方按钮开始语音对话</p>

      <van-button type="primary" round class="voice-btn" @click="startVoice">
        <van-icon name="mic-o" /> 开始录音
      </van-button>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { showToast } from 'vant'

const router = useRouter()

const onClickLeft = () => {
  router.go(-1)
}

const startVoice = () => {
  showToast({
    message: '开始录音...',
    duration: 1000,
  })

  // 模拟录音过程
  setTimeout(() => {
    showToast({
      message: '录音结束，正在识别...',
      duration: 1500,
    })
  }, 2000)
}
</script>

<style scoped>
.voice-container {
  height: 100vh;
  display: flex;
  flex-direction: column;
}

.voice-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

.voice-icon {
  margin-bottom: 20px;
}

.voice-text {
  font-size: 16px;
  color: #666;
  margin-bottom: 30px;
}

.voice-btn {
  width: 60%;
  height: 50px;
}
</style>
