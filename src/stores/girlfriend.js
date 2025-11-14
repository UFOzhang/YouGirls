import { defineStore } from 'pinia'

export const useGirlfriendStore = defineStore('girlfriend', {
  state: () => ({
    // 当前选择的女友信息
    currentGirlfriend: null,
    // 聊天记录
    chatHistory: [],
    // 是否已选择女友
    hasSelected: false,
  }),

  getters: {
    // 获取当前女友信息
    getCurrentGirlfriend: (state) => state.currentGirlfriend,
    // 获取聊天记录
    getChatHistory: (state) => state.chatHistory,
    // 检查是否已选择女友
    isGirlfriendSelected: (state) => state.hasSelected,
  },

  actions: {
    // 选择女友
    selectGirlfriend(girlfriend) {
      this.currentGirlfriend = girlfriend
      this.hasSelected = true
      // 清空之前的聊天记录
      this.chatHistory = []
    },

    // 添加聊天记录
    addChatMessage(message) {
      this.chatHistory.push(message)
    },

    // 清除选择
    clearSelection() {
      this.currentGirlfriend = null
      this.hasSelected = false
      this.chatHistory = []
    },

    // 模拟女友回复
    async simulateGirlfriendReply() {
      // 模拟网络延迟
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // 根据不同女友类型生成回复
      const replies = {
        温柔学姐: [
          '嗯，你说得对呢~',
          '有什么心事可以和我说哦',
          '要照顾好自己呀',
          '我相信你可以的~',
        ],
        可爱少女: ['哇！好有趣呢！', '嘻嘻，我也这么觉得~', '今天天气真好呢！', '一起出去玩吧！'],
        高冷御姐: [
          '这个想法不错。',
          '你需要更专业的建议吗？',
          '工作要注意劳逸结合。',
          '我会支持你的决定。',
        ],
        定制女友: [
          '根据你的喜好，我觉得...',
          '这个建议怎么样？',
          '为你量身定制的方案是...',
          '专属服务，只为你提供。',
        ],
      }

      const girlfriendType = this.currentGirlfriend?.name || '温柔学姐'
      const possibleReplies = replies[girlfriendType] || replies['温柔学姐']
      const randomReply = possibleReplies[Math.floor(Math.random() * possibleReplies.length)]

      // 添加女友回复到聊天记录
      const replyMessage = {
        id: Date.now(),
        sender: 'girlfriend',
        content: randomReply,
        timestamp: new Date(),
        avatar: this.currentGirlfriend?.avatar,
      }

      this.addChatMessage(replyMessage)
      return replyMessage
    },
  },

  // 持久化存储
  persist: {
    key: 'girlfriend-store',
    storage: localStorage,
    paths: ['currentGirlfriend', 'hasSelected'],
  },
})
