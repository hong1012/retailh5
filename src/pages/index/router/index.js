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
      component: resolve => require(['../index.vue'], resolve)
    },
    {
      path: '/recharge/list',
      meta: {label: '充值记录', keepAlive: true},
      component: resolve => require(['../recharge/list'], resolve)
    },
    {
      path: '/recharge/index',
      meta: {label: '充值', keepAlive: true},
      component: resolve => require(['../recharge/index/index'], resolve)
    },
    {
      path: '/consume/list',
      meta: {label: '消费记录', keepAlive: true},
      component: resolve => require(['../consume/list'], resolve)
    },
    {
      path: '/consume/detail',
      meta: {label: '消费详情', keepAlive: true},
      component: resolve => require(['../consume/detail'], resolve)
    }
  ]
})
