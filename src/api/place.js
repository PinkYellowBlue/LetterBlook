import request from '@/utils/request'
import Qs from 'qs'

//查找省份
export function provinceList(areaName) {
  return request({
    url: 'cms/area/selectAreaProvince',
    method: 'post',
    data: Qs.stringify(areaName)
  })
}

//查找城市
export function cityList(areaName) {
  return request({
    url: 'cms/area/selectAreaCity',
    method: 'post',
    data: Qs.stringify(areaName)
  })
}