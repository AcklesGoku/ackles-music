<script type="text/javascript" setup></script>

<template>
  <div>discovery</div>
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
          .song-name {
          }
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
