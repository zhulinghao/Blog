<template>
    <div>
        <el-card class="box-card" v-for="(n,index) in articles" :key="n.id" style="padding-bottom: 10px;box-shadow: 0 1px 3px rgba(26,26,26,.1);
        box-sizing: border-box;">
                <div slot="header" class="clearfix">
                    <span style="color: #9fadc7;font-weight: 700;">话题：{{n.articleType}}</span>
                </div>
                <div class="home_card_author_block" @click="toPersonnalDetail(n.uid)">
                    <img :src=n.upic alt="23333">
                    <span class="home_card_author_text">
                        <b class="home_card_author">{{n.username}}</b>: {{n.udescription}}
                    </span>
                </div>
                <div class="title">
                    <router-link :to="{ name:'articleDetail', params: {aid: n.id,upic: n.upic,username: n.username,createdAt: n.createdAt,uid: n.uid || 'none'} }"><b>{{n.title}}</b></router-link>
                </div>
                <div>
                    <div v-html="n.content" ref="content" class="article_content"></div>
                    <div ref="dakai" @click="show_all(index)" class='show_all'>阅读全文<i class="el-icon-arrow-down"></i></div>
                    <div v-show="false" ref="shouqi" @click="show_all(index)" class='show_all'>收起全文<i class="el-icon-arrow-up"></i></div>
                </div>
                <el-row class="card-footer">
                    <span :disabled="!loginStatic.isLogin" @click="commentShow(n.id,n.upic,n.username,n.createdAt,n.uid || 'none')">
                        <i class="el-icon-message"></i> <b>{{n.commentTimes}}条评论</b>
                    </span>
                    <span :disabled="!loginStatic.isLogin" size="small" @click="addFA(n.id,n.upic,n.username,n.createdAt,n.uid || 'none')">
                        <i class="el-icon-star-off"></i> <b>收藏</b>
                    </span>
                </el-row>
            </el-card>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                comment: '12',
                showComment: false,
                showtheall: false
            }
        },
        props: {
            articles: {
                required: true
            },
            loginStatic: {
                required: true
            }
        },
        created() {},
        methods: {
            commentShow(aid, upic, username, createdAt) {
                this.$router.push({
                    name: 'articleDetail',
                    params: {
                        aid: aid,
                        upic: upic,
                        username: username,
                        createdAt: createdAt,
                        uid: this.loginStatic.uid || 'none'
                    }
                })
            },
            show_all(index) {
                let dakai = this.$refs.dakai
                let shouqi = this.$refs.shouqi
                let content = this.$refs.content
                if (shouqi[index].style.display == 'none') {
                    shouqi[index].style.display = 'block'
                    dakai[index].style.display = 'none'
                    content[index].style.height = '100%'
                } else {
                    content[index].style.height = '128px'
                    shouqi[index].style.display = 'none'
                    dakai[index].style.display = 'block'
                }
            },
            addFA(aid, upic, username, createdAt) {
                this.$message({
                    message: '如还未收藏，请点击标题右侧的收藏按钮',
                    type: 'warning',
                    duration: 1000
                });
                this.$router.push({
                    name: 'articleDetail',
                    params: {
                        aid: aid,
                        upic: upic,
                        username: username,
                        createdAt: createdAt,
                        uid: this.loginStatic.uid || 'none'
                    }
                })
            },
            toPersonnalDetail(uid) {
                if (uid == this.loginStatic.uid) {
                    this.$router.push({
                        path: `/personnalCenter/${uid}/me/first`
                    })
                } else {
                    this.$router.push({
                        path: `/personnalCenter/${uid}/others/first`
                    })
                }
            }
        }
    }
</script>
<style>
    .el-card__header {
        padding-top: 10px;
        padding-bottom: 10px;
    }
    
    .el-card__body {
        padding-top: 10px;
        padding-bottom: 0;
    }
    
    .clearfix:before,
    .clearfix:after {
        display: table;
        content: "";
    }
    
    .clearfix:after {
        clear: both
    }
    
    .home_card_author {
        font-size: 16px;
        color: #333;
    }
    
    .home_card_author_block img {
        height: 30px;
        width: 30px;
        position: absolute;
        border-radius: 5px;
    }
    
    .home_card_author_block {
        margin-bottom: 5px;
        font-size: 14px;
        height: 30px;
        width: 30px;
        position: relative;
        cursor: pointer;
    }
    
    .home_card_author_text {
        color: #999;
        position: absolute;
        left: 45px;
        top: 2px;
        width: 400px;
        overflow: hidden;
    }
    
    .box-card {
        margin-bottom: 10px;
    }
    
    .title {
        margin-bottom: 15px;
        font-size: 20px;
        font-weight: 700
    }
    
    .card-footer span {
        cursor: pointer;
        display: inline-block;
        font-size: 14px;
        position: relative;
        width: 100px;
        color: #9fadc7;
    }
    
    .card-footer span:hover {
        cursor: pointer;
        font-size: 14px;
        color: #0f88eb;
    }
    
    .card-footer b {
        position: absolute;
        left: 30px;
        top: 4px;
        width: 100px;
    }
    
    .card-footer i {
        font-size: 26px;
    }
    
    .article_content {
        width: 100%;
        font-family: -apple-system, BlinkMacSystemFont, Helvetica Neue, PingFang SC, Microsoft YaHei, Source Han Sans SC, Noto Sans CJK SC, WenQuanYi Micro Hei, sans-serif;
        font-size: 15px;
        height: 128px;
        overflow: hidden;
        margin-bottom: 5px;
        line-height: 2;
    }
    
    .article_content:hover {
        color: #2d2f33;
    }
    
    .el-icon-plus,
    .el-icon-minus {
        font-size: 26px;
        color: rgb(133, 144, 166);
    }
    
    .el-icon-plus:hover,
    .el-icon-minus:hover {
        color: #0f88eb;
        transition: .5s;
    }
    
    .show_all {
        font-size: 14px;
        color: #0f88eb;
        cursor: pointer;
        margin-bottom: 20px;
    }
    
    .show_all:hover {
        color: #2d2f33;
    }
    
    .article_content img {
        max-width: 500px;
    }
    
    .comment-btn {
        margin-right: 2rem;
    }
</style>