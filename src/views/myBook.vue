<template>
    <div>
        <div class="topBlock">
            <myHeader :privateMessageData='privateMessageData' :loginStatic='loginStatic' @logOut="logOut"/>
        </div>
        <div class="bookStoreMain">
            <el-card class="box-card">
                <div slot="header" class="clearfix">
                    <span>我购买的书</span>
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
    name: 'myBook',
    components: {
        myHeader,
        notFound
    },
    data () {
        return {
            uid: this.$route.params.id,
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
        console.log(this.uid,"uid")
        let data ={
            Uid: this.uid
        }
        axios.post('/api/getMyBook',data).then((req) => {
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
        }
    }
}
</script>
<style>
.bookStoreMain {
    margin-top: 15px;
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