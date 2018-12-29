'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
<<<<<<< HEAD
  BASE_API: '"http://cms.letterbook.cn/letter-cms/"',
})
//http://apitest.letterbook.cn/letter-cms/
// http://192.168.1.117:8080/letter-cms/
//http://192.168.1.36:8086/letter-cms/
//http://115.159.58.129:3333/api/
// http://apitest.letterbook.cn:8081/letter-cms/
=======
  BASE_API: '" http://cms.letterbook.cn/letter-cms"',
})
//http://apitest.letterbook.cn:8081/letter-cms/
//http://192.168.1.44:8080/letter-cms
//http://115.159.58.129:3333/api/
>>>>>>> e7dfd5fbfee084b494385b4f38e04919ef8882d3
