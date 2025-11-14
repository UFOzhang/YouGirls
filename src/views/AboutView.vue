<template>
  <div class="about-container">
    <van-nav-bar title="关于我们" left-text="返回" left-arrow @click-left="goBack" />

    <div class="about-content">
      <div class="logo-section">
        <van-image round width="100" height="100" src="../assets/imgs/logo.png" class="app-logo" />
        <h2 class="app-name">AI女友</h2>
        <p class="app-version">v1.0.0</p>
      </div>

      <div class="info-section">
        <van-cell-group>
          <van-cell title="功能介绍" is-link icon="info-o" @click="showFeatureIntro" />
          <van-cell title="使用指南" is-link icon="guide-o" @click="showUserGuide" />
          <van-cell title="隐私政策" is-link icon="shield-o" @click="showPrivacyPolicy" />
          <van-cell title="用户协议" is-link icon="balance-o" @click="showUserAgreement" />
        </van-cell-group>
      </div>

      <div class="contact-section">
        <h3 class="section-title">联系我们</h3>
        <div class="contact-info">
          <p>邮箱：aigirl@example.com</p>
          <p>客服微信：aigirl_service</p>
          <p>官方网站：www.aigirl.com</p>
        </div>
      </div>

      <div class="feedback-section">
        <van-button type="primary" block round @click="goToFeedback">意见反馈</van-button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { showToast } from 'vant'

const router = useRouter()

const goBack = () => {
  router.back()
}

const showFeatureIntro = () => {
  showToast('功能介绍页面开发中')
}

const showUserGuide = () => {
  showToast('使用指南页面开发中')
}

const showPrivacyPolicy = () => {
  showToast('隐私政策页面开发中')
}

const showUserAgreement = () => {
  showToast('用户协议页面开发中')
}

const goToFeedback = () => {
  showToast('意见反馈页面开发中')
}
</script>

<style scoped>
.about-container {
  min-height: 100vh;
  background-color: #f5f5f5;
}

.about-content {
  padding: 20px;
}

.logo-section {
  text-align: center;
  padding: 40px 0;
  background: white;
  border-radius: 12px;
  margin-bottom: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.app-logo {
  margin-bottom: 20px;
}

.app-name {
  font-size: 24px;
  font-weight: 600;
  color: #ff6b8b;
  margin: 0 0 10px 0;
}

.app-version {
  font-size: 14px;
  color: #6b7280;
  margin: 0;
}

.info-section {
  margin-bottom: 20px;
}

.contact-section {
  background: white;
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.section-title {
  font-size: 18px;
  font-weight: 600;
  color: #2d3748;
  margin: 0 0 15px 0;
}

.contact-info {
  font-size: 14px;
  color: #6b7280;
  line-height: 1.6;
}

.feedback-section {
  padding: 0 20px;
}
</style>
