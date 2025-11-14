// 音效播放工具类
class SoundPlayer {
  // 播放中文问候语
  async playChineseGreeting(name) {
    try {
      // 使用 Web Speech API 播放中文语音
      const utterance = new SpeechSynthesisUtterance(`你好，让我做你的${name}吧！`)
      utterance.lang = 'zh-CN'
      utterance.rate = 1.0
      utterance.pitch = 1.2

      // 获取中文语音
      const voices = window.speechSynthesis.getVoices()
      const chineseVoices = voices.filter(
        (voice) => voice.lang.includes('zh') || voice.lang.includes('Chinese'),
      )

      if (chineseVoices.length > 0) {
        utterance.voice = chineseVoices[0]
      }

      window.speechSynthesis.speak(utterance)
      return true
    } catch (error) {
      console.warn('语音播放失败:', error)
      return false
    }
  }

  // 播放问候音效（备选方案）
  async playGreeting() {
    try {
      // 创建音频上下文
      const AudioContext = window.AudioContext || window.webkitAudioContext
      const audioCtx = new AudioContext()

      // 创建振荡器
      const oscillator = audioCtx.createOscillator()
      const gainNode = audioCtx.createGain()

      oscillator.connect(gainNode)
      gainNode.connect(audioCtx.destination)

      // 设置音调和音量
      oscillator.type = 'sine'
      oscillator.frequency.setValueAtTime(523.25, audioCtx.currentTime) // C5
      gainNode.gain.setValueAtTime(0.3, audioCtx.currentTime)

      // 播放音调
      oscillator.start()

      // 1秒后停止
      oscillator.stop(audioCtx.currentTime + 1)

      return true
    } catch (error) {
      console.warn('音效播放失败:', error)
      return false
    }
  }

  // 播放点击音效
  playClickSound() {
    try {
      // 创建音频上下文
      const AudioContext = window.AudioContext || window.webkitAudioContext
      const audioCtx = new AudioContext()

      // 创建振荡器
      const oscillator = audioCtx.createOscillator()
      const gainNode = audioCtx.createGain()

      oscillator.connect(gainNode)
      gainNode.connect(audioCtx.destination)

      // 设置音调和音量
      oscillator.type = 'sine'
      oscillator.frequency.setValueAtTime(880, audioCtx.currentTime) // A5
      gainNode.gain.setValueAtTime(0.1, audioCtx.currentTime)

      // 快速衰减
      gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.1)

      // 播放音调
      oscillator.start()
      oscillator.stop(audioCtx.currentTime + 0.1)
    } catch (error) {
      console.warn('点击音效播放失败:', error)
    }
  }

  // 播放成功音效
  playSuccessSound() {
    try {
      // 创建音频上下文
      const AudioContext = window.AudioContext || window.webkitAudioContext
      const audioCtx = new AudioContext()

      // 创建两个振荡器（和弦效果）
      const oscillator1 = audioCtx.createOscillator()
      const oscillator2 = audioCtx.createOscillator()
      const gainNode = audioCtx.createGain()

      oscillator1.connect(gainNode)
      oscillator2.connect(gainNode)
      gainNode.connect(audioCtx.destination)

      // 设置音调和音量
      oscillator1.type = 'sine'
      oscillator2.type = 'sine'
      oscillator1.frequency.setValueAtTime(523.25, audioCtx.currentTime) // C5
      oscillator2.frequency.setValueAtTime(659.25, audioCtx.currentTime) // E5
      gainNode.gain.setValueAtTime(0.2, audioCtx.currentTime)

      // 播放音调
      oscillator1.start()
      oscillator2.start()

      // 0.5秒后停止
      oscillator1.stop(audioCtx.currentTime + 0.5)
      oscillator2.stop(audioCtx.currentTime + 0.5)
    } catch (error) {
      console.warn('成功音效播放失败:', error)
    }
  }
}

// 导出单例实例
export default new SoundPlayer()
