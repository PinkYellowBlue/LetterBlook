import request from '@/utils/request'
import Qs from 'qs'

//今日新增用户统计
export function newPeople(roleName) {
  return request({
    url: 'cms/index/newDataPeopleStatistics',
    method: 'post',
    data: Qs.stringify(roleName)
  })
}