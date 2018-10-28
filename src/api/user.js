import request from '@/utils/request'
import Qs from 'qs'

//列表数据
export function userList(information) {
  return request({
    url: 'cms/order/getOrderList.shtml',
    method: 'post',
    data: Qs.stringify(information)
  })
}

//用户信息
export function userdetails(id) {
  return request({
    url: 'cms/user/findByUserId',
    method: 'post',
    data: Qs.stringify(id)
  })
}

//动态查询
export function firendList(id) {
  return request({
    url: 'cms/user/findDynamicById',
    method: 'post',
    data: Qs.stringify(id)
  })
}