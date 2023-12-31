import request from '@/utils/request'
// mv地址
export function search({ keywords, limit, offset, type }) {
  return request({
    url: '/search',
    method: 'get',
    params: {
      keywords,
      limit,
      offset,
      type
    }
  })
}
