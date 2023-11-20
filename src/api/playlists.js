import request from '@/utils/request'

//获取精品歌单
export const playlistsHighquality = ({ cat }) => {
  return request({
    url: '/top/playlist/highquality',
    params: {
      cat,
      limit: 1
    }
  })
}
//歌单(网友精选碟)
export const playlistsTopList = ({ cat, offset }) => {
  return request({
    url: '/top/playlist',
    params: {
      cat,
      limit: 10,
      offset
    }
  })
}
