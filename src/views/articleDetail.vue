<template>
    <div class="article_detail_content">
            {{loginStatic}}
       <div class="title">{{title}}</div>
       <div class="article_detail_writer">
           <img class="article_detail_writer_pic" src="../../static/avatar/default.jpg" alt="">
           <div class="article_detail_writer_name">{{params.username}} · {{params.createdAt}}</div>
           <div class="articleFavorite" @click="addFavoriteArticle">
                <i v-show="!isFavorite" class="el-icon-star-off articleFavorite_icon"></i> 
                <i v-show="isFavorite" class="el-icon-star-on articleFavorite_icon"></i> 收藏
           </div>
       </div>
       <div class="article_detail_main">
            <div v-html="content" class="content"></div>    
       </div>
       <articleComment :loginStatic="loginStatic" :aid="aid"/>

       <el-dialog
            title="提示"
            :visible.sync="dialogVisible"
            width="30%">
            <span>您已经关注此文章，点击确定<span style="color: red">取消关注</span>该文章</span>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="deleteFavoriteArticle">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
    import axios from '../utils/axiosService'
    import myEdit from '@/components/myEdit.vue'
    import articleComment from '@/components/articleComment.vue'
    export default {
        name: 'articleDetail',
        data() {
            return {
                aid: this.$route.params.aid,
                params: this.$route.params,
                content: '',
                title: '',
                isFavorite: '',
                uid: this.$route.params.uid,
                dialogVisible: false
            }
        },
        components: {
            articleComment
        },
        props: {
            loginStatic: {
                required: true
            }
        },
        created() {
            this.exameFavoriteArticle()
            let that = this
            let data = {
                aid: this.aid
            };
            axios.post("/api/detailArticle",data).then(function (req) {
                console.log(req.data,"detailArticle")
                let tmpDate = req.data[0]
                that.content = tmpDate.content
                that.title = tmpDate.title
            })
        },
        methods: {
            addFavoriteArticle() {
                if (this.isFavorite) {
                    this.dialogVisible = true
                } else {
                    let that = this
                    let data = {
                        aid: this.aid,
                        uid: this.uid
                    }
                    axios.post("/api/addFavoriteArticle",data).then(function (req) {
                        that.$message({
                            message: '收藏成功，可以去自己的个人中心查看哦',
                            type: 'success'
                        })
                        that.exameFavoriteArticle()
                    })
                }
            },
            exameFavoriteArticle() {
                let that = this
                let data = {
                    aid: this.aid,
                    uid: this.uid
                }
                axios.post("/api/exameFavoriteArticle",data).then(function (req) {
                    that.isFavorite = req.data
                })
            },
            deleteFavoriteArticle() {
                let that = this
                let data = {
                    aid: this.aid,
                    uid: this.uid
                }
                axios.post("/api/deleteFavoriteArticle",data).then(function (req) {
                    that.dialogVisible = false
                    that.exameFavoriteArticle()
                    that.$message({
                        message: '已取消收藏该文章',
                        type: 'normal'
                    })
                })
            }
        }
    }
</script>

<style scoped>
    .article_detail_content {
        min-width: 500px;
        padding: 0 25%;
        background: #fff;
        padding-bottom: 30px;
    }
    .title {
        margin: 0 auto;
        padding-top: 20px;
        font-size: 30px
    }
    .article_detail_main {
        margin-bottom: 40px;
        padding-bottom: 30px;
        border-bottom: 1px solid #e6e6e6;
    }
    .article_detail_writer_pic {
        height: 45px;
        width: 45px;
        border-radius: 50%;
    }
    .article_detail_writer {
        position: relative;
        margin: 30px 0;
    }
    .article_detail_writer_name {
        position: absolute;
        left: 60px;
        top: 15px;
        font-size: 16px;
        color: #999;
    }
    .articleFavorite {
        position: absolute;
        right: 0px;
        top: 10px;
        cursor: pointer;
        color: gray;
    }
    .articleFavorite_icon {
        font-size: 24px;
    }
</style>