<template>
  <van-nav-bar
    :title="title"
    :left-text="showBack ? '返回' : ''"
    :left-arrow="showBack"
    :border="border"
    :fixed="fixed"
    :placeholder="fixed"
    @click-left="onBack"
  >
    <template #right>
      <slot name="right"></slot>
    </template>
  </van-nav-bar>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

// 定义组件属性
const props = defineProps({
  title: {
    type: String,
    default: 'AI女友',
  },
  showBack: {
    type: Boolean,
    default: false,
  },
  border: {
    type: Boolean,
    default: true,
  },
  fixed: {
    type: Boolean,
    default: true,
  },
})

// 返回事件
const onBack = () => {
  if (props.showBack) {
    router.go(-1)
  }
}
</script>

<style scoped lang="scss">
/* 可以在这里添加自定义样式 */
</style>
