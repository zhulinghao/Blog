import Vue from 'vue'
import Router from 'vue-router'
import home from '@/views/home'
import detail from '@/views/detail'
import reg from '@/views/reg'
import write from '@/views/write'
import articleDetail from '@/views/articleDetail'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
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
      path: '/reg',
      name: 'reg',
      component: reg
    },
    {
      path: '/write',
      name: 'write',
      component: write
    },
    {
      path: '/articleDetail/:aid',
      name: 'articleDetail',
      component: articleDetail
    }
  ]
})
