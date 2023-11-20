import request from '@/utils/request'

//轮播图
export const discoveryGetBanner = () => {
  return request({
    url: '/banner'
  })
}
//推荐歌单
export const discoveryRecommend = () => {
  return request({
    url: '/personalized',
    params: {
      limit: 10
    }
  })
}
//最新音乐
export const discoveryNewMusic = () => {
  return request({
    url: '/personalized/newsong'
  })
}
//推荐mv
export const discoveryMv = () => {
  return request({
    url: '/personalized/mv'
  })
}
//获取音乐url
export const discoverySongsUrl = (id) => {
  return request({
    url: '/song/url',
    params: {
      id
    }
  })
}
