<template>
    <div class="personnal_center_container">
      <el-card class="box-card personnal_center_userInfo">
        <div class="personnal_center_userInfo_img">
          <img :src=loginStatic.upic alt="">
        </div>
        <div class="personnal_center_userInfo_content">
          <div style="font-size: 22px"><b>Musashi</b> 前端正在学，在读的大学狗</div>
          <div style="margin-top:20px; font-size: 14px;"><b style="margin-right:30px">个人简介</b> 做事要贯彻始终，那就是所谓的觉悟。无法贯彻始终的人，就是弱者。</div>
        </div>
        <el-button @click="editVisible = true" class="personnal_center_userInfo_button" type="primary" plain>编辑个人资料</el-button>
        <el-dialog
          title="修改个人信息"
          :visible.sync="editVisible"
          width="30%">
          <span>
              更改头像:<upLoadAvatar :uid="loginStatic.uid"/>
              <el-form :model="userEditForm" ref="loginForm" class="demo-ruleForm">
                  更改性别:
                <el-form-item prop="gender">
                  <el-radio v-model="userEditForm.gender" border label="0">男孩子</el-radio>
                  <el-radio v-model="userEditForm.gender" border label="1">女孩子</el-radio>
                  <el-radio v-model="userEditForm.gender" border label="2"> 其他</el-radio>
               </el-form-item>
                <el-form-item prop="description" label="个人简介">
                    <el-input v-model="userEditForm.description" placeholder="个人简介"></el-input>
                </el-form-item>
              </el-form>
          </span>
          <span slot="footer" class="dialog-footer">
          <el-button @click="editVisible = false">取 消</el-button>
          <el-button type="primary" @click="login('loginForm')">提 交</el-button>
          </span>
      </el-dialog>
      </el-card>
      <div class="personnal_center_Profile">
          <el-tabs v-model="activeName" type="border-card" class="personnal_center_ProfileMain" @tab-click="handleClick">
            <el-tab-pane label="文章" name="first">文章</el-tab-pane>
            <el-tab-pane label="回答" name="second">回答</el-tab-pane>
            <el-tab-pane label="提问" name="third">提问</el-tab-pane>
            <el-tab-pane label="收藏" name="fourth">
              <el-tabs  type="border" tab-position="left" style="left: 120px;margin-left: -20px;">
                <el-tab-pane label="收藏文章">
                  <div v-for="item in dataFA" class="personnal_center_ProfileMain_fa">
                    <router-link :to="{ name:'articleDetail', params: {aid: item.id,upic: item.upic,username: item.username,createdAt: item.createdAt,uid: loginStatic.uid} }">{{item.title}}</router-link>
                    <div class="personnal_center_ProfileMain_fa_txt">
                      <span>类型：文章</span> <span>作者：{{item.username}}</span> <span>收藏：{{item.version}}</span>
                    </div>
                  </div>
                </el-tab-pane>
                <el-tab-pane label="收藏问题">问题</el-tab-pane>
                <el-tab-pane label="收藏回答">回答</el-tab-pane>
              </el-tabs>
            </el-tab-pane>
            <el-tab-pane label="关注" name="five">关注</el-tab-pane>
          </el-tabs>
        <el-card class="box-card personnal_center_ProfileAside">
            aside
        </el-card>
      </div>
    </div>
</template>

<script>
import upLoadAvatar from '@/components/upLoadAvatar.vue'
import moment from 'moment'
import axios from '../utils/axiosService'
export default {
  name: 'personnalCenter',
  components: {
    upLoadAvatar
  },
  data () {
    return {
      editVisible: false,
      userEditForm: {
        gender: '',
        description: ''
      },
      activeName: this.$route.params.tab,
      dataFA: '',
      uid: this.$route.params.uid
    }
  },
  created() {
    let data = {
      uid: this.uid
    }
    axios.post('/api/getFavoriteArticle',data).then((res) => {
      console.log(res.data)
      this.dataFA =res.data
    }).catch((error) => {
      console.log(error)
    })
  },
  methods: {
    handleClick(tab, event) {
        console.log(tab.name);
        this.$router.push({ path: `/personnalCenter/${this.loginStatic.uid}/${tab.name}`})
    }
  },
  props: {
    loginStatic: {
      required: true
    }
  },
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
    height: 150px;
    width: 150px;
    position: absolute;
    top: 50px;
    left: 80px;
    padding: 0
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
    float: left;
    min-height: 200px;
  }
  .personnal_center_ProfileAside {
    width: 28.5%;
    float: left
  }
  .personnal_center_Profile {
    margin-top: 10px
  }
  .personnal_center_ProfileMain_fa a {
    font-size: 18px;
    font-weight: 700;
  }
  .personnal_center_ProfileMain_fa_txt {
    font-size: 14px;
    color: #999;
    margin-top: 5px;
    margin-bottom: 20px;
  }
  .personnal_center_ProfileMain_fa_txt span {
    margin-right: 10px;
  }
  .personnal_center_ProfileMain_f {
    margin-top: 20px;
  }
</style>