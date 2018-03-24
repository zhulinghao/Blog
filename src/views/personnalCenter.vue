<template>
  <div>
    <div class="topBlock">
        <myHeader :privateMessageData='privateMessageData' :loginStatic='loginStatic' @logOut="logOut"/>
    </div>
    <div class="personnal_center_container">
      <el-card class="box-card personnal_center_userInfo">
        <div class="personnal_center_userInfo_img">
          <img :src="userInfo.pic" alt="">
        </div>
        <div class="personnal_center_userInfo_content">
          <div style="font-size: 22px"><b style="margin-right:20px">{{userInfo.username}}</b></div>
          <div style="margin-top:20px; font-size: 14px;"><b style="margin-right:30px">我的性别</b> {{sex}}</div>
          <div style="margin-top:20px; font-size: 14px;"><b style="margin-right:30px">个人简介</b> {{userInfo.description}}</div>
        </div>
        <el-button v-show="nowLogin" @click="editVisible = true" class="personnal_center_userInfo_button" type="primary" plain>编辑个人资料</el-button>
        <el-button v-show="!nowLogin" @click="privateMessageBlockVisible = true" class="personnal_center_sixin_button" plain>发私信</el-button>
        <el-button v-show="!nowLogin" @click="addConcern(userInfo.id)" class="personnal_center_sixin_button" type="primary" plain>关 注</el-button>
        <!-- 修改个人信息 -->
        <el-dialog
          title="修改个人信息"
          :visible.sync="editVisible"
          width="30%"
          :before-close="bfCloseUserEdit">
          <span>
              <div class="personnalCenterLabel">
                  用户名: {{userInfo.username}}
              </div>
              <div class="personnalCenterLabel">
                  更改头像
              </div>
              <upLoadAvatar :uid="userInfo.id" :upic="userInfo.pic"/>
              <div class="personnalCenterLabel">
                  更改性别
              </div>
              <el-radio-group v-model="userEditForm.gender">
                <el-radio border :label="0">男孩子</el-radio>
                <el-radio border :label="1">女孩子</el-radio>
                <el-radio border :label="2"> 其他</el-radio>
              </el-radio-group>
              <div class="personnalCenterLabel">
                  更改简介
              </div>
              <el-input v-model="userEditForm.description" placeholder="个人简介"></el-input>
          </span>
          <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="editUserInfo">修 改</el-button>
            <el-button @click="editVisible = false">关 闭</el-button>
          </span>
          </el-dialog>
    <!-- 私信BLOCK         -->
          <el-dialog
          title="privateMessage"
          :visible.sync="privateMessageBlockVisible"
          width="30%">
          <span>
              发给私信给<b>{{userInfo.username}}</b> <br>
              <el-input type="text" v-model="privateMessageContent" @keyup.enter.native="sendPrivateMessage" style="width: 80%"></el-input>
              <el-button @click="sendPrivateMessage" type="primary">发 送</el-button>
          </span>
          <span slot="footer" class="dialog-footer">
          <el-button @click="privateMessageBlockVisible = false">关 闭</el-button>
          </span>
        </el-dialog>
    <!-- 私信BLOCK         -->
      </el-card>
      <div class="personnal_center_Profile">
          <el-tabs v-model="activeName" type="border-card" class="personnal_center_ProfileMain" @tab-click="handleClick">
            <el-tab-pane label="文章" name="first">
              <div v-for="item in dataA" class="personnal_center_ProfileMain_fa">
                <router-link :to="{ name:'articleDetail', params: {aid: item.id,upic: item.upic,username: item.username,createdAt: item.createdAt,uid: loginStatic.uid} }">{{item.title}}</router-link>
                <div class="personnal_center_ProfileMain_fa_txt">
                  <span>类型：文章</span> <span>话题：{{item.articleType}}</span> <span>收藏：{{item.fTimes}}</span>
                </div>
              </div>
              <notFound v-show="!dataA.length"/>
            </el-tab-pane>
            <el-tab-pane label="回答" name="second">
              <notFound v-show="mainShowNotFound.second"/>
            </el-tab-pane>
            <el-tab-pane label="提问" name="third">
              <notFound v-show="mainShowNotFound.third"/>
            </el-tab-pane>
            <el-tab-pane label="收藏" name="fourth">
              <el-tabs  type="border" tab-position="left" style="left: 120px;margin-left: -20px;">
                <el-tab-pane label="收藏文章">
                  <div v-for="item in dataFA" class="personnal_center_ProfileMain_fa">
                    <router-link :to="{ name:'articleDetail', params: {aid: item.id,upic: item.upic,username: item.username,createdAt: item.createdAt,uid: loginStatic.uid} }">{{item.title}}</router-link>
                    <div class="personnal_center_ProfileMain_fa_txt">
                      <span>类型：文章</span> <span>话题：{{item.articleType}}</span> <span>作者：{{item.username}}</span> <span>收藏：{{item.fTimes}}</span>
                    </div>
                  </div>
                  <notFound v-show="mainShowNotFound.fourth_1"/>
                </el-tab-pane>
                <el-tab-pane label="收藏问题">
                    <notFound v-show="mainShowNotFound.fourth_2"/>
                </el-tab-pane>
                <el-tab-pane label="收藏回答">
                    <notFound v-show="mainShowNotFound.fourth_3"/>
                </el-tab-pane>
              </el-tabs>
            </el-tab-pane>
            <el-tab-pane label="已关注" name="fifth">
                <div v-for="item in concern" class="follow_item">
                    <img @click="toPersonnalDetail(item.id)" :src="item.pic" alt="" class="follow_img">
                    <div @click="toPersonnalDetail(item.id)" class="follow_name">
                        {{item.username}}
                    </div>
                    <div class="follow_description">
                        {{item.description}}
                    </div>
                </div>
                <notFound v-show="!concern.length"/>
            </el-tab-pane>
            <el-tab-pane label="关注我" name="six">
                <div v-for="item in fans" class="follow_item">
                    <img @click="toPersonnalDetail(item.id)" :src="item.pic" alt="" class="follow_img">
                    <div @click="toPersonnalDetail(item.id)" class="follow_name">
                        {{item.username}}
                    </div>
                    <div class="follow_description">
                        {{item.description}}
                    </div>
                </div>
                <notFound v-show="!fans.length"/>
            </el-tab-pane>
          </el-tabs>
      </div>
    </div>
  </div>
  
</template>

<script>
import moment from 'moment'
import upLoadAvatar from '@/components/upLoadAvatar.vue'
import myHeader from '@/components/header.vue'
import notFound from '@/components/notFound.vue'
import axios from '../utils/axiosService'
export default {
  name: 'personnalCenter',
  components: {
    upLoadAvatar,
    notFound,
    myHeader
  },
  data () {
    return {
      dataA: [],
      editVisible: false,
      privateMessageBlockVisible: false,
      userEditForm: {
        gender: '',
        description: ''
      },
      sex: '',
      activeName: this.$route.params.tab,
      dataFA: [],
      uid: this.$route.params.uid,
      nowLogin: true,
      userInfo: '',
      privateMessageContent: '',
      mainShowNotFound: {
        first: true,
        second: true,
        third: true,
        fourth: true,
        fourth_1: true,
        fourth_2: true,
        fourth_3: true,
        fifth: true,
      },
      concern: [],
      fans: []
    }
  },
  created() {
    this.getData()
    this.getUserInfo()
  },
  methods: {
    addConcern(toUid) {
      let data = {
        sendUid: this.loginStatic.uid,
        toUid: toUid
      }
      axios.post('/api/addUconcern',data).then((res) => {
        if (res.data === 1) {
          this.$message({
            message: '关注成功，可以去个人中心去看小伙伴',
            type: 'success',
            duration: 1000
          })
        } else {
          this.$message({
            message: '已经关注过了哦',
            type: 'error',
            duration: 1000
          })
        }
      }).catch((error) => {
        console.log(error)
      })
    },
    editUserInfo() {
      let data = {
        gender: this.userEditForm.gender,
        description: this.userEditForm.description,
        uid: this.uid
      }
      axios.post('/api/updataUserInfo',data).then((res) => {
        this.$message({
          message: res.data,
          type: 'success',
          duration: 1000
        })
        this.bfCloseUserEdit()
        this.editVisible = false
      }).catch((error) => {
        console.log(error)
      })
    },
    bfCloseUserEdit() {
      this.editVisible = false
      this.getData()
      this.getUserInfo()
    },
    handleClick(tab, event) {
        this.$router.push({ path: `/personnalCenter/${this.loginStatic.uid}/${this.$route.params.who}/${tab.name}`})
    },
    changeUrl() {
      if (this.loginStatic.uid != this.uid && this.$route.params.who == "me") {
        location.reload()
      }
    },
    getData() {
      let data = {
        uid: this.uid
      }
      let that = this
      axios.post('/api/getDataA',data).then((res) => {
        console.log(res.data)
        this.dataA = res.data
        
      }).catch((error) => {
        console.log(error)
      })
      axios.post('/api/getUconcern',data).then((res) => {
        console.log(res.data)
        this.concern = res.data.concern
        this.fans = res.data.fans
      }).catch((error) => {
        console.log(error)
      })
      axios.post('/api/getFavoriteArticle',data).then((res) => {
        that.dataFA =res.data
        if (res.data.length != 0) {
          this.mainShowNotFound.fourth_1 = false
        }
      }).catch((error) => {
        console.log(error)
      })
    },
    getUserInfo() {
      let data = {
        uid: this.uid
      }
      axios.post('/api/getUserInfo',data).then((res) => {
        this.userInfo = res.data[0]
        if (res.data[0].gender == false) {
          res.data[0].gender = 0
          this.sex = '男'
        } else if (res.data[0].gender == 1) {
          this.sex = '女'
        } else if (res.data[0].gender == 2) {
          this.sex = '其他（你懂得）'
        }
        
        this.userEditForm.gender = res.data[0].gender
        this.userEditForm.description = res.data[0].description
      }).catch((error) => {
        console.log(error)
      })
    },
    sendPrivateMessage() {
      let that = this
      let data = {
        senderId: this.loginStatic.uid,
        toUid: this.userInfo.id,
        content: this.privateMessageContent
      }
      this.privateMessageContent = ''
      axios.post('/api/addPrivateMessage',data).then((res) => {
        that.$message({
          message: res.data,
          type: 'success',
          duration: 1000
        })
      }).catch((error) => {
        console.log(error)
      })
    },
    logOut() {
          this.$emit('logOut')
    },
    toPersonnalDetail(uid) {
      this.$router.push({ path: `/personnalCenter/${uid}/others/first`})
      location.reload()
    }
  },
  watch: {
      "$route": "changeUrl"
  },
  props: {
    loginStatic: {
        required: true
    },
    privateMessageData: {
        required: true
    }
  },
  mounted() {
    if (this.$route.params.who != "me") {
      this.nowLogin = false
    }
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
  .personnal_center_sixin_button,
  .personnal_center_userInfo_button {
    margin-left: 80% !important;
    margin-bottom: 15px;
  }
  .personnal_center_ProfileMain {
    width: 100%;
    margin-right: 10px;
    float: left;
    min-height: 429px;
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
  .personnalCenterLabel {
    margin: 10px 0;
    font-weight: 700;
  }
  .follow_img {
    position: absolute;
    height: 70px;
    width: 70px;
    cursor: pointer;
  }
  .follow_item {
    position: relative;
    height: 80px;
    border-bottom: 1px solid rgba(0, 0, 0, .1)
  }
  .follow_description {
    margin-left: 100px;
    margin-top: 10px;
  }
  .follow_name {
    margin-left: 100px;
    font-size: 20px;
    color: #f1403c;
    cursor: pointer;
  }
</style>