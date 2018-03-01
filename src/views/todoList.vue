<template>
    <div>
        <div class="header_two">
                <span class="header_two_logo"><router-link to="/home">YUYAN</router-link></span>
                <span style="margin-left: 500px;font-weight:800">Todo List</span>
            </div>
        <div class="todo_main"  style="margin: 40px auto; width: 700px;">
            <el-input v-model="todoValue" placeholder="输入代办项" class="todo_main_input"></el-input>
            <el-button class="todo_main_button" type="primary" @click="addTodo">ADD</el-button>
            <div v-for="(item,index) in todoListData">
                <span v-bind:class="item.finish">{{item.value}}</span> <span @click="deleteTodo(index)">delete</span> <span @click="finished(index)">done</span> 
            </div>
            <span @click="deleteAll">delete all</span>
        </div>
    </div>
</template>

<script>
import axios from '../utils/axiosService'
export default {
name: 'todoList',
components: {
},
data () {
    return {
        todoValue: '',
        todoListData: []
    }
},
created() {
    let x = localStorage.getItem('todoLData')
    JSON.parse(x) == null ? this.todoListData = [] : this.todoListData = JSON.parse(x)
},
methods: {
    addTodo() {
        let value = this.todoValue
        if (value != '') {
            let tmp = {
                value: value,
                finish: 'no'
            }
            this.todoListData.push(tmp)
            this.todoValue = ''
            localStorage.setItem('todoLData', JSON.stringify(this.todoListData));
        }
    },
    deleteTodo(index) {
        this.todoListData.splice(index,1)
        localStorage.setItem('todoLData', JSON.stringify(this.todoListData));
    },
    finished(index) {
        this.todoListData[index].finish = 'finish'
        localStorage.setItem('todoLData', JSON.stringify(this.todoListData));
    },
    deleteAll() {
        localStorage.setItem('todoLData', null);
        this.todoListData = []
    }
}
}
</script>
<style>
    .todo_main_input {
        width: 80%;
    }
    .todo_main_button {
        width: 19%;
    }
    .finish { 
        color: #999;

    }
</style>