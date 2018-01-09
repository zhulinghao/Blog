<template>
    <div>
        <div class="answer_detail_header">
            <div style="width:70%;">
                <!-- {{loginStatic}}
                {{answerDetail.username}} -->
                <el-button type="primary" size="small" plain round>{{answerDetail.topic}}</el-button>
                <h2 class="answer_detail_header_title">{{answerDetail.title}}</h2>
                <p class="answer_detail_header_content">{{answerDetail.content}}</p>
                <el-button type="primary">收藏问题</el-button>
                <el-button @click="showWrite =false"><i class="el-icon-edit-outline"></i>写回答</el-button>
            </div>
            <div class="header_abside">
                收藏者：x人
                <span class="cut-off"></span>
                浏览次数：x
            </div>
        </div>
        <div class="answer_detail_block">
            <div class="answer_detail_main">
                <div class="writeAnswer" v-show="!showWrite">
                    <div class="writeAnswer_header">
                        <img :src="loginStatic.upic" alt="hhhhh" class="write_answer_avatar">
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
                    <questionsBlock :questions="questions"/>
                </div>
            </div>
            <div class="answer_detail_abside">
                <div class="recommend_block">
                    <div class="recommend_block_head">
                        相关推荐
                    </div>
                    <div class="recommend_block_main">
                        <div v-for='a in 5' class="recommend_block_main_item">
                            {{a}}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from '../utils/axiosService'
import questionsBlock from '@/components/questionsBlock.vue'
export default {
    name: 'answerDetail',
    components: {
        questionsBlock
    },
    data () {
        return {
            answerid: this.$route.params.answerid,
            answerDetail: '',
            answerContent: '',
            showWrite: true,
            questions: '',
            questionLen: '',
            addOk: false
        }
    },
    created() {
        let data = {
            id: this.answerid
        }
        let that = this
        axios.post('/api/answerDeatil',data).then( (res) => {
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
    },
    props: {
        loginStatic: {
            required: true
        }
    },
    methods: {
        addQuestion() {
            if (this.answerContent == '') {
                alert('不能为空')
                return
            }
            let data = {
                uid: this.loginStatic.uid,
                answerid: this.answerid,
                content: this.answerContent
            }
            let that = this
            axios.post('/api/addQuestion',data).then((res) => {
                console.log(res)
                that.getQuestions()
                that.$message({
                    message: "评论发表成功",
                    type: 'success'
                })
                that.answerContent = ""
            }).catch((error) => {
                console.log(error)
            })
           
        },
        getQuestions() {
            let that = this
            axios.post('/api/getQuestions',{aid:this.answerid}).then((res) => {
                that.questions = res.data
                that.questionLen = res.data.length
                console.log(that.questions,"this")
            }).catch((error) => {
                console.log(error)
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
        box-shadow: 0 1px 3px 0 rgba(0,37,55,.1);
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
        box-shadow: 0 1px 3px 0 rgba(0,37,55,.1);
    }
    .recommend_block_main_item {
        padding: 10px;
    }
    .writeAnswer {
        background: #fff;
        box-shadow: 0 1px 3px 0 rgba(0,37,55,.1);
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
        border-radius: 2px;
        box-shadow: 0 1px 3px rgba(0,0,0,.1);
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