import request from '@/utils/request'
import Qs from 'qs'
export function login(username) {
  return request({
    url: 'cms/sysRole/login',
    method: 'post',
    data: Qs.stringify(username)
  })
}

export function getInfo(token) {
  return request({
    url: 'cms/sysRole/roleAuthorization',
    method: 'post',
    data: Qs.stringify({
          token: token
        })
  })
}

export function logout() {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}
