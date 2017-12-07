<template>
    <div>
        <h1>{{ msg }}</h1>
        <ul>
          <li v-for="product in products.products">
            {{product.name}}
          </li>
        </ul>
        {{products}}
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" class="demo-ruleForm">
          <el-form-item prop="name">
            <el-input v-model="ruleForm.name" placeholder="name"></el-input>
          </el-form-item>
          <el-form-item prop="price">
            <el-input v-model="ruleForm.price" placeholder="price"></el-input>
          </el-form-item>    
          <el-form-item>
            <el-button class="regButton" type="primary" @click="submitForm('ruleForm')">提交</el-button>
          </el-form-item>
        </el-form>
    </div>
</template>

<script>
import axios from '../utils/axiosService'
import {demoApi} from '@/api/demo.js'
const ERR_OK = 0
export default {
  name: 'detail',
  data () {
    return {
      msg: 'my detail',
      products: [],
      ruleForm: {
        name: '',
        price: ''
      },
      rules: {
        name: [
          { required: true, message: '必须', trigger: 'blur' }
        ],
        price: [
          { required: true, message: '必须', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    demoApi().then((res) => {
      res = res.data
      this.products = res
      console.log(this.products,"this.asssss")
    }).catch((error) => {
      console.warn(error)
    })
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!')
          const data = this.ruleForm
          console.log(data,"dataaaaaaaaaaa")
          axios.post("/api/reg",data).then(function (response) {
          })
          .catch(function (error) {
            console.log(error);
          })
        } else {
          console.log('error submit!!')
          return false
        }
      });
    }
  }
}
</script>