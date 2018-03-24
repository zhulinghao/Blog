<template>
    <div>
        <div class="topBlock">
            <myHeader :privateMessageData='privateMessageData' :loginStatic='loginStatic' @logOut="logOut"/>
        </div>
        <div class="book-detail-container">
            <div class="book-info">
                <div style="padding: 20px;position: relative;">
                    <img :src="bookDetail.pic" alt="">
                    <div class="book-info-title">
                        {{bookDetail.name}}
                    </div>
                    <div class="book-info-author">
                        {{bookDetail.author}} 著
                    </div>
                    <div class="book-info-price">
                        ¥{{bookDetail.promotion}}
                    </div>
                    <el-button v-show="exame"  @click="buyBookVisible = true" type="primary" size="normal" class="book-info-buy">
                        立即购买
                    </el-button>
                    <el-dialog
                        title="扫码购买（如不扫码，也可购买，看你素质）"
                        :visible.sync="buyBookVisible"
                        width="30%">
                    <span>
                       <div class="buy_book_img">
                            <img src="/static/bookStore/pay.jpg" alt="">
                       </div>
                    </span>
                    <span slot="footer" class="dialog-footer">
                    <el-button @click="buyBookVisible = false">取 消</el-button>
                    <el-button type="primary" @click="buyBook(bookDetail.id)">确认购买</el-button>
                    </span>
                    </el-dialog>
                    <el-button v-show="!exame" :disabled="true" size="normal" class="book-info-private">
                        已购买
                    </el-button>
                    <el-button v-show="!exame" @click="toBookRead(bookDetail.id)" type="primary" size="normal" class="book-info-buy">
                        阅读
                    </el-button>
                </div>
            </div>
            <div class="book-aside">
                <div style="padding:10px;cursor: pointer">
                    <router-link to="/bookStore">返回书店</router-link>
                    <router-link :to="toMyBook">我购买的书</router-link>
                </div>
            </div>
            <div class="book-info-jianjie">
                <div class="book-info-jianjie-title">
                    简介
                </div>
                <div style="padding: 0 1rem">
                    <p style="word-wrap:break-word;">{{bookDetail.description}}</p>
                    <div class="ExtInfo">
                        <div class="ExtInfo-item">
                            <b>作者</b>{{bookDetail.author}}
                        </div>
                        <div class="ExtInfo-item">
                            <b>书名</b>{{bookDetail.name}}
                        </div>
                        <div class="ExtInfo-item">
                            <b>上架时间</b>{{bookDetail.createdAt}}
                        </div>
                    </div>
                </div>
            </div>
            
            <div style="clear: both"></div>
        </div>
    </div>
</template>

<script>
import moment from 'moment'
import axios from '../utils/axiosService'
import myHeader from '@/components/header.vue'
export default {
    name: 'bookStoreDetail',
    components: {
        myHeader
    },
    data () {
        return {
            bookId: this.$route.params.id,
            bookDetail: '',
            exame: true,
            toMyBook: `/myBook/${this.loginStatic.uid}`,
            buyBookVisible: false
        }
    },
    props:['loginStatic','privateMessageData'],
    created() {
        this.getData()
    },
    mounted() {
        let that = this
        setTimeout(function() {
            that.exameBuy()
        },50)
    },
    methods: {
        logOut() {
             this.$emit('logOut')
        },
        buyBook(bookId) {
            let data = {
                bookId: bookId,
                Uid: this.loginStatic.uid
            }
            let that = this
            axios.post('/api/buyBook',data).then((res) => {
                this.exameBuy()
                this.$message({
                    message: '添加成功',
                    type: 'success',
                    duration: 1000
                })
                this.buyBookVisible = false
            }).catch((error) => {
                console.log(error)
            })
        },
        toBookRead(bookId) {
            console.log("去读书",bookId)
            this.$message({
                showClose: true,
                message: '等待开放',
                duration: 1000
            })
        },
        getData() {
            let data = {
                id: this.$route.params.id
            }
            axios.post('/api/getBookDetail',data).then((res) => {
                res.data[0].createdAt = moment(res.data[0].createdAt).format('YYYY-MM')
                this.bookDetail = res.data[0]
            }).catch((error) => {
                console.log(error)
            })
        },
        exameBuy() {
            let data2 = {
                Uid: this.loginStatic.uid,
                bookId: this.$route.params.id
            }
            axios.post('/api/exameBookDetail',data2).then((res) => {
                if (res.data.length === 1) {
                    this.exame = false
                } else if(res.data.length === 0) {
                    this.exame = true
                }
            }).catch((error) => {
                console.log(error)
            })
        }
    }
}
</script>
<style>
.book-info-jianjie,
.book-info {
    width: 70%;
}
.book-info-jianjie,
.book-info,
.book-aside {
    background: #fff;
    box-shadow: 0 1px 3px rgba(26,26,26,.1);
    float: left;
}
.book-aside {
    margin-left: 1%;
    width: 29%;
}
.book-aside a{
    display: block;
    border-bottom: 1px solid rgba(0,0,0,.1);
    padding: 10px 0;
}
.book-detail-container {
    margin-top: 10px;
    padding: 0 15%;
}
.book-info img {
    width: 180px;
    border: solid 1px #e6e6e6;
}
.book-info-title {
    position: absolute;
    left: 220px;
    top:  20px;
    width: 337px;
    margin-top: 4px;
    font-size: 20px;
    font-weight: 500;
    color: #404040;
}
.book-info-author {
    position: absolute;
    left: 220px;
    top:  60px;
    color: #999;
    font-size: 16px;
}
.book-info-price {
    font-size: 20px;
    color: #0084ff;
    position: absolute;
    left: 220px;
    bottom: 25px;
}
.book-info-buy {
    position: absolute;
    bottom: 25px;
    right: 30px;
}
.book-info-private {
    position: absolute;
    bottom: 25px;
    right: 150px;
}
.book-info-jianjie {
    margin-top: 1rem;
    padding-bottom: 2rem;
}
.book-info-jianjie-title {
    padding: 1rem;
    font-size: 1rem;
    border-bottom: 1px solid rgba(0,0,0,.1);
}
.ExtInfo {
    border-top: 1px solid rgba(0,0,0,.1);
    border-bottom: 1px solid rgba(0,0,0,.1);
}
.ExtInfo-item {
    padding: .8rem 0;
    
}
.ExtInfo-item>b {
    margin-right: 5rem;
    width: 15rem;
    display: inline-block
}
.ExtInfo-item {
    color: #404040;
}
.buy_book_img img {
    height: 100%;
    width: 100%;
}
</style>