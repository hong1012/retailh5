import Vue from 'vue'
import Router from 'vue-router'
// import Index from '@/pages/index'

Vue.use(Router)

export default new Router({
  routes: [
    // {path: '/', component: Index},
    {
      path: '/',
      meta: {label: '会员列表', keepAlive: true},
      component: resolve => require(['../index.vue'], resolve)
    }
  ]
})
