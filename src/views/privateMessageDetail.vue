<template>
    <div style="padding-bottom: 50px;">
        <div class="header">
            <span class="write_logo"><router-link to="/home">YUYAN</router-link></span>
            <span style="margin-left: 200px;font-weight:800">私信详情页</span>
        </div>
        <div class="private_mssage_main">
            <div class="private_mssage_main_heade">
                <span v-show="!showDetail">全部私信</span>
                <div v-show="showDetail">
                    <span @click="back" style="cursor:pointer">返回</span>
                </div>
            </div>
            <div class="private_mssage_main_body">
                <div v-for="(item,index) in privateMessageData" @click="toDetail(index)" class="private_mssage_main_body_item" v-show="!showDetail">
                    <img :src="item[item.length - 1].userInfo.senderUpic" alt="">
                    <span class="private_mssage_main_body_item_text"><b>{{item[item.length - 1].userInfo.senderUsername}}</b>: {{item[item.length - 1].content}}</span>
                    <span class="private_mssage_main_body_item_time">{{item[item.length - 1].createdAt}}</span>
                </div>
                <div v-show="showDetail" class="private_mssage_main_body_duihua" ref="pmContent">
                    <div v-for="(item,index) in detailData">
                            <div v-show='item.me' class="private_mssage_main_body_item_wo">
                                <div style="display: inline-block; position:absolute; right: 20px;margin-top:20px">
                                    <div style="position: relative;height: 34px;">
                                        <div class="wo_avatar">我</div>
                                        <div style="position: absolute;top: 5px;font-weight: 700; right: 50px;">{{item.userInfo.senderUsername}}</div>
                                    </div>
                                    <div class="private_mssage_main_body_item_content">{{item.content}}</div>
                                    <div class="time">{{item.createdAt}}</div>
                                </div>
                            </div>
                            <div v-show='!item.me' class="private_mssage_main_body_item_ta">                        
                                <div class="ta_avatar">他</div>
                                <div style="position: absolute; top: 15px;font-weight: 700; left: 50px;">{{item.userInfo.senderUsername}}</div>
                                <div class="private_mssage_main_body_item_content">{{item.content}}</div>
                                <div class="time">{{item.createdAt}}</div>
                            </div>
                    </div>
                </div>
                <div class="private_mssage_main_body_item_senderPrivateMessage" v-show="showDetail">
                    <el-input v-model="privateMessageValue" @keyup.enter.native="senderPrivateMessage" style="width: 80%" placeholder="给他发私信"></el-input>
                    <el-button type="primary" style="width: 19%" @click="senderPrivateMessage">发送</el-button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from '../utils/axiosService'
import moment from 'moment'
export default {
    name: 'privateMessageDetail',
    components: {
    },
    data () {
        return {
            uid: this.$route.params.uid,
            privateMessageData: [],
            showDetail: false,
            privateMessageValue: '',
            detailToId:'',
            detailData: [],
            detailIndex: ''
        }
    },
    created() {
        this.getPrivateMessage()
    },
    methods: {
        getPrivateMessage() {
            let that = this
            let data = {
                uid: this.uid
            }
            let tmp = []
            axios.post('/api/getPrivateMessage',data).then((res) => {
                let resData = res.data
                resData.forEach(element => {
                    element.forEach(item => {
                        if (item.senderId == that.uid) {
                            item.me = true
                        }
                    });
                });
                this.privateMessageData = resData
                this.toDetail(this.detailIndex)
                setTimeout(() => {
                    that.scrollToBottom()
                }, 50);
                console.log(resData)
            }).catch((error) => {
                console.log(error)
            })
        },
        toDetail(index) {
            this.detailIndex = index
            this.detailData = this.privateMessageData[index]
            let tmpData = []
            this.detailData.forEach(element => {
                tmpData.push(element.senderId)
            });
            tmpData = Array.from(new Set(tmpData))
            tmpData.forEach(element => {
                if(element != this.uid) {
                    this.detailToId = element
                }
            });
            console.log(this.detailData,"aaaaaaaaaaaaaaaaaaaa")
            this.showDetail = true
        },
        back() {
            this.showDetail = false
        },
        senderPrivateMessage() {
            console.log(this.detailIndex)
            let that = this
            let data = {
                senderId: this.uid,
                toUid: this.detailToId,
                content: this.privateMessageValue
            }
            this.privateMessageContent = ''
            axios.post('/api/addPrivateMessage',data).then((res) => {
                this.getPrivateMessage()
                this.$message({
                    message: res.data,
                    type: 'success',
                    duration: 1000
                })
                this.privateMessageValue = ""
            }).catch((error) => {
                console.log(error)
            })
        },
        scrollToBottom () {
            let div = this.$refs.pmContent
            console.log(div.style,"sssddd")
            div.scrollTop = div.scrollHeight + 120;
            console.log(div.scrollHeight,'asdddddddd')
        }
    }
}
</script>
<style>
    .write_logo a {
        color: gray;
        font-size: 24px;
        position: absolute;
        text-decoration: none;
    }
    .header {
        height: 60px;
        line-height: 60px;
        padding: 0 10%;
        margin-bottom: 40px;
        border-bottom: rgba(0,0,0,.08) solid 1px;
        background: #fff;
    }
    .private_mssage_main_body_duihua {
        height: 596px;
        overflow-y: scroll;
    }
    .private_mssage_main {
        width: 700px;
        margin: 0 auto;
        background: #fff;
        height: 700px;
        border-radius: 5px;
        box-shadow: 0 2px 12px 0 rgba(0,0,0,.4);
        position: relative;
    }
    .private_mssage_main_heade {
        font-weight: 700;
        padding: 10px;
        border-bottom: rgba(0,0,0,.1) solid 1px;
    }
    .private_mssage_main_body_item_senderPrivateMessage {
        padding: 10px;
        border-top: rgba(0,0,0,.1) solid 1px;
        width: 680px;
        position: absolute;
        bottom: 0px;
    }
    .private_mssage_main_body img {
        height: 40px;
        width: 40px;
        border-radius: 50%;
    }
    .private_mssage_main_body_item {
        padding: 15px;
        border-bottom: rgba(0,0,0,.08) solid 1px;
        cursor: pointer;
        position: relative;
    }
    .private_mssage_main_body_item:hover {
        background: rgba(0,0,0,.08);
        transition: .4s;
    }
    .private_mssage_main_body_item_text {
        position: absolute;
        left: 70px;
        top: 25px;
    }
    .private_mssage_main_body_item_time {
        position: absolute;
        right: 10px;
        bottom: 10px;
        color: #999;
        font-size: 14px;
    }
    .ta_avatar,
    .wo_avatar {
        border: 2px solid gray;
        border-radius: 50%;
        padding-top: 3px;
        height: 27px;
        width: 30px;
        text-align: center;
        font-weight: 700
    }
    .wo_avatar {
        position: absolute;
        right: 5px;
    }
    
    .time {
        font-size: 13px;
        color: #999;
    }
    .private_mssage_main_body_item_wo,
    .private_mssage_main_body_item_ta {
        padding: 10px;
        position: relative;
        min-height: 100px;
    }
    .private_mssage_main_body_item_content {
     padding: 10px;
     border-radius: 10px;
     border: 2px solid rgba(0,0,0,.1);
     margin: 10px 0;
     display: inline-block;
     max-width: 600px;
     word-wrap:break-word;
    }
</style>