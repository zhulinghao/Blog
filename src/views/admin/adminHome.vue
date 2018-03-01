<template>
    <div>
        <div class="header_two">
            <span class="header_two_logo"><router-link to="/home">YUYAN</router-link></span>
            <span style="margin-left: 500px;font-weight:800">欲言网数据管理系统</span>
        </div>
        <div class="admin_home_main">
            <el-tabs  v-model="activeName" @tab-click="tabHandleClick">
                <el-tab-pane label="用户管理" name="first">
                    <h3 style="margin-bottom: 15px;">用户管理列表</h3>
                    <el-table stripe border :data="userData" style="width:100%;" max-height="600">
                        <el-table-column
                            label="序号"
                            type="index"
                            width="100">
                        </el-table-column>
                        <el-table-column
                            prop="username"
                            label="用户名">
                        </el-table-column>
                        <el-table-column
                            prop="gender"
                            label="性别">
                        </el-table-column>
                        <el-table-column
                            prop="createdAt"
                            label="创建时间">
                        </el-table-column>
                        <el-table-column
                            label="操作">
                            <template slot-scope="scope">
                                <el-button @click="deleteItem(scope.row,'User')" type="text" size="small">删除</el-button>
                                <el-button type="text" size="small">编辑</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-tab-pane>
                <el-tab-pane label="文章管理" name="second">
                    <h3 style="margin-bottom: 15px;">文章管理列表</h3>
                    <el-table border stripe :data="articleData" style="width: 100%" max-height="600">
                        <el-table-column
                            label="序号"
                            type="index"
                            width="100">
                        </el-table-column>
                        <el-table-column
                            prop="username"
                            label="创建用户"
                            width="180">
                        </el-table-column>
                        <el-table-column
                            prop="title"
                            label="标题">
                        </el-table-column>
                        <el-table-column
                            prop="articleType"
                            label="话题">
                        </el-table-column>
                        <el-table-column
                            prop="createdAt"
                            label="创建时间">
                        </el-table-column>
                        <el-table-column
                            label="操作"
                            width="300">
                            <template slot-scope="scope">
                                <el-button @click="deleteItem(scope.row,'Article')" type="text" size="small">删除</el-button>
                                <el-button type="text" size="small">编辑</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                    <h3 style="margin: 15px 0;">评论管理列表(文章)</h3>
                    <el-table border stripe :data="articleCommentData" style="width: 100%;margin-bottom: 100px;" max-height="600">
                        <el-table-column
                            label="序号"
                            type="index"
                            width="100">
                        </el-table-column>
                        <el-table-column
                            prop="username"
                            label="评论用户"
                            width="180">
                        </el-table-column>
                        <el-table-column
                            prop="aid"
                            label="文章标题">
                        </el-table-column>
                        <el-table-column
                            prop="comment"
                            label="评论内容">
                        </el-table-column>
                        <el-table-column
                            prop="createdAt"
                            label="创建时间">
                        </el-table-column>
                        <el-table-column
                            label="操作">
                            <template slot-scope="scope">
                                <el-button @click="deleteItem(scope.row,'ArticleComment')" type="text" size="small">删除</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-tab-pane>
                <el-tab-pane label="提问＆回答管理" name="third">
                    <h3 style="margin: 15px 0;">提问管理列表(文章)</h3>
                    <el-table border stripe :data="questionData" style="width: 100%">
                        <el-table-column
                            label="序号"
                            type="index"
                            width="100">
                        </el-table-column>
                        <el-table-column
                            prop="username"
                            label=创建用户>
                        </el-table-column>
                        <el-table-column
                            prop="title"
                            label="问题标题">
                        </el-table-column>
                        <el-table-column
                            prop="content"
                            label="问题描述">
                        </el-table-column>
                        <el-table-column
                            prop="topic"
                            label="话题">
                        </el-table-column>
                        <el-table-column
                            prop="createdAt"
                            label="创建时间">
                        </el-table-column>
                        <el-table-column
                            label="操作">
                            <template slot-scope="scope">
                                <el-button @click="deleteItem(scope.row,'question')" type="text" size="small">删除</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-tab-pane>
                <!-- <el-tab-pane label="话题管理">
                    <el-table :data="tableData" style="width: 100%">
                        <el-table-column
                            prop="date"
                            label="日期"
                            width="180">
                        </el-table-column>
                        <el-table-column
                            prop="name"
                            label="姓名"
                            width="180">
                        </el-table-column>
                        <el-table-column
                            prop="address"
                            label="地址">
                        </el-table-column>
                    </el-table>
                </el-tab-pane> -->
            </el-tabs>
        </div>
    </div>
</template>

<script>
import axios from '../../utils/axiosService'
import md5 from 'js-md5'
import moment from 'moment'
export default {
    name: 'adminHome',
    components: {

    },
    data () {
        return {
            activeName: this.$route.params.tab,
            userData: [],
            articleData: [],
            articleCommentData: [],
            questionData: [],
            answerData: []
        }
    },
    created() {
        if (this.$route.params.password !== md5('gang way')) {
            this.$router.push({ path: '/NotFoundComponent'})
        } else {
            this.$message({
                message: '热烈欢迎我们的管理员！！！',
                type: 'success',
                duration: 2000
            })
        }
        this.getData()
    },
    methods: {
        tabHandleClick(tab, event) {
            this.$router.push({ path: `/adminHome/${md5('gang way')}/${tab.name}`})
        },
        deleteItem(row,type) {
            this.$confirm('是否确定删除当前数据?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                let data = {
                    id: row.id
                }
                axios.post(`/api/delete${type}`,data).then((res) => {
                    this.getData()
                    this.$message({
                        type: 'success',
                        message: '删除成功!',
                        duration: 1000
                    })
                }).catch((error) => {
                    console.log(error)
                })
            }).catch(() => {
                    this.$message({
                    type: 'info',
                    message: '已取消删除',
                    duration: 1000
                });          
            });
        },
        getData() {
            axios.get('/api/userList').then((res) => {
                res.data.forEach(element => {
                    element.createdAt = moment(element.createdAt).format('YYYY/MM-DD hh:mm')
                    if(element.gender == 0) {
                        element.gender = "男"
                    } else if (element.gender == 1) {
                        element.gender = "女"
                    } else if (element.gender == 2) {
                        element.gender = "其他"
                    }
                });
                this.userData = res.data
            }).catch((error) => {
                console.log(error)
            })
            axios.get('/api/articleList').then((req) => {
                req.data.forEach(item => {
                    item.createdAt = moment(item.createdAt).format('YYYY/MM/DD')
                })
                this.articleData = req.data
            }).catch((error) => {
                console.warn(error)
            })
            axios.get('/api/getAllAriticleComment').then((req) => {
                this.articleCommentData = req.data
                console.log(this.articleCommentData,"commentdata ")
            }).catch((error) => {
                console.warn(error)
            })
            axios.get('/api/getAnswers').then((req) => {
                this.questionData = req.data
                console.log(req.data,"question data")
            }).catch((error) => {
                console.log(error)
            })
            axios.get('/api/getAllQuestions').then((req) => {
                this.answerData = req.data
                console.log(req.data,"answer data")
            }).catch((error) => {
                console.log(error)
            })
        }
    }
}
</script>
<style>
    .admin_home_main {
        padding: 0 50px;

    }
    .el-table__row td .cell{
        max-height: 55px;
        overflow: hidden;
    }
</style>