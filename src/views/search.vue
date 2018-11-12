<template>
    <div>
        <div class="topBlock" v-show="showHeader">
            <myHeader :privateMessageData='privateMessageData' :loginStatic='loginStatic' @logOut="logOut"/>
        </div>
        <el-tabs
            ref="tabsBlock"
            v-model="activeName"
            @tab-click="handleClick"
            class="search_block">
            <el-tab-pane label="文章" name="first">
                <div class="search_comprehensive">
                    <div class="search_comprehensive_main">
                        <div v-for="item in comprehensiveData" class="search_comprehensive_main_item">
                            <router-link :to="{ name:'articleDetail', params: {aid: item.id,upic: item.upic,username: item.username,createdAt: item.createdAt,uid: loginStatic.uid || 'none'} }">{{item.title}} (作者：{{item.username}})</router-link>
                            <div style="color: #999;margin-top: 10px;">
                                 时间：{{item.createdAt}} 话题：{{item.articleType}}
                            </div>
                        </div>
                        <notFound v-show="!comprehensiveData.length"/>
                    </div>
                </div>
            </el-tab-pane>
            <el-tab-pane label="用户" name="second">
                <div class="search_user">
                    <div class="search_user_main">
                        <div v-for="item in userData" class="search_user_main_item">
                            <img @click="toPersonnalDetail(item.id)" :src="item.pic" alt="" class="search_user_main_item_img">
                            <div @click="toPersonnalDetail(item.id)" class="search_user_main_item_username">
                                {{item.username}}
                            </div>
                            <div class="search_user_main_item_description">
                                {{item.description}}
                            </div>

                            <div class="search_user_main_item_sex">
                                <img src="/static/icon-man.png" alt="">
                            </div>
                        </div>
                        <notFound v-show="!userData.length"/>
                    </div>
                </div>
            </el-tab-pane>
            <el-tab-pane label="话题" name="third">
                <div class="search_topic">
                    <div class="search_topic_main">
                        <div v-for="item in topicData" class="search_user_main_item">
                            <img @click="toTopicDetail(item.title)" :src="item.pic" alt="" class="search_user_main_item_img">
                            <div @click="toTopicDetail(item.title)" class="search_user_main_item_username">
                                {{item.title}}
                            </div>
                        </div>
                        <notFound v-show="!topicData.length"/>
                    </div>
                </div>
            </el-tab-pane>
            <el-tab-pane label="提问" name="fourth">
                <div class="search_topic">
                    <div class="search_topic_main">
                        <div v-for="item in questionData" class="search_comprehensive_main_item">
                            <router-link :to="{ name:'answerDetail', params: {answerid: item.id} }">{{item.title}}</router-link>
                            <div style="color: #999;margin-top: 10px;">
                                    时间：{{item.createdAt}} 话题：{{item.topic}}
                            </div>
                        </div>
                        <notFound v-show="!questionData.length"/>
                    </div>
                </div>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
    import axios from '../utils/axiosService'
    import notFound from '@/components/notFound.vue'
    import myHeader from '@/components/header.vue'
    export default {
        name: 'search',
        components: {
            notFound,
            myHeader
        },
        data() {
            return {
                activeName: 'first',
                comprehensiveData: [],
                userData: [],
                topicData: [],
                questionData: [],
                showHeader: true
            }
        },
        created() {
            this.searchAll()
        },
        props: {
            loginStatic: {
                required: true
            },
            privateMessageData: {
                required: true
            }
        },
        watch: {
            "$route": "searchAll"
        },
        methods: {
            handleClick(tab, event) {
                console.log(tab, event);
            },
            logOut() {
                this.$emit('logOut')
            },
            toTopicDetail(title) {
                this.$router.push({
                    path: `/topicDetail/${title}/first`
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
            },
            searchAll() {
                let data = {
                    value: this.$route.params.value
                }
                this.comFound = true
                this.userFound = true
                let that = this
                axios.post('/api/searchComprehensive', data).then((res) => {
                    let data = res.data
                    that.comprehensiveData = data.searchA
                    that.userData = data.searchU
                    that.questionData = data.searchQ
                    that.topicData = data.searchT
                }).catch((error) => {
                    console.log(error)
                })
            },
            handleScroll() {
                let scrollTop = document.documentElement.scrollTop
                if (scrollTop > 100) {
                    this.showHeader = false
                } else if (scrollTop < 100) {
                    this.showHeader = true
                }
            }
        },
        mounted() {
            window.addEventListener('scroll', this.handleScroll)
        }
    }
</script>
<style>
    .search_block .el-tabs__header,
    .search_block .el-tabs__nav-wrap,
    .search_block .el-tabs__nav-scroll {
        height: 50px;
    }
    
    .search_block .el-tabs__header {
        margin-bottom: 10px;
    }
    
    .search_block .el-tabs__nav-scroll {
        background: #fff;
        padding-left: 15%;
    }
    
    .search_block .el-tabs__item {
        height: 49px;
        line-height: 49px;
        width: 80px;
        text-align: center;
        font-weight: 500 !important;
    }
    
    .search_topic,
    .search_user,
    .search_comprehensive {
        padding: 0px 15% 100px 15%;
    }
    
    .search_topic_main,
    .search_user_main,
    .search_comprehensive_main {
        width: 70%;
        background: #fff;
        box-shadow: 0 1px 3px 0 rgba(0, 37, 55, .1);
        border: 1px solid #e6ebf5;
        min-height: 600px;
    }
    
    .search_topic_main_item,
    .search_user_main_item,
    .search_comprehensive_main_item {
        padding: 10px;
        font-size: 14px;
    }
    
    .search_comprehensive_main_item a {
        color: #1e1e1e;
        font-weight: 700;
        font-size: 18px;
    }
    
    .search_comprehensive_main_item a:hover {
        color: #0f88eb;
    }
    
    .search_comprehensive_main_item {
        padding: 15px;
        border-bottom: 1px solid #f6f6f6;
    }
    
    .el-loading-spinner {
        top: 150px;
    }
    
    .search_user_main_item_img {
        height: 80px;
        width: 80px;
        cursor: pointer
    }
    
    .search_user_main_item {
        border-bottom: 1px solid #f6f6f6;
        padding: 10px;
        position: relative
    }
    
    .search_user_main_item_username {
        position: absolute;
        left: 110px;
        top: 20px;
        font-weight: 700;
        font-size: 18px;
        color: #8590a6;
        cursor: pointer;
    }
    
    .search_user_main_item_username:hover {
        color: #333;
        transition: .3s;
    }
    
    .search_user_main_item_description {
        position: absolute;
        left: 110px;
        top: 50px;
    }
    
    .search_user_main_item_sex {
        position: absolute;
        right: 20px;
        top: 50%;
        transform: translateY(-50%);
        font-weight: 600;
        font-size: 30px;
    }
    
    .search_user_main_item_sex img {
        height: 26px;
        width: 26px;
    }
</style>