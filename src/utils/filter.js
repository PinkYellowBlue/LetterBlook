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
