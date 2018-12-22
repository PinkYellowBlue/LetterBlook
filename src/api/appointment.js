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