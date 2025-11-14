<template>
  <div v-if="showAnimation" class="video-animation-overlay" @click="closeAnimation">
    <div class="video-animation-content" @click.stop>
      <video
        ref="videoPlayer"
        :src="currentVideo"
        class="animation-video"
        autoplay
        muted
        @ended="onVideoEnd"
        @click="closeAnimation"
      ></video>
      <van-icon name="close" class="close-icon" @click="closeAnimation" />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { showToast } from 'vant'
import video1 from '../assets/videos/video1.mp4'
import video2 from '../assets/videos/video2.mp4'
import video3 from '../assets/videos/video3.mp4'
import video4 from '../assets/videos/video4.mp4'
const showAnimation = ref(false)
const currentVideo = ref('')
const videoPlayer = ref(null)

// 视频资源列表 - 使用 public 目录下的路径
const videoList = [video1, video3, video2, video4]

// 显示动画
const showVideoAnimation = (videoIndex = null) => {
  // 如果指定了视频索引，使用指定的视频，否则随机选择一个
  if (videoIndex !== null && videoIndex >= 0 && videoIndex < videoList.length) {
    currentVideo.value = videoList[videoIndex]
  } else {
    const randomIndex = Math.floor(Math.random() * videoList.length)
    currentVideo.value = videoList[randomIndex]
  }

  showAnimation.value = true

  // 确保视频在显示时重新加载并播放
  setTimeout(() => {
    if (videoPlayer.value) {
      videoPlayer.value.load()
      videoPlayer.value.play().catch((e) => {
        console.log('视频播放失败:', e)
        // 如果视频播放失败，显示 Toast 提示
        showToast({
          message: '视频播放失败',
          type: 'fail',
          duration: 2000,
        })
      })
    }
  }, 100)
}

// 关闭动画
const closeAnimation = () => {
  showAnimation.value = false
  if (videoPlayer.value) {
    videoPlayer.value.pause()
  }
}

// 视频播放结束
const onVideoEnd = () => {
  closeAnimation()
}

// 暴露方法给父组件
defineExpose({
  showVideoAnimation,
  closeAnimation,
})

onMounted(() => {
  // 检查视频文件是否存在
  videoList.forEach((videoSrc) => {
    const video = document.createElement('video')
    video.src = videoSrc
    video.addEventListener('error', () => {
      console.warn(`视频文件加载失败: ${videoSrc}`)
    })
  })
})
</script>

<style scoped lang="scss">
.video-animation-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
  animation: fadeIn 0.3s ease;
}

.video-animation-content {
  position: relative;
  max-width: 90%;
  max-height: 90%;
}

.animation-video {
  max-width: 100%;
  max-height: 80vh;
  border-radius: 12px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
}

.close-icon {
  position: absolute;
  top: -40px;
  right: 0;
  color: white;
  font-size: 24px;
  cursor: pointer;
  background: rgba(0, 0, 0, 0.5);
  border-radius: 50%;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes fadeOut {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}
</style>
