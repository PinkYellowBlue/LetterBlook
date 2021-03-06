import {
  asyncRouterMap,
  constantRouterMap
} from '@/router'

/**
 * 通过meta.role判断是否与当前用户权限匹配
 * @param roles
 * @param route
 */
function hasPermission(roles, route) {
  if (route.meta && route.meta.roles) {
      console.log(route,'****************');
      var c = roles.some(role => route.meta.roles.includes(role))
      console.log(roles,'&&&&&&&&&&&&');
      
      console.log(c,'%%%%%%%%%%%%');
      
      return c
  } else {
    return true
  }
}

/**
 * 递归过滤异步路由表，返回符合用户角色权限的路由表
 * @param routes asyncRouterMap
 * @param roles
 */
function filterAsyncRouter(routes, roles) {
  const res = []

  routes.forEach(route => {
    const tmp = { ...route
    }
    if (hasPermission(roles, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRouter(tmp.children, roles)
      }
      res.push(tmp)
      console.log(res,'^^^^^^^^^');
      
    }
  })

  return res
}

const permission = {
  state: {
    routers: constantRouterMap,
    addRouters: []
  },
  mutations: {
    SET_ROUTERS: (state, routers) => {
      state.addRouters = routers
      state.routers = constantRouterMap.concat(routers)
      console.log(state.routers,'是什么数据');
      
    }
  },
  actions: {
    GenerateRoutes({commit}, data) {
      return new Promise(resolve => {
        const {
          roles
        } = data
        console.log(roles,'什么身份');
        
        let accessedRouters
                   accessedRouters = filterAsyncRouter(asyncRouterMap, roles)
        if (roles.includes('admin')) {
          accessedRouters = asyncRouterMap
          console.log(accessedRouters,'异步加载###');
          
        } else {
          accessedRouters = filterAsyncRouter(asyncRouterMap, roles)
        }
        commit('SET_ROUTERS', accessedRouters)
        console.log(accessedRouters,'最后要渲染的权限路由');
        
        resolve()
      })
    }
  }
}

export default permission
