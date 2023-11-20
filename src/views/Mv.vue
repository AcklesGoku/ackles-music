<script type="text/javascript" setup>
import { ref, watch, getCurrentInstance, onBeforeUnmount } from 'vue'
const { proxy } = getCurrentInstance()
import {
  MVmvUrl,
  MVsimiMV,
  MVmvComments,
  MVmvDetail,
  MVartistInfo
} from '@/api/mv'

import { useRoute, useRouter } from 'vue-router'
const route = useRoute()
const router = useRouter()

//数据
const mvUrl = ref('') //mv地址
const simiMV = ref([])
const hotComments = ref([]) //热门评论
const comments = ref([]) //普通评论
// const limit = ref(20) //每页数据
const page = ref(1) //页码
const total = ref(0) //总条数
const mvName = ref('') //mv的名字
const playCount = ref('') //播放次数
const publishTime = ref('') //发布时间
const desc = ref('') //描述
const artistName = ref('') //歌手名
const artistCover = ref('') //封面

//方法
//页码改变
const handleCurrentChange = (val) => {
  page.value = val
  getComments()
}
//获取评论
const getComments = async () => {
  const { id } = route.query
  const res = await MVmvComments({ id, offset: (page.value - 1) * 5 })
  if (res.data.hotComments) {
    hotComments.value = res.data.hotComments
  }
  comments.value = res.data.comments
  total.value = res.data.total
}

//获取信息
const getInfo = async () => {
  const { id } = route.query
  const res = await MVmvUrl({ id })
  mvUrl.value = res.data.data.url
  const res2 = await MVsimiMV({ mvid: id })
  simiMV.value = res2.data.mvs
  //获取评论
  getComments()
  //获取mv详情
  const res3 = await MVmvDetail({ mvid: id })
  mvName.value = res3.data.data.name
  playCount.value = res3.data.data.playCount
  publishTime.value = res3.data.data.publishTime
  desc.value = res3.data.data.desc
  const res4 = await MVartistInfo({
    artistId: res3.data.data.artistId
  })
  artistName.value = res4.data.artist.name
  artistCover.value = res4.data.artist.picUrl
}
// 切换mv
const toMV = (id) => {
  router.push(`/music/mv?id=${id}`)
  getInfo()
}
//侦听器
const result = watch(
  () => route.query.id,
  () => {
    console.log(1)
    page.value = 1
    getInfo()
  }
)
getInfo()
onBeforeUnmount(() => {
  result()
})
</script>

<template>
  <div class="mv-container">
    <div class="mv-wrap">
      <h3 class="title">mv详情</h3>
      <!-- mv -->
      <div class="video-wrap">
        <video controls :src="mvUrl"></video>
      </div>
      <!-- mv信息 -->
      <div class="info-wrap">
        <div class="singer-info">
          <div class="avatar-wrap">
            <img :src="artistCover" alt="" />
          </div>
          <span class="name">{{ artistName }}</span>
        </div>
        <div class="mv-info">
          <h2 class="title">{{ mvName }}</h2>
          <span class="date">发布：{{ publishTime }}</span>
          <span class="number"
            >播放：{{ proxy.$filters.formatCount(playCount) }}次</span
          >
          <p class="desc">{{ desc }}</p>
        </div>
      </div>
      <!-- 热门评论 -->
      <div v-if="hotComments.length != 0" class="comment-wrap">
        <p class="title">
          热门评论<span class="number">({{ hotComments.length }})</span>
        </p>
        <div
          class="comments-wrap"
          v-for="item in hotComments"
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
              <div class="date">{{ proxy.$filters.formatTime(item.time) }}</div>
            </div>
          </div>
        </div>
      </div>
      <!-- 最新评论 -->
      <!-- 最新评论 -->
      <div class="comment-wrap" v-if="comments.length != 0">
        <p class="title">
          最新评论<span class="number">({{ total }})</span>
        </p>
        <div class="comments-wrap">
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
              <div class="date">{{ proxy.$filters.formatTime(item.time) }}</div>
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
    </div>
    <div class="mv-recommend">
      <h3 class="title">相关推荐</h3>
      <div class="mvs">
        <div class="items" v-for="item in simiMV" :key="item.id">
          <div class="item" @click="toMV(item.id)">
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
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.mv-container {
  display: flex;
  .title {
    margin-bottom: 20px;
  }
  .mv-wrap {
    width: 700px;
    margin-right: 35px;
    .date {
      margin-right: 25px;
    }
    .date,
    .number {
      color: #bebebe;
      font-size: 14px;
    }
    .video-wrap {
      width: 100%;
      height: 390px;
      margin-bottom: 20px;
      video {
        border-radius: 5px;
        height: 100%;
        width: 100%;
        outline: none;
      }
    }
    .info-wrap {
      margin-bottom: 50px;
      .singer-info {
        display: flex;
        align-items: center;
        margin-bottom: 35px;
        .avatar-wrap {
          width: 70px;
          height: 70px;
          border-radius: 50%;
          margin-right: 10px;
          overflow: hidden;
          img {
            height: 100%;
          }
        }
      }
      .mv-info {
        .title {
          font-size: 30px;
        }
        .desc {
          font-size: 15px;
          margin-top: 20px;
        }
      }
    }
    .comment-wrap {
      margin-bottom: 70px;
      .title {
        font-size: 25px;
        .number {
          color: black;
          font-size: 20px;
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
  }
  .mv-recommend {
    flex: 1;
    .mvs {
      .items {
        display: flex;
        flex-wrap: wrap;
        .item {
          cursor: pointer;
          width: 100%;
          display: flex;
          align-items: center;
          padding: 10px;
          cursor: pointer;

          &:hover {
            background-color: #f5f5f5;
          }
          .img-wrap {
            width: 180px;
            position: relative;
            margin-right: 10px;
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
              align-content: center;
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
          .info-wrap {
            flex: 1;
            .name {
              font-size: 15px;
            }
            .singer {
              font-size: 14px;
              color: #c5c5c5;
            }
          }
        }
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
