<template>
    <div>
        <div class="header_two">
                <span class="header_two_logo"><router-link to="/home">YUYAN</router-link></span>
                <span style="margin-left: 500px;font-weight:800">Todo List</span>
            </div>
            <div id="particles"></div>
        <div class="todo_main"  style="margin: 40px auto; width: 700px;">
            <el-input v-model="todoValue" placeholder="输入代办项" @keyup.enter.native="addTodo" class="todo_main_input"></el-input>
            <h3 style="margin: 15px 0;position: relative">正在进行：</h3>
            <div v-for="(item,index) in doing" class="todo-item">
                <span v-bind:class="item.finish">{{item.value}} <span class="todo-item-time">({{item.time}})</span></span>
                <div class="todo-item-handle">
                    <span style="cursor:pointer" @click="deleteTodo(index,'doing')">
                        <i class="el-icon-error" style="color: #f75659;font-size: 20px;"></i>
                    </span>
                    <span style="cursor:pointer;margin-left: 5px;" @click="finished(index)">
                        <i class="el-icon-success" style="color: #67C23A;font-size: 20px;"></i>
                    </span>
                </div> 
            </div>
            <h3 style="margin: 15px 0; position: relative">已完成：</h3>
            <div v-for="(item,index) in done" class="todo-item">
                <span v-bind:class="item.finish">{{item.value}} <span class="todo-item-time">({{item.time}})</span></span>
                <div class="todo-item-handle">
                    <span style="cursor:pointer" @click="deleteTodo(index,'done')">
                        <i class="el-icon-error" style="color: #f75659;font-size: 20px;"></i>
                    </span>
                    <span style="cursor:pointer;margin-left: 5px;" @click="finished(index)">
                        <i class="el-icon-success" style="color: #67C23A;font-size: 20px;"></i>
                    </span>
                </div> 
            </div>
            <div style="cursor:pointer; margin-top: 10px; position: relative" @click="deleteAll"><b>删除所有</b></div>
        </div>
    </div>
</template>

<script>
import moment from 'moment'
import axios from '../utils/axiosService'
export default {
name: 'todoList',
components: {
},
data () {
    return {
        todoValue: '',
        todoListData: [],
        doing: [],
        done: []
    }
},
created() {
    let x = localStorage.getItem('todoLData')
    console.log(x,"xxxxxxxxxxx")
    JSON.parse(x) === 'undefined' || JSON.parse(x) === null ? this.todoListData = [] : this.todoListData = JSON.parse(x)
    console.log(this.todoListData,'aaaaaaaaaaaaaa')
    this.doingOrDone()
},
methods: {
    doingOrDone() {
        let doingTmp = []
        let doneTmp = []
        this.todoListData.forEach(element => {
            if (element.finish == 'no') {
                doingTmp.push(element)
            } else {
                doneTmp.push(element)
            }
        });
        this.doing = doingTmp;
        this.done = doneTmp;
    },
    addTodo() {
        let value = this.todoValue
        if (value != '') {
            if (value.length <= 24) {
                let tmp = {
                    value: value,
                    finish: 'no',
                    time: moment().format('YYYY-MM-DD hh:mm')
                }
                this.todoListData.push(tmp)
                this.todoValue = ''
                localStorage.setItem('todoLData', JSON.stringify(this.todoListData));
                this.doingOrDone()
            } else {
                this.$message({
                    message: '一个代办项，不要写那么长呀！！',
                    type: 'error',
                    duration: 1000
                })
            }
        }
    },
    deleteTodo(index,doingOrDone) {
        if (doingOrDone === 'doing') {
            this.doing.splice(index,1)
        } else if(doingOrDone === 'done') {
            this.done.splice(index,1)
        }
        this.todoListData = []
        this.todoListData = this.doing.concat(this.done);
        console.log(this.todoListData)
        localStorage.setItem('todoLData', JSON.stringify(this.todoListData));
        this.doingOrDone()
    },
    finished(index) {
        if (this.todoListData[index].finish == 'finish') {
            this.todoListData[index].finish = 'no'
            localStorage.setItem('todoLData', JSON.stringify(this.todoListData));
            this.doingOrDone()
        } else {
            this.todoListData[index].finish = 'finish'
            localStorage.setItem('todoLData', JSON.stringify(this.todoListData));
            this.doingOrDone()
        }
    },
    deleteAll() {
        localStorage.setItem('todoLData', null)
        this.todoListData = []
        this.doingOrDone()
    }
},
mounted() {
    particlesJS.load('particles','./static/ParticlesData.json')
}
}
</script>
<style>
    .todo_main_button {
        width: 19%;
    }
    .finish { 
        color: #999;
        text-decoration:line-through
    }
    .todo-item {
        padding: 5px;
        height: 30px;
        line-height: 30px;
        border-radius: 5px;
        border: 1px solid rgba(0,0,0,.1);
        margin-top: 10px;
        font-size: 14px;
        background: #fff;
        position: relative;
        padding-left: 10px;
    }
    .todo-item-handle {
        position: absolute;
        right: 5px;
        top: 5px;
    }
    .todo-item-time {
        color: #999;
        font-size: 14px;
    }
    #particles{
        position: absolute;
        width: 100%;
        height: 100%;
        background-color:#fff;
        background-repeat: no-repeat;
        background-size: cover;
        background-position: 50% 50%;
    }
</style>