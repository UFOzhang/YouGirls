// 声音播放工具类
class SoundPlayer {
  constructor() {
    this.audioContext = null
    this.isInitialized = false
    this.speechSynthesis = window.speechSynthesis
  }

  // 初始化音频上下文
  init() {
    if (this.isInitialized) return

    try {
      // 创建音频上下文
      this.audioContext = new (window.AudioContext || window.webkitAudioContext)()
      this.isInitialized = true
    } catch (error) {
      console.warn('音频上下文初始化失败:', error)
    }
  }

  // 检查浏览器是否支持语音合成
  isSpeechSynthesisSupported() {
    return 'speechSynthesis' in window
  }

  // 播放文本到语音
  async speakText(text, voiceType = 'default') {
    return new Promise((resolve, reject) => {
      if (!this.isSpeechSynthesisSupported()) {
        reject(new Error('浏览器不支持语音合成'))
        return
      }

      try {
        // 创建语音合成话语
        const utterance = new SpeechSynthesisUtterance(text)

        // 设置语音参数
        utterance.volume = 0.8 // 音量 (0-1)
        utterance.rate = 1.0 // 语速 (0.1-10)
        utterance.pitch = 1.0 // 音调 (0-2)

        // 根据女友类型设置不同的语音参数
        switch (voiceType) {
          case '温柔学姐':
            utterance.rate = 0.9
            utterance.pitch = 1.2
            break
          case '可爱少女':
            utterance.rate = 1.2
            utterance.pitch = 1.8
            break
          case '高冷御姐':
            utterance.rate = 0.8
            utterance.pitch = 0.8
            break
          case '定制女友':
            utterance.rate = 1.0
            utterance.pitch = 1.0
            break
          default:
            utterance.rate = 1.0
            utterance.pitch = 1.0
        }

        // 获取可用的中文语音
        const voices = this.speechSynthesis.getVoices()
        const chineseVoices = voices.filter(
          (voice) => voice.lang.includes('zh') || voice.lang.includes('Chinese'),
        )

        // 如果有中文语音，优先使用
        if (chineseVoices.length > 0) {
          utterance.voice = chineseVoices[0]
        }

        // 设置事件监听器
        utterance.onend = () => {
          console.log('语音播放完成')
          resolve()
        }

        utterance.onerror = (event) => {
          console.warn('语音播放错误:', event)
          reject(event.error)
        }

        // 播放语音
        this.speechSynthesis.speak(utterance)
      } catch (error) {
        console.warn('语音合成失败:', error)
        reject(error)
      }
    })
  }

  // 播放中文问候语
  async playChineseGreeting(girlfriendType) {
    try {
      let text = '你好，让我做你的女朋友吧'

      // 根据不同女友类型添加个性化后缀
      switch (girlfriendType) {
        case '温柔学姐':
          text = '你好，让我做你的女朋友吧，我会好好照顾你的'
          break
        case '可爱少女':
          text = '你好呀！让我做你的女朋友吧，我们一起开心地玩耍'
          break
        case '高冷御姐':
          text = '你好，我愿意做你的女朋友，希望我们能相处愉快'
          break
        case '定制女友':
          text = '你好，让我成为你的专属女朋友吧，为你提供最好的陪伴'
          break
      }

      await this.speakText(text, girlfriendType)
    } catch (error) {
      console.warn('中文问候语播放失败:', error)
      throw error
    }
  }

  // 播放简单音调（备用方案）
  async playTone(frequency, duration, type = 'sine') {
    try {
      this.init()

      if (!this.audioContext) {
        throw new Error('音频上下文未初始化')
      }

      // 创建振荡器
      const oscillator = this.audioContext.createOscillator()
      const gainNode = this.audioContext.createGain()

      oscillator.connect(gainNode)
      gainNode.connect(this.audioContext.destination)

      oscillator.type = type
      oscillator.frequency.value = frequency

      // 设置音量渐变以避免爆音
      gainNode.gain.setValueAtTime(0.3, this.audioContext.currentTime)
      gainNode.gain.exponentialRampToValueAtTime(
        0.01,
        this.audioContext.currentTime + duration / 1000,
      )

      oscillator.start()
      oscillator.stop(this.audioContext.currentTime + duration / 1000)

      // 等待音调播放完成
      return new Promise((resolve) => {
        setTimeout(resolve, duration)
      })
    } catch (error) {
      console.warn('音调播放失败:', error)
      throw error
    }
  }

  // 播放问候语（通过音调序列模拟）
  async playGreeting(girlfriendType) {
    try {
      // 根据不同女友类型播放不同的音调序列
      switch (girlfriendType) {
        case '温柔学姐':
          // 播放温柔的音调序列
          await this.playTone(523.25, 300) // C
          await this.playTone(659.25, 300) // E
          await this.playTone(783.99, 300) // G
          await this.playTone(1046.5, 600) // C (高八度)
          break

        case '可爱少女':
          // 播放活泼的音调序列
          await this.playTone(523.25, 200) // C
          await this.playTone(659.25, 200) // E
          await this.playTone(783.99, 200) // G
          await this.playTone(1046.5, 200) // C (高八度)
          await this.playTone(783.99, 200) // G
          await this.playTone(659.25, 200) // E
          break

        case '高冷御姐':
          // 播放低沉的音调序列
          await this.playTone(261.63, 400) // C (低八度)
          await this.playTone(329.63, 400) // E
          await this.playTone(392.0, 400) // G
          await this.playTone(523.25, 800) // C
          break

        case '定制女友':
          // 播放复杂的音调序列
          await this.playTone(392.0, 150) // G
          await this.playTone(523.25, 150) // C
          await this.playTone(659.25, 150) // E
          await this.playTone(783.99, 150) // G
          await this.playTone(1046.5, 300) // C (高八度)
          await this.playTone(783.99, 150) // G
          await this.playTone(659.25, 300) // E
          break

        default:
          // 默认音调序列
          await this.playTone(523.25, 300) // C
          await this.playTone(659.25, 300) // E
          await this.playTone(783.99, 300) // G
          await this.playTone(1046.5, 600) // C (高八度)
      }
    } catch (error) {
      console.warn('播放问候语失败:', error)
      throw error
    }
  }
}

// 创建单例实例
const soundPlayer = new SoundPlayer()

// 确保语音合成引擎加载完成
if (soundPlayer.isSpeechSynthesisSupported()) {
  // 触发语音引擎加载
  soundPlayer.speechSynthesis.getVoices()
}

export default soundPlayer
