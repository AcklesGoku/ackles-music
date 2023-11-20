<script type="text/javascript" setup>
import { ref, watch } from 'vue'
import { songsTop } from '@/api/songs'
import { discoverySongsUrl } from '@/api/discovery'
import { useRouter } from 'vue-router'
const router = useRouter()
import { getCurrentInstance } from 'vue'
const { proxy } = getCurrentInstance()
//数据
const type = ref(0)
const tableData = ref([])
const emit = defineEmits(['getUrl'])

//方法
const toMV = (id) => {
  router.push(`/music/mv?id=${id}`)
}
const getData = async () => {
  const res = await songsTop(type)
  tableData.value = res.data.data
}
getData()
const playMusic = async (id) => {
  const res = await discoverySongsUrl(id)
  emit('getUrl', res.data.data[0].url)
}
watch(type, () => {
  getData()
})
</script>

<template>
  <div class="songs-container">
    <div class="tab-bar">
      <span class="item" :class="{ active: type == 0 }" @click="type = 0"
        >全部</span
      >
      <span class="item" :class="{ active: type == 7 }" @click="type = 7"
        >华语</span
      >
      <span class="item" :class="{ active: type == 96 }" @click="type = 96"
        >欧美</span
      >
      <span class="item" :class="{ active: type == 8 }" @click="type = 8"
        >日本</span
      >
      <span class="item" :class="{ active: type == 16 }" @click="type = 16"
        >韩国</span
      >
    </div>
    <!-- 底部的table -->
    <table class="el-table playlit-table">
      <thead>
        <th></th>
        <th></th>
        <th>音乐标题</th>
        <th>歌手</th>
        <th>专辑</th>
        <th>时长</th>
      </thead>
      <tbody>
        <tr
          class="el-table__row"
          v-for="(item, index) in tableData"
          :key="item.id"
        >
          <td>{{ index + 1 }}</td>
          <td>
            <div class="img-wrap" @click="playMusic(item.id)">
              <img :src="item.album.picUrl" alt="" />
              <span class="iconfont icon-play"></span>
            </div>
          </td>
          <td>
            <div class="song-wrap">
              <div class="name-wrap">
                <span>{{ item.name }}</span>
                <span
                  v-if="item.mvid != 0"
                  class="iconfont icon-mv"
                  @click="toMV(item.mvid)"
                ></span>
              </div>
              <span>{{ item.subTitle }}</span>
            </div>
          </td>
          <td>{{ item.artists[0].name }}</td>
          <td>
            {{ item.album.name }}
          </td>
          <td>{{ proxy.$filters.formatDuration(item.duration) }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style lang="scss" scoped>
.songs-container {
  .tab-bar {
    display: flex;
    justify-content: flex-end;
    .item {
      font-size: 15px;
      color: gray;
      margin-right: 20px;
      cursor: pointer;
      &.active {
        color: #dd6d60;
      }
    }
  }
  .song-table {
    .song-wrap {
      > span {
        margin-top: 20px;
        display: inline-block;
        color: #bebebe;
      }
      .icon-mv {
        padding-left: 5px;
        color: #dd6d60;
      }
    }
    .img-wrap {
      position: relative;
      width: 70px;
      height: 70px;
      img {
        width: 70px;
        height: 70px;
        border-radius: 5px;
      }
      .icon-play {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 25px;
        height: 25px;
        color: #dd6d60;
        font-size: 12px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        background: rgba(255, 255, 255, 0.8);
        &::before {
          transform: translateX(1px);
        }
      }
    }
  }
  .el-table {
    font-size: 14px;
    color: #606266;
    border-bottom: none;
    border-collapse: collapse;
    &.playlit-table {
      th:nth-child(2) {
        width: 130px;
      }
      th:nth-child(3) {
        width: 300px;
      }
      th:nth-child(4) {
        width: 200px;
      }
      th:nth-child(5) {
        width: 380px;
      }
    }
    tbody {
      border-bottom: none;
    }
    td {
      padding: 12px 0;
      border-bottom: none;
      &:first-child {
        padding-left: 10px;
      }
    }
    th {
      text-align: left;
      color: #909399;
      padding: 12px 0;
      font-weight: normal;
      &:first-child {
        width: 50px;
      }
      &:nth-child(2) {
        width: 300px;
      }
      &:nth-child(3) {
        width: 200px;
      }
    }
    .song-wrap {
      > span {
        margin-top: 20px;
        display: inline-block;
        color: #bebebe;
      }
      .icon-mv {
        padding-left: 5px;
        color: #dd6d60;
      }
    }
    .img-wrap {
      position: relative;
      width: 70px;
      height: 70px;
      img {
        width: 70px;
        height: 70px;
        border-radius: 5px;
      }
      .icon-play {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 25px;
        height: 25px;
        color: #dd6d60;
        font-size: 12px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        background: rgba(255, 255, 255, 0.8);
        &::before {
          transform: translateX(1px);
        }
      }
    }
    tr {
      &:nth-child(2n) {
        background-color: #fafafa;
      }
      &:hover {
        background-color: #f5f7fa;
      }
    }
  }
  .el-table th > .cell {
    font-weight: normal;
    color: black;
  }
}
</style>
