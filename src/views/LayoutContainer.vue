<script type="text/javascript" setup>
import { ref } from 'vue'
import {} from '@element-plus/icons-vue'
const url = ref('')
</script>

<template>
  <div class="common-layout">
    <!-- top栏 -->
    <div class="top-container">Header</div>

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
        <router-view></router-view>
      </div>

      <!-- footer栏 -->
      <div class="player">
        <audio controls autoplay :src="url" loop></audio>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.top-container {
  display: flex;
  justify-content: space-between;
  padding: 0 20px;
  background-color: #f9f9f9;
  width: 100%;
}

.index-container {
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
    > div {
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
</style>
