import request from '@/utils/request'
import Qs from 'qs'

//列表数据
export function orderList(information) {
  return request({
    url: 'cms/order/getOrderList.shtml',
    method: 'post',
    data: Qs.stringify(information)
  })
}