import request from '@/utils/request'
import Qs from 'qs'

//创建员工
export function newStaff(roleName) {
  return request({
    url: 'cms/sysRole/insertEmployee',
    method: 'post',
    data: Qs.stringify(roleName)
  })
}
//员工列表
export function staffList(roleName) {
  return request({
    url: 'cms/sysRole/employeeManagementList',
    method: 'post',
    data: Qs.stringify(roleName)
  })
}
//编辑员工
export function editStaffX(roleName) {
  return request({
    url: 'cms/sysRole/updateEmployee',
    method: 'post',
    data: Qs.stringify(roleName)
  })
}
//删除员工
export function deleteStaffX(roleName) {
  return request({
    url: 'cms/sysRole/deleteEmployee',
    method: 'post',
    data: Qs.stringify(roleName)
  })
}