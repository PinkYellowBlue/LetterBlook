/**
 * Created by jiachenpan on 16/11/18.
 */

export function isvalidUsername(str) {
  const valid_map = ['admin', 'editor']
  return valid_map.indexOf(str.trim()) >= 0
}

/* 合法uri*/
export function validateURL(textval) {
  const urlregex = /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/
  return urlregex.test(textval)
}

/* 小写字母*/
export function validateLowerCase(str) {
  const reg = /^[a-z]+$/
  return reg.test(str)
}

/* 大写字母*/
export function validateUpperCase(str) {
  const reg = /^[A-Z]+$/
  return reg.test(str)
}

/* 大小写字母*/
export function validatAlphabets(str) {
  const reg = /^[A-Za-z]+$/
  return reg.test(str)
}

//交易金额
export function dealMoney(value) {
  var newValue = value / 10 / 10;
  return newValue;
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
