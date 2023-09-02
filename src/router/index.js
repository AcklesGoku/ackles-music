import { createRouter, createWebHistory } from 'vue-router'
// 导入对应的路由
import Discovery from '@/views/Discovery.vue'
import Love from '@/views/Love.vue'
import Mv from '@/views/Mv.vue'
import Mvs from '@/views/Mvs.vue'
import Playlist from '@/views/Playlist.vue'
import Playlists from '@/views/Playlists.vue'
import Result from '@/views/Result.vue'
import Songs from '@/views/Songs.vue'
import LayoutContainer from '@/views/LayoutContainer.vue'
import LoginPage from '@/views/LoginPage.vue'

// createRouter 创建路由实例，===> new VueRouter()
// 1. history模式: createWebHistory()   http://xxx/user
// 2. hash模式: createWebHashHistory()  http://xxx/#/user

// vite 的配置 import.meta.env.BASE_URL 是路由的基准地址，默认是 ’/‘
// https://vitejs.dev/guide/build.html#public-base-path

// 如果将来你部署的域名路径是：http://xxx/my-path/user
// vite.config.ts  添加配置  base: my-path，路由这就会加上 my-path 前缀了

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/login', component: LoginPage },
    {
      //页面架子
      path: '/',
      component: LayoutContainer,
      redirect: 'music/discovery',
      children: [
        // 发现音乐
        { path: 'music/discovery', component: Discovery },

        // 推荐歌单
        { path: 'music/playlist', component: Playlist },

        // 推荐歌单
        { path: 'music/playlists', component: Playlists },

        // 最新音乐
        { path: 'music/songs', component: Songs },

        // mv详情
        { path: 'music/mv', component: Mv },

        // 最新音乐
        { path: 'music/mvs', component: Mvs },

        // 搜索结果页
        { path: 'music/love', component: Love },
        { path: 'music/result', component: Result }
      ]
    }
  ]
})

export default router
