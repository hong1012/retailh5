import Vue from 'vue'
import Router from 'vue-router'
// import Index from '@/pages/index'

Vue.use(Router)

export default new Router({
  routes: [
    // {path: '/', component: Index},
    {
      path: '/',
      meta: {label: '首页', keepAlive: true},
      component: resolve => require(['../pages/index'], resolve)
    },
    {
      path: '/recharge/list',
      meta: {label: '充值记录', keepAlive: true},
      component: resolve => require(['../pages/recharge/list'], resolve)
    },
    {
      path: '/recharge/index',
      meta: {label: '充值', keepAlive: true},
      component: resolve => require(['../pages/recharge/index/index'], resolve)
    },
    {
      path: '/consume/list',
      meta: {label: '消费记录', keepAlive: true},
      component: resolve => require(['../pages/consume/list'], resolve)
    }
  ]
})
