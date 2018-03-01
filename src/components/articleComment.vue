<template>
    <div>
        <div class="article_comments_head">
            {{commentQuantity}}条评论
        </div>
        <div class="writeComment">
            <el-input :disabled="!loginStatic.isLogin" style="width:70%" v-model="content"></el-input>
            <el-button :disabled="!loginStatic.isLogin" @click="Published" @keyup.enter.native="Published">发表评论</el-button>
        </div>
        <div class="article_comments" v-loading="loading">
            <div class="article_comment_block" v-for="item in allcomments">
                <div class="article_comment_block_user">
                    <div @click="toUserDetail(item.uid.split(',')[0])" style="cursor:pointer">
                        <img :src="item.upic">
                        <div class="username">{{item.username}}</div>
                    </div>
                    <div class="article_comments_content">
                        {{item.comment}} 
                    </div>
                </div>
                <div class="article_comment_block_time">{{item.createdAt}}</div>
            </div>
        </div>
    </div>
</template>

<script>
import moment from 'moment'
import axios from '../utils/axiosService'
export default {
name: 'detail',
components: {
},
data () {
    return {
        content: '',
        allcomments: '',
        commentQuantity: '',
        loading: false
    }
},
props: {
    loginStatic: {
        required: true
    },
    aid: {
        required: true
    }
},
created() {
    this.getComments()
},
methods: {
    toUserDetail(uid) {
        console.log(uid,"uidddddddddddd")
    },
    Published() {
        let that = this
        let data = {
            aid: this.aid,
            uid: this.loginStatic.uid,
            comment: this.content
        }
        axios.post("/api/addComment",data).then(function (req) {
            that.getComments()
            that.$message({
                message: "评论发表成功",
                type: 'success',
                duration: 1000
            })
            taht.content = ''
        }).catch(error => {
            console.log(error);
        });
        
    },
    getComments() {
        this.loading = true
        let that = this
        let data2 = {
                aid: this.aid
        }
        axios.post("/api/getAriticleComment",data2).then(function (req) {
            let tmpData = req.data
            let sortCreateTime = (a,b) => {
                return b.createdAt - a.createdAt
            }
            tmpData.sort(sortCreateTime)
            tmpData.forEach(item => {
                item.createdAt = moment(item.createdAt).format('YYYY/MM/DD hh:mm')
            })
            that.commentQuantity = tmpData.length
            that.allcomments = tmpData
            setInterval(() => {
                that.loading = false
            },500)
            console.log(that.allcomments)
        })
        
    }
}
}
</script>
<style>
    .article_comment_block {
        margin: 15px 0;
        border-bottom: rgba(0,0,0,.1) solid 1px;
    }
    .article_comment_block_user {
        position: relative;
    }
    .article_comment_block_user img {
        height: 40px;
        width: 40px;
        border-radius: 50%;
    }
    .username {
        position: absolute;
        top: 0px;
        left: 60px;
        font-weight: 700
    }
    .article_comments_content {
        position: absolute;
        top: 25px;
        left: 60px
    }
    .article_comment_block_time {
        color: gray;
        font-size: 14px;
        margin-top: 10px
    }
    .article_comments_head {
        margin: 40px 0;
        padding-left: 20px;
    }
    .article_comments_head {
        border-left: 5px solid gray;
        font-weight: 700
    }
    .writeComment {
        margin-bottom: 30px;
    }
    .article_comments {
        padding-bottom: 100px;
    }
</style>