<template>
    <div class="personnal_center_container">
      <el-card class="box-card personnal_center_userInfo">
        <div class="personnal_center_userInfo_img">
          <img src="http://img4.imgtn.bdimg.com/it/u=3934882239,2009873357&fm=27&gp=0.jpg" alt="">
        </div>
        <div class="personnal_center_userInfo_content">
          <div style="font-size: 22px"><b>Musashi</b> 前端正在学，在读的大学狗</div>
          <div style="margin-top:20px; font-size: 14px;"><b style="margin-right:30px">个人简介</b> 做事要贯彻始终，那就是所谓的觉悟。无法贯彻始终的人，就是弱者。</div>
        </div>
        <el-button class="personnal_center_userInfo_button" type="primary" plain>编辑个人资料</el-button>
      </el-card>
      <div class="personnal_center_Profile">
        <el-card class="box-card personnal_center_ProfileMain">
            main
        </el-card>
        <el-card class="box-card personnal_center_ProfileAside">
            aside
        </el-card>
      </div>
    </div>
</template>

<script>
import moment from 'moment'
import axios from '../utils/axiosService'
export default {
  name: 'personnalCenter',
  components: {
  },
  data () {
    return {
    }
  },
  created() {
  },
  methods: {
  }
}
</script>
<style>
  .personnal_center_container {
    margin: 0 15%;
  }
  .personnal_center_userInfo {
    margin-top: 10px;
    position: relative;
  }
  .personnal_center_userInfo_img {
    background: red;
    height: 150px;
    width: 150px;
    position: absolute;
    top: 50px;
    left: 80px;
    border: 2px solid #0f88eb;
    border-radius: 50%;
    overflow: hidden
  }
  .personnal_center_userInfo_img img {
    height: 150px;
    width: 150px;
  }
  .personnal_center_userInfo_content {
    height: 130px;
    margin: 70px 0 0 280px;
  }
  .personnal_center_userInfo_button {
    margin-left: 80%;
    margin-bottom: 15px;
  }
  .personnal_center_ProfileMain {
    width: 70%;
    margin-right: 10px;
    float: left
  }
  .personnal_center_ProfileAside {
    width: 28.5%;
    float: left
  }
  .personnal_center_Profile {
    margin-top: 10px
  }
</style>