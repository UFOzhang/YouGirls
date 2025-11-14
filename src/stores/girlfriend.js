import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import ReplySimulator from '@/utils/replySimulator'
import gameManager from '@/utils/gameManager'

export const useGirlfriendStore = defineStore(
  'girlfriend',
  () => {
    // 当前选择的女友
    const currentGirlfriend = ref(null)

    // 聊天历史记录
    const chatHistory = ref([])

    // 聊天统计数据
    const chatStats = ref({
      totalMessages: 0,
      totalTime: 0, // 聊天总时长（秒）
    })

    // 上下文记忆
    const conversationContext = ref({
      lastTopic: '',
      userInterests: [],
      girlfriendMood: 'happy', // happy, sad, excited, tired
      conversationStage: 'greeting', // greeting, normal, deep, farewell
    })

    // 判断是否已选择女友
    const isGirlfriendSelected = computed(() => {
      return currentGirlfriend.value !== null
    })

    // 获取当前女友信息
    const getCurrentGirlfriend = computed(() => {
      return currentGirlfriend.value
    })

    // 获取聊天历史
    const getChatHistory = computed(() => {
      return chatHistory.value
    })

    // 获取聊天统计数据
    const getChatStats = computed(() => {
      return chatStats.value
    })

    // 选择女友
    const selectGirlfriend = (girlfriend) => {
      currentGirlfriend.value = girlfriend
      // 清空之前的聊天记录
      chatHistory.value = []
      // 重置统计数据
      chatStats.value = {
        totalMessages: 0,
        totalTime: 0,
      }
      // 重置上下文
      conversationContext.value = {
        lastTopic: '',
        userInterests: [],
        girlfriendMood: 'happy',
        conversationStage: 'greeting',
      }
    }

    // 清除选择
    const clearSelection = () => {
      currentGirlfriend.value = null
      chatHistory.value = []
      chatStats.value = {
        totalMessages: 0,
        totalTime: 0,
      }
      conversationContext.value = {
        lastTopic: '',
        userInterests: [],
        girlfriendMood: 'happy',
        conversationStage: 'greeting',
      }
    }

    // 添加聊天消息
    const addChatMessage = (message) => {
      chatHistory.value.push(message)
      // 更新统计数据
      chatStats.value.totalMessages += 1
      chatStats.value.totalTime += 10 // 假设每次聊天增加10秒

      // 更新上下文
      if (message.sender === 'user' && message.content) {
        updateContextWithUserMessage(message.content)
      }
    }

    // 更新上下文信息
    const updateContextWithUserMessage = (userMessage) => {
      // 更新最后话题
      if (userMessage.includes('天气')) {
        conversationContext.value.lastTopic = 'weather'
      } else if (userMessage.includes('吃饭') || userMessage.includes('吃')) {
        conversationContext.value.lastTopic = 'food'
      } else if (userMessage.includes('工作') || userMessage.includes('上班')) {
        conversationContext.value.lastTopic = 'work'
      } else if (userMessage.includes('电影') || userMessage.includes('电视剧')) {
        conversationContext.value.lastTopic = 'entertainment'
      } else if (userMessage.includes('音乐')) {
        conversationContext.value.lastTopic = 'music'
      } else if (userMessage.includes('旅行') || userMessage.includes('旅游')) {
        conversationContext.value.lastTopic = 'travel'
      } else if (userMessage.includes('运动')) {
        conversationContext.value.lastTopic = 'sports'
      } else if (userMessage.includes('学习')) {
        conversationContext.value.lastTopic = 'study'
      } else if (userMessage.includes('健康') || userMessage.includes('生病')) {
        conversationContext.value.lastTopic = 'health'
      } else if (userMessage.includes('家人') || userMessage.includes('家庭')) {
        conversationContext.value.lastTopic = 'family'
      } else if (userMessage.includes('朋友') || userMessage.includes('闺蜜')) {
        conversationContext.value.lastTopic = 'friends'
      }

      // 更新用户兴趣
      const interests = []
      if (userMessage.includes('音乐')) interests.push('music')
      if (userMessage.includes('电影')) interests.push('movies')
      if (userMessage.includes('读书')) interests.push('reading')
      if (userMessage.includes('运动')) interests.push('sports')
      if (userMessage.includes('旅行')) interests.push('travel')
      if (userMessage.includes('美食')) interests.push('food')
      if (userMessage.includes('游戏')) interests.push('gaming')

      conversationContext.value.userInterests = [
        ...new Set([...conversationContext.value.userInterests, ...interests]),
      ]

      // 更新对话阶段
      if (chatHistory.value.length > 20) {
        conversationContext.value.conversationStage = 'deep'
      } else if (chatHistory.value.length > 5) {
        conversationContext.value.conversationStage = 'normal'
      }

      // 更新情感状态（根据消息内容判断）
      if (
        userMessage.includes('开心') ||
        userMessage.includes('高兴') ||
        userMessage.includes('快乐')
      ) {
        conversationContext.value.girlfriendMood = 'happy'
      } else if (
        userMessage.includes('难过') ||
        userMessage.includes('伤心') ||
        userMessage.includes('沮丧')
      ) {
        conversationContext.value.girlfriendMood = 'sad'
      } else if (userMessage.includes('兴奋') || userMessage.includes('激动')) {
        conversationContext.value.girlfriendMood = 'excited'
      } else if (userMessage.includes('累') || userMessage.includes('疲惫')) {
        conversationContext.value.girlfriendMood = 'tired'
      } else {
        // 随机变化（较低概率）
        const moods = ['happy', 'sad', 'excited', 'tired']
        if (Math.random() < 0.05) {
          // 5%概率随机改变情感状态
          conversationContext.value.girlfriendMood = moods[Math.floor(Math.random() * moods.length)]
        }
      }
    }

    // 使用智能回复模拟器生成女友回复
    const getGirlfriendReply = (userMessage) => {
      // 检查是否在进行游戏
      const currentGame = gameManager.getCurrentGame()

      // 根据当前进行的游戏处理用户消息
      if (currentGame === 'numberGuess' && /^\d+$/.test(userMessage)) {
        return gameManager.handleNumberGuess(parseInt(userMessage))
      } else if (currentGame === 'wordChain') {
        return gameManager.handleWordChain(userMessage)
      } else if (currentGame === 'riddle') {
        return gameManager.handleRiddle(userMessage)
      } else if (currentGame === 'truthDare') {
        return gameManager.handleTruthDare(userMessage)
      } else if (currentGame === 'twentyQuestions') {
        return gameManager.handleTwentyQuestions(userMessage)
      }

      // 检查是否要开始新游戏
      if (userMessage.includes('猜数字') || userMessage.includes('猜数')) {
        return gameManager.startNumberGuess()
      } else if (userMessage.includes('成语接龙') || userMessage.includes('接龙')) {
        return gameManager.startWordChain()
      } else if (userMessage.includes('谜语') || userMessage.includes('猜谜')) {
        return gameManager.startRiddle()
      } else if (userMessage.includes('真心话') || userMessage.includes('大冒险')) {
        return gameManager.startTruthDare()
      } else if (userMessage.includes('二十个问题') || userMessage.includes('20个问题')) {
        return gameManager.startTwentyQuestions()
      } else if (userMessage.includes('结束游戏') || userMessage.includes('不玩了')) {
        return gameManager.endGame()
      }

      // 使用智能回复模拟器生成女友回复
      const girlfriendType = currentGirlfriend.value?.name || '温柔学姐'
      return ReplySimulator.generateReply(userMessage, girlfriendType, conversationContext.value)
    }

    // 模拟女友回复
    const simulateGirlfriendReply = async (userMessage) => {
      // 模拟网络延迟
      const delay = Math.floor(Math.random() * 1000) + 500 // 500-1500ms
      await new Promise((resolve) => setTimeout(resolve, delay))

      // 获取女友回复
      const reply = getGirlfriendReply(userMessage)

      // 添加女友回复到聊天记录
      const girlfriendReply = {
        id: Date.now(),
        sender: 'girlfriend',
        content: reply,
        timestamp: new Date(),
        avatar: currentGirlfriend.value?.avatar,
      }

      addChatMessage(girlfriendReply)
    }

    return {
      currentGirlfriend,
      chatHistory,
      chatStats,
      conversationContext,
      isGirlfriendSelected,
      getCurrentGirlfriend,
      getChatHistory,
      getChatStats,
      selectGirlfriend,
      clearSelection,
      addChatMessage,
      simulateGirlfriendReply,
    }
  },
  {
    persist: {
      key: 'girlfriend-store',
      storage: localStorage,
      paths: ['currentGirlfriend', 'chatHistory', 'chatStats', 'conversationContext'],
    },
  },
)
