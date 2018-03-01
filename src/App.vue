<template>
  <div id="app">
      <el-collapse-transition>
          <div class="toTop transition-box" v-show="showToTop" @click="getScrollTop">
              <svg class="Zi Zi--BackToTop" title="回到顶部" fill="currentColor" viewBox="0 0 24 24" width="24" height="24"><path d="M16.036 19.59a1 1 0 0 1-.997.995H9.032a.996.996 0 0 1-.997-.996v-7.005H5.03c-1.1 0-1.36-.633-.578-1.416L11.33 4.29a1.003 1.003 0 0 1 1.412 0l6.878 6.88c.782.78.523 1.415-.58 1.415h-3.004v7.005z"></path></svg>
          </div>
      </el-collapse-transition>
      <router-view :loginStatic="loginStatic" :privateMessageData='privateMessageData' @userExamine="userExamine" @logOut="logOut"></router-view>
  </div>
</template>

<script>
import $ from 'jquery'
import axios from './utils/axiosService'
import {examine,logOut} from '@/api/regSign.js'
import myHeader from './components/header.vue'
export default {
  name: 'app',
  components: {
    myHeader
  },
  data() {
    return {
      loginStatic: {
        isLogin: false,
        isNotLogin: true,
        username: '',
        uid: '',
        upic: ''
      },
      showToTop: false,
      privateMessageData: ''
    }
  },
  created() {
    this.userExamine()
  },
  watch: {
  },
  mounted () {
    window.addEventListener('scroll', this.handleScroll)
  },
  methods: {
    getPrivateMessage() {
        let that = this
        let data = {
            uid: this.loginStatic.uid
        }
        axios.post('/api/getPrivateMessage',data).then((res) => {
          this.privateMessageData = res.data 
        }).catch((error) => {
            console.log(error)
        })
    },
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
        this.getPrivateMessage()
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
      this.$confirm('是否注销当前用户?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        logOut().then((res) => {
          this.loginStatic.isLogin = false
          this.loginStatic.isNotLogin = true
        }).catch((error) => {
        })
        this.$message({
          type: 'success',
          message: '注销成功!',
          duration: 1000
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消注销',
          duration: 1000
        });          
      });
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
    padding-top: 5px !important;
    z-index: 100001;
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
  .header_two {
    height: 60px;
    line-height: 60px;
    padding: 0 10%;
    border-bottom: rgba(0,0,0,.08) solid 1px;
    background: #fff;
  }
  .header_two_logo a {
    color: gray;
    font-size: 24px;
    position: absolute;
    text-decoration: none;
  }
  .el-tabs__item {
    font-weight: 700 !important;
    font-size: 14px;
  }
  .el-message {
    z-index: 10002 !important;
  }
  .v-modal {
    z-index: 10002 !important;
  }
  .el-dialog__wrapper,
  .el-message-box__wrapper {
    z-index: 10003 !important;
  }
  .el-select-dropdown {
    z-index: 10004 !important
  }
</style>