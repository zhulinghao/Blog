<template>
    <div>
        <div class="topBlock">
            <myHeader :privateMessageData='privateMessageData' :loginStatic='loginStatic' @logOut="logOut"/>
        </div>
        <div style="margin: 10px 15%;">
            <div class="topic_detail_header">
                {{topic}}
            </div>
            <div class="topic_detail_main">
                <el-tabs v-model="activeName" @tab-click="handleClick" type="border-card">
                    <el-tab-pane label="话题提问" name="first">
                        <div class="topic_detail_main_item">
                            <div v-for="item in answerData" class="topic_detail_main_answer">
                                <router-link :to="{ name:'answerDetail', params: {answerid: item.id} }">{{item.title}}</router-link>
                                <span style="color: #409EFF;float: right">{{item.topic}}</span>
                                <p class="topic_detail_main_titleText">x人回答 x人关注 <span style="float: right">{{item.createdAt}}</span></p>
                            </div>
                        </div>
                    </el-tab-pane>
                    <el-tab-pane label="话题文章" name="second">
                            <div class="topic_detail_main_item">
                                    
                            </div>
                    </el-tab-pane>
                    <el-tab-pane label="热门" name="third">
                            <div class="topic_detail_main_item">
                                    
                            </div>
                    </el-tab-pane>
                </el-tabs>
            </div>
        </div>
    </div>
</template>

<script>
import axios from '../utils/axiosService'
import myHeader from '@/components/header.vue'
export default {
    name: 'topicDetail',
    components: {
        myHeader
    },
    data () {
        return {
            topic: this.$route.params.topic,
            activeName: this.$route.params.tab,
            answerData: ''
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
        axios.post('/api/getTopicAnswer',data).then((res) => {
            this.answerData = res.data
        }).catch((error) => {
            console.log(error)
        })
    },
    methods: {
        logOut() {
             this.$emit('logOut')
        },
        handleClick(tab, event) {
            this.$route.params.tab = event
        }
    }
}
</script>
<style>
    .topic_detail_header {
        padding: 10px;
        background: #fff;
        margin-bottom: 15px;
        color: #0f88eb;
        font-weight: 700;
        font-size: 30px;
        border: 1px solid #d8dce5;
        box-shadow: 0 2px 4px 0 rgba(0,0,0,.12), 0 0 6px 0 rgba(0,0,0,.04);
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