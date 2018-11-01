//交易金额
export function dealMoney(n) {
    if (n > 0) {
      var newN = n / 10 / 10
        var b =  newN.toFixed(2)+'元'
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