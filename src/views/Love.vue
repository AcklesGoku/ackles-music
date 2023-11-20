<script type="text/javascript" setup>
import { discoverySongsUrl } from '@/api/discovery'
import { loveSearch } from '@/api/love'

import { ref } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()
import { getCurrentInstance } from 'vue'
const { proxy } = getCurrentInstance()
const emit = defineEmits(['getUrl'])

//数据
// const type = ref('1')
const limit = ref(15) //页容量
const page = ref(1) //页码
const total = ref(150) //总条数
const songList = ref([])
// const playList = ref([])
// const mvList = ref([])

//方法
const searchResult = async () => {
  const res = await loveSearch({ offset: page.value - 1 })
  songList.value = res.data.result.songs
  total.value = res.data.result.songCount
}
searchResult()
//页码改变
const handleCurrentChange = (val) => {
  page.value = val
  searchResult()
}
//去mv界面
const toMV = (mvid) => {
  router.push(`/music/mv?id=${mvid}`)
}
//双击某一行
const rowDbclick = async (id) => {
  const res = await discoverySongsUrl(id)
  //   console.log(res.data.data.url)
  emit('getUrl', res.data.data[0].url)
}
</script>

<template>
  <div>
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
          <td>{{ (page - 1) * 15 + index + 1 }}</td>
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
.el-table {
  font-size: 14px;

  border-bottom: none;
  border-collapse: collapse;
  thead {
    color: #909399;
    font-weight: 500;
  }
  tbody {
    border-bottom: none;
    color: #606266;
  }
  td {
    border-bottom: none;
    padding: 12px 0;
    &:first-child {
      padding-left: 10px;
    }
  }
  th {
    font-weight: normal;
    text-align: left;
    vertical-align: middle;
    overflow: hidden;
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
      width: 500px;
    }
    &:nth-child(5) {
      width: 50px;
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
  tr {
    &:nth-child(2n) {
      background-color: #fafafa;
    }
    &:hover {
      background-color: #f5f7fa;
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
