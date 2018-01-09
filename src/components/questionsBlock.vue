<template>
    <div>
        <el-card class="questionBlock" v-for="n in questions" :key="n.id" style="padding-bottom: 10px">
            <div class="author_block">
                <img :src=n.upic alt="23333" class="home_card_img">
                <span class="author_text">
                    <b class="author">{{n.username}}</b>: {{n.description}}
                </span>
            </div>
            <div>
                <div v-html="n.content" class="question_content"></div>
            <div>
            <span style="float: right; color:#999;font-size: 13px;">发布于：{{n.createdAt}}</span>
                <el-row class="border_bottom">
                    <el-col :span="3">
                        <el-badge class="item">
                            <el-button size="small">评论</el-button>
                        </el-badge>
                    </el-col>
                    <el-col :span="3">
                        <el-badge class="item">
                            <el-button size="small">收藏</el-button>
                        </el-badge>
                    </el-col>
                </el-row>          
            </div>
            </div>
        </el-card>
    </div>
</template>

<script>
import axios from '../utils/axiosService'
import $ from 'jquery'
export default {
    name: 'detail',
    components: {
    },
    data () {
        return {
        showImg: false,
        imageUrl: ''
        }
    },
    created() {
    },
    methods: {
    },
    props: {
        questions: {
            required: true
        }
    }
}
</script>
<style>
.author_block img{
    height: 35px;
    width: 35px;
    position: absolute;
    border: 2px solid rgba(0,0,0,.08);
    border-radius: 50%
}
.author_block {
    margin-bottom: 10px;
    font-size: 14px;
    height: 30px;
    width: 30px;
    position: relative
}
.author_text {
    position: absolute;
    left: 45px;
    top: 7px;
    width: 400px;
    overflow: hidden;
}
.question_content {
    margin: 20px 0 10px 0;
    width: 100%;
    font-family: -apple-system,BlinkMacSystemFont,Helvetica Neue,PingFang SC,Microsoft YaHei,Source Han Sans SC,Noto Sans CJK SC,WenQuanYi Micro Hei,sans-serif;
    font-size: 14px;
    overflow: hidden;
}
.questionBlock {
    border: none;
    box-shadow: none;
    padding-bottom: 0 !important;
}
.border_bottom {
    padding-bottom: 15px;
    border-bottom: 1px solid #f0f2f7;
}
</style>