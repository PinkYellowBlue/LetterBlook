import request from '@/utils/request'
import Qs from 'qs'

//会员卡列表数据
export function cardList(card) {
  return request({
    url: 'cms/system/selectMemberList',
    method: 'post',
    data: Qs.stringify(card)
  })
}