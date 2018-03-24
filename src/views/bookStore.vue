<template>
    <div>
        <div class="topBlock">
            <myHeader :privateMessageData='privateMessageData' :loginStatic='loginStatic' @logOut="logOut"/>
        </div>
        <div class="bookStoreMain">
            <el-carousel class="bookStore_carousel" :interval="4000" type="card" height="230px">
                    <el-carousel-item>
                        <img src="/static/bookStore/lb4.jpg" alt="">
                    </el-carousel-item>
                    <el-carousel-item>
                        <img src="/static/bookStore/lb3.jpg" alt="">
                    </el-carousel-item>
                    <el-carousel-item>
                        <img src="/static/bookStore/lb2.jpg" alt="">
                    </el-carousel-item>
                    <el-carousel-item>
                        <img src="/static/bookStore/lb1.jpg" alt="">
                    </el-carousel-item>
            </el-carousel>
            <el-card class="box-card">
                <div slot="header" class="clearfix">
                    <span>精选图书</span>
                    <el-button style="float: right; padding: 3px 0" type="text" @click="exameVisible = true">添加图书</el-button>
                    <el-dialog
                        title="用户验证"
                        :visible.sync="exameVisible"
                        width="30%">
                    <span>
                        <el-input v-model="adminPassword" placeholder="请输入管理员口令"></el-input>
                    </span>
                    <span slot="footer" class="dialog-footer">
                        <el-button @click="exameVisible = false">取 消</el-button>
                        <el-button type="primary" @click="exameAdmin()">确认</el-button>
                    </span>
                    </el-dialog>
                    <el-dialog
                        title="添加图书"
                        :visible.sync="createBookVisible"
                        width="30%">
                    <span>
                        <el-form :model="bookAdd" :label-position="labelPosition" label-width="90px" class="demo-ruleForm">
                            <el-form-item label="封面：">
                                /static/bookStore/item1.webp
                                <el-input v-model="bookAdd.pic" placeholder="封面"></el-input>
                            </el-form-item>
                            <el-form-item label="书名：">
                                <el-input v-model="bookAdd.name" placeholder="书名不能为空"></el-input>
                            </el-form-item>
                            <el-form-item label="作者：">
                                <el-input v-model="bookAdd.author" placeholder="作者不能为空"></el-input>
                            </el-form-item>
                            <el-form-item label="价格：">
                                    <el-input v-model="bookAdd.promotion" placeholder="价格不能为空"></el-input>
                                </el-form-item>
                            <el-form-item label="图书简介：">
                                <el-input type="textarea" placeholder="图书简介不能为空" v-model="bookAdd.description"></el-input>
                            </el-form-item>
                        </el-form>
                    </span>
                    <span slot="footer" class="dialog-footer">
                    <el-button @click="createBookVisible = false">取 消</el-button>
                    <el-button type="primary" @click="addBook()">确认添加</el-button>
                    </span>
                    </el-dialog>
                </div>
                <el-row :gutter="20">
                    <el-col v-for="(item, index) in booksData" :key="index" :span="4">
                        <div class="bookStore_main_item" @click="toDetail(item.id)">
                            <img :src="item.pic" alt="" onerror="this.src='/static/bookStore/bookDeafult.jpg'">
                            <div class="bookStore_main_item_title">
                                {{item.name}}
                            </div>
                            <div class="bookStore_main_item_authors">
                                {{item.author}}
                            </div>
                            <div class="bookStore_main_item_promotion">
                                ¥{{item.promotion}}
                            </div>
                        </div>
                    </el-col>
                    <notFound v-show="!booksData.length"/>
                </el-row>
            </el-card>
        </div>
    </div>
</template>

<script>
import notFound from '@/components/notFound.vue'
import myHeader from '@/components/header.vue'
import axios from '../utils/axiosService'
export default {
    name: 'bookStore',
    components: {
        myHeader,
        notFound
    },
    data () {
        return {
            createBookVisible: false,
            bookAdd: {
                pic: '',
                name: '',
                description: '',
                author: '',
                promotion: ''
            },
            adminPassword: '',
            labelPosition: 'left',
            exameVisible: false,
            booksData: []
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
        axios.get('/api/getBooks').then((req) => {
            this.booksData = req.data
        }).catch((error)=> {
            console.log(error)
        })
    },
    methods: {
        logOut() {
            this.$emit('logOut')
        },
        toDetail(id) {
            this.$router.push({ path: `/bookStoreDetail/${id}`})
        },
        exameAdmin() {
            if (this.adminPassword == "gang way") {
                this.adminPassword = ""
                this.exameVisible = false
                this.createBookVisible = true
            } else {
                this.$message({
                    message: '口令错误',
                    type: 'error',
                    duration: 1000
                })
                this.adminPassword = ""
            }
        },
        addBook() {
            if (this.bookAdd.pic != '' && this.bookAdd.promotion != '' && this.bookAdd.author != '' && this.bookAdd.description != '' && this.bookAdd.name != '') {
                let data = this.bookAdd
                axios.post('/api/addBook',data).then((req) => {
                    this.bookAdd = {
                        pic: '',
                        name: '',
                        description: '',
                        author: '',
                        promotion: ''
                    }
                    this.$message({
                        message: '添加图书成功',
                        type: 'success',
                        duration: 1000
                    })
                }).catch((error) => {
                    console.warn(error)
                })
            } else{
                this.$message({
                    message: '请把信息填写完整！！',
                    type: 'error',
                    duration: 1000
                })
            }
        }
    }
}
</script>
<style>
.bookStoreMain {
    padding: 0 10%;
    padding-bottom: 100px;
}
.bookStore_carousel {
    margin-top: 40px;
}
.bookStore_carousel img {
    height: 230px;
    width: 100%;
}
.bookStore_main_item img {
    width: 174px;
    height: 232px;
    box-shadow: 0 9px 18px 0 rgba(0,0,0,.24);
}
.bookStore_main_item {
    margin-top: 20px;
    border-radius: 5px;
    cursor: pointer;
}
.bookStore_main_item_title {
    font-family: -apple-system,BlinkMacSystemFont,Helvetica Neue,PingFang SC,Microsoft YaHei,Source Han Sans SC,Noto Sans CJK SC,WenQuanYi Micro Hei,sans-serif;
    font-weight: 500;
    font-size: 16px;
    line-height: 22px;
    width: 174px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    margin-top: 10px;
    color: #222;
}
.bookStore_main_item_promotion,
.bookStore_main_item_authors {
    color: #8590a6;
    margin: 5px 0;
}

.bookStore_main_item_promotion {
    color: #f75659;
}
</style>