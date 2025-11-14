<template>
  <div class="girl-selection-container">
    <van-nav-bar title="选择你的女友" left-text="返回" left-arrow @click-left="onClickLeft" />

    <div class="selection-content">
      <h2 class="title">选择你喜欢的风格</h2>

      <div class="girl-grid">
        <div
          v-for="(girl, index) in girls"
          :key="index"
          class="girl-card"
          :class="{ selected: selectedGirl === index }"
          @click="selectGirl(index)"
        >
          <div class="girl-image">
            <div class="image-placeholder" :style="{ backgroundColor: girl.color }">
              <van-icon :name="girl.icon" size="40" color="#fff" />
            </div>
          </div>
          <div class="girl-info">
            <h3 class="girl-name">{{ girl.name }}</h3>
            <p class="girl-desc">{{ girl.description }}</p>
          </div>
        </div>
      </div>

      <div v-if="selectedGirl !== null" class="confirm-section animate__animated animate__fadeInUp">
        <van-button type="primary" round size="large" class="confirm-btn" @click="confirmSelection">
          确认选择
        </van-button>
      </div>
    </div>

    <!-- 确认动画模态框 -->
    <van-popup
      v-model:show="showConfirmModal"
      position="center"
      :style="{ width: '90%', height: '80%', borderRadius: '16px' }"
      @opened="playConfirmAnimation"
    >
      <div class="confirm-modal-content">
        <div class="animation-container">
          <div ref="animationElement" class="animated-element" :class="confirmAnimationClass">
            <van-icon
              :name="girls[selectedGirl]?.icon"
              size="80"
              :color="girls[selectedGirl]?.color"
            />
          </div>
        </div>
        <h2 class="confirm-title">恭喜你!</h2>
        <p class="confirm-text">你已成功选择 {{ girls[selectedGirl]?.name }}</p>
        <van-button type="primary" round class="close-btn" @click="closeConfirmModal">
          开始体验
        </van-button>
      </div>
    </van-popup>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { showToast } from 'vant'
import 'animate.css'

const router = useRouter()

// 女友数据
const girls = ref([
  {
    name: '温柔姐姐',
    description: '温柔体贴，善解人意',
    icon: 'user-o',
    color: '#ff6b8b',
    sound: '温柔的声音：你好呀~',
  },
  {
    name: '活泼少女',
    description: '开朗活泼，充满活力',
    icon: 'smile-o',
    color: '#42b983',
    sound: '活泼的声音：嗨！今天心情怎么样？',
  },
  {
    name: '知性御姐',
    description: '成熟稳重，智慧优雅',
    icon: 'diamond-o',
    color: '#3eaf7c',
    sound: '优雅的声音：有什么问题需要我帮你解答吗？',
  },
  {
    name: '可爱萝莉',
    description: '天真烂漫，萌态十足',
    icon: 'like-o',
    color: '#ff9900',
    sound: '萌萌的声音：欧尼酱~',
  },
  {
    name: '高冷女神',
    description: '冷艳高贵，神秘莫测',
    icon: 'star-o',
    color: '#744da9',
    sound: '高冷的声音：嗯...你好。',
  },
  {
    name: '元气少女',
    description: '阳光元气，积极向上',
    icon: 'fire-o',
    color: '#ff6b6b',
    sound: '元气的声音：加油！今天也要元气满满哦！',
  },
])

const selectedGirl = ref(null)
const showConfirmModal = ref(false)
const confirmAnimationClass = ref('')

const onClickLeft = () => {
  router.go(-1)
}

const selectGirl = (index) => {
  selectedGirl.value = index
  // 添加选中动画
  showToast({
    message: `已选择【${girls.value[index].name}】`,
    icon: 'success',
    duration: 1000,
  })
}

const confirmSelection = () => {
  if (selectedGirl.value !== null) {
    showConfirmModal.value = true
    // 播放选中声音
    playSound(girls.value[selectedGirl.value].sound)
  }
}

const playConfirmAnimation = () => {
  // 随机选择一个动画效果
  const animations = [
    'animate__bounceIn',
    'animate__fadeInDown',
    'animate__zoomIn',
    'animate__flipInX',
    'animate__rotateIn',
  ]

  const randomAnimation = animations[Math.floor(Math.random() * animations.length)]
  confirmAnimationClass.value = randomAnimation
}

const playSound = (text) => {
  // 模拟播放声音
  showToast({
    message: text,
    duration: 2000,
    icon: 'volume-o',
  })
}

const closeConfirmModal = () => {
  showConfirmModal.value = false
  // 跳转到聊天页面或其他页面
  router.push('/chat')
}
</script>

<style scoped>
.girl-selection-container {
  height: 100vh;
  display: flex;
  flex-direction: column;
  background: linear-gradient(135deg, #fdf2f8 0%, #fef7fb 100%);
}

.selection-content {
  flex: 1;
  padding: 20px;
  overflow-y: auto;
}

.title {
  text-align: center;
  font-size: 24px;
  font-weight: 600;
  color: #2d3748;
  margin-bottom: 30px;
}

.girl-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
}

.girl-card {
  background: white;
  border-radius: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  padding: 20px;
  text-align: center;
  transition: all 0.3s ease;
  cursor: pointer;
}

.girl-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.12);
}

.girl-card.selected {
  border: 2px solid #ff6b8b;
  transform: scale(1.05);
}

.image-placeholder {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 15px;
}

.girl-name {
  font-size: 18px;
  font-weight: 600;
  color: #2d3748;
  margin-bottom: 8px;
}

.girl-desc {
  font-size: 14px;
  color: #718096;
  line-height: 1.4;
}

.confirm-section {
  margin-top: 30px;
  padding: 0 20px;
}

.confirm-btn {
  height: 50px;
  font-size: 18px;
  font-weight: 500;
}

.confirm-modal-content {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  text-align: center;
}

.animation-container {
  width: 120px;
  height: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
}

.animated-element {
  display: flex;
  align-items: center;
  justify-content: center;
}

.confirm-title {
  font-size: 28px;
  font-weight: 600;
  color: #2d3748;
  margin-bottom: 10px;
}

.confirm-text {
  font-size: 16px;
  color: #718096;
  margin-bottom: 30px;
}

.close-btn {
  width: 80%;
  height: 45px;
  font-size: 16px;
}
</style>
