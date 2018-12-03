import request from '@/utils/request'
import Qs from 'qs'

//新用户列表数据
export function newUserList(cityNumber) {
  return request({
    url: 'cms/userStatistics/newPeopleStatistics',
    method: 'post',
    data: Qs.stringify(cityNumber)
  })
}

//流失用户列表数据
export function lossUserList(lossUser) {
  return request({
    url: 'cms/userStatistics/lostPeopleStatistics',
    method: 'post',
    data: Qs.stringify(lossUser)
  })
}