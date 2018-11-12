<template>
    <div>
        <div class="topBlock">
            <myHeader :privateMessageData='privateMessageData' :loginStatic='loginStatic' @logOut="logOut"/>
        </div>
        <div  style="margin: 10px 15%;">
            <div class="add_topic" @click="exameVisible = true">
                <i class="el-icon-info"></i>创建话题
            </div>
            <div style="clear: both"></div>
            <el-tabs v-model="activeName" @tab-click="handleClick" class="topic_main">
                <el-tab-pane label="所有话题" name="first">
                    <div>
                        <div class="topic_main_card" v-for="item in showTopics">
                            <div class="topic_main_card_main">
                                <h2 class="topic_main_card_title" @click="toDetail(item.title)">{{item.title}}</h2>
                                <div class="topic_main_card_content">
                                    {{item.content}}
                                </div>
                                <div class="topic_main_card_footer">
                                    {{item.fTimes}}人关注
                                </div>
                                <img :src="item.pic" alt="" class="topic_main_card_img">
                                <div v-show="loginStatic.isLogin">
                                    <el-button class="topic_main_card_button" type="text" @click="addFT(item.id)">+关注</el-button>
                                    <el-button v-show="0" class="topic_main_card_button" type="text">取关</el-button>
                                </div>
                            </div>
                        </div>
                    </div>
                </el-tab-pane>
            </el-tabs>
            <el-pagination
                class="pagination-g"
                background
                @current-change="changePage"
                :current-page="allTopics.length/6"
                layout="prev, pager, next"
                :page-size="6"
                :total="allTopics.length">
            </el-pagination>
            <!-- dialog -->
            <el-dialog
                title="用户验证"
                :visible.sync="exameVisible"
                width="30%">
            <span>
                <el-input type="password" v-model="adminPassword" placeholder="请输入管理员口令"></el-input>
            </span>
            <span slot="footer" class="dialog-footer">
                <el-button @click="exameVisible = false">取 消</el-button>
                <el-button type="primary" @click="exameAdmin()">确认</el-button>
            </span>
            </el-dialog>
            <el-dialog
                title="添加话题"
                :visible.sync="createTopicVisible"
                width="30%">
                <span>
                    <el-form :model="topicAdd" ref="loginForm" class="demo-ruleForm">
                        <el-form-item label="话题名：" prop="questionTitle">
                            <el-input v-model="topicAdd.title" placeholder="话题名不能为空"></el-input>
                        </el-form-item>
                        <el-form-item label="话题描述：" prop="content">
                            <el-input type="textarea" placeholder="话题描述不能为空" v-model="topicAdd.content"></el-input>
                        </el-form-item>
                    </el-form>
                </span>
                <span slot="footer" class="dialog-footer">
                <el-button @click="createTopicVisible = false">取 消</el-button>
                <el-button type="primary" @click="addTopic()">提 交</el-button>
                </span>
            </el-dialog>
        </div>
    </div>
  </template>

  <script>
  import axios from '../utils/axiosService'
  import myHeader from '@/components/header.vue'
  import notFound from '@/components/notFound.vue'
  export default {
    name: 'topic',
    components: {
        myHeader,
        notFound,
    },
    data () {
      return {
        activeName: 'first',
        topicAdd: {
            title: '',
            content: ''
        },
        createTopicVisible: false,
        allTopics: [],
        showTopics: [],
        type: 'topic',
        exameVisible: false,
        adminPassword: '',
        pageNum: 0
      }
    },
    created() {
        this.getTopic()
    },
    props: ['privateMessageData','loginStatic'],
    mounted() {
    },
    methods: {
        toDetail(tid) {
            this.$router.push({ path: `/topicDetail/${tid}/first`})
        },
        handleClick(tab, event) {
            console.log(tab, event);
        },
        addTopic() {
            let title = this.topicAdd.title
            let content = this.topicAdd.content
            let that = this
            if (title !='' && content!='') {
                let data = {
                    title: title,
                    content: content
                }
                axios.post('/api/addTopic',data).then((res) => {
                    that.topicAdd.title = ''
                    that.topicAdd.content = ''
                    that.createTopicVisible = false
                    that.getTopic()
                    that.$message({
                        message: '添加话题成功',
                        type: 'success',
                        duration: 1000
                    })
                }).catch((error) => {
                    console.log(error)
                })
            } else{
                this.$message({
                    message: '都说了不能为空',
                    type: 'error',
                    duration: 1000
                })
            }
        },
        getTopic() {
            let that = this
            let data = { uid: that.loginStatic.uid }
            axios.post('/api/getTopics',data).then((res) => {
                that.allTopics = res.data.sort(this.sortFtimes)
                that.getShowTopics()
            }).catch((error) => {
                console.log(error)
            })
        },
        getShowTopics() {
            this.showTopics = this.allTopics.slice(this.pageNum*6,this.pageNum*6+6)
        },
        addFT(tid) {
            let data = {
                uid: this.loginStatic.uid,
                tid: tid
            }
            axios.post('/api/addFavoriteTopic',data).then((res) => {
                if (res.data === true) {
                    this.sucMessage('添加关注成功^_^')
                    this.getTopic()
                } else {
                    this.$message({
                        message: '已经关注了哦╭(╯^╰)╮',
                        type: 'error',
                        duration: 1000
                    })
                }
            }).catch((error) => {
                console.log(error)
            })
        },
        logOut() {
             this.$emit('logOut')
        },
        exameAdmin() {
            if (this.adminPassword === 'gang way') {
                this.exameVisible = false
                this.createTopicVisible = true
            }
        },
        changePage(val) {
            this.pageNum = val-1
            this.getShowTopics()
        }
    }
  }
  </script>
<style>
.pagination-g {
    text-align: center;
    background: none;
    margin: 15px 0 30px 0;
}
.topic_main {
    border-radius: 10px;
}
.topic_main_card {
    float: left;
    background: #fff;
    box-shadow: none;
    border: 1px solid #e6e6e6;
    width: 30%;
    margin: 1.5%;
    transition: all .5s;
}
.topic_main_card:hover {
    box-shadow: 0 5px 20px rgba(0,0,0,.1);
}
.topic_main_card:hover .topic_main_card_img {
    animation: topicAnim 50s ease-in;
    animation-fill-mode:forwards;
}
@keyframes topicAnim {
    0% { transform: rotate(0) scale(1); }
    100% { transform: rotate(72000deg) scale(1.4); }
}
.topic_main_card_main {
    padding: 20px;
    text-align: center;
    position: relative;
}
.topic_main_card_button {
    position: absolute;
    right: 10px;
    top: 0;
}
.topic_main_card_title {
    margin-top: 100px;
    cursor: pointer;
}
.topic_main_card_title:hover {
    color: #0f88eb;
}
.topic_main_card_content {
    font-size: 14px;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
    margin-bottom: 20px;
    margin-top: 10px;
    min-height: 40px;
}
.topic_main_card_footer {
    margin-top: 20px;
    padding-top: 15px;
    border-top: 1px solid #e6e6e6;
}
.topic_main_card_img {
    position: absolute;
    height: 70px;
    width: 70px;
    left: 50%;
    margin-left: -35px;
    top: 30px;
    border-radius: 50%;
}
.add_topic {
    color: #0f88eb;
    float: right;
    cursor: pointer;
    margin-top: 15px;
}
.add_topic i {
    margin-right: 10px;
}
</style>
