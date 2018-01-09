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
import answerDetail from '@/views/answerDetail'
import topic from '@/views/topic'
import search from '@/views/search'

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
      path: '/articleDetail/:aid/:upic/:username/:createdAt/:uid',
      name: 'articleDetail',
      component: articleDetail
    },
    {
      path: '/personnalCenter/:uid/:tab',
      name: 'personnalCenter',
      component: personnalCenter
    },
    {
      path: '/answer',
      name: 'answer',
      component: answer
    },
    {
      path: '/answerDetail/:answerid',
      name: 'answerDetail',
      component: answerDetail
    },
    {
      path: '/topic',
      name: 'topic',
      component: topic
    },
    {
      path: '/search/:value/:tab',
      name: 'search',
      component: search
    },
    { 
      path: '*',
      component: NotFoundComponent
    }
  ]
})
