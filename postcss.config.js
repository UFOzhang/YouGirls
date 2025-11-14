export default {
  plugins: {
    autoprefixer: {},
    'postcss-px-to-viewport': {
      viewportWidth: 375, // 设计稿宽度
      viewportHeight: 667, // 设计稿高度
      unitPrecision: 5, // 指定`px`转换为视窗单位值的小数位数
      viewportUnit: 'vw', // 指定需要转换成的视窗单位
      selectorBlackList: ['.ignore'], // 指定不转换为视窗单位的类名
      minPixelValue: 1, // 小于或等于`1px`时不转换为视窗单位
      mediaQuery: false, // 是否允许在媒体查询中转换`px`
      exclude: [/node_modules/], // 排除 node_modules 文件夹下的文件
    },
  },
}
