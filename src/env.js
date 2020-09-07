let baseURL
//process.env.NODE_ENV获取环境变量 package.json中--mode的值
switch (process.env.NODE_ENV) {
  case 'development':
    baseURL = 'http://dev-mall-pre.springboot.cn/api'
    break
  case 'production':
    baseURL = 'http://mall-pre.springboot.cn/api'
    break
  case 'test':
    baseURL = 'http://test-mall-pre.springboot.cn/api'
    break
  default:
    baseURL = 'http://mall-pre.springboot.cn/api'
    break
}

export default {
  baseURL,
}
