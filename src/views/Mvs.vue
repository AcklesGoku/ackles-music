<script type="text/javascript" setup></script>

<template>
  <div>woshi</div>
</template>

<style lang="scss" scoped>
.mvs-container {
  padding-top: 20px;
  .filter-wrap {
    > div {
      margin-bottom: 30px;
      vertical-align: baseline;
      display: flex;
      align-items: center;
      span {
        font-size: 14px;
        height: 100%;
        &.title {
          margin: 20px;
          color: gray;
          cursor: pointer;
          padding: 5px 20px;
          &.active {
            color: #dd6d60;
            background-color: #fcf6f5;
            border-radius: 20px;
          }
          &::before {
            content: '', pos;
          }
        }
      }
      ul {
        display: flex;
        li:not(:last-child) {
          border-right: 1px solid #f2f2f1;
        }
      }
    }
  }
  .mvs {
    .items {
      display: flex;
      justify-content: flex-start;
      flex-wrap: wrap;
      .item {
        width: 250px;
        cursor: pointer;
        margin-right: 25px;
        margin-bottom: 30px;
        .img-wrap {
          width: 100%;
          position: relative;
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
