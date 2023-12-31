<script setup>
import { ref } from 'vue'
import {
  discoveryGetBanner,
  discoveryRecommend,
  discoveryNewMusic,
  discoveryMv,
  discoverySongsUrl
} from '@/api/discovery'
import { useRouter } from 'vue-router'
const router = useRouter()

//数据
const banners = ref([])
const playList = ref([])
const newmusic = ref([])
const mv = ref([])

const emit = defineEmits(['getUrl'])

//方法
const getBanner = async () => {
  const res = await discoveryGetBanner()
  banners.value = res.data.banners
}
getBanner()
const getRecommend = async () => {
  const res = await discoveryRecommend()
  playList.value = res.data.result
}
getRecommend()
const toPlayList = (id) => {
  router.push(`/music/playlist?id=${id}`)
}
const getNewMusic = async () => {
  const res = await discoveryNewMusic()
  newmusic.value = res.data.result
}
getNewMusic()
const getMv = async () => {
  const res = await discoveryMv()
  mv.value = res.data.result
}
getMv()

const playMusic = async (id) => {
  const res = await discoverySongsUrl(id)
  emit('getUrl', res.data.data[0].url)
}
const toMv = (id) => {
  router.push(`/music/mv?id=${id}`)
}
</script>

<template>
  <div class="discovery-container">
    <!-- 轮播图 -->
    <el-carousel
      interval="4000"
      type="card"
      height="230px"
      indicator-position="outside"
    >
      <el-carousel-item v-for="(item, index) in banners" :key="index">
        <img :src="item.imageUrl" alt="" />
      </el-carousel-item>
    </el-carousel>
    <!-- 推荐歌单 -->
    <div class="recommend">
      <h3 class="title">推荐歌单</h3>
      <div class="items">
        <div class="item" v-for="item in playList" :key="item.id">
          <div class="img-wrap" @click="toPlayList(item.id)">
            <div class="desc-wrap">
              <span class="desc">{{ item.copywriter }}</span>
            </div>
            <img :src="item.picUrl" alt="" />
            <span class="iconfont icon-play"></span>
          </div>
          <p class="name">{{ item.name }}</p>
        </div>
      </div>
    </div>
    <!-- 最新音乐 -->
    <div class="news">
      <h3 class="title">最新音乐</h3>
      <div class="items">
        <div class="item" v-for="(item, index) in newmusic" :key="index">
          <div class="img-wrap">
            <img :src="item.picUrl" alt="" />
            <span @click="playMusic(item.id)" class="iconfont icon-play"></span>
          </div>
          <div class="song-wrap">
            <div class="song-name">{{ item.name }}</div>
            <div class="singer">{{ item.song.artists[0].name }}</div>
          </div>
        </div>
      </div>
    </div>
    <!-- 推荐MV -->
    <div class="mvs">
      <h3 class="title">推荐MV</h3>
      <div class="items">
        <div class="item" v-for="item in mv" :key="item.id">
          <div class="img-wrap" @click="toMv(item.id)">
            <img :src="item.picUrl" alt="" />
            <span class="iconfont icon-play"></span>
            <div class="num-wrap">
              <div class="iconfont icon-play"></div>
              <div class="num">{{ item.playCount }}</div>
            </div>
          </div>
          <div class="info-wrap">
            <div class="name">{{ item.copywriter }}</div>
            <div class="singer">{{ item.artistName }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.discovery-container {
  .el-carousel__container {
    height: 230px;
  }
  .el-carousel__item img {
    width: 100%;
    height: 100%;
    border-radius: 10px;
  }
  .title {
    font-weight: normal;
    margin-bottom: 20px;
    padding-left: 8px;
  }
  // 推荐音乐
  .recommend {
    margin-bottom: 40px;
    .items {
      display: flex;
      flex-wrap: wrap;
      .item {
        width: 200px;
        margin: 10px;
        position: relative;
        overflow: hidden;
        img {
          width: 200px;
          height: 200px;
          border-radius: 5px;
        }
        .desc-wrap {
          position: absolute;
          width: 100%;
          top: 0;
          left: 0;
          font-size: 16px;
          color: white;
          background: rgba(0, 0, 0, 0.5);
          max-height: 50px;
          padding: 5px;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
          top: -50px;
          span {
            font-size: 14px;
          }
        }
        &:hover .desc-wrap {
          top: 0;
        }
        .img-wrap {
          position: relative;
          .icon-play {
            position: absolute;
            right: 10px;
            bottom: 13px;
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
          &:hover .icon-play {
            opacity: 1;
          }
        }
        .name {
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 1;
          font-size: 14px;
        }
      }
    }
  }
  // 最新音乐
  .news {
    margin-bottom: 40px;
    .items {
      height: 500px;
      display: flex;
      flex-direction: column;
      flex-wrap: wrap;
      .item {
        height: 100px;
        width: 50%;
        display: flex;
        align-items: center;
        padding-left: 15px;
        &:hover {
          background-color: #f5f5f5;
        }
        .index {
          margin-right: 15px;
          font-size: 15px;
        }
        .img-wrap {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          img {
            width: 80px;
            height: 80px;
          }
          .iconfont {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 30px;
            height: 30px;
            color: #dd6d60;
            text-align: center;
            line-height: 30px;
            border-radius: 50%;
            font-size: 14px;
            background: rgba(255, 255, 255, 0.8);
            opacity: 0;
            &::before {
              transform: translateX(3px);
            }
          }
          &:hover .iconfont {
            opacity: 1;
          }
        }
        .song-wrap {
          display: flex;
          flex-direction: column;
          justify-content: space-around;
          height: 100%;
          padding: 10px;
          font-size: 16px;

          .singer {
            font-size: 14px;
            color: gray;
          }
        }
      }
    }
  }
  .mvs {
    .items {
      display: flex;
      justify-content: space-around;
      .item {
        width: 250px;
        cursor: pointer;
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
        }
        .info-wrap {
          .name {
            font-size: 15px;
            margin-bottom: 5px;
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
</style>
