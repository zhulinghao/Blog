<template>
    <div>
        <div class="topBlock">
            <myHeader :privateMessageData='privateMessageData' :loginStatic='loginStatic' @logOut="logOut"/>
        </div>
        <div  style="margin: 10px 15%;">
            <div class="add_topic" @click="createTopicVisible = true">
                <i class="el-icon-info"></i> 创建话题
            </div>
            <div style="clear: both"></div>
            <el-tabs v-model="activeName" @tab-click="handleClick" class="topic_main">
                <el-tab-pane label="话题推荐" name="first">
                    <div class="topic_main_card" v-for="item in topics">
                        <div class="topic_main_card_main">
                            <h2 class="topic_main_card_title" @click="toDetail(item.title)">{{item.title}}</h2>
                            <div class="topic_main_card_content">
                                {{item.content}}
                            </div>
                            <div class="topic_main_card_footer">
                                    xxx篇文章 · xxxx人关注
                            </div>
                            <img src="../../static/avatar/default.jpg" alt="" class="topic_main_card_img">
                            <el-button class="topic_main_card_button" type="text">+关注</el-button>
                        </div>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="热门话题" name="second">热门话题</el-tab-pane>
            </el-tabs>
    
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
  export default {
    name: 'topic',
    components: {
        myHeader
    },
    data () {
      return {
        activeName: 'first',
        topicAdd: {
            title: '',
            content: ''
        },
        createTopicVisible: false,
        topics: ''
      }
    },
    created() {
        this.getTopic()
    },
    props: {
        privateMessageData: {
            required: true
        },
        loginStatic: {
            required: true
        }
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
                    console.log(res.data)
                    that.topicAdd.title = ''
                    that.topicAdd.content = ''
                    that.createTopicVisible = false
                    this.getTopic()
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
            axios.get('/api/getTopics').then((res) => {
                that.topics = res.data
                console.log(that.topics)
            }).catch((error) => {
                console.log(error)
            })
        },
        logOut() {
             this.$emit('logOut')
        }
    }
  }
  </script>
<style>
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
}
.topic_main_card:hover {
    box-shadow: 0 5px 20px rgba(0,0,0,.1);
    transition: .5s;
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
    margin-top: 80px;
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
    top: 20px;
}
.add_topic {
    color: #0f88eb;
    float: right;
    cursor: pointer;
    margin-top: 15px;
}
</style>