<template>
    <div>
        <div class="topBlock">
            <myHeader :privateMessageData='privateMessageData' :loginStatic='loginStatic' @logOut="logOut"/>
        </div>
        <div class="answer_detail_header">
            <div style="width:70%;">
                <h2 class="answer_detail_header_title">{{answerDetail.title}}</h2>
                <p class="answer_detail_header_content">{{answerDetail.content}}</p>
                <el-button type="primary" @click="addFQuestion(answerid)" v-show="loginStatic.isLogin">收藏问题</el-button>
                <el-button v-show="loginStatic.isLogin" @click="showWrite =false"><i class="el-icon-edit-outline"></i>写回答</el-button>
            </div>
            <div class="header_abside">
                <el-button type="primary" @click="toTpicDtil(answerDetail.topic)" size="small" plain round>{{answerDetail.topic}}</el-button>
            </div>
        </div>
        <div class="answer_detail_block">
            <div class="answer_detail_main">
                <div class="writeAnswer" v-show="!showWrite">
                    <div class="writeAnswer_header">
                        <img :src="loginStatic.upic ? loginStatic.upic : $var.defaultAvatar " class="write_answer_avatar">
                        <b style="margin-left: 50px;">{{loginStatic.username}}</b>
                        <span @click="showWrite = true" class="closeIcon"><i class="el-icon-close"></i></span>
                    </div>
                    <el-input type="textarea" v-model="answerContent" class="write_answer_content"></el-input>
                    <el-button type="primary" @click="addQuestion">提交</el-button>
                </div>
                <div class="all_questions">
                    <div class="question_header">
                        <div class="question_header_huida">共{{questionLen}}个回答</div>
                    </div>
                    <questionsBlock :questions="questions" :loginStatic="loginStatic" @getQuestions="getQuestions"/>
                    <notFound v-show="!questionLen"/>
                </div>
            </div>
            <div class="answer_detail_abside">
                <div class="recommend_block">
                    <div class="recommend_block_head">
                        推荐
                    </div>
                    <div class="recommend_block_main">
                        <div class="recommend_block_main_item" v-for="item in tjQuestions" :key="item.id">
                            <router-link :to="{name: 'answerDetail', params: {answerid: item.id}}">{{item.title}}</router-link>
                            <span>关注:{{item.fTimes}}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import moment from 'moment'
    import axios from '../utils/axiosService'
    import notFound from '@/components/notFound.vue'
    import questionsBlock from '@/components/questionsBlock.vue'
    import myHeader from '@/components/header.vue'
    export default {
        name: 'answerDetail',
        components: {
            questionsBlock,
            myHeader,
            notFound
        },
        data() {
            return {
                answerid: this.$route.params.answerid,
                answerDetail: '',
                answerContent: '',
                showWrite: true,
                questions: '',
                questionLen: '',
                addOk: false,
                tjQuestions: []
            }
        },
        created() {
            this.getData()
        },
        watch: {
            '$route' (to, from) {
                if (to.name === 'answerDetail' && to.name === from.name) {
                    this.answerid = to.params.answerid
                    this.getData()
                }
            }
        },
        props: {
            loginStatic: {
                required: true
            },
            privateMessageData: {
                required: true
            }
        },
        methods: {
            addQuestion() {
                if (this.answerContent == '') {
                    this.$message({
                        message: "不能为空！",
                        type: 'success',
                        duration: 1000
                    })
                    return
                }
                let data = {
                    uid: this.loginStatic.uid,
                    answerid: this.answerid,
                    content: this.answerContent
                }
                let that = this
                axios.post('/api/addQuestion', data).then((res) => {
                    that.$message({
                        message: "评论发表成功",
                        type: 'success',
                        duration: 1000
                    })
                    that.answerContent = ""
                    that.getQuestions()
                }).catch((error) => {
                    console.log(error)
                })
            },
            getQuestions() {
                let that = this
                axios.post('/api/getQuestions', {
                    aid: this.answerid
                }).then((res) => {
                    that.questions = res.data
                    that.questionLen = res.data.length
                }).catch((error) => {
                    console.log(error)
                })
            },
            addFQuestion(qid) {
                let data = {
                    uid: this.loginStatic.uid,
                    qid: qid
                }
                axios.post('/api/addFavoriteQuestion', data).then((res) => {
                    if (res.data === true) {
                        this.sucMessage('收藏提问成功^_^')
                        this.getTopic()
                    } else {
                        this.$message({
                            message: '已经收藏了哦╭(╯^╰)╮',
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
            toTpicDtil(tp) {
                this.$router.push({
                    path: `/topicDetail/${tp}/first`
                })
            },
            getData() {
                let data = {
                    id: this.answerid
                }
                let that = this
                axios.post('/api/answerDeatil', data).then((res) => {
                    let tmp = res.data[0]
                    that.answerDetail = {
                        title: tmp.title,
                        topic: tmp.topic,
                        content: tmp.content,
                        uid: tmp.uid,
                        username: tmp.username
                    }
                }).catch((error) => {
                    console.log(error)
                })
                this.getQuestions()
                axios.get('/api/getAnswers').then(req => {
                    let tmpHot = req.data
                    tmpHot.forEach(item => {
                        item.createdAt = moment(item.createdAt).format('YYYY/MM/DD')
                    })
                    tmpHot.sort(this.sortFtimes)
                    this.tjQuestions = tmpHot.splice(0, 4)
                })
            }
        }
    }
</script>
<style>
    .answer_detail_header {
        background: #fff;
        padding: 20px 15%;
        position: relative;
        box-shadow: 0 1px 3px 0 rgba(0, 37, 55, .1);
    }
    
    .answer_detail_block {
        padding: 20px 15%;
    }
    
    .answer_detail_main {
        width: 70%;
        float: left;
    }
    
    .answer_detail_abside {
        width: 29.5%;
        float: left;
        margin-left: .5%;
    }
    
    .recommend_block {
        background: #fff;
        box-shadow: 0 1px 3px 0 rgba(0, 37, 55, .1);
    }
    
    .recommend_block_main_item {
        padding: 10px;
    }
    
    .recommend_block_main_item a {
        display: block;
    }
    
    .recommend_block_main_item span {
        color: #999;
        font-size: 12px;
    }
    
    .writeAnswer {
        background: #fff;
        box-shadow: 0 1px 3px 0 rgba(0, 37, 55, .1);
        padding: 20px;
        margin-bottom: 10px;
    }
    
    .recommend_block_head {
        padding: 10px;
        font-size: 16px;
        font-weight: 700;
        border-bottom: 1px solid #f0f2f7;
    }
    
    .answer_detail_header_title {
        margin-top: 20px;
    }
    
    .answer_detail_header_content {
        color: #999;
        margin-bottom: 30px;
        margin-top: 10px;
    }
    
    .header_abside {
        position: absolute;
        width: 21%;
        right: 15%;
        top: 0;
        margin-top: 50px;
        color: #8590a6;
    }
    
    .write_answer_avatar {
        width: 40px;
        height: 40px;
        border-radius: 50%;
    }
    
    .writeAnswer_header {
        height: 40px;
        line-height: 40px;
        position: relative;
        margin-bottom: 10px;
    }
    
    .write_answer_avatar {
        position: absolute;
    }
    
    .write_answer_content {
        margin-bottom: 15px;
    }
    
    .question_header {
        height: 41px;
        line-height: 40px;
        padding: 0 20px;
    }
    
    .all_questions {
        background: #fff;
        min-height: 430px;
        margin-bottom: 100px;
        border-radius: 2px;
        box-shadow: 0 1px 3px rgba(0, 0, 0, .1);
    }
    
    .question_header_huida {
        border-bottom: 1px solid #f0f2f7;
        font-size: 13px;
        font-weight: 700;
    }
    
    .closeIcon {
        position: absolute;
        right: 0px;
        top: -20px;
        cursor: pointer;
    }
    
    .closeIcon:hover {
        color: #0f88eb;
    }
    
    .cut-off {
        border: .5px solid #999;
        margin: 0 20px;
    }
</style>