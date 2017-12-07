import Vue from 'vue'
import Router from 'vue-router'
import home from '@/routers/home'
import detail from '@/routers/detail'
import reg from '@/routers/reg'
import write from '@/routers/write'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/home',
      name: 'home',
      component: home
    },
    {
      path: '/detail',
      name: 'detail',
      component: detail
    },
    {
      path: '/',
      name: 'reg',
      component: reg
    },
    {
      path: '/write',
      name: 'write',
      component: write
    }
  ]
})
