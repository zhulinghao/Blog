<template>
  <div id="app">
      <div v-show="showHeader">
          <div class="topBlock"></div>
          <myHeader :loginStatic='loginStatic' @logOut="logOut"/>
      </div>
      <el-collapse-transition>
          <div class="toTop transition-box" v-show="showToTop" @click="getScrollTop">TOP</div>
      </el-collapse-transition>
      <router-view :loginStatic="loginStatic"></router-view>
  </div>
</template>

<script>
import $ from 'jquery'
import {examine,logOut} from '@/api/regSign.js'
import myHeader from './components/header.vue'
export default {
  name: 'app',
  components: {
    myHeader
  },
  data() {
    return {
      showHeader: true,
      loginStatic: {
        isLogin: false,
        isNotLogin: true,
        username: '',
        uid: ''
      },
      showToTop: false
    }
  },
  created() {
    this.userExamine()
    let path = this.$route.path
    if(path == '/reg' || path == '/write') {
      this.showHeader = false
    } else if(path == '/detail' || path == '/home'){
      this.showHeader = true
    }
  },
  watch: {
    '$route' (to, from) {
      if (to.name === 'reg') {
        this.showHeader = false
        console.log('func uuuuuuuuuuuuuuuuuuuuu')
      } else if (to.name === 'write') {
        this.showHeader = false
      } else if (to.name === 'home'){
        this.showHeader = true
        this.userExamine()
      } else if (to.name === 'articleDetail'){
        this.showHeader = true
      }
   }
  },
  mounted () {
    window.addEventListener('scroll', this.handleScroll)
  },
  methods: {
    userExamine() {
      examine().then((res) => {
        let tmpData = res.data
        if (tmpData.isLogin) {
          this.loginStatic.isLogin = true
          this.loginStatic.isNotLogin = false
          this.loginStatic.username = tmpData.username
          this.loginStatic.uid = tmpData.uid
        } else {
          this.loginStatic.isLogin = false
          this.loginStatic.isNotLogin = true
        }
      }).catch((error) => {
        console.log("错啦错啦")
      })
    },
    handleScroll() {
      let scrollTop = document.documentElement.scrollTop
      if(scrollTop > 200) {
        this.showToTop = true
      } else if(scrollTop < 200){
        this.showToTop = false
      }
    },
    getScrollTop() {
      $('html,body').animate({scrollTop: 0}, 800);
    },
    logOut() {
      let r = confirm("是否注销")
      let that = this
      if (r) {
        logOut().then((res) => {
          alert(res.data)
          this.loginStatic.isLogin = false
          this.loginStatic.isNotLogin = true
        }).catch((error) => {
        })
      } else {
        console.log('ojbk')
      }
    }
  }
}
</script>
<style>
  .toTop {
    color: #0593d3;
    height: 35px;
    width: 40px;
    position: fixed;
    bottom: 80px;
    right: 80px;
    border: 1px solid #0593d3;
    border-radius: 5px;
    background: #fff;
    text-align: center;
    padding-top: 5px;
  }
  .toTop:hover {
    cursor: pointer;
  }
  h1,h2,h3,body {
    margin: 0;
    padding: 0;
  }
  #app {
    height: auto;
    min-height: auto;
  }
  body {
    background: #f3f3f3;
  }
  .container {
    padding: 0 15%;
  }
  .topBlock {
    width: 100%;
    height: 60px;
  }
  a {
    text-decoration: none;
    color: #2d2f33;
  }
  a:hover {
    color: #0f88eb;
  }
</style>