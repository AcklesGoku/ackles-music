import request from '@/utils/request'

// mv地址
export function MVmvUrl({ id }) {
  return request({
    url: '/mv/url',
    method: 'get',
    params: {
      id
    }
  })
}
// 相似mv
export function MVsimiMV({ mvid }) {
  return request({
    url: '/simi/mv',
    method: 'get',
    params: {
      mvid
    }
  })
}
// mv评论
export function MVmvComments({ id, offset }) {
  return request({
    url: '/comment/mv',
    method: 'get',
    params: {
      id,
      limit: 5,
      offset
    }
  })
}
// mv详情
export function MVmvDetail({ mvid }) {
  return request({
    url: '/mv/detail',
    method: 'get',
    params: {
      mvid
    }
  })
}
// 歌手信息
export function MVartistInfo({ artistId }) {
  return request({
    url: '/artists',
    method: 'get',
    params: {
      id: artistId
    }
  })
}
