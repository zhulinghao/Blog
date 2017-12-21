<template>
    <div class="main_header_block">
        <el-row>
            <el-col :span="4" class="main_header_item">
                    <el-button :disabled="!loginStatic.isLogin" @click="toWrite">
                        <i class="el-icon-edit-outline" style="margin-right: 5px"></i>写文章
                    </el-button>
            </el-col>
            <el-col :span="4" class="main_header_item">
                <el-button :disabled="!loginStatic.isLogin" @click="dialogVisible = true">
                    <i class="el-icon-question" style="margin-right: 5px"></i>提问
                </el-button>
            </el-col>
            <el-col :span="4" class="main_header_item">
                <el-button @click="toAnswer">
                    <i class="el-icon-tickets" style="margin-right: 5px"></i>回答
                </el-button>
            </el-col>
        </el-row>
        <el-dialog
            title="QUESTION"
            :visible.sync="dialogVisible"
            width="30%">
            <span>
                <h1 style="text-align:center;margin-bottom:20px">写下你的问题</h1>
                <el-form :model="questionForm" ref="loginForm" class="demo-ruleForm">
                    <el-form-item prop="questionTitle">
                        <el-input v-model="questionForm.questionTitle" placeholder="问题标题"></el-input>
                    </el-form-item>
                    <el-form-item prop="topic">
                        <el-input v-model="questionForm.topic" placeholder="添加话题"></el-input>
                    </el-form-item>
                    <el-form-item label="问题描述（可选）：" prop="content">
                        <el-input type="textarea" v-model="questionForm.cpntent"></el-input>
                    </el-form-item>
                </el-form>
            </span>
            <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="login('loginForm')">提 交</el-button>
            </span>
        </el-dialog>
    </div> 
</template>

<script>
    export default {
        data() {
            return {
                dialogVisible: false,
                questionForm: {
                    questionTitle: '',
                    topic: ''
                }
            };
        },
        props: {
            loginStatic: {
                required: true
            }
        },
        methods: {
            toWrite() {
                if (this.loginStatic.isLogin) {
                    this.$router.push({ path: '/write'})
                }
            },
            toAnswer() {
                this.$router.push({ path: '/answer'})
            }

        }
    }
</script>
<style>
    .main_header_block {
        padding: 10px 20px;
        background: #fff;
        margin-bottom: 10px;
        border: 1px solid #e6ebf5;
        box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
    }
    
</style>