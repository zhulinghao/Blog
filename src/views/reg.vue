<template>
  <div class="bigBlock">
    <div id="particles"></div>
    <div style="padding-top: 10rem;margin-bottom: 3rem;">
      <h1 class="head"><router-link to="/home">YUYAN</router-link></h1>
    </div>
    <div class="block">
      <p class="subhead">学会分享，想点新的</p>
      <el-tabs v-model="activeName" @tab-click="handleClick" class="reg_tab">
        <el-tab-pane label="注册" name="first">
            <el-form :model="regForm" :rules="rules" ref="regForm" class="demo-ruleForm" id='form'>
              <el-form-item prop="username">
                <el-input v-model="regForm.username" placeholder="输入用户名"></el-input>
              </el-form-item>
              <el-form-item prop="password">
                <el-input type="password" v-model="regForm.password" placeholder="输入密码"></el-input>
              </el-form-item>
              <el-form-item prop="checkPass">
                <el-input type="password" v-model="regForm.checkPass" auto-complete="off" placeholder="确认密码"></el-input>
              </el-form-item>
              <el-form-item prop="gender">
                  <el-radio size="small" v-model="regForm.gender" border label="0">男孩子</el-radio>
                  <el-radio size="small" v-model="regForm.gender" border label="1">女孩子</el-radio>
                  <el-radio size="small" v-model="regForm.gender" border label="2"> 其他</el-radio>
              </el-form-item>
              <el-form-item>
                <el-button class="regButton" type="primary" @click="submitForm('regForm')">提交</el-button>
              </el-form-item>
            </el-form>
        </el-tab-pane>
        <el-tab-pane label="登录" name="second">
          <el-form :model="loginForm" :rules="loginRules" ref="loginForm" class="demo-ruleForm">
            <el-form-item prop="username">
              <el-input v-model="loginForm.username" placeholder="用户名"></el-input>
            </el-form-item>
            <el-form-item prop="password">
              <el-input type="password"  @keyup.enter.native="login('loginForm')" v-model="loginForm.password" placeholder="密码"></el-input>
            </el-form-item>
            <el-form-item prop="yzm">
                <el-input type="text" v-model="loginForm.yzm" placeholder="验证码"></el-input>
                <canvas ref='myCanvas' class="myCanvas">
                </canvas>
                <div class="getYzm" @click="getYzm">
                  重新获取
                </div>
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
  import particles from 'particles.js'
  import moment from 'moment'
  import axios from '../utils/axiosService'
  export default {
    data() {
      const pat = new RegExp("[^a-zA-Z0-9\_\u4e00-\u9fa5]","i")   //   字母数字汉字
      let InvalidString = (rule, value, callback) => {                       // 验证非法字符串
        if (pat.test(value) === true) {
          callback(new Error('包含非法字符串、只可以是字母数字或汉字'));
        } else {
          callback();
        }
      }
      let checkPass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.regForm.password) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      }
      var yzm = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入验证码'));
        } else if (value !== this.yzmCode) {
          callback(new Error('验证码输入错误!'));
        } else {
          callback();
        }
      }
      return {
        activeName: 'first',
        regForm: {
          username: '',
          password: '',
          checkPass: '',
          gender: '0'
        },
        loginForm:{
          username: '',
          password: '',
          yzm: ''
        },
        yzmCode: '',
        rules: {
          username: [
            { required: true, message: '用户名是必填项' },
            { min: 3, max: 9, message: '长度在 3 到 9 个字符', trigger: 'change blur focus' },
            { validator: InvalidString }
          ],
          password: [
            { required: true, message: '密码是必填项' },
            { min: 8, max: 16, message: '长度在 8 到 16 个字符', trigger: 'change blur focus' },
            { validator: InvalidString }
          ],
          checkPass: [
            { validator: checkPass, trigger: 'change' }
          ],
          gender: [
            { required: true, message: '性别是必填项', trigger: 'blur' },
          ]
        },
        loginRules: {
          username: [
            { required: true, message: '用户名是必填项' },
            { min: 3, max: 9, message: '长度在 3 到 9 个字符', trigger: 'change blur focus' },
            { validator: InvalidString }
          ],
          password: [
            { required: true, message: '密码是必填项' },
            { min: 8, max: 16, message: '长度在 8 到 16 个字符',  trigger: 'change blur focus' },
            { validator: InvalidString }
          ],
          yzm: [
            { validator: yzm, trigger: 'change' }
          ],
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
                message: '你的账号密码表单验证都通过不了',
                type: 'error',
                duration: 1000
            })
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      getYzm() {
        let canvas = this.$refs.myCanvas
        this.yzmCode = this.createCode(canvas)
        console.log(this.yzmCode,"yzm code")
      }
    },
    mounted() {
      particlesJS.load('particles','./static/ParticlesData.json')
      this.getYzm()
    }
  }
</script>
<style>
  .block {
    width: 20rem;
    background: #fff;
    margin: 0 auto;
  }
  .bigBlock {
    position: relative;
    background: #fff;
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
  .reg_tab .el-tabs__nav {
    left: 50%;
    transform: translate(-50%, 0) !important;
  }
  .reg_tab {
    background: rgba(0, 0, 0, .1)
  }
  .head {
    text-align: center;
    position: absolute;
    left: 50%;
    transform: translate(-50%);
  }
  .head a {
    color: #0f88eb;
    font-size: 55px;
    text-decoration: none;
  }
  .subhead {
    text-align: center;
    font-size: 1rem;
    margin: 2rem 0 2rem;
    font-weight: 400;
    line-height: 1;
  }
  .regButton {
    margin: 0 auto;
    display: block;
    width: 100%;
  }
  .myCanvas {
    height: 36px;
    width: 90px;
    position: absolute;
    right: 4.5rem;
    top: 3px;
    color: #0f88eb;
  }
  .getYzm {
    height: 39px;
    line-height: 40px;
    position: absolute;
    right: 10px;
    top: 1px;
    cursor: pointer;
    color: #0f88eb;
    border-left: 1px solid rgba(0, 0, 0, .1);
    padding-left: 10px;
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