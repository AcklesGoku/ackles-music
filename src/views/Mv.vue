<script type="text/javascript" setup></script>

<template>
  <div>woshi</div>
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
</style>
