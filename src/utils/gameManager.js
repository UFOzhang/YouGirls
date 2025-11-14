// 小游戏管理器
class GameManager {
  constructor() {
    this.currentGame = null
    this.gameData = {
      numberGuess: {
        targetNumber: null,
        attempts: 0,
        maxAttempts: 10,
      },
      wordChain: {
        lastWord: '',
        usedWords: [],
      },
      riddle: {
        currentRiddle: null,
      },
      truthDare: {
        currentQuestion: null,
      },
      twentyQuestions: {
        targetObject: null,
        questionsAsked: 0,
        maxQuestions: 20,
      },
    }

    // 初始化游戏数据
    this.initGameData()
  }

  // 初始化游戏数据
  initGameData() {
    this.riddles = [
      { question: '什么东西越洗越脏？', answer: '水' },
      { question: '有头无脚，有眼无眉，是什么？', answer: '针' },
      { question: '什么东西越用越少？', answer: '时间' },
      { question: '什么车不能坐？', answer: '风车' },
      { question: '什么东西不能吃？', answer: '亏' },
      { question: '什么植物最老实？', answer: '芭蕉' },
      { question: '什么动物最容易摔倒？', answer: '狐狸' },
    ]

    this.truthQuestions = [
      '你最难忘的一次经历是什么？',
      '你最大的梦想是什么？',
      '你最害怕的事情是什么？',
      '你最想去的地方是哪里？',
      '你最想改变自己什么？',
      '你最崇拜的人是谁？',
      '你最尴尬的一次经历是什么？',
    ]

    this.dareTasks = [
      '大声说出“我爱女友”三遍',
      '模仿一种动物的叫声',
      '做5个深蹲',
      '唱一首歌',
      '讲一个笑话',
    ]

    this.objectsForTwentyQuestions = [
      '苹果',
      '汽车',
      '手机',
      '书本',
      '电脑',
      '椅子',
      '桌子',
      '电视',
      '冰箱',
      '自行车',
    ]
  }

  // 开始猜数字游戏
  startNumberGuess() {
    this.currentGame = 'numberGuess'
    this.gameData.numberGuess.targetNumber = Math.floor(Math.random() * 100) + 1
    this.gameData.numberGuess.attempts = 0
    return '我已经想好了一个1到100之间的数字，你来猜猜看吧！你有10次机会哦~'
  }

  // 处理猜数字
  handleNumberGuess(guess) {
    if (this.currentGame !== 'numberGuess') {
      return '我们还没有开始猜数字游戏呢~'
    }

    const target = this.gameData.numberGuess.targetNumber
    const attempts = ++this.gameData.numberGuess.attempts

    if (guess === target) {
      this.currentGame = null
      return `恭喜你猜对了！答案就是${target}，你用了${attempts}次就猜中了，真厉害！`
    } else if (attempts >= this.gameData.numberGuess.maxAttempts) {
      this.currentGame = null
      return `很遗憾，你没有在10次内猜中。正确答案是${target}。要不要再来一局？`
    } else if (guess > target) {
      return `太大了哦~ 你还有${this.gameData.numberGuess.maxAttempts - attempts}次机会！`
    } else {
      return `太小了哦~ 你还有${this.gameData.numberGuess.maxAttempts - attempts}次机会！`
    }
  }

  // 开始成语接龙游戏
  startWordChain() {
    this.currentGame = 'wordChain'
    this.gameData.wordChain.lastWord = '一心一意'
    this.gameData.wordChain.usedWords = ['一心一意']
    return '我们来玩成语接龙吧！我先开始：一心一意~ 请你接"意"字开头的成语。'
  }

  // 处理成语接龙
  handleWordChain(word) {
    if (this.currentGame !== 'wordChain') {
      return '我们还没有开始成语接龙游戏呢~'
    }

    // 检查是否是四字成语
    if (word.length !== 4) {
      return '请输入一个四字成语哦~'
    }

    const lastChar = this.gameData.wordChain.lastWord.slice(-1)
    const firstChar = word.charAt(0)

    // 检查是否接龙正确
    if (firstChar !== lastChar) {
      return `接龙不正确哦~ 你应该接"${lastChar}"字开头的成语，你接的是"${firstChar}"字开头的。`
    }

    // 检查是否已经使用过
    if (this.gameData.wordChain.usedWords.includes(word)) {
      return '这个成语我们已经用过了哦~ 请换一个吧！'
    }

    // 添加到已使用列表
    this.gameData.wordChain.usedWords.push(word)
    this.gameData.wordChain.lastWord = word

    // AI回复成语
    const aiResponses = [
      `${word.slice(-1)}马加鞭`,
      `${word.slice(-1)}气风发`,
      `${word.slice(-1)}帆风顺`,
      `${word.slice(-1)}到成功`,
      `${word.slice(-1)}想天开`,
    ]

    const aiWord = aiResponses[Math.floor(Math.random() * aiResponses.length)]
    this.gameData.wordChain.usedWords.push(aiWord)
    this.gameData.wordChain.lastWord = aiWord

    return `不错不错！你接的"${word}"很合适~ 我来接：${aiWord}`
  }

  // 开始猜谜语游戏
  startRiddle() {
    const randomRiddle = this.riddles[Math.floor(Math.random() * this.riddles.length)]
    this.currentGame = 'riddle'
    this.gameData.riddle.currentRiddle = randomRiddle
    return `来猜个谜语吧：${randomRiddle.question}`
  }

  // 处理猜谜语
  handleRiddle(answer) {
    if (this.currentGame !== 'riddle') {
      return '我们还没有开始猜谜语游戏呢~'
    }

    const correctAnswer = this.gameData.riddle.currentRiddle.answer
    this.currentGame = null

    if (answer === correctAnswer) {
      return `恭喜你答对了！答案就是"${correctAnswer}"~ 你真聪明！`
    } else {
      return `不对哦~ 正确答案是"${correctAnswer}"。要不要再来一个谜语？`
    }
  }

  // 开始真心话大冒险
  startTruthDare() {
    this.currentGame = 'truthDare'
    return '我们来玩真心话大冒险吧！你选择真心话还是大冒险？'
  }

  // 处理真心话大冒险
  handleTruthDare(choice) {
    if (this.currentGame !== 'truthDare') {
      return '我们还没有开始真心话大冒险呢~'
    }

    if (choice.includes('真心话') || choice.includes('真心')) {
      const randomQuestion =
        this.truthQuestions[Math.floor(Math.random() * this.truthQuestions.length)]
      this.gameData.truthDare.currentQuestion = randomQuestion
      return `真心话问题：${randomQuestion}`
    } else if (choice.includes('大冒险') || choice.includes('冒险')) {
      const randomTask = this.dareTasks[Math.floor(Math.random() * this.dareTasks.length)]
      this.gameData.truthDare.currentQuestion = randomTask
      return `大冒险任务：${randomTask}`
    } else {
      return '请选择真心话或大冒险哦~'
    }
  }

  // 开始二十个问题游戏
  startTwentyQuestions() {
    this.currentGame = 'twentyQuestions'
    const randomObject =
      this.objectsForTwentyQuestions[
        Math.floor(Math.random() * this.objectsForTwentyQuestions.length)
      ]
    this.gameData.twentyQuestions.targetObject = randomObject
    this.gameData.twentyQuestions.questionsAsked = 0
    return '我们来玩二十个问题游戏吧！我想了一个物品，你有20个问题的机会来猜出它是什么。请开始提问（只能问是或否的问题）：'
  }

  // 处理二十个问题游戏
  handleTwentyQuestions(question) {
    if (this.currentGame !== 'twentyQuestions') {
      return '我们还没有开始二十个问题游戏呢~'
    }

    this.gameData.twentyQuestions.questionsAsked++
    const questionsAsked = this.gameData.twentyQuestions.questionsAsked
    const targetObject = this.gameData.twentyQuestions.targetObject

    // 简单的逻辑判断（实际项目中可以接入更复杂的AI）
    let answer = '否'
    if (targetObject === '苹果' && (question.includes('水果') || question.includes('吃'))) {
      answer = '是'
    } else if (targetObject === '汽车' && question.includes('交通工具')) {
      answer = '是'
    } else if (
      targetObject === '手机' &&
      (question.includes('电子') || question.includes('通讯'))
    ) {
      answer = '是'
    } else if (
      targetObject === '书本' &&
      (question.includes('阅读') || question.includes('学习'))
    ) {
      answer = '是'
    } else if (
      targetObject === '电脑' &&
      (question.includes('电子') || question.includes('计算'))
    ) {
      answer = '是'
    } else if (targetObject === '椅子' && (question.includes('家具') || question.includes('坐'))) {
      answer = '是'
    } else if (
      targetObject === '桌子' &&
      (question.includes('家具') || question.includes('放置'))
    ) {
      answer = '是'
    } else if (
      targetObject === '电视' &&
      (question.includes('电子') || question.includes('观看'))
    ) {
      answer = '是'
    } else if (
      targetObject === '冰箱' &&
      (question.includes('电器') || question.includes('冷藏'))
    ) {
      answer = '是'
    } else if (
      targetObject === '自行车' &&
      (question.includes('交通工具') || question.includes('骑行'))
    ) {
      answer = '是'
    }

    if (question.includes(targetObject)) {
      this.currentGame = null
      return `恭喜你猜对了！答案就是${targetObject}，你用了${questionsAsked}个问题就猜中了，真厉害！`
    } else if (questionsAsked >= this.gameData.twentyQuestions.maxQuestions) {
      this.currentGame = null
      return `很遗憾，你没有在20个问题内猜中。正确答案是${targetObject}。要不要再来一局？`
    } else {
      return `${answer}。你还有${this.gameData.twentyQuestions.maxQuestions - questionsAsked}个问题的机会！`
    }
  }

  // 结束当前游戏
  endGame() {
    const gameName = this.currentGame
    this.currentGame = null
    this.gameData = {
      numberGuess: {
        targetNumber: null,
        attempts: 0,
        maxAttempts: 10,
      },
      wordChain: {
        lastWord: '',
        usedWords: [],
      },
      riddle: {
        currentRiddle: null,
      },
      truthDare: {
        currentQuestion: null,
      },
      twentyQuestions: {
        targetObject: null,
        questionsAsked: 0,
        maxQuestions: 20,
      },
    }

    switch (gameName) {
      case 'numberGuess':
        return '好的，我们结束猜数字游戏~'
      case 'wordChain':
        return '好的，我们结束成语接龙游戏~'
      case 'riddle':
        return '好的，我们结束猜谜语游戏~'
      case 'truthDare':
        return '好的，我们结束真心话大冒险游戏~'
      case 'twentyQuestions':
        return '好的，我们结束二十个问题游戏~'
      default:
        return '好的，我们结束当前的游戏~'
    }
  }

  // 获取当前游戏状态
  getCurrentGame() {
    return this.currentGame
  }
}

export default new GameManager()
