import request from '@/utils/request'
import Qs from 'qs'

// 商家列表
export function shopList(shop) {
    return request({
      url: 'cms/merchantInformation/selectMerchantInformation',
      method: 'post',
      data: Qs.stringify(shop)
    })
  }
//商家预览详情
export function shopQuery(id) {
  return request({
    url: 'cms/merchantInformation/selectMerchantInformationDetails',
    method: 'post',
    data: Qs.stringify({
      "id": id
    })
  })
}
//商家审核审核
export function shopHandle(info) {
  return request({
    url: 'cms/merchantInformation/examineMerchantInformation',
    method: 'post',
    data: Qs.stringify(info)
  })
}




///添加商家
//商家自己添加信息
export function addShop(fd) {
  return request({
    url: 'cms/merchantInformation/addMerchantInformation',
    method: 'post',
    data: fd
    //  {
    //   info: Qs.stringify(info),
    //   file:file
    // },
    // headers:{ 'Content-Type': 'multipart/form-data'}
      
  })
  
}
//查询主题
export function ThemeList(themeName) {
  return request({
    url: 'cms/comprehensive/selectTheme',
    method: 'post',
    data: Qs.stringify(themeName)
  })
}
//判断是否存在商家信息
export function hasInfo(token) {
  return request({
    url: 'cms/merchantInformation/selectMerchantInformationByToken',
    method: 'post',
    data:  Qs.stringify(token)
    
  })
}
// 商家信息
export function shopInfo(shopinfo,id) {
  return request({
    url: 'cms/merchantInformation/addAttributeExtension?id='+id,
    method: 'post',
    data:  shopinfo
    
  })
}
//上传图片
export function handleImg(fd) {
  return request({
    url: 'cms/merchantInformation/uploadMerchantInformationImage',
    method: 'post',
    data:  fd
    
  })
}
//富文本
export function uploadFu(pinpai) {
  return request({
    url: 'cms/merchantInformation/addLargeFieldAttribute',
    method: 'post',
    data:  Qs.stringify(pinpai)
    
  })
}
//删除照片
export function delPhoto(id) {
  return request({
    url: 'cms/merchantInformation/deleteMerchantInformationImage',
    method: 'post',
    data:  Qs.stringify({
      "id": id
    })
    
  })
}
// 商家自己更新基本信息
export function updateShop(upfd) {
  return request({
    url: 'cms/merchantInformation/updateMerchantInformation',
    method: 'post',
    data:  upfd
    
  })
}

export function selectCity(citycode) {
  return request({
    url: 'cms/area/selectAreaCity',
    method: 'post',
    data:  Qs.stringify({
      "areaId": citycode
    })
    
  })
}