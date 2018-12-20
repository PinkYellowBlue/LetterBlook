import request from '@/utils/request'
import Qs from 'qs'

//创建角色
export function newRole(roleName) {
  return request({
    url: 'cms/sysRole/insertRole',
    method: 'post',
    data: Qs.stringify(roleName)
  })
}
// 角色列表
export function RoleList(roleName) {
  return request({
    url: 'cms/sysRole/jurisdiction',
    method: 'post',
    data: Qs.stringify(roleName)
  })
}
// 编辑角色
export function editRole(editRole) {
  return request({
    url: 'cms/sysRole/updateJurisdiction',
    method: 'post',
    data: Qs.stringify(editRole)
  })
}
// 删除角色
export function deletRole(editRole) {
  return request({
    url: 'cms/sysRole/deleteJurisdiction',
    method: 'post',
    data: Qs.stringify(editRole)
  })
}
// 编辑权限
export function roleEditEX(editRole) {
  return request({
    url: 'cms/sysRole/roleDeOrAdd',
    method: 'post',
    data: editRole
  })
}