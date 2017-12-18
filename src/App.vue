<template>
  <div id="app">
      <div v-show="showHeader">
          <div class="topBlock"></div>
          <myHeader />
      </div>
      <router-view/>
  </div>
</template>

<script>
import {examine,logOut} from '@/api/regSign.js'
import myHeader from './components/header.vue'
export default {
  name: 'app',
  components: {
    myHeader
  },
  data() {
    return {
      showHeader: true
    }
  },
  created() {
    examine().then((res) => {
        let tmpData = res.data
        console.log(tmpData,"reg......")
        if (tmpData.isLogin) {
          this.isLogin = true
          this.isNotLogin = false
        } else {
          this.isLogin = false
          this.isNotLogin = true
        }
      }).catch((error) => {
        console.log("错啦错啦")
      })
  },
  watch: {
    '$route' (to, from) {
      if (to.name === 'reg') {
        this.showHeader = false
      } else if (to.name === 'write') {
        this.showHeader = false
      }
      else {
        this.showHeader = true
      }
   }
  },
  methods: {
    logOut() {
      alert("logout")
      logOut().then((res) => {
        console.log(res.data,"成功")
        this.isLogin = false
        this.isNotLogin = true
      }).catch((error) => {

      })
    }
  }
}
</script>
<style>
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