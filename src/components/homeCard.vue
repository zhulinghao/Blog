<template>
    <div>
        <el-card class="box-card" v-for="(n,index) in articles" :key="n.id" style="padding-bottom: 10px">
                <div slot="header" class="clearfix">
                    <span style="color: #878d99;">文章类型：{{n.articleType}}</span>
                </div>
                <div class="home_card_author_block" @click="toPersonnalDetail(n.uid)">
                    <img :src=n.upic alt="23333">
                    <span class="home_card_author_text">
                        <b class="home_card_author">{{n.username}}</b>: {{n.udescription}}
                    </span>
                </div>
                <div class="title">
                    <router-link :to="{ name:'articleDetail', params: {aid: n.id,upic: n.upic,username: n.username,createdAt: n.createdAt,uid: loginStatic.uid || 'none'} }"><b></b>{{n.title}}</b></router-link>
                </div>
                <div class="item">
                    <div v-html="n.content" ref="content" class="article_content"></div>
                    <div ref="dakai" @click="show_all(index)" class='show_all'>阅读全文<i class="el-icon-arrow-down"></i></div>
                    <div v-show="false" ref="shouqi" @click="show_all(index)" class='show_all'>收起全文<i class="el-icon-arrow-up"></i></div>
                <div>
                    <el-row>
                    <el-col :span="3">
                        <el-badge  :value="comment" class="item">
                            <el-button size="small" @click="commentShow(index)">评论</el-button>
                        </el-badge>
                    </el-col>
                    <el-col :span="3">
                        <el-badge class="item">
                            <el-button size="small" @click="addFA">收藏</el-button>
                        </el-badge>
                     </el-col>
                    </el-row>          
                </div>
                </div>
                <div v-show='showComment'>
                    我是评论 
                </div>
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
      created() {   
      },
      methods: {
        commentShow(index) {
            this.showComment == false ? this.showComment = true : this.showComment = false
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
                content[index].style.height = '100px'
                shouqi[index].style.display = 'none'
                dakai[index].style.display = 'block'

            }
        },
        addFA() {
            
        },
        toPersonnalDetail(uid) {
            this.$router.push({ path: `/personnalCenter/${uid}/others/first`})
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
.home_card_author_block img{
    height: 35px;
    width: 35px;
    position: absolute;
    border: 2px solid rgba(0,0,0,.08);
    border-radius: 50%;
}
.home_card_author_block {
    margin-bottom: 20px;
    font-size: 14px;
    height: 30px;
    width: 30px;
    position: relative;
    cursor: pointer;
}
.home_card_author_text {
    position: absolute;
    left: 45px;
    top: 7px;
    width: 400px;
    overflow: hidden;
}
.box-card {
    margin-bottom: 10px;
}
.title {
    margin-bottom: 5px;
    font-size: 20px;
    font-weight: 700
}
.article_content {
    width: 100%;
    font-family: -apple-system,BlinkMacSystemFont,Helvetica Neue,PingFang SC,Microsoft YaHei,Source Han Sans SC,Noto Sans CJK SC,WenQuanYi Micro Hei,sans-serif;
    font-size: 14px;
    height: 100px;
    overflow: hidden;
    margin-bottom: 10px;
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
</style>