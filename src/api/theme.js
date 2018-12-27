import request from '@/utils/request'
import Qs from 'qs'

//创建主题
export function newTheme(themeName) {
  return request({
    url: 'cms/comprehensive/insertTheme',
    method: 'post',
    data: Qs.stringify(themeName)
  })
}
// 主题列表
export function ThemeList(themeName) {
  return request({
    url: 'cms/comprehensive/selectTheme',
    method: 'post',
    data: Qs.stringify(themeName)
  })
}
// 编辑主题
export function editTheme(editTheme) {
  return request({
    url: 'cms/comprehensive/updateTheme',
    method: 'post',
    data: Qs.stringify(editTheme)
  })
}
// 删除主题
export function deletTheme(editTheme) {
  return request({
    url: 'cms/comprehensive/deleteTheme',
    method: 'post',
    data: Qs.stringify(editTheme)
  })
}