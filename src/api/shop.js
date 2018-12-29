import request from '@/utils/request'
import Qs from 'qs'

// 角色列表
export function shopList(shop) {
    return request({
      url: 'cms/merchantInformation/selectMerchantInformation',
      method: 'post',
      data: Qs.stringify(shop)
    })
  }
//商家详情
export function shopQuery(id) {
  return request({
    url: 'cms/merchantInformation/selectMerchantInformationDetails',
    method: 'post',
    data: Qs.stringify({
      "id": id
    })
  })
}
//审核审核
export function shopHandle(info) {
  return request({
    url: 'cms/merchantInformation/examineMerchantInformation',
    method: 'post',
    data: Qs.stringify(info)
  })
}