<template>
    <div>
        <el-tabs v-model="activeName" @tab-click="handleClick" type="border-card" class="answerBlock">
            <el-tab-pane label="所有问题" name="first">
                <div v-for="item in answers" class="answer_main_hot" :key="item.id">
                    <router-link :to="{ name:'answerDetail', params: {answerid: item.id} }">{{item.title}}</router-link>
                    <span style="color: #409EFF;float: right">{{item.topic}}</span>
                    <p class="answer_main_titleText">{{item.fTimes}}人关注 <span style="float: right">{{item.createdAt}}</span></p>
                </div>
            </el-tab-pane>
            <el-tab-pane label="热门问题" name="second">
                <div v-for="item in hotAnswers" class="answer_main_hot" :key="item.id">
                    <router-link :to="{ name:'answerDetail', params: {answerid: item.id} }">{{item.title}}</router-link>
                    <span style="color: #409EFF;float: right">{{item.topic}}</span>
                    <p class="answer_main_titleText">{{item.fTimes}}人关注 <span style="float: right">{{item.createdAt}}</span></p>
                </div>
            </el-tab-pane>
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
            let a = ['1', '2', '3']
            console.log(tmp, "tmp")
            a.forEach(element => {
                console.log(element)
            });
        },
        methods: {
            handleClick(tab, event) {
                console.log(tab, event);
            }
        },
        props: ['answers', 'hotAnswers']
    };
</script>
<style>
    .answer_main_titleText {
        font-size: 13px;
        margin: 15px 0;
        color: #999
    }
    
    .answer_main_hot {
        border-bottom: 1px solid #eee;
        margin-top: 15px;
    }
    
    .answerBlock {
        min-height: 570px;
        margin-bottom: 50px;
        overflow: hidden;
    }
    
    .answerBlock .el-tabs__content {
        overflow-y: scroll;
        height: 570px;
    }
</style>