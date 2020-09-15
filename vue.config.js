module.exports = {
  devServer: {
    host: 'localhost',
    port: 8080,
    proxy: {
      '/api': {
        target: 'http://mall-pre.springboot.cn',
        changeOrigin: true,
        pathRewrite: {
          '/api': '',
        },
      },
    },
  },
  lintOnSave: false, // 关闭EsLint校验
  //加快打包构建
  productionSourceMap: true,
  // 删除文件预加载
  chainWebpack: (config) => {
    config.plugins.delete('prefetch')
  },
}
