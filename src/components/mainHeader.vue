<template>
    <div class="main_header_block">
            <div class="main_header_item">
                    <el-button :disabled="!loginStatic.isLogin" @click="toWrite">
                        <i class="el-icon-edit-outline" style="margin-right: 5px"></i>写文章
                    </el-button>
            </div>
            <div class="main_header_item">
                <el-button :disabled="!loginStatic.isLogin" @click="dialogVisible = true">
                    <i class="el-icon-question" style="margin-right: 5px"></i>提问
                </el-button>
            </div>
            <div style="clear: both"></div>
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
                        <el-select v-model="questionForm.topic" placeholder="请选择" style="width:100%">
                            <el-option
                                v-for="item in topicOptions"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="问题描述（可选）：" prop="content">
                        <el-input type="textarea" v-model="questionForm.content"></el-input>
                    </el-form-item>
                </el-form>
            </span>
            <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="addAnsewer('loginForm')">提 交</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    import axios from '../utils/axiosService'
    export default {
        data() {
            return {
                dialogVisible: false,
                questionForm: {
                    questionTitle: '',
                    topic: '',
                    content: ''
                },
                topicOptions: []
            };
        },
        props: {
            loginStatic: {
                required: true
            }
        },
        created() {
            axios.get('/api/getTopics').then((res) => {
                let tmp = res.data
                tmp.forEach(element => {
                    let item = {
                        label: element.title,
                        value: element.title
                    }
                    this.topicOptions.push(item)
                });
            }).catch((error) => {
                console.log(error)
            })
        },
        methods: {
            addAnsewer() {
                let that = this
                let data = {
                    title: this.questionForm.questionTitle,
                    topic: this.questionForm.topic,
                    content: this.questionForm.content,
                    uid: this.loginStatic.uid,
                    username: this.loginStatic.username
                }
                if (data.title != '' && data.topic != '' && data.content != '') {
                    this.dialogVisible = false
                    axios.post("/api/addAnsewer",data).then(function (req) {
                        that.$message({
                            message: '提问成功',
                            type: 'success',
                            duration: 1000
                        })
                    })
                } else {
                    this.$message({
                        message: '请把信息填写完全',
                        type: 'error',
                        duration: 1000
                    })
                }

            },
            toWrite() {
                if (this.loginStatic.isLogin) {
                    this.$router.push({ path: '/write/none'})
                }
            }
        }
    }
</script>
<style>
    .main_header_block {
        padding: .9rem 1.5rem;
        background: #fff;
        margin-bottom: 1rem;
        border: 1px solid #e6ebf5;
        box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
    }
    .main_header_item {
        float: left;
        margin-right: 1rem;
        font-size: 16px;
    }
</style>
