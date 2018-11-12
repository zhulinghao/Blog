<template>
    <div>
        <div class="admin_home_header">
            <span class="admin_home_logo"><router-link to="/home">YUYAN</router-link></span>
            <span style="margin-left: 500px;font-weight:800">欲言网数据管理系统</span>
        </div>
        <div class="admin_block">
            <div class="admin_block_block">
                请输入管理员口令：<el-input v-model="password" type="password" size="small" @keyup.enter.native="adminLogin" style="width: 200px;margin-right: 5px;"></el-input>
                <el-button size="small" @click="adminLogin" type="primary">确定</el-button>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from '../../utils/axiosService'
    import md5 from 'js-md5'
    export default {
        name: 'admin',
        components: {},
        data() {
            return {
                password: ''
            }
        },
        created() {},
        methods: {
            adminLogin() {
                if (md5(this.password) === md5('gang way')) {
                    this.$router.push({
                        path: `/adminHome/${md5(this.password)}/first`
                    })
                } else {
                    this.$message({
                        message: '口令不对，你还是离开我们管理系统吧',
                        type: 'error',
                        duration: 2000
                    })
                    this.password = ''
                }

            }
        }
    }
</script>
<style>
    .admin_home_logo a {
        color: gray;
        font-size: 24px;
        position: absolute;
        text-decoration: none;
    }
    
    .admin_home_header {
        height: 60px;
        line-height: 60px;
        padding: 0 10%;
        margin-bottom: 15px;
        border-bottom: rgba(0, 0, 0, .08) solid 1px;
        background: #fff;
    }
    
    .admin_home_main {
        padding: 0 50px;
    }
    
    .admin_block {
        width: 500px;
        height: 300px;
        background: #fff;
        margin: 0 auto;
        position: relative;
        border-radius: 5px;
        box-shadow: 0 5px 20px rgba(0, 0, 0, .1);
        margin-top: 100px;
    }
    
    .admin_block_block {
        position: absolute;
        top: 100px;
        left: 40px;
    }
</style>