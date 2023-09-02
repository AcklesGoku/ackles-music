import request from '@/utils/request'
//注册
export const userRegisterService = ({ username, password, repassword }) => {
  return request({
    url: '/api/reg',
    method: 'post',
    data: {
      username,
      password,
      repassword
    }
  })
}

//登录
export const userLoginService = ({ username, password }) => {
  return request({
    url: '/api/login',
    method: 'post',
    data: {
      username,
      password
    }
  })
}
//获取用户基本信息
export const userGetInfoService = () => {
  return request.get('/my/userinfo')
}
