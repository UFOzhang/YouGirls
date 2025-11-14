<template>
  <div class="button-home">
    <!-- 页面标题 -->
    <div class="page-header">
      <van-icon name="heart" color="#ff6b8b" size="24" class="header-icon" />
      <!-- <h1 class="page-title">AI 女友 · 功能入口</h1> -->
    </div>

    <!-- 按钮容器（垂直排列，居中展示） -->
    <div class="button-container">
      <!-- 主要按钮 -->
      <van-button type="primary" class="custom-button primary-btn" @click="handleButtonClick('chat')">
        <van-icon name="chat-o" class="btn-icon" /> 开始聊天
      </van-button>

      <!-- 成功按钮 -->
      <van-button type="success" class="custom-button success-btn" @click="handleButtonClick('voice')">
        <van-icon name="voice-o" class="btn-icon" /> 语音互动
      </van-button>

      <!-- 默认按钮 -->
      <van-button type="default" class="custom-button default-btn" @click="handleButtonClick('persona')">
        <van-icon name="user-o" class="btn-icon" /> 切换风格
      </van-button>

      <!-- 警告按钮 -->
      <van-button type="warning" class="custom-button warning-btn" @click="handleButtonClick('settings')">
        <van-icon name="settings-o" class="btn-icon" /> 系统设置
      </van-button>

      <!-- 危险按钮 -->
      <van-button type="danger" class="custom-button danger-btn" @click="handleButtonClick('clear')">
        <van-icon name="delete-o" class="btn-icon" /> 清除记录
      </van-button>
    </div>

    <!-- 底部装饰 -->
    <div class="page-footer">
      <p class="footer-text">AI 女友 · 温暖陪伴每一天</p>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { showToast } from 'vant'

const router = useRouter()

// 按钮点击事件
const handleButtonClick = (type) => {
  const btnTextMap = {
    chat: '开始聊天',
    voice: '语音互动',
    persona: '切换人设',
    settings: '系统设置',
    clear: '清除记录',
  }

  showToast({
    message: `点击了【${btnTextMap[type]}】`,
    icon: 'success',
    duration: 1500,
  })

  // 根据按钮类型跳转到不同页面
  switch (type) {
    case 'chat':
      // 跳转到聊天页（需要创建对应页面）
      router.push('/chat')
      break
    case 'voice':
      // 跳转到语音互动页（需要创建对应页面）
      router.push('/voice')
      break
    case 'persona':
      // 跳转到人设切换页（需要创建对应页面）
      router.push('/persona')
      break
    case 'settings':
      // 跳转到系统设置页（需要创建对应页面）
      router.push('/settings')
      break
    case 'clear':
      // 清除记录操作
      showToast({
        message: '记录已清除',
        icon: 'checked',
        duration: 1500,
      })
      break
    default:
      break
  }
}
</script>

<style scoped lang="scss">
// 页面整体样式
.button-home {
  min-height: 100vh;
  background: linear-gradient(135deg, #fdf2f8 0%, #fef7fb 100%);
  padding: 20px 16px;
  box-sizing: border-box;
  flex-direction: column;
  align-items: center;
}

// 页面标题
.page-header {
  display: flex;
  align-items: center;
  margin-bottom: 40px;
  padding-top: 10px;

  .header-icon {
    margin-right: 8px;
  }

  .page-title {
    font-size: 22px;
    font-weight: 600;
    color: #2d3748;
  }
}

// 按钮容器
.button-container {
  width: 100%;
  max-width: 350px;
  display: flex;
  flex-direction: column;
  gap: 18px;
  flex: 1;
  justify-content: center;
}

// 自定义按钮样式（优化圆角、阴影、内边距）
.custom-button {
  height: 56px;
  font-size: 18px;
  font-weight: 500;
  border-radius: 28px !important; // 圆角优化
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
  padding: 0 24px;

  // 图标样式
  .btn-icon {
    margin-right: 8px;
    font-size: 20px;
  }

  // 触摸反馈
  &:active {
    transform: scale(0.98);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  }
}

// 各类型按钮个性化调整
.primary-btn {
  background: linear-gradient(90deg, #ff6b8b 0%, #ff8fa3 100%) !important;
  border: none !important;
}

.success-btn {
  background: linear-gradient(90deg, #42b983 0%, #4fc08d 100%) !important;
  border: none !important;
}

.default-btn {
  background: #ffffff !important;
  color: #2d3748 !important;
  border: 1px solid #e8f4f8 !important;
}

.warning-btn {
  background: linear-gradient(90deg, #ffc107 0%, #ffd54f 100%) !important;
  border: none !important;
}

.danger-btn {
  background: linear-gradient(90deg, #f56c6c 0%, #f78989 100%) !important;
  border: none !important;
}

// 底部样式
.page-footer {
  margin-top: 40px;
  padding-bottom: 20px;

  .footer-text {
    font-size: 14px;
    color: #718096;
    text-align: center;
  }
}

// 适配小屏手机
@media (max-width: 320px) {
  .custom-button {
    height: 52px;
    font-size: 16px;
  }

  .page-title {
    font-size: 20px;
  }
}
</style>
