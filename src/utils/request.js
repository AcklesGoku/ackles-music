import axios from 'axios'
// import { useUserStore } from '@/stores'
// import { ElMessage } from 'element-plus'
// import router from '@/router'
const baseURL = 'https://mu-api.yuk0.com/'

const request = axios.create({
  // TODO 1. 基础地址，超时时间
  baseURL,
  timeout: 30000
})

//请求拦截器
request.interceptors.request.use(
  (config) => {
    // TODO 2. 携带token
    // const useStore = useUserStore()
    // if (useStore.token) {
    //   config.headers.Authorization = useStore.token
    // }
    if (!config.params) {
      config.params = {}
    }
    config.params.t = Date.now()
    return config
  },
  (err) => Promise.reject(err)
)

//响应拦截器
request.interceptors.response.use(
  (res) => {
    return res
  },
  (err) => {
    //错误默认情况
    return Promise.reject(err)
  }
)

export default request
export { baseURL }
