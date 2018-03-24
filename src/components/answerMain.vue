<template>
    <div>
        <el-tabs v-model="activeName" @tab-click="handleClick" type="border-card" class="answerBlock">
            <el-tab-pane label="热门问题" name="first">
                <div v-for="item in answers" class="answer_main_hot">
                    <router-link :to="{ name:'answerDetail', params: {answerid: item.id} }">{{item.title}}</router-link>
                    <span style="color: #409EFF;float: right">{{item.topic}}</span>
                    <p class="answer_main_titleText">0人回答 0人关注 <span style="float: right">{{item.createdAt}}</span></p>
                </div>
            </el-tab-pane>
            <el-tab-pane label="我关注的问题" name="second">我关注的问题</el-tab-pane>
            <el-tab-pane label="我的收藏" name="third">我收藏的问题</el-tab-pane>
        </el-tabs>
    </div>
</template>
<script>
export default {
    data() {
        return {
            activeName: 'first',
            answersFinal: ''
        }
    },
    created() {
        let tmp = this.answers
        let a = ['1','2','3']
        console.log(tmp,"tmp")
        a.forEach(element => {
            console.log(element)
        });
    },
    methods: {
        handleClick(tab, event) {
            console.log(tab, event);
        }
    },
    props: {
        answers: {
            required: true
        }
    }
};
</script>
<style>
    .answer_main_titleText {
        font-size: 13px;
        margin: 15px 0;
        color: #999
    }
    .answer_main_hot {
        border-bottom:1px solid #eee;
        margin-top: 15px;
    }
    .answerBlock {
        min-height: 700px;
    }
</style>