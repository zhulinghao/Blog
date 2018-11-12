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
        <el-button v-show="!nowLogin" @click="privateMessageBlockVisible = true" class="personnal_center_sixin_button" :disabled="!loginStatic.isLogin" plain>发私信</el-button>
        <el-button v-show="!nowLogin" @click="addConcern(userInfo.id)" class="personnal_center_guanzhu_button" type="primary" :disabled="!loginStatic.isLogin" plain>关 注</el-button>
        <!-- 修改个人信息 -->
        <el-dialog
          class="editUInfo"
          title="修改个人信息"
          :visible.sync="editVisible"
          width="30%"
          :before-close="bfCloseUserEdit">
          <span>
              <div class="personnalCenterLabel">
                  用户名:
              </div>
              <el-input v-model="userEditForm.username"></el-input>
              <div class="personnalCenterLabel">
                  更改头像
              </div>
              <upLoadAvatar class="cAvatar" :uid="userInfo.id" :upic="userInfo.pic"/>
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
              <div class="personnalCenterLabel">
                修改密码(选添)
              </div>
              <el-input type="password" v-model="userEditForm.password" placeholder="新密码"></el-input>
              <el-input style="margin-top: 5px;" type="password" v-model="userEditForm.checkPassword" placeholder="确认新密码"></el-input>
          </span>
          <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="editUserInfo">修 改</el-button>
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
              <div v-for="item in dataA" :key="item.id" class="personnal_center_ProfileMain_fa">
                <router-link :to="{ name:'articleDetail', params: {aid: item.id,upic: item.upic,username: item.username,createdAt: item.createdAt,uid: loginStatic.uid} }">{{item.title}}</router-link>
                <el-button @click="toTopicD(item.articleType)" size="small" type="primary" style="float:right">{{item.articleType}}</el-button>
                <div class="personnal_center_ProfileMain_fa_txt">
                  <span>类型：文章</span><span>收藏：{{item.fTimes}}</span>
                </div>
              </div>
              <notFound v-show="!dataA.length"/>
            </el-tab-pane>
            <el-tab-pane label="提问" name="third">
              <div class="personnal_center_ProfileMain_fa" v-for="item in dataQ" :key="item.id">
                <router-link :to="{ name: 'answerDetail', params: {answerid: item.id}}">{{item.title}}</router-link>
                <el-button @click="toTopicD(item.topic)" size="small" type="primary" style="float:right">{{item.topic}}</el-button>
                <div class="personnal_center_ProfileMain_fa_txt">
                  <span>类型：提问</span><span>收藏：0</span>
                </div>
              </div>
              <notFound v-show="!dataQ.length"/>
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
                    <div v-for="item in dataFQ" class="personnal_center_ProfileMain_fa">
                      <router-link :to="{ name:'answerDetail', params: { answerid: item.id } }">{{item.title}}</router-link>
                      <div class="personnal_center_ProfileMain_fa_txt">
                        <span>类型：提问</span> <span>收藏：{{item.fTimes}}</span>
                      </div>
                    </div>
                    <notFound v-show="!dataFT.length"/>
                </el-tab-pane>
                <el-tab-pane label="关注话题">
                    <div v-for="item in dataFT" class="personnal_center_ProfileMain_fa">
                      <router-link :to="{ name:'topicDetail', params: {topic: item.title, tab: 'first'} }">{{item.title}}</router-link>
                      <div class="personnal_center_ProfileMain_fa_txt">
                        <span>类型：话题</span> <span>收藏：{{item.fTimes}}</span>
                      </div>
                    </div>
                    <notFound v-show="!dataFT.length"/>
                </el-tab-pane>
              </el-tabs>
            </el-tab-pane>
            <el-tab-pane label="关注了" name="fifth">
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
            <el-tab-pane label="关注者" name="six">
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
      <div class="personnal_center_aside">
        <div class="personnal_aside_title">
          个人成就
        </div>
        <div class="personnal_aside_gz">
          <div class="personnal_aside_gz1">
            <b>关注了</b>
            <p>{{concern.length}}</p>
          </div>
          <div class="personnal_aside_gz2">
              <b>关注者</b>
              <p>{{fans.length}}</p>
          </div>
        </div>
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
const pat = new RegExp("[^a-zA-Z0-9\_\u4e00-\u9fa5]","i")             //字母数字汉字
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
      dataQ: [],
      editVisible: false,
      privateMessageBlockVisible: false,
      userEditForm: {
        gender: '',
        description: '',
        password: '',
        checkPassword: ''
      },
      sex: '',
      activeName: this.$route.params.tab,

      uid: this.$route.params.uid,
      nowLogin: false,
      userInfo: '',
      privateMessageContent: '',
      mainShowNotFound: {
        first: true,
        second: true,
        third: true,
        fourth: true,
        fourth_1: true,
        fourth_2: true,
        fifth: true,
      },
      concern: [],
      fans: [],
      dataFA: [],
      dataFT: [],
      dataFQ: []
    }
  },
  created() {
    this.getData()
    this.getUserInfo()
  },
  methods: {
    toTopicD(tp) {
      this.$router.push({path: `/topicDetail/${tp}/first`})
    },
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
        username: this.userEditForm.username,
        gender: this.userEditForm.gender,
        description: this.userEditForm.description,
        password: this.userEditForm.password,
        uid: this.uid
      }
      if (data.password === this.userEditForm.checkPassword && data.password.length >= 8 && data.password.length <= 16 && !pat.test(data.password.password)) {
        this.updateUsr(data)
      } else {
        if (data.password === '' && this.userEditForm.checkPassword === '') {
          this.updateUsr(data)
          return
        }
        this.$message({
          message: '密码不符合规则',
          type: 'error',
          duration: 1000
        })
      }

    },
    bfCloseUserEdit() {
      this.editVisible = false
      this.getData()
      this.getUserInfo()
    },
    handleClick(tab, event) {
        this.$router.push({ path: `/personnalCenter/${this.uid}/${this.$route.params.who}/${tab.name}`})
    },
    updateUsr(data) {
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
        this.dataA = res.data
      }).catch((error) => {
        console.log(error)
      })
      axios.post('/api/getMyTiwen',data).then((res) => {
        this.dataQ = res.data
        console.log(this.dataQ)
      }).catch((error) => {
        console.log(error)
      })
      axios.post('/api/getUconcern',data).then((res) => {
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
      axios.post('/api/getFavoriteTopic',data).then((res) => {
        that.dataFT = res.data
      }).catch((error) => {
        console.log(error)
      })
      axios.post('/api/getFavoriteQuestion',data).then((res) => {
        that.dataFQ = res.data
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
        this.userEditForm.username = res.data[0].username
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
  props: ['loginStatic','privateMessageData'],
  mounted() {
    const logInfo = this.loginStatic
    setTimeout(() => {
      if (this.$route.params.who !== "me" && this.$route.params.uid !== logInfo.uid) {
        this.nowLogin = false
      } else if (this.$route.params.who === "me" && this.$route.params.uid === logInfo.uid) {
        this.nowLogin = true
      }
    }, 0);
  }
}
</script>
<style>
  .editUInfo .el-dialog__body {
    padding-top: 0;
  }
  .personnal_gz_item {
    padding: 10px;
    font-weight: 700;
    color: #999;
    background: #f3f3f3;
  }
  .personnal_aside_gz {
    display: flex;
    padding: 10px;
    color: #999;
    border-bottom: 1px solid rgba(0, 0, 0, .1);
  }
  p {
    margin: 0;
  }
  .personnal_aside_gz2,
  .personnal_aside_gz1 {
    flex: 1;
    text-align: center;
  }
  .personnal_center_container {
    margin: 0 15%;
  }
  .personnal_center_userInfo {
    margin: 10px 0;
    position: relative;
    padding-bottom: 50px;
    background-image: linear-gradient(#e4e7ed 0%, #fff 40%);
  }
  .personnal_center_userInfo:hover .personnal_center_userInfo_img img {
    animation: movePic 2s;
    animation-fill-mode:forwards;
  }
  @keyframes movePic {
    0% { border-radius: 0;transform: rotateY(0deg); }
    50% { border-radius: 50%;transform: rotateY(180deg); }
    100% { border-radius: 0;transform: rotateY(360deg); }
  }
  .personnal_center_userInfo_img {
    height: 150px;
    width: 150px;
    position: absolute;
    top: 50px;
    left: 80px;
    padding: 0;
  }
  .personnal_center_userInfo_img img {
    height: 150px;
    width: 150px;
    border: 2px solid rgba(0, 0, 0, .1);
  }
  .personnal_center_userInfo_content {
    height: 130px;
    margin: 70px 0 0 280px;
  }
  .personnal_center_sixin_button,
  .personnal_center_userInfo_button {
    position: absolute;
    bottom: 50px;
    right: 50px;
  }
  .personnal_center_guanzhu_button {
    position: absolute;
    bottom: 50px;
    right: 150px;
  }
  .personnal_center_aside {
    float: left;
    width: 29%;
    background: #fff;
    box-shadow: 0 1px 3px rgba(0,0,0,.1);

  }
  .personnal_aside_title {
    padding: 10px;
    font-weight: 700;
    color: #646464;
    border-bottom: 1px solid rgba(0, 0, 0, .1);
  }
  .personnal_center_ProfileMain {
    width: 100%;
    margin-right: 10px;
    min-height: 429px;
  }
  .personnal_center_Profile {
    width: 70%;
    margin-right: 10px;
    float: left;
  }
  .personnal_center_ProfileMain_fa {
    border-bottom: 1px solid rgba(0, 0, 0, .05);
    margin-bottom: 10px;
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
    padding-top: 10px;
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
  .cAvatar {
    margin-bottom: 10px;
  }
</style>
