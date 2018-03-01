<template>
  <el-menu
  :default-active="activeIndex"
  class="el-menu-demo"
  mode="horizontal"
  text-color="#8590a6">
    <div class="logo">YUYAN</div>
    <el-menu-item index="1"><router-link to="/">首页</router-link></el-menu-item>
    <el-menu-item index="2"><router-link to="/detail">开发TEST</router-link></el-menu-item>
    <el-menu-item index="3"><router-link to="/topic">话题</router-link></el-menu-item>
    <el-menu-item index="4">
      <el-input size='small' 
      v-model="searchValue"
      class="search_input"
      placeholder="请输入内容" 
      @keyup.enter.native="search">
      <el-button slot="append" @click="search" icon="el-icon-search"></el-button>
    </el-input>
    </el-menu-item> 
    <el-menu-item index="6" v-show="loginStatic.isNotLogin"><router-link to="/reg">注册/登陆</router-link></el-menu-item>
    <el-menu-item index="7" v-show="loginStatic.isLogin" @click="">
      <el-dropdown trigger="click" placement="bottom">
          <span class="el-dropdown-link">
              私信({{privateMessageData.length}})
          </span>
          <el-dropdown-menu slot="dropdown" class="dropdown_container">
              <div class="dropdown_head">
                我的私信
              </div>
              <div class="dropdown_content" @click="toDetail" v-show=privateMessageData.length v-for="item in privateMessageData">
                <img class="dropdown_content_img" :src="item[0].senderUpic">
                <div class="dropdown_content_t">
                  <span style="color:#0f88eb;font-size: 14px;">{{item[0].senderUsername}}:</span>
                  <div class="dropdown_content_text">{{item[0].content}}</div>
                </div>
                <div class="dropdown_content_time">
                    {{item[0].createdAt}}
                </div>
              </div>
              <div class="no_private_message" v-show=!privateMessageData.length >
                没有人给你发私信哦(ಥ﹏ಥ)
              </div>
          </el-dropdown-menu>
        </el-dropdown>
    </el-menu-item>
    <el-menu-item index="8" v-show="loginStatic.isLogin"><router-link to="/todoList">Todo List</router-link></el-menu-item>
    <el-menu-item index="9" v-show="loginStatic.isLogin"><router-link :to="{ name:'personnalCenter', params: {uid: loginStatic.uid, who:'me', tab: 'first'} }">{{loginStatic.username}}</router-link></el-menu-item>
    <el-menu-item index="10" v-show="loginStatic.isLogin" @click="logOut">注销</el-menu-item>
  </el-menu>
</template>

<script>
export default {
  data() {
    return {
      activeIndex: '1',
      searchValue: ''
    };
  },
  props: {
    loginStatic: {
      required: true
    },
    privateMessageData: {
      required: true
    }
  },
  created() {
  },
  methods: {
    toDetail() {
      this.$router.push({ path: `/privateMessageDetail/${this.loginStatic.uid}` })
    },
    logOut() {
      this.$emit('logOut')
    },
    search() {
      if (this.searchValue) {
        this.$router.push({ path: `/search/${this.searchValue}/first`})
      }
    }
  }
}
</script>
<style>
.el-menu-demo {
  padding: 0 15%;
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;
  z-index: 10001;
}
.el-menu-demo li {
  border: none !important;
}
.el-menu-demo li:hover {
  background: none !important;
}
.el-menu-demo a {
  text-decoration: none;
}
.el-menu-demo a:hover {
  color: #175199 !important;
}
.logo {
  height: 60px;
  width: 150px;
  float: left;
  color: #0f88eb;
  line-height: 60px;
  outline: none;
  font-size: 24px;
  font-family: "Helvetica Neue",Helvetica,Arial,sans-serif;
}
.headerButton {
  margin-left: 3%;
}
.el-icon-bell,
.el-icon-message {
  color: #9fadc7;
}
.headerImg {
  height: 20px;
  width: 20px;
}
.headerRight {
  margin-left: 20%;
}
.search_input {
  width: 400px;
}
.dropdown_container {
  width: 350px;
  height: 370px;
}
.dropdown_head {
  text-align: center;
  padding-bottom: 15px;
  border-bottom: 1px solid #e6e6e6;
  color: #999;
  font-weight: 700;
}
.no_private_message {
  padding: 10px;
  text-align: center;
  color: #999;
  margin-top: 30%
}
.dropdown_content {
  border-bottom:  1px solid #e6e6e6;
  position: relative;
  height: 70px;

}
.dropdown_content:hover {
  background: #f3f3f3;
  transition: .4s;
  cursor: pointer;
}
.dropdown_content_text {
  font-size: 14px;
}
.dropdown_content_time {
  position: absolute;
  right: 5px;
  bottom: 5px;
  font-size: 14px;
  color: #999;
}
.dropdown_content_t {
  position: absolute;
  left: 60px;
  top: 10px;
}
.dropdown_content_img {
  position: absolute;
  top: 10px;
  left: 10px;
  height: 40px;
  width: 40px;
  border-radius: 50%;
}
</style>