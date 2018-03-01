<template>
  <div class="bigBlock">
    <div class="block">
      <h1 class="head"><router-link to="/home">YUYAN</router-link></h1>
      <p class="subhead">学会分享，想点新的</p>
      <el-tabs v-model="activeName" @tab-click="handleClick" class="reg_tab">
        <el-tab-pane label="注册" name="first">
            <el-form :model="regForm" :rules="rules" ref="regForm" class="demo-ruleForm" id='form'>
              <el-form-item prop="username">
                <el-input v-model="regForm.username" placeholder="UserName"></el-input>
              </el-form-item>
              <el-form-item prop="password">
                <el-input type="password" v-model="regForm.password" placeholder="PassWord"></el-input>
              </el-form-item>
              <el-form-item prop="gender">
                  <el-radio v-model="regForm.gender" border label="0">男孩子</el-radio>
                  <el-radio v-model="regForm.gender" border label="1">女孩子</el-radio>
                  <el-radio v-model="regForm.gender" border label="2"> 其他</el-radio>
              </el-form-item>
              <el-form-item>
                <el-button class="regButton" type="primary" @keyup.13="submitForm('regForm')" @click="submitForm('regForm')">提交</el-button>
              </el-form-item>
            </el-form>
        </el-tab-pane>
        <el-tab-pane label="登录" name="second">
          <el-form :model="loginForm" :rules="loginRules" ref="loginForm" class="demo-ruleForm">
            <el-form-item prop="username">
              <el-input v-model="loginForm.username" placeholder="UserName"></el-input>
            </el-form-item>
            <el-form-item prop="password">
              <el-input type="password" v-model="loginForm.password" placeholder="PassWord"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button class="regButton" type="primary" @click="login('loginForm')">登录</el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
  import $ from 'jquery'
  import moment from 'moment'
  import axios from '../utils/axiosService'
  export default {
    data() {
      return {
        activeName: 'first',
        regForm: {
          username: '',
          password: '',
          gender: '0'
        },
        loginForm:{
          username: '',
          password: ''
        },
        rules: {
          username: [
            { required: true, message: '用户名是必填项', trigger: 'blur' },
            { min: 3, max: 9, message: '长度在 3 到 9 个字符', trigger: 'blur' }
          ],
          password: [
            { required: true, message: '密码是必填项', trigger: 'blur' },
          ],
          gender: [
            { required: true, message: '性别是必填项', trigger: 'blur' },
          ]
        },
        loginRules: {
          username: [
            { required: true, message: '用户名是必填项', trigger: 'focus' },
            { min: 3, max: 9, message: '长度在 3 到 9 个字符', trigger: 'focus' }
          ],
          password: [
            { required: true, message: '密码是必填项', trigger: 'focus' },
          ]
        }
      };
    },
    created() {

    },
    methods: {
      handleClick(tab, event) {
          console.log(tab, event);
      },
      userExamine() {
        this.$emit('userExamine')
      },
      submitForm(formName) {
        let that = this
        this.$refs[formName].validate((valid) => {
          if (valid) {
            axios.post("/api/reg",this.regForm).then(function (req) {
              if (req.data) {
                that.$message({
                  message: '注册成功',
                  type: 'success',
                  duration: 1000
                })
                that.activeName = 'second'
                that.$refs[formName].resetFields()
              } else {
                that.$message({
                  message: '用户已存在',
                  type: 'error',
                  duration: 1000
                })
                that.$refs[formName].resetFields()
              }
            }).catch((error) => {
                console.warn(error)
            })
          } else {
            that.$message({
                message: '请把注册信息填写完全',
                type: 'error',
                duration: 1000
            })
            return false;
          }
        });
      },
      login(formName) {
        let that = this
        this.$refs[formName].validate((valid) => {
          if (valid) {
            const data = this.loginForm
            console.log(data,"data");
            axios.post("/api/login",data).then(function (req) {
              //登录成功返回  1  密码错误返回 2   用户不存在返回 3   不允许重复登录返回 4
              if (req.data == 1) {
                that.$message({
                  message: '登陆成功',
                  type: 'success',
                  duration: 1000
                })
                that.userExamine()
                that.$router.push({ path: '/home'})
              } else if(req.data == 2){
                  that.$message({
                    message: '密码错误',
                    type: 'error',
                    duration: 1000
                  })
              } else if(req.data == 3){
                  that.$message({
                    message: '用户不存在',
                    type: 'error',
                    duration: 1000
                  })
              }else if(req.data == 4){
                  that.$message({
                    message: '请勿重复登录',
                    type: 'error',
                    duration: 1000
                  })
              }
            })
          } else {
            that.$message({
                message: '请输入合适的用户名和密码',
                type: 'error',
                duration: 1000
            })
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
  }
</script>
<style>
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    background: #fff;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 70px;
    line-height: 70px;
    text-align: center;
  }
  .avatar {
    width: 70px;
    height: 70px;
    display: block;
  }
  .block {
    position: absolute;
    width: 22%;
    transform: translate(-50%, 0);
    top: 10%;
    left: 50%;
    background: #fff;
  }
  .bigBlock {
    position: relative;
    background: #fff;
    width: 100%;
    height: 900px;
  }
  .reg_tab .el-tabs__nav {
    left: 50%;
    transform: translate(-50%, 0) !important;
  }
  .head {
    text-align: center;
  }
  .head a {
    color: #0f88eb;
    font-size: 55px;
    text-decoration: none;
  }
  .subhead {
    text-align: center;
    font-size: 20px;
    margin: 30px 0 20px;
    font-weight: 400;
    font-size: 18px;
    line-height: 1;
  }
  .regButton {
    margin: 0 auto;
    display: block;
    width: 100%;
  }

</style>