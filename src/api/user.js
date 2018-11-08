import request from '@/utils/request'
import Qs from 'qs'

//用户列表数据
export function userList(information) {
  return request({
    url: 'cms/user/findAll',
    method: 'post',
    data: Qs.stringify(information)
  })
}

//用户列表查询
export function userQuery(url,information) {
  return request({
    url: url,
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
export function dynamicList(id) {
  return request({
    url: 'cms/user/findDynamicById',
    method: 'post',
    data: Qs.stringify(id)
  })
}

//好友查询
export function firendList(id) {
  return request({
    url: 'cms/user/findFriendById',
    method: 'post',
    data: Qs.stringify(id)
  })
}

//会员列表
export function memberList(information) {
  return request({
    url: 'cms/user/selectMembershipList',
    method: 'post',
    data: Qs.stringify(information)
  })
}

//会员卡设置
export function cardList() {
  return request({
    url: 'cms/user/selectSysConfigVip',
    method: 'post',
    data: '',
  })
}

//会员卡销售统计
export function cardCound(information) {
  return request({
    url: 'cms/user/countVipCard',
    method: 'post',
    data: Qs.stringify(information),
  })
}

//会员通知列表
export function noticeList(information) {
  return request({
    url: 'cms/user/memberNotification',
    method: 'post',
    data: Qs.stringify(information),
  })
}
