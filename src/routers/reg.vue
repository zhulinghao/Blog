<template>
  <div class="block">
    <h1 class="head">MUSASHI</h1>
    <p class="subhead">学会分享，想点新的</p>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="注册" name="first">
          <el-form :model="ruleForm" :rules="rules" ref="ruleForm" class="demo-ruleForm">
            <el-form-item prop="username">
              <el-input v-model="ruleForm.username" placeholder="UserName"></el-input>
            </el-form-item>
            <el-form-item prop="password">
              <el-input v-model="ruleForm.password" placeholder="PassWord"></el-input>
            </el-form-item>
            <el-form-item prop="gender">
                <el-input v-model="ruleForm.gender" placeholder="gender"></el-input>
              </el-form-item>
            <el-form-item prop="pic">
                <el-input v-model="ruleForm.pic" placeholder="pic"></el-input>
              </el-form-item>
            <el-form-item>
              <el-button class="regButton" type="primary" @click="submitForm('ruleForm')">提交</el-button>
            </el-form-item>
          </el-form>
      </el-tab-pane>
      <el-tab-pane label="登录" name="second">
        <el-form :model="loginForm" :rules="loginRules" ref="loginForm" class="demo-ruleForm">
          <el-form-item prop="username">
            <el-input v-model="loginForm.username" placeholder="UserName"></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input v-model="loginForm.password" placeholder="PassWord"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button class="regButton" type="primary" @click="login('loginForm')">登录</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  import axios from '../utils/axiosService'
  export default {
    data() {
      return {
        activeName: 'first',
        imageUrl: '',
        ruleForm: {
          username: '',
          password: '',
          gender: '',
          pic: ''
        },
        loginForm:{
          username: '',
          password: ''
        },
        rules: {
          username: [
            { required: true, message: '用户名是必填项', trigger: 'blur' },
            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
          password: [
            { required: true, message: '密码是必填项', trigger: 'blur' },
          ],
          gender: [
            { required: true, message: '性别是必填项', trigger: 'blur' },
          ],
          pic: [
            { required: true, message: '必须有一个自己的头像哦', trigger: 'blur' },
          ]
        },
        loginRules: {
          username: [
            { required: true, message: '用户名是必填项', trigger: 'blur' },
            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
          password: [
            { required: true, message: '密码是必填项', trigger: 'blur' },
          ]
        }
      };
    },
    methods: {
      handleClick(tab, event) {
          console.log(tab, event);
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('注册成功');
            const data = this.ruleForm
            axios.post("/api/reg",data).then(function (req) {
              alert(req.data)
            })
          } else {
            alert('不满足注册条件，注册失败');
            return false;
          }
        });
      },
      login(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('开始登录');
            const data = this.loginForm
            console.log(data,"data");
            axios.post("/api/login",data).then(function (req) {
              alert(req.data)
            })
            //this.$refs[formName].resetFields()
          } else {
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      handleAvatarSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw);
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
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
    height: 40px;
    line-height: 40px;
    text-align: center;
  }
  .avatar {
    width: 40px;
    height: 40px;
    display: block;
  }
  .block {
    position: absolute;
    width: 22%;
    transform: translate(-50%, 0);
    top: 10%;
    left: 50%;
  }
  .el-tabs__nav {
    left: 50%;
    transform: translate(-50%, 0) !important;
  }
  .head {
    text-align: center;
    color: #0f88eb;
    font-size: 55px;
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