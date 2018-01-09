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
        uid: '',
        upic: ''
      },
      showToTop: false
    }
  },
  created() {
    this.userExamine()
    let path = this.$route.path
    if(path == '/reg' || path == '/write' ) {
      this.showHeader = false
    } else if(path == '/detail' || path == '/home'){
      this.showHeader = true
    }
  },
  watch: {
    '$route' (to, from) {
      if (to.name === 'reg') {
        this.showHeader = false
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
          this.loginStatic.upic = tmpData.upic
        } else {
          this.loginStatic.isLogin = false
          this.loginStatic.isNotLogin = true
        }
      }).catch((error) => {
        console.log(error)
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
  html,body{height:100%;}
  body {
    background: #f3f3f3;
  }
  .toTop {
    color: rgb(133, 144, 166);
    height: 35px;
    width: 40px;
    position: fixed;
    bottom: 80px;
    right: 80px;
    box-shadow: 0 1px 3px rgba(0,0,0,.1);
    border-radius: 5px;
    background: #fff;
    text-align: center;
    padding-top: 5px;
  }
  .toTop:hover {
    cursor: pointer;
    background: rgba(133, 144, 166,.3);
  }
  h1,h2,h3,body {
    margin: 0;
    padding: 0;
  }
  #app {
    height: auto;
    min-height: auto;
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
  /* elment ui style change */
  .el-tabs__item {
    font-weight: 700 !important;
    font-size: 14px;
  }
</style>