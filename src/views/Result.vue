<script type="text/javascript" setup>
import { ref, getCurrentInstance, watch } from 'vue'
const { proxy } = getCurrentInstance()
import { search } from '@/api/result'
import { discoverySongsUrl } from '@/api/discovery'

import { useRouter, useRoute } from 'vue-router'
const route = useRoute()
const router = useRouter()

const type = ref('1')
const limit = ref(15)
const page = ref(1)
const total = ref(0)
const songList = ref([])
const playList = ref([])
const mvList = ref([])
const emit = defineEmits(['getUrl'])

const toPlaylist = (id) => {
  router.push(`/music/playlist?id=${id}`)
}
// 双击某一行
const rowDbclick = async (id) => {
  const res = await discoverySongsUrl(id)
  emit('getUrl', res.data.data[0].url)
}
//去mv页面
const toMV = (mvid) => {
  router.push(`/music/mv?id=${mvid}`)
}
//页码改变
const handleCurrentChange = (val) => {
  page.value = val
  searchResult()
}
watch(
  () => type.value,
  (newvalue) => {
    limit.value = newvalue === '1004' ? 12 : 15
    searchResult()
  }
)
const searchResult = async () => {
  const { keywords } = route.query
  const res = await search({
    limit: limit.value,
    type: type.value,
    keywords,
    offset: (page.value - 1) * limit.value
  })

  switch (type.value) {
    case '1':
      songList.value = res.data.result.songs
      total.value = res.data.result.songCount
      break
    case '1000':
      playList.value = res.data.result.playlists
      total.value = res.data.result.playlistCount
      break
    default:
      mvList.value = res.data.result.mvs
      total.value = res.data.result.mvCount
      break
  }
}
searchResult()
</script>

<template>
  <div class="result-container" ref="container">
    <div class="title-wrap">
      <h2 class="title">{{ route.query.keywords }}</h2>
      <span class="sub-title">找到{{ total }}个结果</span>
    </div>
    <el-tabs v-model="type">
      <el-tab-pane label="歌曲" name="1">
        <table class="el-table">
          <thead>
            <th></th>
            <th>音乐标题</th>
            <th>歌手</th>
            <th>专辑</th>
            <th>时长</th>
          </thead>
          <tbody>
            <tr
              class="el-table__row"
              v-for="(item, index) in songList"
              :key="item.id"
              @dblclick="rowDbclick(item.id)"
            >
              <td>{{ index + 1 }}</td>
              <td>
                <div class="song-wrap">
                  <div class="name-wrap">
                    <span class="name">{{ item.name }}</span>
                    <span
                      v-if="item.mvid != 0"
                      class="iconfont icon-mv"
                      @click="toMV(item.mvid)"
                    ></span>
                  </div>
                  <span class="sub-name" v-if="item.alias.length != 0">{{
                    item.alias[0]
                  }}</span>
                </div>
              </td>
              <td>{{ item.artists[0].name }}</td>
              <td>{{ item.album.name }}</td>
              <td>{{ proxy.$filters.formatDuration(item.duration) }}</td>
            </tr>
          </tbody>
        </table>
      </el-tab-pane>
      <el-tab-pane label="歌单" name="1000">
        <div class="items">
          <div
            class="item"
            v-for="item in playList"
            :key="item.id"
            @click="toPlaylist(item.id)"
          >
            <div class="img-wrap">
              <div class="num-wrap">
                播放量:
                <span class="num">{{
                  proxy.$filters.formatCount(item.playCount)
                }}</span>
              </div>
              <img :src="item.coverImgUrl" alt="" />
              <span class="iconfont icon-play"></span>
            </div>
            <p class="name">{{ item.name }}</p>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="MV" name="1004">
        <div class="items mv">
          <div
            class="item"
            v-for="item in mvList"
            :key="item.id"
            @click="toMV(item.id)"
          >
            <div class="img-wrap">
              <img :src="item.cover" alt="" />
              <span class="iconfont icon-play"></span>
              <div class="num-wrap">
                <div class="iconfont icon-play"></div>
                <div class="num">
                  {{ proxy.$filters.formatCount(item.playCount) }}
                </div>
              </div>
              <span class="time">{{
                proxy.$filters.formatDuration(item.duration)
              }}</span>
            </div>
            <div class="info-wrap">
              <div class="name">{{ item.name }}</div>
              <div class="singer">{{ item.artistName }}</div>
            </div>
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>
    <!-- 分页器 -->
    <el-pagination
      @current-change="handleCurrentChange"
      background
      layout="prev, pager, next"
      :total="total"
      :current-page="page"
      :page-size="limit"
    >
    </el-pagination>
  </div>
</template>

<style lang="scss" scoped>
.result-container {
  .title-wrap {
    display: flex;
    align-items: flex-end;
    margin-bottom: 30px;
    .title {
      margin-right: 10px;
    }
    .sub-title {
      font-size: 15px;
      color: #bebebe;
    }
  }

  :deep(.el-tabs__item) {
    font-size: 18px;
  }
  :deep(.el-tabs__item:hover) {
    color: #c3473a;
  }
  :deep(.el-tabs__item.is-active) {
    color: #c3473a;
  }
  :deep(.el-tabs__active-bar) {
    background-color: #c3473a;
  }
  .el-table {
    border-collapse: collapse;
    border-bottom: none;
    width: 100%;
    th {
      color: #909399;
      font-size: 14px;
      font-family:
        Helvetica Neue,
        Helvetica,
        PingFang SC,
        Hiragino Sans GB,
        Microsoft YaHei,
        '微软雅黑',
        Arial,
        sans-serif;
      height: 45px;
      text-align: left;
      font-weight: normal;
      padding: 12px 0;
      &:first-child {
        width: 50px;
      }
      &:nth-child(2) {
        width: 300px;
      }
      &:nth-child(3) {
        width: 200px;
      }
      &:nth-child(4) {
        width: 424px;
      }
    }
    td {
      color: #606266;
      font-size: 14px;
      padding: 12px 0;
      border-bottom: none;
      &:first-child {
        padding-left: 10px;
      }
      .sub-name {
        display: inline-block;
        color: #bebebe;
        margin: 20px 0 0 0;
      }
    }
    tr:nth-child(2n) {
      background-color: #fafafa;
    }
    .song-wrap .icon-mv {
      color: #dd6d60;
      padding: 0 0 0 5px;
    }
  }
  .el-table td,
  .el-table th.is-leaf {
    border-bottom: none;
  }
  .items {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    .item {
      width: 200px;
      cursor: pointer;
      margin-right: 20px;
      margin-bottom: 20px;
      .img-wrap {
        width: 100%;
        position: relative;
        > .icon-play {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 40px;
          height: 40px;
          color: #dd6d60;
          font-size: 20px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(255, 255, 255, 0.8);
          opacity: 0;
          &::before {
            transform: translateX(3px);
          }
        }
        &:hover > .icon-play {
          opacity: 1;
        }
        img {
          width: 100%;
          border-radius: 5px;
        }
        .num-wrap {
          position: absolute;
          color: white;
          top: 0;
          right: 0;
          display: flex;
          align-items: center;
          font-size: 15px;
          padding-right: 5px;
          padding-top: 2px;
          .icon-play {
            font-size: 12px;
            display: flex;
            align-items: center;
            margin-right: 5px;
          }
        }
        .time {
          position: absolute;
          bottom: 5px;
          right: 5px;
          color: white;
          font-size: 15px;
        }
      }
      .name {
        font-size: 15px;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
      }
      .singer {
        font-size: 14px;
        color: #c5c5c5;
      }
    }
    &.mv {
      .item {
        width: 250px;
      }
    }
  }
}
.el-pagination {
  margin-top: 50px;
  justify-content: center;
}
:deep(.el-pagination.is-background .el-pager li:not(.is-disabled).is-active) {
  background-color: #dd6d60; //修改默认的背景色
}
</style>
