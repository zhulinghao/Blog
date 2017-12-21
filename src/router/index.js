import Vue from 'vue'
import Router from 'vue-router'
import home from '@/views/home'
import detail from '@/views/detail'
import reg from '@/views/reg'
import write from '@/views/write'
import articleDetail from '@/views/articleDetail'
import personnalCenter from '@/views/personnalCenter'
import NotFoundComponent from '@/views/NotFoundComponent'
import game from '@/views/game/game.vue'
import answer from '@/views/answer'

Vue.use(Router)

export default new Router({
  mode: 'history',
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
      path: '/game',
      name: 'game',
      component: game
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
    },
    {
      path: '/personnalCenter',
      name: 'personnalCenter',
      component: personnalCenter
    },
    {
      path: '/answer',
      name: 'answer',
      component: answer
    },
    { 
      path: '*',
      component: NotFoundComponent
    }
  ]
})
