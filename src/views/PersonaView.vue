<template>
  <div class="persona-page">
    <!-- 顶部导航 -->
    <van-nav-bar title="选择女友风格" left-arrow @click-left="handleGoBack" class="nav-bar" />

    <!-- 风格分类标签 -->
    <van-tabs v-model:active="activeTab" swipeable>
      <van-tab title="温柔系" />
      <van-tab title="可爱系" />
      <van-tab title="御姐系" />
      <van-tab title="定制系" />
    </van-tabs>

    <!-- 人设卡片列表 -->
    <div class="persona-list">
      <div
        v-for="(persona, index) in personaList"
        :key="index"
        class="persona-card"
        :class="{ active: currentPersona.id === persona.id }"
        @click="handleSelectPersona(persona)"
      >
        <!-- 头像区域 -->
        <div class="avatar-wrapper">
          <img :src="persona.avatar" alt="女友头像" class="persona-avatar" />
          <div class="tag" v-if="persona.isNew">新</div>
          <div class="tag hot" v-if="persona.isHot">热门</div>
        </div>

        <!-- 信息区域 -->
        <div class="persona-info">
          <h3 class="persona-name">{{ persona.name }}</h3>
          <p class="persona-desc">{{ persona.desc }}</p>
          <div class="persona-tags">
            <van-tag v-for="tag in persona.tags" :key="tag" type="primary" size="small">
              {{ tag }}
            </van-tag>
          </div>
        </div>

        <!-- 选中标识 -->
        <van-icon
          name="checked"
          color="#ff6b8b"
          size="24"
          class="check-icon"
          v-if="currentPersona.id === persona.id"
        />
      </div>
    </div>

    <!-- 底部操作栏 -->
    <div class="action-bar">
      <van-button
        type="primary"
        round
        block
        class="confirm-btn"
        :disabled="!currentPersona"
        @click="handleConfirm"
      >
        确认选择
        <van-icon name="arrow-right" class="btn-icon" />
      </van-button>
    </div>

    <!-- 确认对话框 -->
    <van-dialog
      v-model:show="showDialog"
      title="确认选择"
      show-cancel-button
      @confirm="confirmSelection"
      @cancel="showDialog = false"
    >
      <div class="dialog-content">
        <p>确定要将女友风格切换为【{{ currentPersona?.name }}】吗？</p>
      </div>
    </van-dialog>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { showToast } from 'vant'
import { useGirlfriendStore } from '@/stores/girlfriend'
import soundPlayer from '@/utils/soundPlayer'
// 引入图片
import img_wenrou from '../assets/imgs/girls/girls_wenrou.png'
import img_lovely from '../assets/imgs/girls/girls_lovely.png'
import img_yujie from '../assets/imgs/girls/girls_yujie.png'
import img_make from '../assets/imgs/girls/girls_make.png'

const router = useRouter()
const girlfriendStore = useGirlfriendStore()
const activeTab = ref(0) // 选中的标签页
const currentPersona = ref(null) // 当前选中的人设
const showDialog = ref(false) // 控制对话框显示

// 人设数据列表（可替换为实际接口数据）
const personaList = ref([
  {
    id: 1,
    name: '温柔学姐',
    avatar: img_wenrou,
    desc: '温柔体贴，善解人意，像邻家姐姐一样温暖',
    tags: ['温柔', '体贴', '治愈'],
    isNew: false,
    isHot: true,
    style: '温柔系',
    greeting: '你好，让我做你的女朋友吧~',
  },
  {
    id: 2,
    name: '可爱少女',
    avatar: img_lovely,
    desc: '活泼可爱，充满元气，每天都能带来好心情',
    tags: ['可爱', '元气', '甜妹'],
    isNew: true,
    isHot: true,
    style: '可爱系',
    greeting: '你好呀！让我做你的女朋友吧！',
  },
  {
    id: 3,
    name: '高冷御姐',
    avatar: img_yujie,
    desc: '成熟知性，外冷内热，总能给你可靠的建议',
    tags: ['御姐', '知性', '干练'],
    isNew: false,
    isHot: false,
    style: '御姐系',
    greeting: '你好，我愿意做你的女朋友。',
  },
  {
    id: 4,
    name: '定制女友',
    avatar: img_make,
    desc: '根据你的喜好，生成专属女友风格',
    tags: ['定制', '专属', '个性化'],
    isNew: true,
    isHot: false,
    style: '定制系',
    greeting: '你好，让我成为你的专属女朋友吧！',
  },
])

// 初始化选中第一个人设
watch(
  () => personaList.value,
  () => {
    if (personaList.value.length > 0) {
      currentPersona.value = personaList.value[0]
    }
  },
  { immediate: true },
)

// 切换标签页时过滤人设
watch(activeTab, (val) => {
  const tabMap = ['温柔系', '可爱系', '御姐系', '定制系']
  const filtered = personaList.value.filter((item) => item.style === tabMap[val])
  if (filtered.length > 0) {
    currentPersona.value = filtered[0]
  }
})

// 选择人设
const handleSelectPersona = (persona) => {
  currentPersona.value = persona
}

// 返回上一页
const handleGoBack = () => {
  router.back()
}

// 点击确认选择
const handleConfirm = () => {
  showDialog.value = true
}

// 确认选择
const confirmSelection = async () => {
  // 保存选择到 Pinia store
  girlfriendStore.selectGirlfriend(currentPersona.value)

  // 播放女友的打招呼声音
  await playGreetingSound(currentPersona.value)

  // 显示成功提示
  showToast({
    message: '切换成功',
    type: 'success',
    duration: 1500,
    onClose: () => {
      router.push('/chat') // 切换后跳转到聊天页
    },
  })
}

// 播放女友打招呼声音
const playGreetingSound = async (persona) => {
  try {
    // 先显示 Toast 提示
    showToast({
      message: persona.greeting,
      duration: 5000, // 延长显示时间以匹配语音播放
      icon: 'volume-o',
    })

    // 使用真正的语音合成播放"你好，让我做你的女朋友吧"
    await soundPlayer.playChineseGreeting(persona.name)
  } catch (error) {
    console.warn('语音播放失败，使用备选方案:', error)
    // 如果语音播放失败，使用音调模拟作为备选方案
    try {
      await soundPlayer.playGreeting(persona.name)
      // 显示 Toast 提示
      showToast({
        message: persona.greeting,
        duration: 3000,
        icon: 'volume-o',
      })
    } catch (fallbackError) {
      console.warn('备选方案也失败了:', fallbackError)
      // 如果所有方案都失败，至少显示 Toast 提示
      showToast({
        message: persona.greeting,
        duration: 3000,
        icon: 'volume-o',
      })
    }
  }
}
</script>

<style scoped lang="scss">
// 页面整体样式
.persona-page {
  min-height: 100vh;
  background: linear-gradient(180deg, #fdf7fa 0%, #f8f9fa 100%);
}

// 导航栏
.nav-bar {
  background: linear-gradient(90deg, #ff6b8b 0%, #ff8fa3 100%);
  box-shadow: 0 2px 8px rgba(255, 107, 139, 0.2);

  .van-nav-bar__title {
    color: #fff;
    font-weight: 600;
  }

  .van-icon {
    color: #fff;
  }
}

// 标签页
.van-tabs {
  margin: 16px 0;
  background-color: #fff;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);

  .van-tab {
    color: #6b7280;
    font-weight: 500;

    &.van-tab--active {
      color: #ff6b8b;
    }
  }

  .van-tabs__line {
    background-color: #ff6b8b;
  }
}

// 人设卡片列表
.persona-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 0 16px 24px;
}

// 人设卡片
.persona-card {
  background-color: #fff;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  display: flex;
  align-items: center;
  padding: 16px;
  transition: all 0.3s ease;
  cursor: pointer;

  &:hover,
  &.active {
    transform: translateY(-4px);
    box-shadow: 0 8px 16px rgba(255, 107, 139, 0.15);
  }

  // 头像区域
  .avatar-wrapper {
    position: relative;
    margin-right: 16px;

    .persona-avatar {
      width: 80px;
      height: 80px;
      border-radius: 50%;
      object-fit: cover;
      border: 3px solid #fff;
      box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
    }

    .tag {
      position: absolute;
      top: -4px;
      right: -4px;
      background-color: #ff6b8b;
      color: #fff;
      font-size: 12px;
      font-weight: 600;
      padding: 2px 6px;
      border-radius: 12px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }

    .tag.hot {
      background-color: #ff9800;
    }
  }

  // 信息区域
  .persona-info {
    flex: 1;

    .persona-name {
      font-size: 18px;
      font-weight: 600;
      color: #2d3748;
      margin-bottom: 4px;
    }

    .persona-desc {
      font-size: 14px;
      color: #6b7280;
      margin-bottom: 8px;
      line-height: 1.4;
    }

    .persona-tags {
      display: flex;
      flex-wrap: wrap;
      gap: 4px;
    }
  }

  // 选中标识
  .check-icon {
    animation: pulse 1.5s infinite;
  }
}

// 底部操作栏
.action-bar {
  position: sticky;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(to top, #fff 0%, rgba(255, 255, 255, 0.8) 100%);
  padding: 16px;
  box-sizing: border-box;
  z-index: 10;
}

// 确认按钮
.confirm-btn {
  height: 56px;
  background: linear-gradient(90deg, #ff6b8b 0%, #ff8fa3 100%);
  border: none;
  font-size: 18px;
  font-weight: 600;
  box-shadow: 0 4px 12px rgba(255, 107, 139, 0.3);
  transition: all 0.3s ease;

  &:active {
    transform: scale(0.98);
    box-shadow: 0 2px 8px rgba(255, 107, 139, 0.2);
  }

  .btn-icon {
    margin-left: 4px;
  }

  &:disabled {
    background: #e5e7eb;
    color: #9ca3af;
    box-shadow: none;
    cursor: not-allowed;
  }
}

// 对话框内容
.dialog-content {
  padding: 20px;
  text-align: center;
}

// 动画效果
@keyframes pulse {
  0% {
    transform: scale(1);
  }

  50% {
    transform: scale(1.1);
  }

  100% {
    transform: scale(1);
  }
}

// 适配小屏手机
@media (max-width: 320px) {
  .persona-card {
    padding: 12px;
  }

  .persona-avatar {
    width: 70px;
    height: 70px;
  }

  .persona-name {
    font-size: 16px;
  }

  .confirm-btn {
    height: 50px;
    font-size: 16px;
  }
}
</style>
