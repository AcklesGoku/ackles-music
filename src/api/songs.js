import request from '@/utils/request'
// mv地址
export function songsTop({ type }) {
  return request({
    url: '/top/song',
    method: 'get',
    params: {
      type
    }
  })
}
