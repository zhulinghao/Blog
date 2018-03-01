<template>
    <div>
        <el-card class="questionBlock" v-for="(n,index) in questions" :key="n.id" style="padding-bottom: 10px">
            <div class="author_block">
                <img :src=n.upic alt="23333" class="home_card_img">
                <span class="author_text">
                    <b class="author">{{n.username}}</b>: {{n.description}}
                </span>
            </div>
            <div>
                <div v-html="n.content" class="question_content"></div>
            <div>
            <span style="float: right; color:#999;font-size: 13px;">发布于：{{n.createdAt}}</span>
                <el-row class="border_bottom">
                    <el-col :span="3">
                        <el-badge class="item">
                            <el-button size="small" @click="sComment(index)">评论</el-button>
                        </el-badge>
                    </el-col>
                    <el-col :span="3">
                        <el-badge class="item">
                            <el-button size="small">收藏</el-button>
                        </el-badge>
                    </el-col>
                </el-row>          
            </div>
            </div>
            <div class="question_block_comment" ref="block">
                <div class="question_block_comment_write">
                    <el-input :disabled="!loginStatic.isLogin" style="width:70%;" size="small" type="text" v-model="comment"></el-input>
                    <el-button :disabled="!loginStatic.isLogin" size="small" @click="Published(n.id)" @keyup.enter.native="Published">发表评论</el-button>
                </div>
                <div class="question_block_comment_block_out">
                    <div class="question_block_comment_block" v-for="item in n.commentData">
                        <div style="float:left">
                            <span class="uname">{{item.username}}:</span> {{item.comment}}
                        </div>
                        <div style="float: right;color: #999;font-size: 14px;">
                            <span class="uname">回复</span>
                            {{item.createdAt}}
                        </div>
                        <div style="clear:both"></div>
                    </div>
                </div>
            </div>
        </el-card>
    </div>
</template>

<script>
import axios from '../utils/axiosService'
export default {
    name: 'detail',
    components: {
    },
    data () {
        return {
        showImg: false,
        imageUrl: '',
        comment: ''
        }
    },
    created() {
    },
    methods: {
        sComment(index) {
            console.log(index)
            let commentBlock = this.$refs.block
            console.log(commentBlock)
            if (commentBlock[index].style.display == 'block') {
                commentBlock[index].style.display = 'none'
                this.comment = ''
            } else {
                for(let x in commentBlock) {
                    commentBlock[x].style.display = 'none'
                }
                commentBlock[index].style.display = 'block'
            }
        },
        Published(answerId) {
            if (this.comment != '') {
                let that = this
                let data = {
                    uid: this.loginStatic.uid,
                    answerId: answerId,
                    comment: this.comment,
                    username: this.loginStatic.username,
                }
                axios.post('/api/addAnswerComment',data).then((res) => {
                    that.comment = ''
                    that.getQuestions()
                }).catch((error) => {
                    console.log(error)
                })
            }
        },
        getQuestions() {
            this.$emit('getQuestions')
        }
    },
    props: {
        questions: {
            required: true
        },
        loginStatic: {
            required: true
        }
    }
}
</script>
<style>
.author_block img{
    height: 35px;
    width: 35px;
    position: absolute;
    border: 2px solid rgba(0,0,0,.08);
    border-radius: 50%
}
.author_block {
    margin-bottom: 10px;
    font-size: 14px;
    height: 30px;
    width: 30px;
    position: relative
}
.author_text {
    position: absolute;
    left: 45px;
    top: 7px;
    width: 400px;
    overflow: hidden;
}
.question_content {
    margin: 20px 0 10px 0;
    width: 100%;
    font-family: -apple-system,BlinkMacSystemFont,Helvetica Neue,PingFang SC,Microsoft YaHei,Source Han Sans SC,Noto Sans CJK SC,WenQuanYi Micro Hei,sans-serif;
    font-size: 14px;
    overflow: hidden;
}
.questionBlock {
    border: none;
    box-shadow: none;
    padding-bottom: 0 !important;
}
.border_bottom {
    padding-bottom: 15px;
    border-bottom: 1px solid #f0f2f7;
}
.question_block_comment {
    display: none;
    border-radius: 5px;
}
.question_block_comment_block{
    margin: 10px 0;
}
.question_block_comment_block_out {
    border: 1px solid #f0f2f7;
    padding: 5px 15px;
    border-radius: 5px;
}
.question_block_comment_block .uname {
    color: #0f88eb;
    cursor: pointer;

}
.question_block_comment_write {
    margin: 10px 0;
}
</style>