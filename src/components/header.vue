<template>
    <el-menu
    :default-active="activeIndex"
    class="el-menu-demo"
    mode="horizontal"
    text-color="#8590a6">
      <div class="logo">MUSASHI</div>
      <el-menu-item index="1"><router-link to="/">首页</router-link></el-menu-item>
      <el-menu-item index="2"><router-link to="/detail">发现</router-link></el-menu-item>
      <el-menu-item index="3">话题</el-menu-item>
      <el-menu-item index="4"><el-input size='small' v-model="input" placeholder="请输入内容"></el-input></el-menu-item>  
      <el-menu-item index="5" class="headerRight"><i class="el-icon-bell"></i></el-menu-item>
      <el-menu-item index="6"><i class="el-icon-message"></i></el-menu-item>
    </el-menu>
</template>

<script>
  export default {
    data() {
      return {
        activeIndex: '1',
        activeIndex2: '2',
        input: ''
      };
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
    z-index: 2;
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
</style>