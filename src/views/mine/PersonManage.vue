<template>
  <div class="person-container">
    <div class="profile-header">
      <van-image
        round
        width="80"
        height="80"
        :src="
          girlfriendStore.isGirlfriendSelected
            ? girlfriendStore.getCurrentGirlfriend?.avatar
            : defaultAvatar
        "
        class="avatar"
      />
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

    <van-cell-group class="profile-section">
      <van-cell title="选择女友" is-link icon="user-o" @click="goToSelection" />
      <van-cell title="聊天记录" is-link icon="chat-o" @click="goToChat" />
      <van-cell title="系统设置" is-link icon="setting-o" />
    </van-cell-group>

    <van-cell-group class="profile-section">
      <van-cell title="关于我们" is-link icon="info-o" />
      <van-cell title="意见反馈" is-link icon="comment-o" />
    </van-cell-group>

    <div class="action-buttons">
      <van-button
        v-if="girlfriendStore.isGirlfriendSelected"
        type="danger"
        block
        round
        @click="showExitDialog = true"
      >
        退出当前
      </van-button>
      <van-button v-else type="primary" block round @click="goToSelection"> 选择女友 </van-button>
    </div>

    <!-- 退出确认对话框 -->
    <van-dialog
      v-model:show="showExitDialog"
      title="确认退出"
      message="吗？退出后将清空聊天记录。"
      show-cancel-button
      @confirm="exitGirlfriend"
      @cancel="showExitDialog = false"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useGirlfriendStore } from '@/stores/girlfriend'
import defaultAvatar from '@/assets/imgs/default_user.png'

const router = useRouter()
const girlfriendStore = useGirlfriendStore()
const showExitDialog = ref(false)

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

const exitGirlfriend = () => {
  // 清除女友选择
  girlfriendStore.clearSelection()
  showExitDialog.value = false

  // 显示提示
  setTimeout(() => {
    // Toast.success('已退出当前女友，聊天记录已清空')
  }, 100)
}
</script>

<style scoped>
.person-container {
  min-height: 100vh;
  background-color: #f5f5f5;
}

.profile-header {
  display: flex;
  align-items: center;
  padding: 30px 20px;
  background: linear-gradient(90deg, #ff6b8b 0%, #ff8fa3 100%);
  color: white;
}

.avatar {
  border: 3px solid white;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.user-info {
  margin-left: 20px;
}

.username {
  font-size: 20px;
  font-weight: 600;
  margin: 0 0 5px 0;
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
}

.action-buttons {
  padding: 20px;
}
</style>
