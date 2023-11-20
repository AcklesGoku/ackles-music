import { createApp } from 'vue'
import pinia from '@/stores/index'

import App from './App.vue'
import router from './router'
// import '@/style/base.scss'
import '@/assets/main.scss'
import filters from '@/utils/registerFilter'
const app = createApp(App)

app.config.globalProperties.$filters = filters
app.use(pinia)
app.use(router)

app.mount('#app')
