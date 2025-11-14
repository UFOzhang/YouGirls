<template>
  <div class="games-page">
    <!-- 顶部导航 -->
    <van-nav-bar title="互动游戏" left-text="返回" left-arrow @click-left="goBack" class="nav-bar" />

    <!-- 游戏介绍 -->
    <div class="games-intro">
      <h2>和{{ girlfriendName }}一起玩游戏</h2>
      <p>在这里可以和女友一起玩各种有趣的小游戏，增进感情哦~</p>
    </div>

    <!-- 游戏列表 -->
    <div class="games-list">
      <van-cell-group>
        <van-cell title="猜数字游戏" icon="gem-o" is-link @click="startNumberGuess">
          <template #label>
            <div class="game-description">猜一个1-100之间的数字</div>
          </template>
        </van-cell>

        <van-cell title="成语接龙" icon="exchange" is-link @click="startWordChain">
          <template #label>
            <div class="game-description">考验你的词汇量</div>
          </template>
        </van-cell>

        <van-cell title="猜谜语" icon="question-o" is-link @click="startRiddle">
          <template #label>
            <div class="game-description">挑战你的思维能力</div>
          </template>
        </van-cell>

        <van-cell title="真心话大冒险" icon="fire-o" is-link @click="startTruthDare">
          <template #label>
            <div class="game-description">增进彼此了解</div>
          </template>
        </van-cell>

        <van-cell title="二十个问题" icon="question-o" is-link @click="startTwentyQuestions">
          <template #label>
            <div class="game-description">逻辑推理挑战</div>
          </template>
        </van-cell>
      </van-cell-group>
    </div>

    <!-- 游戏区域 -->
    <div v-if="currentGame" class="game-area">
      <div class="game-header">
        <h3>{{ gameTitle }}</h3>
        <van-icon name="close" @click="endGame" class="close-icon" />
      </div>

      <div class="game-content">
        <div class="messages">
          <div v-for="(msg, index) in gameMessages" :key="index" class="message" :class="msg.sender">
            <img v-if="msg.sender === 'girlfriend'" :src="girlfriendAvatar" alt="女友头像" class="avatar" />
            <div class="message-content">{{ msg.content }}</div>
            <img v-if="msg.sender === 'user'" src="../assets/imgs/avatar/boy_moren.svg" alt="用户头像" class="avatar" />
          </div>
        </div>

        <div class="input-area" v-if="!gameEnded">
          <van-field v-model="userInput" placeholder="请输入你的答案" @keyup.enter="sendAnswer">
            <template #button>
              <van-button size="small" type="primary" @click="sendAnswer" :disabled="!userInput.trim()">
                发送
              </van-button>
            </template>
          </van-field>
        </div>
      </div>
    </div>

    <!-- 游戏说明 -->
    <div class="games-info" v-if="!currentGame">
      <van-notice-bar text="在游戏中与女友互动可以增加亲密度哦~" left-icon="info-o" :scrollable="false" />

      <div class="tips">
        <h4>游戏小贴士：</h4>
        <ul>
          <li>猜数字游戏：系统会随机生成1-100的数字，你有10次机会猜中</li>
          <li>成语接龙：根据上一个成语的最后一个字接龙，必须是四字成语</li>
          <li>猜谜语：根据提示猜出正确答案</li>
          <li>真心话大冒险：选择真心话回答问题或选择大冒险完成任务</li>
          <li>二十个问题：通过提问来猜出我想的物品，只能问是或否的问题</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useGirlfriendStore } from '@/stores/girlfriend'
import gameManager from '@/utils/gameManager'

const router = useRouter()
const girlfriendStore = useGirlfriendStore()

// 响应式数据
const currentGame = ref('')
const gameTitle = ref('')
const gameMessages = ref([])
const userInput = ref('')
const gameEnded = ref(false)

// 计算属性
const girlfriendName = computed(() => {
  return girlfriendStore.getCurrentGirlfriend?.name || '女友'
})

const girlfriendAvatar = computed(() => {
  return girlfriendStore.getCurrentGirlfriend?.avatar
})

// 方法
const goBack = () => {
  router.back()
}

const startNumberGuess = () => {
  currentGame.value = 'numberGuess'
  gameTitle.value = '猜数字游戏'
  const reply = gameManager.startNumberGuess()
  gameMessages.value = [
    {
      sender: 'girlfriend',
      content: reply,
    },
  ]
  userInput.value = ''
  gameEnded.value = false
}

const startWordChain = () => {
  currentGame.value = 'wordChain'
  gameTitle.value = '成语接龙'
  const reply = gameManager.startWordChain()
  gameMessages.value = [
    {
      sender: 'girlfriend',
      content: reply,
    },
  ]
  userInput.value = ''
  gameEnded.value = false
}

const startRiddle = () => {
  currentGame.value = 'riddle'
  gameTitle.value = '猜谜语'
  const reply = gameManager.startRiddle()
  gameMessages.value = [{ sender: 'girlfriend', content: reply }]
  userInput.value = ''
  gameEnded.value = false
}

const startTruthDare = () => {
  currentGame.value = 'truthDare'
  gameTitle.value = '真心话大冒险'
  const reply = gameManager.startTruthDare()
  gameMessages.value = [
    {
      sender: 'girlfriend',
      content: reply,
    },
  ]
  userInput.value = ''
  gameEnded.value = false
}

const startTwentyQuestions = () => {
  currentGame.value = 'twentyQuestions'
  gameTitle.value = '二十个问题'
  const reply = gameManager.startTwentyQuestions()
  gameMessages.value = [
    {
      sender: 'girlfriend',
      content: reply,
    },
  ]
  userInput.value = ''
  gameEnded.value = false
}

const sendAnswer = () => {
  if (!userInput.value.trim()) return

  // 添加用户消息
  gameMessages.value.push({
    sender: 'user',
    content: userInput.value,
  })

  // 使用游戏管理器处理用户输入
  setTimeout(() => {
    let reply = ''

    switch (currentGame.value) {
      case 'numberGuess':
        if (/^\d+$/.test(userInput.value)) {
          reply = gameManager.handleNumberGuess(parseInt(userInput.value))
          if (reply.includes('恭喜你猜对了') || reply.includes('很遗憾')) {
            gameEnded.value = true
          }
        } else {
          reply = '请输入一个数字哦~'
        }
        break
      case 'wordChain':
        reply = gameManager.handleWordChain(userInput.value)
        if (reply.includes('接龙不正确') || reply.includes('已经用过')) {
          // 保持游戏继续
        } else {
          gameEnded.value = reply.includes('请输入一个四字成语')
        }
        break
      case 'riddle':
        reply = gameManager.handleRiddle(userInput.value)
        if (reply.includes('恭喜你答对了') || reply.includes('不对哦')) {
          gameEnded.value = true
        }
        break
      case 'truthDare':
        reply = gameManager.handleTruthDare(userInput.value)
        if (reply.includes('请选择真心话或大冒险')) {
          // 保持游戏继续
        } else {
          gameEnded.value = reply.includes('任务')
        }
        break
      case 'twentyQuestions':
        reply = gameManager.handleTwentyQuestions(userInput.value)
        if (reply.includes('恭喜你猜对了') || reply.includes('很遗憾')) {
          gameEnded.value = true
        }
        break
      default:
        reply = '我们一起玩游戏吧~'
    }

    gameMessages.value.push({
      sender: 'girlfriend',
      content: reply,
    })

    // 滚动到底部（实际项目中需要实现）
  }, 500)

  // 清空输入框
  userInput.value = ''
}

const endGame = () => {
  gameManager.endGame()
  currentGame.value = ''
  gameTitle.value = ''
  gameMessages.value = []
  userInput.value = ''
  gameEnded.value = false
}
</script>

<style scoped lang="scss">
.games-page {
  min-height: 100vh;
  background: linear-gradient(180deg, #fdf7fa 0%, #f8f9fa 100%);
}

.nav-bar {
  background: linear-gradient(90deg, #ff6b8b 0%, #ff8fa3 100%);

  .van-nav-bar__title {
    color: #fff;
    font-weight: 600;
  }

  .van-icon {
    color: #fff;
  }
}

.games-intro {
  padding: 20px 16px;
  text-align: center;

  h2 {
    color: #ff6b8b;
    margin-bottom: 8px;
  }

  p {
    color: #666;
    font-size: 14px;
    line-height: 1.5;
  }
}

.games-list {
  margin: 16px;

  .game-description {
    font-size: 12px;
    color: #999;
    margin-top: 4px;
  }
}

.game-area {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #fff;
  z-index: 1000;
  display: flex;
  flex-direction: column;

  .game-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 16px;
    background: linear-gradient(90deg, #ff6b8b 0%, #ff8fa3 100%);
    color: #fff;

    h3 {
      margin: 0;
      font-size: 18px;
    }

    .close-icon {
      font-size: 20px;
    }
  }

  .game-content {
    flex: 1;
    display: flex;
    flex-direction: column;

    .messages {
      flex: 1;
      overflow-y: auto;
      padding: 16px;

      .message {
        display: flex;
        margin-bottom: 16px;
        align-items: flex-start;

        &.girlfriend {
          flex-direction: row;
        }

        &.user {
          flex-direction: row-reverse;
        }

        .avatar {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          margin: 0 10px;
        }

        .message-content {
          max-width: 70%;
          padding: 10px 15px;
          border-radius: 18px;
          word-wrap: break-word;

          .girlfriend & {
            background-color: #f0f0f0;
            border-radius: 4px 18px 18px 18px;
          }

          .user & {
            background-color: #ff6b8b;
            color: #fff;
            border-radius: 18px 4px 18px 18px;
          }
        }
      }
    }

    .input-area {
      padding: 16px;
      border-top: 1px solid #f0f0f0;
    }
  }
}

.games-info {
  margin: 16px;

  .tips {
    margin-top: 16px;
    padding: 16px;
    background: #fff;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);

    h4 {
      color: #ff6b8b;
      margin-top: 0;
    }

    ul {
      padding-left: 18px;

      li {
        margin-bottom: 8px;
        font-size: 14px;
        color: #666;
        line-height: 1.4;
      }
    }
  }
}
</style>
