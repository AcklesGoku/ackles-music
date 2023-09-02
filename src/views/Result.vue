<script type="text/javascript" setup></script>

<template>
  <div>woshi</div>
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
  .el-tabs__item {
    font-size: 18px;
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
</style>
