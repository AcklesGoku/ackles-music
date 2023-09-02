<script type="text/javascript" setup></script>

<template>
  <div>woshi</div>
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
}
</style>
