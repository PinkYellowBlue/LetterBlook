<<<<<<< HEAD
//测试图片
=======
﻿//测试图片
>>>>>>> e7dfd5fbfee084b494385b4f38e04919ef8882d3
export function testImg(n) {
  var b = "http://apitest.letterbook.cn/letter" + n
  return b
}
//角色状态
  export function roleState(value) {
    var dataKey = {
      "0": "正常",
      "1": "禁用",
    };
    var newValue = dataKey[value];
    return newValue;
  }
//交易金额
export function dealMoney(n) {
  if (n > 0) {
    var newN = n / 10 / 10
    var b = newN.toFixed(2) + '元'
  } else {
    return n
  }
  return b
}


//支付状态
export function stateFilter(value) {
  var dataKey = {
    "0": "成功",
    "1": "失败",
    "2": "未支付",
    "3": "交易关闭"
  };
  var newValue = dataKey[value];
  return newValue;
}
//预约状态
export function appointmentFilter(value) {
  var dataKey = {
    "1": "审核",
    "2": "废弃",
    "3": "发布",
    "4": "删除"
  };
  var newValue = dataKey[value];
  return newValue;
}
//支付方式
export function paymentFilter(value) {
  var dataKey = {
    "1": "支付宝支付",
    "2": "微信支付"
  };
  var newValue = dataKey[value];
  return newValue;
}
//订单类型
export function typeFilter(value) {
  var dataKey = {
    "1": "写信",
    "2": "会员",
    "3": "礼物",
    "4": "提现"
  };
  var newValue = dataKey[value];
  return newValue;
}
//会员类型
export function memberFilter(value) {
  var dataKey = {
    "1": "月卡",
    "2": "季卡",
    "3": "年卡",
  };
  var newValue = dataKey[value];
  return newValue;
}
//是否在线
export function lineFilter(value) {
  var dataKey = {
    "1": "在线",
    "2": "离线",
  };
  var newValue = dataKey[value];
  return newValue;
}
//时间转换
export function dateFilter(date) {
  var load = [];
  for (var i = 0; i < date.length; i++) {
    var e = date[i];
    var data = new Date(e);
    var y = e.getFullYear();
    var m = e.getMonth() + 1;
    // m = m < 10 ? '0' + m : m;
    var d = e.getDate();
    // d = d < 10 ? ('0' + d) : d;
    var newDate = y + "-" + m + "-" + d;
    load.push(newDate);
  }
  return load
}
//时间转换ex
export function dateFilterex(date) {
  var e = date;
  var data = new Date(e);
  var y = e.getFullYear();
  var m = e.getMonth() + 1;
  // m = m < 10 ? '0' + m : m;
  var d = e.getDate();
  // d = d < 10 ? ('0' + d) : d;
  var newDate = y + "-" + m + "-" + d;

  return newDate
}
//性别
export function sexFilter(value) {
  var dataKey = {
    "1": "男",
    "2": "女",
  };
  var newValue = dataKey[value];
  return newValue;
}
//会员类型
export function fourFilter(value) {
  var dataKey = {
    "1": "月卡会员",
    "2": "季卡会员",
    "3": "年卡会员",
  };
  var newValue = dataKey[value];
  return newValue;
}
<<<<<<< HEAD
=======
//编辑权限
export function roleFilterex(value) {
  let newValue = []
  var dataKey = {
    "首页": "index",
    "用户管理": "userCode",
    "用户列表": "userListCode",
    "用户详情列表": "userDetailsCode",
    "会员列表": "memberCode",
    "会员统计": "memCountCode",
    "会员通知": "memNotice",
    "数据统计": "statisticsCode",
    "流失用户统计": "lostPeopleCode",
    "财务管理": "orderCode",
    "订单列表": "getOrderListCode",
    "订单详情": "userListCode",
    "财务对账": "reconciliationCode",
    "权限管理": "sysRoleCode",
    "角色管理": "jurisdictionCode",
    "员工列表": "employeeManagementListCode",
    "系统设置": "systemCode",
    "用户协议设置": "userAgreementCode",
    "会员卡设置": "vipCode",
    "综合管理": "comprehensiveCode",
    "操作记录": "operationCode",
    "主题管理": "themeCode",
    "预约列表": "subscribeList"
  };
  for (let i = 0; i < value.length; i++) {
    let e = value[i];
    newValue.push(dataKey[e])
    
  }
  return newValue;
}
//会员卡类型
export function cardFilter(value) {
  var dataKey = {
    "LETTER_VIP_MONTH": "月卡会员",
    "LETTER_VIP_QUARTER": "季卡会员",
    "LETTER_VIP_YEAR": "年卡会员",
  };
  var newValue = dataKey[value];
  return newValue;
}
// 费用
export function fedFilter(value) {
  var dataKey = {
    "0": "免费",
    "1": "AA",
  };
  var newValue = dataKey[value];
  return newValue;
}
//性别
export function sexFilterex(value) {
  var dataKey = {
    "0": "不限制",
    "1": "女",
    "2": "男",
  };
  var newValue = dataKey[value];
  return newValue;
}
//审核状态   
export function handleShop(value) {
  var dataKey = {
    "0": "申请",
    "1": "驳回",
    "2": "上架",
    "3": "封停"
  };
  var newValue = dataKey[value];
  return newValue;
}
//时间转换shop
export function dateFilterShop(date) {
  var e = date;
  var data = new Date(e);
  var newDate = data.toLocaleDateString().replace(/\//g, "-") + " " + data.toTimeString().substr(0, 8);
  newDate = newDate.substr(0,10);
  return newDate
}

//审核状态   
export function handleGuide(value) {
  var dataKey = {
    "0": "未查看",
    "1": "已查看"
  };
  var newValue = dataKey[value];
  return newValue;
}
//审核状态   
export function handleGuideSour(value) {
  var dataKey = {
    "1": "前台",
    "2": "后台"
  };
  var newValue = dataKey[value];
  return newValue;
}
>>>>>>> e7dfd5fbfee084b494385b4f38e04919ef8882d3
