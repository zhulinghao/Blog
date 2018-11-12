<template>
  <el-menu
  :default-active="activeIndex"
  class="el-menu-demo"
  mode="horizontal"
  text-color="#8590a6">
    <div @click="toHome" class="logo">YUYAN</div>
    <el-menu-item index="1" class="header_home_item"><router-link to="/home">首页</router-link></el-menu-item>
    <el-menu-item index="2" class="header_book_item"><router-link to="/bookStore">书城</router-link></el-menu-item>
    <el-menu-item index="3" class="header_topic_item"><router-link to="/topic">话题</router-link></el-menu-item>
    <el-menu-item index="4" class="header_topic_item"><router-link to="/answer">回答</router-link></el-menu-item>
    <el-menu-item index="5">
      <el-input size='small'
        v-model="searchValue"
        class="search_input"
        placeholder="请输入内容"
        @keyup.enter.native="search">
      <el-button class="search_input_button" slot="append" @click="search" icon="el-icon-search" type="primary"></el-button>
    </el-input>
    <el-input size='small'
      v-model="searchValue"
      class="search_input_mobile"
      placeholder="请输入内容"
      @keyup.enter.native="search">
    </el-input>
    </el-menu-item>
    <el-menu-item index="6" v-show="loginStatic.isNotLogin" class="header_reg_item"><router-link to="/reg">注册/登陆</router-link></el-menu-item>
    <el-menu-item index="7" v-show="loginStatic.isLogin" class="sixin">
      <el-dropdown trigger="click" placement="bottom" >
          <span class="el-dropdown-link">
              <i class="el-icon-bell header-icon"></i><span style="color: #fa5555">({{privateMessageData.length}})</span>
          </span>
          <el-dropdown-menu slot="dropdown" class="dropdown_container">
              <div class="dropdown_head">
                我的私信
              </div>
              <div class="dropdown_content" @click="toDetail" v-show="privateMessageData.length" v-for="item in privateMessageData" :key="item">
                <img class="dropdown_content_img" :src="item[item.length - 1].userInfo.senderUpic">
                <div class="dropdown_content_t">
                  <span style="font-size: 16px;font-weight: 700;" :class="item[item.length - 1].userInfo.senderUsername === loginStatic.username ? 'aaa' : null">{{item[item.length - 1].userInfo.senderUsername === loginStatic.username ? '我' : item[item.length - 1].userInfo.senderUsername}}</span>
                  <div class="dropdown_content_text">{{item[item.length - 1].content}}</div>
                </div>
                <div class="dropdown_content_time">
                    {{item[item.length - 1].createdAt}}
                </div>
              </div>
              <div class="no_private_message" v-show=!privateMessageData.length >
                没有人给你发私信哦(ಥ﹏ಥ)
              </div>
          </el-dropdown-menu>
        </el-dropdown>
    </el-menu-item>
    <el-menu-item index="8" class="header_person_item" v-show="loginStatic.isLogin">
        <el-dropdown trigger="click"  placement="bottom">
            <span class="el-dropdown-link">
                <img class="header-avatar" :src="loginStatic.upic ? loginStatic.upic : $var.defaultAvatar">
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item><router-link :to="{ name:'personnalCenter', params: {uid: loginStatic.uid, who:'me', tab: 'first'} }">个人中心</router-link></el-dropdown-item>
              <el-dropdown-item class="header_todo_item"><router-link to="/todoList">Todo List</router-link></el-dropdown-item>
              <el-dropdown-item class="header_todo_item"><router-link to="/gameEat">吃豆豆(游戏)</router-link></el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
    </el-menu-item>
    <el-menu-item index="9" v-show="loginStatic.isLogin" class="header_logout_item" @click="logOut">注销</el-menu-item>
    <el-menu-item index="10">
        <el-dropdown>
            <i class="el-icon-menu header_moble_menu"></i>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>
                <router-link to="/home">首页</router-link>
              </el-dropdown-item>
              <el-dropdown-item>
                <router-link to="/bookStore">书城</router-link>
              </el-dropdown-item>
              <el-dropdown-item>
                <router-link to="/topic">话题</router-link>
              </el-dropdown-item>
              <el-dropdown-item>
                  <div><router-link to="/todoList">Todo List</router-link></div>
              </el-dropdown-item>
              <el-dropdown-item>
                  <div index="9" v-show="loginStatic.isLogin"><router-link :to="{ name:'personnalCenter', params: {uid: loginStatic.uid, who:'me', tab: 'first'} }">{{loginStatic.username}}</router-link></div>
              </el-dropdown-item>
              <el-dropdown-item>
                  <div v-show="loginStatic.isNotLogin"><router-link to="/reg">注册/登陆</router-link></div>
              </el-dropdown-item>
              <el-dropdown-item>
                <div v-show="loginStatic.isLogin" @click="toDetail">私信</div>
              </el-dropdown-item>
              <el-dropdown-item>
                  <div index="10" v-show="loginStatic.isLogin" @click="logOut">注销</div>
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
    </el-menu-item>
  </el-menu>
</template>

<script>
  export default {
    data() {
      return {
        activeIndex: '',
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
      toHome() {
        this.$router.push({path: 'home'})
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
  @media (max-width: 768px) {
    .el-menu-demo {
      padding: 0 1rem;
      position: fixed;
      width: 100%;
      top: 0;
      left: 0;
      z-index: 10001;
      box-shadow: 0 1px 3px rgba(26,26,26,.1);
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
    .search_input_mobile {
      display: block;
    }
    .header_moble_menu {
      font-size: 25px !important;
    }
    .logo {
      height: 60px;
      width: 5rem;
      cursor: pointer;
      float: left;
      color: #0f88eb;
      line-height: 60px;
      outline: none;
      font-size: 24px;
      font-family: "Helvetica Neue",Helvetica,Arial,sans-serif;
    }
    .el-icon-bell,
    .el-icon-message {
      color: #9fadc7;
    }
    .header_person_item,
    .header_logout_item,
    .sixin,
    .search_input,
    .header_reg_item,
    .header_book_item,
    .header_topic_item,
    .header_home_item,
    .header_todo_item {
      display: none !important;
    }
    .search_input_mobile {
      width: 10rem;
    }
  }
  @media (min-width: 768px) {
    .aaa {
      color: #fa5555;
    }
    .header-icon {
      font-size: 22px !important;
    }
    .el-menu-demo {
      padding: 0 15%;
      position: fixed;
      width: 100%;
      top: 0;
      left: 0;
      z-index: 10001;
      box-shadow: 0 1px 3px rgba(26,26,26,.1);
    }
    .header_moble_menu {
      display: none;
    }
    .el-menu-item {
      font-size: 15px;
    }
    .el-menu-demo li {
      border: none !important;
    }
    .search_input {

    }
    .search_input input:focus {
      box-shadow: 0px 2px 5px rgba(0,0,0,.2);
      border: 1px solid rgba(0,0,0,.1);
      transition: 1s;
    }
    .search_input_mobile {
      display: none;
    }
    .el-menu-demo li:hover {
      background: none !important;
    }
    .el-menu-demo a {
      text-decoration: none;
    }
    .header-avatar {
      height: 35px;
      width: 35px;
      border-radius: 5px;
    }
    .el-menu-demo a:hover {
      color: #175199 !important;
    }
    .search_input_button i {
      font-weight: 700;
    }
    .logo {
      height: 60px;
      width: 100px;
      cursor: pointer;
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
      height: 78px;
    }
    .dropdown_content:hover {
      background: #f3f3f3;
      transition: .4s;
      cursor: pointer;
    }
    .dropdown_content_text {
      width: 270px;
      font-size: 14px;
      white-space:nowrap;
      overflow: hidden;
      text-overflow:ellipsis;
    }
    .dropdown_content_time {
      position: absolute;
      right: 10px;
      bottom: 10px;
      font-size: 14px;
      color: #999;
    }
    .dropdown_content_t {
      position: absolute;
      left: 75px;
      top: 10px;
    }
    .dropdown_content_img {
      position: absolute;
      top: 10px;
      left: 10px;
      height: 50px;
      width: 50px;
      border-radius: 50%;
    }
  }
</style>
