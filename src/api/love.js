import request from '@/utils/request'

// 搜索
export function loveSearch({ offset }) {
  return request({
    url: '/search',
    method: 'get',
    params: {
      keywords: '古风',
      type: 1,
      offset,
      limit: 15
    }
  })
}
