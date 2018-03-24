<template>
    <div>
        <div class="topBlock">
            <myHeader :privateMessageData='privateMessageData' :loginStatic='loginStatic' @logOut="logOut"/>
        </div>
        <div style="margin: 10px 15%;">
            <div class="topic_detail_header">
                <img :src="topicData.pic" alt="">
                <div class="topic_detail_header_info">
                    <h1>{{topic}}</h1> <div class="topic_detail_header_jj">简介：{{topicData.content}}</div>
                    <p>文章 {{articleData.length}} 提问 {{answerData.length}} </p>
                </div>
                <uploadTopicPic @getTopic="getTopic" :tid="topicData.id"/> 
            </div>
            <div class="topic_detail_main">
                <el-tabs v-model="activeName" @tab-click="handleClick" type="border-card">
                    <el-tab-pane label="话题提问" name="first">
                        <div class="topic_detail_main_item">
                            <div v-for="item in answerData" class="topic_detail_main_answer">
                                <router-link :to="{ name:'answerDetail', params: {answerid: item.id} }">{{item.title}}</router-link>
                                <span style="color: #409EFF;float: right">{{item.topic}}</span>
                                <p class="topic_detail_main_titleText">0人回答 0人关注 <span style="float: right">{{item.createdAt}}</span></p>
                            </div>
                            <notFound v-show="!answerData.length"/>
                        </div>
                    </el-tab-pane>
                    <el-tab-pane label="话题文章" name="second">
                            <div class="topic_detail_main_item">
                                <div v-for="item in articleData" class="topic_detail_main_answer">
                                    <router-link :to="{ name:'articleDetail', params: {aid: item.id,upic: item.upic,username: item.username,createdAt: item.createdAt,uid: loginStatic.uid} }">{{item.title}}</router-link>
                                    <span style="color: #409EFF;float: right">{{item.articleType}}</span>
                                    <p class="topic_detail_main_titleText">0人关注 <span style="float: right">{{item.createdAt}}</span></p>
                                </div>
                                <notFound v-show="!articleData.length" />
                            </div>
                    </el-tab-pane>
                </el-tabs>
            </div>
        </div>
    </div>
</template>

<script>
import uploadTopicPic from '@/components/uploadTopicPic.vue'
import notFound from '@/components/notFound.vue'
import axios from '../utils/axiosService'
import myHeader from '@/components/header.vue'
export default {
    name: 'topicDetail',
    components: {
        myHeader,
        notFound,
        uploadTopicPic
    },
    data () {
        return {
            topic: this.$route.params.topic,
            activeName: this.$route.params.tab,
            answerData: [],
            topicData: '',
            articleData: []
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
    created() {
        let data = {
            topic: this.topic
        } 
        axios.post('/api/getTopicArticle',data).then((res) => {
            this.articleData = res.data
        }).catch((error) => {
            console.log(error)
        }) 
        axios.post('/api/getTopicAnswer',data).then((res) => {
            this.answerData = res.data
        }).catch((error) => {
            console.log(error)
        })
        this.getTopic()
    },
    methods: {
        logOut() {
             this.$emit('logOut')
        },
        handleClick(tab, event) {
            this.$router.push({ path: `/topicDetail/${this.topic}/${tab.name}`})
        },
        getTopic() {
            let data = {
                topic: this.topic
            } 
            axios.post('/api/getTopicDetail',data).then((res) => {
                this.topicData = res.data[0]
            }).catch((error) => {
                console.log(error)
            })
        }
    }
}
</script>
<style>
    .topic_detail_header {
        padding: 20px;
        background: #fff;
        margin-bottom: 15px;
        border: 1px solid #d8dce5;
        box-shadow: 0 2px 4px 0 rgba(0,0,0,.12), 0 0 6px 0 rgba(0,0,0,.04);
        position: relative;
        height: 100px;
    }
    .topic_detail_header_info {
        position: absolute;
        left: 150px;
        top: 20px;
    }
    .topic_detail_header_jj {
        font-size: 14px;
        margin: 5px 0;
    }
    .topic_detail_header h1 {
        color: #333;
        font-weight: 700;
        font-size: 22px;
        display: inline-block;
        margin-right: 20px;
    }
    .topic_detail_header_info p {
        color: #999;
        margin: 0;
        font-size: 14px;
    }
    .topic_detail_header img {
        position: absolute;
        top: 20px;
        left: 20px;
        width: 100px;
        height: 100px;
    }
    .topic_detail_main {
        border-radius: 5px;
    }
    .topic_detail_main_item {
        min-height: 500px;
        width: 100%;
    }
    .topic_detail_main_titleText {
        font-size: 13px;
        margin: 15px 0;
        color: #999
    }
    .topic_detail_main_answer {
        border-bottom:1px solid #eee;
        margin-top: 15px;
    }
    
</style>