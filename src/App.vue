<script setup>
// 全局样式和配置
</script>

<template>
  <router-view />
</template>

<style>
/* 全局样式 */
body {
  margin: 0;
  padding: 0;
  font-family:
    -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans',
    'Helvetica Neue', sans-serif;
  background-color: #f5f5f5;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  touch-action: manipulation;
}

/* 自定义 Toast 样式 - 透明背景 */
.van-toast {
  background: rgba(0, 0, 0, 0.7) !important;
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 12px 20px;
}

.van-toast__text {
  color: white !important;
  font-size: 14px;
}

.van-toast__icon {
  color: white !important;
}

/* 自定义按钮样式 */
.van-button {
  border-radius: 28px;
}

/* 自定义导航栏样式 */
.van-nav-bar {
  background: linear-gradient(90deg, #ff6b8b 0%, #ff8fa3 100%) !important;
}

.van-nav-bar__text {
  color: white !important;
}

.van-nav-bar__title {
  color: white !important;
}

.van-icon {
  color: white !important;
}

/* 滚动条样式 */
::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}

::-webkit-scrollbar-track {
  background: transparent;
}

::-webkit-scrollbar-thumb {
  background: rgba(0, 0, 0, 0.2);
  border-radius: 3px;
}

::-webkit-scrollbar-thumb:hover {
  background: rgba(0, 0, 0, 0.3);
}
</style>
