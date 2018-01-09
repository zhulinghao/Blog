<template>
    <el-tabs v-model="activeName" @tab-click="handleClick" class="search_block">
        <el-tab-pane label="综合" name="first">
            <div class="search_comprehensive">
                <div class="search_comprehensive_main">
                    <div v-for="item in comprehensiveData" class="search_comprehensive_main_item">
                        <router-link to='/home'>{{item.title}}</router-link>
                        <div ref="mainCItem" :height="100" class="search_comprehensive_main_item_content" v-html="item.content"></div>
                    </div>
                </div>
            </div>
        </el-tab-pane>
        <el-tab-pane label="用户" name="second">
            <div class="search_user">
                <div class="search_user_main">
                    <div v-for="item in userData" class="search_user_main_item">
                        {{item}}
                    </div>
                </div>
            </div>
        </el-tab-pane>
        <el-tab-pane label="话题" name="third">
            <div class="search_topic">
                <div class="search_topic_main">
                    <div v-for="item in 4" class="search_user_topic_item"></div>
                </div>
            </div>
        </el-tab-pane>
        <el-tab-pane label="其他" name="fourth">其他</el-tab-pane>
    </el-tabs>
</template>
  
<script>
import axios from '../utils/axiosService'
export default {
    name: 'search',
    components: {
    },
    data() {
        return {
            activeName: 'first',
            searchValue: this.$route.params.value,
            comprehensiveData: '',
            userData: ''
        }
    },
    created() {
        let data = {
            value: this.searchValue
        }
        let that = this
        axios.post('/api/searchComprehensive',data).then((res) => {
            console.log(res.data,"aaaaaaaaaaaaa")
            let data = res.data
            that.comprehensiveData = data.searchA
            that.userData = data.searchU
        }).catch((error) => {
            console.log(error)
        })
    },
    methods: {
        handleClick(tab, event) {
            console.log(tab, event);
        }
    }
}
</script>
<style>
    .search_block .el-tabs__header,
    .search_block .el-tabs__nav-wrap,
    .search_block .el-tabs__nav-scroll
    {
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
        padding: 0px 15%;
    }
    .search_topic_main,
    .search_user_main,
    .search_comprehensive_main {
        width: 70%;
        background: #fff;
        min-height: 200px;
        box-shadow: 0 1px 3px 0 rgba(0,37,55,.1);
        border: 1px solid #e6ebf5
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
    .search_comprehensive_main_item_content {
        margin: 15px 0;
        overflow: hidden;
    }
</style>