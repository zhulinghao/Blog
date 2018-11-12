<template>
    <div class="todoContainer">
        <div id="particles"></div>
        <div class="header_two" style="z-index: 10002;position:fixed;width:100%;background: rgba(0,0,0,.1);display: flex;">
            <span class="header_two_logo"><router-link to="/home">YUYAN</router-link></span>
            <span style="margin-left: 550px;font-weight:800">Todo List</span>
            <span @click="deleteAll" class="dall">清空TODO</span>
        </div>
        <div class="td-t-mask"></div>
        <div class="todo_main" ref='itemMain'>
            <div class="todo_items">
                <div v-for="(item,index) in todoListData" class="todo-item" v-bind:class="[item.param.finish,item.param.grade]">
                    <span>{{item.value}}</span>
                    <span class="todo-item-time">({{item.time}})</span>
                    <div class="todo-item-handle">
                        <span style="cursor:pointer" @click="deleteTodo(index,'doing')">
                            <i class="el-icon-circle-close-outline"></i>
                        </span>
                        <span style="cursor:pointer;margin-left: 5px;" @click="finished(index)">
                            <i v-show="!item.param.isFinish" class="el-icon-circle-check-outline"></i>
                            <i v-show="item.param.isFinish" class="el-icon-circle-plus"></i>
                        </span>
                    </div>
                </div>
            </div>
        </div>
        <div class="tdFooter">
            <el-input v-model="todoValue" placeholder="输入待办项(可选择事项等级)" @keyup.enter.native="addTodo" ref="todoInput" class="todo_main_input"></el-input>
            <el-radio-group class="grade-r-group" v-model="grade">
                <el-radio-button label="ok" class="grade-ok">还好</el-radio-button>
                <el-radio-button label="me" class="grade-me">中等</el-radio-button>
                <el-radio-button label="im" class="grade-im">重要</el-radio-button>
            </el-radio-group>
        </div>
    </div>
</template>

<script>
    import moment from 'moment'
    import axios from '../utils/axiosService'
    export default {
        name: 'todoList',
        components: {},
        data() {
            return {
                todoValue: '',
                todoListData: [],
                grade: 'ok',
            }
        },
        created() {
            let x = localStorage.getItem('todoLData')
            JSON.parse(x) === 'undefined' || JSON.parse(x) === null ? this.todoListData = [] : this.todoListData = JSON.parse(x)
        },
        methods: {
            addTodo() {
                let value = this.todoValue
                if (value != '') {
                    if (value.length <= 24) {
                        let tmp = {
                            value: value,
                            param: {
                                finish: 'no',
                                isFinish: false,
                                grade: this.grade
                            },
                            time: moment().format('YYYY-MM-DD hh:mm')
                        }
                        this.todoListData.push(tmp)
                        this.todoValue = ''
                        localStorage.setItem('todoLData', JSON.stringify(this.todoListData));
                        let that = this
                        setTimeout(function() {
                            that.scrollToBottom()
                        }, 0)
                    } else {
                        this.$message({
                            message: '一个待办项，不要写那么长呀！！',
                            type: 'error',
                            duration: 1000
                        })
                    }
                }
            },
            deleteTodo(index) {
                this.todoListData.splice(index, 1)
                localStorage.setItem('todoLData', JSON.stringify(this.todoListData));
            },
            finished(index) {
                let param = this.todoListData[index].param
                if (param.isFinish) {
                    param.finish = 'no'
                    param.isFinish = false
                    localStorage.setItem('todoLData', JSON.stringify(this.todoListData));
                } else {
                    let that = this
                    param.finish = 'finish'
                    param.isFinish = true
                    let tmp = this.todoListData[index]
                    setTimeout(function() {
                        that.todoListData.splice(index, 1)
                        that.todoListData.unshift(tmp)
                        console.log(that.todoListData)
                    }, 0)

                    localStorage.setItem('todoLData', JSON.stringify(this.todoListData));
                    this.scrollToTop()
                }
            },
            deleteAll() {
                this.$confirm('是否要清空待办事项?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    localStorage.setItem('todoLData', null)
                    this.todoListData = []
                    this.$message({
                        type: 'success',
                        message: '清空成功!',
                        duration: 1000
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消清空',
                        duration: 1000
                    });
                });
            },
            scrollToBottom() {
                let div = this.$refs.itemMain
                div.scrollTop = div.scrollHeight + 120;
            },
            scrollToTop() {
                const div = this.$refs.itemMain
                div.scrollTop = 0;
            }
        },
        mounted() {
            this.scrollToBottom()
            this.$refs.todoInput.focus()
            particlesJS.load('particles', './static/ParticlesData.json')
        }
    }
</script>
<style>
    .todoContainer {
        width: 100%;
    }
    
    .todo_main {
        width: 700px;
        position: fixed;
        bottom: 400px;
        margin-left: -350px;
        left: 50%;
        max-height: 350px;
        height: 350px;
        overflow-y: scroll;
    }
    
    .todo_items {
        position: absolute;
        bottom: 0px;
        width: 100%;
        height: 100%;
    }
    
    .todo_main_button {
        width: 19%;
    }
    
    .ok {
        background: #85ce61;
    }
    
    .me {
        background: #66b1ff;
    }
    
    .im {
        background: #f78989;
    }
    
    .finish {
        background: #999 !important;
    }
    
    .todo-item {
        padding: 15px;
        border-radius: 5px;
        font-size: 18px;
        line-height: 18px;
        position: relative;
        padding-left: 10px;
        width: 70%;
        margin: 15px auto auto auto;
        color: #fff;
    }
    
    .todo-item:hover {
        animation: todoItem 1s;
        animation-fill-mode: forwards;
    }
    
    @keyframes todoItem {
        0% {
            transform: scale(1)
        }
        50% {
            transform: scale(1.2)
        }
        100% {
            transform: scale(1.1)
        }
    }
    
    .todo-item-handle {
        position: absolute;
        right: 10px;
        top: 16px;
    }
    
    .todo-item-time {
        color: #fff;
        font-size: 12px;
        position: absolute;
        right: 66px;
        top: 16px;
    }
    
    #particles {
        position: absolute;
        width: 100%;
        height: 100%;
        background-color: #fff;
        background-repeat: no-repeat;
        background-size: cover;
        background-position: 50% 50%;
    }
    
    .todo_main_input {
        margin: 30px auto 20px auto;
        display: block;
        text-align: center;
    }
    
    .todo_main_input .el-input__inner {
        text-align: center !important;
        width: 50%;
        outline: none;
        font-size: 18px;
        border-radius: 5px;
        border: 1px solid #ddd;
        height: 50px;
    }
    
    .tdFooter {
        width: 50%;
        height: 180px;
        position: fixed;
        border-radius: 10px;
        left: 50%;
        transform: translateX(-50%);
        bottom: 100px;
        box-shadow: 0 9px 18px 0 rgba(0, 0, 0, .24);
        background: rgba(0, 0, 0, .1);
    }
    
    .grade-ok .el-radio-button__orig-radio:checked+.el-radio-button__inner {
        border-color: #67C23A;
        background: #67C23A;
    }
    
    .grade-me .el-radio-button__orig-radio:checked+.el-radio-button__inner {
        border-color: #409EFF;
        background: #409EFF;
    }
    
    .grade-im .el-radio-button__orig-radio:checked+.el-radio-button__inner {
        border-color: #F56C6C;
        background: #F56C6C;
        box-shadow: -1px 0 0 0 #F56C6C;
    }
    
    .dall {
        color: #999;
        font-size: 12px;
        cursor: pointer;
        margin-left: 200px;
    }
    /* .td-t-mask {
        width: 100%;
        height: 400px;
        top: 0;
        left: 0;
        z-index: 10000;
        background-image: linear-gradient(rgba(255,255,255,1),rgba(255,255,255,0));
        position: absolute;
    } */
    
    .grade-r-group {
        margin: 0 auto;
        display: block;
        width: 208px;
    }
</style>