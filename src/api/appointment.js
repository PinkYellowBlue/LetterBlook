import request from '@/utils/request'
import Qs from 'qs'

//预约列表数据
export function cardList(card) {
  return request({
    url: 'v1/appointment/selectReservationPage.shtml',
    method: 'post',
    data: Qs.stringify(card)
  })
}
//预约详情
export function cardDetails(details) {
  return request({
    url: 'v1/appointment/selectReservationFormDetails.shtml',
    method: 'post',
    data: Qs.stringify(details)
  })
}
//审核预约
export function examine(examine) {
  return request({
    url: 'v1/appointment/updateReservationFormState.shtml',
    method: 'post',
    data: Qs.stringify(examine)
  })
}
//预约主题
export function themeMany(theme) {
  return request({
    url: 'cms/comprehensive/selectTheme',
    method: 'post',
    data: Qs.stringify(theme)
  })
}