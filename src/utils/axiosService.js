import axios from 'axios'
import {
  Loading,
  Message
} from 'element-ui'

const baseURL = process.env.APP_SERVER_URL
console.log(baseURL)
const service = axios.create({
  baseURL: baseURL,
  timeout: 5000,
  withCredentials: true
})
// http请求拦截器
var loadinginstace
service.interceptors.request.use(config => {
  // element ui Loading方法 整页 loading
  loadinginstace = Loading.service({
    fullscreen: true
  })
  return config
}, error => {
  loadinginstace.close()
  Message.error({
    message: '加载超时'
  })
  return Promise.reject(error);
})
// http响应拦截器
service.interceptors.response.use(data => { // 响应成功关闭loading
  loadinginstace.close()
  return data
}, error => {
  loadinginstace.close()
  Message.error({
    message: '加载失败'
  })
  return Promise.reject(error)
})
export default service
