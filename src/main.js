// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App'
import router from './router'
import axios from './utils/axiosService'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import yzm from './utils/yanzhengma.js'

Vue.use(VueAwesomeSwiper)
Vue.use(ElementUI)
Vue.config.productionTip = false
Vue.prototype.$http = axios
axios.defaults.withCredentials=true
Vue.use(yzm)

// vue全局拦截器
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
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
