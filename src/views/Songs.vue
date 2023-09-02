<script type="text/javascript" setup></script>

<template>
  <div>woshi</div>
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
}
</style>
