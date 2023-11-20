<script type="text/javascript" setup>
import { ref, getCurrentInstance } from 'vue'
const { proxy } = getCurrentInstance()
import { useRoute } from 'vue-router'
const route = useRoute()
// const router = useRouter()
import { playlistDetail, hotComments, listComments } from '@/api/playlist'
import { discoverySongsUrl } from '@/api/discovery'
import moment from 'moment'
const emit = defineEmits(['getUrl'])

//数据
const activeIndex = ref('1')
const tableData = ref([])
const title = ref('1')
const avatarUrl = ref('')
const coverImgUrl = ref('')
const signature = ref('')
const nickname = ref('')
const tags = ref([])
const createTime = ref('')
const hotComments1 = ref([])
const comments = ref([])
// const limit = ref(20)
const page = ref(1)
const total = ref(0)

const { id } = route.query
//方法
//歌曲信息
const getPlaylist = async () => {
  const res = await playlistDetail({ id })
  tableData.value = res.data.playlist.tracks
  title.value = res.data.playlist.name
  avatarUrl.value = res.data.playlist.creator.avatarUrl
  coverImgUrl.value = res.data.playlist.coverImgUrl
  signature.value = res.data.playlist.creator.signature
  nickname.value = res.data.playlist.creator.nickname
  tags.value = res.data.playlist.tags
  createTime.value = moment(res.data.playlist.createTime).format('YYYY-MM-DD')
}
getPlaylist()
//获取热门评论
const gethotComments = async () => {
  const res = await hotComments({ id })
  hotComments1.value = res.data.hotComments
}
gethotComments()
//获取评论信息
const getComments = async () => {
  const res = await listComments({ id, offset: (page.value - 1) * 5 })
  total.value = res.data.total
  comments.value = res.data.comments
}
getComments()
//页码改变
const handleCurrentChange = (val) => {
  page.value = val
  getComments()
}
const playMusic = async (id) => {
  const res = await discoverySongsUrl(id)
  emit('getUrl', res.data.data[0].url)
}
</script>

<template>
  <div class="playlist-container">
    <div class="top-wrap">
      <div class="img-wrap">
        <img :src="coverImgUrl" alt="" />
      </div>
      <div class="info-wrap">
        <p class="title">{{ title }}</p>
        <div class="author-wrap">
          <img class="avatar" :src="avatarUrl" alt="" />
          <span class="name">{{ nickname }}</span>
          <span class="time">{{ createTime }} 创建</span>
        </div>
        <div class="tag-wrap">
          <span class="title">标签:</span>
          <ul>
            <li v-for="item in tags" :key="item">{{ item }}</li>
          </ul>
        </div>
        <div class="desc-wrap">
          <span class="title">简介:</span>
          <span class="desc">{{ signature }}</span>
        </div>
      </div>
    </div>
    <el-tabs v-model="activeIndex" class="demo-tabs">
      <el-tab-pane label="歌曲列表" name="1">
        <table class="el-table playlist-table">
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
                  <img :src="item.al.picUrl" alt="" />
                  <span class="iconfont icon-play"></span>
                </div>
              </td>
              <td>
                <div class="song-wrap">
                  <div class="name-wrap">
                    <span>{{ item.name }}</span>
                    <!-- mv图标 -->
                    <span
                      v-if="item.mv != 0"
                      @click="toMV(item.mv)"
                      class="iconfont icon-mv"
                    ></span>
                  </div>
                  <span>{{ item.subTitle }}</span>
                </div>
              </td>
              <td>{{ item.ar[0].name }}</td>
              <td>
                {{ item.al.name }}
              </td>
              <td>{{ proxy.$filters.formatDuration(item.dt) }}</td>
            </tr>
          </tbody>
        </table>
      </el-tab-pane>
      <el-tab-pane :label="`评论(${total + hotComments1.length})`" name="2">
        <!-- 热门评论 -->
        <div v-if="hotComments1.length !== 0" class="comment-wrap">
          <p class="title">
            热门评论<span class="number">({{ hotComments1.length }})</span>
          </p>
          <div
            class="comments-wrap"
            v-for="item in hotComments1"
            :key="item.commentId"
          >
            <div class="item">
              <div class="icon-wrap">
                <img :src="item.user.avatarUrl" alt="" />
              </div>
              <div class="content-wrap">
                <div class="content">
                  <span class="name">{{ item.user.nickname }}：</span>
                  <span class="comment">{{ item.content }}</span>
                </div>
                <div v-if="item.beReplied.length != 0" class="re-content">
                  <span class="name"
                    >{{ item.beReplied[0].user.nickname }}：</span
                  >
                  <span class="comment">{{ item.beReplied[0].content }}</span>
                </div>
                <div class="date">
                  {{ proxy.$filters.formatTime(item.time) }}
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- 最新评论 -->
        <div class="comment-wrap">
          <p class="title">
            最新评论<span class="number">({{ total }})</span>
          </p>
          <div v-if="comments.length != 0" class="comments-wrap">
            <div class="item" v-for="item in comments" :key="item.commentId">
              <div class="icon-wrap">
                <img :src="item.user.avatarUrl" alt="" />
              </div>
              <div class="content-wrap">
                <div class="content">
                  <span class="name">{{ item.user.nickname }}：</span>
                  <span class="comment">{{ item.content }}</span>
                </div>
                <div v-if="item.beReplied.length != 0" class="re-content">
                  <span class="name"
                    >{{ item.beReplied[0].user.nickname }}：</span
                  >
                  <span class="comment">{{ item.beReplied[0].content }}</span>
                </div>
                <div class="date">
                  {{ proxy.$filters.formatTime(item.time) }}
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- 分页器 -->
        <el-pagination
          @current-change="handleCurrentChange"
          background
          layout="prev, pager, next"
          :total="total"
          :current-page="page"
          :page-size="5"
        >
        </el-pagination>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<style lang="scss" scoped>
.playlist-container {
  margin: auto;
  padding-top: 40px;

  .top-wrap {
    display: flex;
    span {
      font-size: 17px;
    }

    .img-wrap {
      margin-right: 30px;

      img {
        width: 230px;
        height: 230px;
      }
    }

    .info-wrap {
      .title {
        margin-bottom: 20px;
      }

      .author-wrap {
        display: flex;
        align-items: center;
        margin-bottom: 25px;

        img {
          width: 35px;
          height: 35px;
          border-radius: 50%;
          margin-right: 10px;
        }

        .name {
          margin-right: 10px;
        }

        .time {
          font-size: 14px;
        }
      }

      .play-wrap {
        width: 120px;
        height: 35px;
        border-radius: 4px;
        background: linear-gradient(to right, #e85e4d, #c6483c);
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 25px;

        span {
          color: white;

          &.iconfont {
            margin-right: 8px;
          }

          &.text {
            font-size: 16px;
          }
        }
      }

      .tag-wrap {
        display: flex;
        margin-bottom: 15px;

        span {
          margin: 0;
        }

        ul {
          display: flex;
          align-items: center;
        }

        li {
          font-size: 15px;

          &:not(:last-child)::after {
            content: '/';
            margin: 0 4px;
          }
        }
      }

      .desc-wrap {
        span {
          &:last-child {
            font-size: 15px;
          }
        }
      }

      span:first-child {
        margin-right: 10px;
      }
    }
  }

  .comment-wrap {
    margin-bottom: 70px;

    .title {
      font-size: 20px;

      .number {
        color: black;
        font-size: 18px;
      }
    }

    .item {
      display: flex;
      padding-top: 20px;

      .icon-wrap {
        margin-right: 15px;

        img {
          width: 50px;
          height: 50px;
          border-radius: 50%;
        }
      }

      &:not(:last-child) {
        .content-wrap {
          border-bottom: 1px solid #f2f2f1;
        }
      }

      .date {
        color: #bebebe;
        font-size: 14px;
      }

      .content-wrap {
        padding-bottom: 20px;

        flex: 1;

        .name {
          color: #517eaf;
          font-size: 14px;
        }

        .comment {
          font-size: 14px;
        }

        .content,
        .re-content {
          margin-bottom: 10px;
        }

        .re-content {
          padding: 10px;
          background-color: #e6e5e6;
          border-radius: 5px;
        }
      }
    }
  }
  .el-table {
    font-weight: 400;
    border-bottom: none;
    border-collapse: collapse;
    text-align: left;
    &.playlist-table {
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
      font-size: 14px;
      padding: 12px 0;
      border-bottom: none;
      &:first-child {
        padding-left: 10px;
      }
    }
    th {
      font-size: 14px;
      padding: 12px 0;
      color: #909399;
      height: 45px;
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
      color: #606266;
      height: 94px;
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
  .el-tabs__item.is-active {
    color: #c3473a;
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
