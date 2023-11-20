<script type="text/javascript" setup>
import { ref } from 'vue'
import { Search } from '@element-plus/icons-vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'

const router = useRouter()
const url = ref('')
const query = ref('')
const getUrl = (id) => {
  url.value = id
}
const toResult = () => {
  if (!query.value) {
    ElMessage('请输入查询内容')
  } else {
    router.push(`/music/result?keywords=${query.value}`)
  }
}
</script>

<template>
  <div class="container">
    <!-- top栏 -->
    <div class="top-container">
      <div class="left-box">
        <div class="history-wrapper">
          <span @click="$router.go(-1)" class="iconfont icon-arrow-lift"></span>
          <span @click="$router.go(1)" class="iconfont icon-arrow-right"></span>
        </div>
      </div>
      <div class="right-box">
        <el-input
          @keyup.enter="toResult"
          placeholder="搜索"
          v-model.trim="query"
          :prefix-icon="Search"
        >
        </el-input>
      </div>
    </div>

    <div class="index-container">
      <!-- 侧边栏 -->
      <div class="nav">
        <ul>
          <li>
            <router-link to="/music/discovery">
              <span class="iconfont icon-find-music"></span>
              发现音乐
            </router-link>
          </li>
          <li>
            <router-link to="/music/playlists">
              <span class="iconfont icon-music-list"></span>
              推荐歌单
            </router-link>
          </li>
          <li>
            <router-link to="/music/songs">
              <span class="iconfont icon-music"></span>
              最新音乐
            </router-link>
          </li>
          <li>
            <router-link to="/music/mvs">
              <span class="iconfont icon-mv"></span>
              最新MV
            </router-link>
          </li>
          <li>
            <router-link to="/music/love">
              <span class="iconfont icon-music"></span>
              十里桑田
            </router-link>
          </li>
        </ul>
      </div>

      <!-- main主内容 -->
      <div class="main">
        <router-view @getUrl="getUrl"></router-view>
      </div>

      <!-- footer栏 -->
      <div class="player">
        <audio controls autoplay :src="url" loop></audio>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.container {
  height: 100vh;
  .top-container {
    display: flex;
    justify-content: space-between;
    padding: 0 20px;
    background-color: #f9f9f9;
    width: 100%;
    height: 60px;
    position: fixed;
    width: 100%;
    top: 0;
    left: 0;
    .left-box {
      display: flex;
      // 图标
      .icon-wrapper {
        margin-right: 80px;
        .iconfont {
          margin-right: 10px;
          font-size: 12px;
          width: 18px;
          height: 18px;
          display: inline-block;
          text-align: center;
          line-height: 18px;
          &::before {
            opacity: 0;
            transition: 0.2s;
          }
          &:hover::before {
            opacity: 1;
          }
          &.icon-home {
            background-color: #dd6d60;
            border-radius: 50%;
          }
          &.icon-sami-select {
            background-color: #dcc060;
            border-radius: 50%;
          }
          &.icon-full-screen {
            background-color: #84bb58;
            border-radius: 50%;
          }
        }
      }
      // 历史管理
      .history-wrapper {
        display: flex;
        align-items: center;
        .iconfont {
          width: 35px;
          height: 35px;
          font-size: 30px;
          text-align: center;
          line-height: 35px;
          color: gray;
          border-radius: 50%;
          transition: 0.2s;
          cursor: pointer;
          &:first-child {
            margin-right: 10px;
          }
          &:hover {
            background-color: #ebebeb;
          }
        }
      }
    }
    .right-box {
      display: flex;
      align-items: center;
    }
  }

  .index-container {
    height: 100%;
    padding-top: 60px;
    padding-bottom: 60px;
    display: flex;
    .nav {
      background-color: #ededed;
      width: 200px;
      height: 100%;
      li {
        height: 60px;
        cursor: pointer;
        display: flex;
        align-items: center;
        &:hover {
          background-color: #e7e7e7;
        }
        .iconfont {
          margin-right: 10px;
          font-size: 20px;
        }
        a {
          color: black;
          padding-left: 30px;
          font-size: 18px;
          line-height: 60px;
          width: 100%;
          height: 100%;
          &.router-link-active {
            color: #dd6d60;
            .iconfont {
              color: #dd6d60;
            }
          }
        }
      }
    }
    .main {
      flex: 1;
      overflow-y: scroll;
      padding: 10px 20px;
      div {
        max-width: 1100px;
        margin: 0 auto;
      }
    }
    .player {
      background: #f1f3f4;
      height: 60px;
      position: fixed;
      bottom: 0;
      left: 0;
      width: 100%;
    }
    audio {
      width: 100%;
      border-radius: none;
      outline: none;
    }
  }
}
</style>
