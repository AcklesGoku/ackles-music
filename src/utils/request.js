import axios from 'axios'
import { useUserStore } from '@/stores'
import { ElMessage } from 'element-plus'
import router from '@/router'
const baseURL = 'http://big-event-vue-api-t.itheima.net'

const request = axios.create({
  // TODO 1. 基础地址，超时时间
  baseURL,
  timeout: 10000
})

//请求拦截器
request.interceptors.request.use(
  (config) => {
    // TODO 2. 携带token
    const useStore = useUserStore()
    if (useStore.token) {
      config.headers.Authorization = useStore.token
    }
    return config
  },
  (err) => Promise.reject(err)
)

//响应拦截器
request.interceptors.response.use(
  (res) => {
    // TODO 3. 处理业务失败
    // TODO 4. 摘取核心响应数据
    if (res.data.code === 0) {
      return res
    }
    //处理业务失败,给错误提示
    ElMessage.error(res.data.message || '服务异常')
    return Promise.reject(res.data)
  },
  (err) => {
    ElMessage.error(err.response.data.message || '服务异常')

    // TODO 5. 处理401错误
    if (err.response?.status === 401) {
      router.push('/login')
    }
    //错误默认情况
    return Promise.reject(err)
  }
)

export default request
export { baseURL }
