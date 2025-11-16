<template>
  <div class="settings-container">
    <van-nav-bar title="系统设置" left-text="返回" left-arrow @click-left="goBack" />

    <div class="settings-content">
      <van-cell-group title="通用设置">
        <van-cell title="消息通知" is-link>
          <template #right-icon>
            <van-switch v-model="notificationEnabled" size="20" />
          </template>
        </van-cell>
        <van-cell title="声音提示" is-link>
          <template #right-icon>
            <van-switch v-model="soundEnabled" size="20" />
          </template>
        </van-cell>
        <van-cell title="震动反馈" is-link>
          <template #right-icon>
            <van-switch v-model="vibrateEnabled" size="20" />
          </template>
        </van-cell>
      </van-cell-group>

      <van-cell-group title="聊天设置">
        <van-cell title="语音播报" is-link @click="goToVoiceSettings">
          <template #right-icon>
            <van-icon name="arrow" />
          </template>
        </van-cell>
        <van-cell title="聊天背景" is-link>
          <template #right-icon>
            <van-icon name="arrow" />
          </template>
        </van-cell>
        <van-cell title="字体大小" is-link>
          <template #right-icon>
            <van-icon name="arrow" />
          </template>
        </van-cell>
      </van-cell-group>

      <van-cell-group title="其他">
        <van-cell title="清除缓存" is-link @click="clearCache" />
        <van-cell title="检查更新" is-link @click="checkUpdate" />
        <van-cell title="关于我们" is-link @click="goToAbout" />
      </van-cell-group>

      <div class="logout-section">
        <van-button type="danger" block round @click="showLogoutConfirm">退出登录</van-button>
      </div>
    </div>

    <!-- 退出确认对话框 -->
    <van-dialog
      v-model:show="showLogoutDialog"
      title="确认退出"
      message="确定要退出登录吗？"
      show-cancel-button
      @confirm="logout"
      @cancel="showLogoutDialog = false"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { showToast } from 'vant'
import { useGirlfriendStore } from '@/stores/girlfriend'

const router = useRouter()
const girlfriendStore = useGirlfriendStore()
const showLogoutDialog = ref(false)

// 设置选项
const notificationEnabled = ref(true)
const soundEnabled = ref(true)
const vibrateEnabled = ref(true)

const goBack = () => {
  router.back()
}

const goToVoiceSettings = () => {
  router.push('/voice')
}

const goToAbout = () => {
  router.push('/about')
}

const clearCache = () => {
  showToast('缓存清除成功')
}

const checkUpdate = () => {
  showToast('当前已是最新版本')
}

const showLogoutConfirm = () => {
  showLogoutDialog.value = true
}

const logout = () => {
  // 清除女友选择
  girlfriendStore.clearSelection()
  showLogoutDialog.value = false

  // 显示提示
  showToast('已退出登录')

  // 跳转到首页
  router.push('/')
}
</script>

<style scoped>
.settings-container {
  min-height: 100vh;
  background-color: #f5f5f5;
}

.settings-content {
  padding: 20px 0;
}

.logout-section {
  padding: 20px;
  margin-top: 20px;
}
</style>
