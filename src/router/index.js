import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/pages/index'

Vue.use(Router)

export default new Router({
  routes: [
    {path: '/', component: Index},
    {
      path: '/recharge/list',
      meta: {label: '充值', keepAlive: true},
      component: resolve => require(['../pages/recharge/list'], resolve)
    },
    {
      path: '/consume/list',
      meta: {label: '消费', keepAlive: true},
      component: resolve => require(['../pages/consume/list'], resolve)
    }
  ]
})
