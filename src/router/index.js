import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/begin'
    },
    {
      path: '/begin',
      name: 'begin',
      component: () => import('@/views/begin')
    },
    {
      path: '/home',
      name: 'home',
      component: () => import('@/views/home')
    },
    {
      path: '/detail',
      name: 'detail',
      component: () => import('@/views/detail')
    },
    {
      path: '/reg',
      name: 'reg',
      component: () => import('@/views/reg')
    },
    {
      path: '/write/:aid',
      name: 'write',
      component: () => import('@/views/write')
    },
    {
      path: '/articleDetail/:aid/:upic/:username/:createdAt/:uid',
      name: 'articleDetail',
      component: () => import('@/views/articleDetail')
    },
    {
      path: '/personnalCenter/:uid/:who/:tab',
      name: 'personnalCenter',
      component: () => import('@/views/personnalCenter')
    },
    {
      path: '/answer',
      name: 'answer',
      component: () => import('@/views/answer')
    },
    {
      path: '/answerDetail/:answerid',
      name: 'answerDetail',
      component: () => import('@/views/answerDetail')
    },
    {
      path: '/topic',
      name: 'topic',
      component: () => import('@/views/topic')
    },
    {
      path: '/search/:value/:tab',
      name: 'search',
      component: () => import('@/views/search')
    },
    {
      path: '/topicDetail/:topic/:tab',
      name: 'topicDetail',
      component: () => import('@/views/topicDetail')
    },
    {
      path: '/privateMessageDetail/:uid',
      name: 'privateMessageDetail',
      component: () => import('@/views/privateMessageDetail')
    },
    {
      path: '/todoList',
      name: 'todoList',
      component: () => import('@/views/todoList')
    },
    {
      path: '/adminHome/:password/:tab',
      name: 'adminHome',
      component: () => import('@/views/admin/adminHome')
    },
    {
      path: '/admin',
      name: 'admin',
      component: () => import('@/views/admin/admin')
    },
    {
      path: '/bookStore',
      name: 'bookStore',
      component: () => import('@/views/bookStore')
    },
    {
      path: '/bookStoreDetail/:id',
      name: 'bookStoreDetail',
      component: () => import('@/views/bookStoreDetail')
    },
    {
      path: '/myBook/:id',
      name: 'myBook',
      component: () => import('@/views/myBook')
    },
    {
      path: '/gameEat',
      name: 'gameEat',
      component: () => import('@/views/game/eat')
    },
    {
      path: '*',
      component: () => import('@/views/NotFoundComponent')
    }
  ]
})


//  router  拦截器
router.beforeEach((to, from, next) => {
  if (to.meta.requireAuth) { // 如果需要权限
    if (store.getters.token) { // 存在的话，直接跳转过去
      next()
    } else {
      next({ path: '/' })
      store.commit('SHOW_SIGN_DIALOG')
    }
  } else {
    next()
  }
})


export default router;