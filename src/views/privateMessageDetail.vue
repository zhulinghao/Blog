<template>
    <div style="padding-bottom: 50px;">
        <div class="header" style="background: rgba(0,0,0, .1)">
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
                                <div class="sl_square_wo"></div>
                                <div style="position: relative;height: 34px;">
                                    <div class="wo_avatar">M</div>
                                </div>
                                <div class="private_mssage_main_body_item_content">{{item.content}}</div>
                                <div class="time-r">{{item.createdAt}}</div>
                            </div>
                        </div>
                        <div v-show='!item.me' class="private_mssage_main_body_item_ta">
                            <div class="sl_square"></div>
                            <div class="ta_avatar">T</div>
                            <div class="private_mssage_main_body_item_content">{{item.content}}</div>
                            <div class="time-l">{{item.createdAt}}</div>
                        </div>
                    </div>
                </div>
                <div class="private_mssage_main_body_item_senderPrivateMessage" v-show="showDetail">
                    <el-input v-model="privateMessageValue" @keyup.enter.native="senderPrivateMessage" style="width: 80%" placeholder="给他发私信"></el-input>
                    <el-button type="default" style="width: 19%" @click="senderPrivateMessage">发送</el-button>
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
            detailIndex: '',
            takingWith: ''
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
            this.showDetail = true
        },
        back() {
            this.showDetail = false
        },
        senderPrivateMessage() {
            if (this.privateMessageValue === '') {
                this.$message({
                    message: '不能为空',
                    type: 'error',
                    duration: 1000
                })
            } else {
                let that = this
                let data = {
                    senderId: this.uid,
                    toUid: this.detailToId,
                    content: this.privateMessageValue
                }
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
            }
        },
        scrollToBottom () {
            let div = this.$refs.pmContent
            div.scrollTop = div.scrollHeight + 120;
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
        height: 587px;
        overflow-y: scroll;
        background: #ebebeb;
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
        padding: 15px;
        background: #313828;
        color: #fff;
        border-radius: 6px 6px 0 0;
        border-bottom: rgba(0,0,0,.1) solid 1px;
    }
    .private_mssage_main_body_item_senderPrivateMessage {
        padding: 10px;
        border-top: rgba(0,0,0,.1) solid 1px;
        width: 680px;
        background: #f5f5f7;
        position: absolute;
        bottom: 0px;
    }
    .private_mssage_main_body_item_senderPrivateMessage input:focus {
        border: 1px solid rgba(0,0,0, .1);
    }
    .private_mssage_main_body img {
        height: 40px;
        width: 40px;
        border-radius: 5px;
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
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
    }
    .private_mssage_main_body_item_time {
        position: absolute;
        right: 10px;
        color: #999;
        font-size: 14px;
        top: 50%;
        transform: translateY(-50%);
    }
    .ta_avatar,
    .wo_avatar {
        background: #fff;
        border: 2px solid rgba(0,0,0,.4);
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

    .time-r {
        font-size: 13px;
        color: #999;
        text-align: right;
    }
    .time-l {
        font-size: 13px;
        color: #999;
        text-align: left;
    }
    .private_mssage_main_body_item_wo,
    .private_mssage_main_body_item_ta {
        padding: 20px;
        position: relative;
        min-height: 100px;
    }
    .private_mssage_main_body_item_wo .private_mssage_main_body_item_content {
        float: right;
        background: #b1e46e;
    }
    .private_mssage_main_body_item_ta .private_mssage_main_body_item_content {
        background: #fff;
    }
    .private_mssage_main_body_item_content {
        padding: 10px;
        border-radius: 10px;
        margin: 15px 0 10px 0;
        display: inline-block;
        max-width: 600px;
        word-wrap:break-word;
        line-height: 25px;
        position: relative;
    }
    .sl_square {
        position: absolute;width: 0;
        height: 0;
        border-style: solid;
        border-width: 0 8px 10px 4px;
        top: 60px;
        left: 30px;
        border-color: transparent transparent #fff transparent;
    }
    .sl_square_wo {
        position: absolute;width: 0;
        height: 0;
        border-style: solid;
        border-width: 0 4px 10px 8px;
        top: 39px;
        right: 15px;
        border-color: transparent transparent #b1e46e transparent;
    }
</style>
