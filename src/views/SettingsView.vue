<template>
  <div class="settings-container">
    <van-nav-bar title="系统设置" left-text="返回" left-arrow @click-left="onClickLeft" />

    <div class="settings-content">
      <van-cell-group>
        <van-cell title="通知设置" is-link />
        <van-cell title="隐私设置" is-link />
        <van-cell title="聊天背景" is-link />
        <van-cell title="声音设置" is-link />
        <van-cell title="语言设置" is-link />
      </van-cell-group>

      <van-cell-group style="margin-top: 10px">
        <van-cell title="清除缓存" icon="delete-o" />
        <van-cell title="意见反馈" icon="comment-o" is-link />
        <van-cell title="关于我们" icon="info-o" is-link />
      </van-cell-group>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const onClickLeft = () => {
  router.go(-1)
}
</script>

<style scoped>
.settings-container {
  height: 100vh;
  display: flex;
  flex-direction: column;
}

.settings-content {
  flex: 1;
  padding: 10px;
}
</style>
