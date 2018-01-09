<template>
  <div>
      <div style="margin-bottom: 20px;">
          <el-input v-model="title" placeholder="输入文章标题" label="标题：" style="margin-bottom:15px;"></el-input>
          <el-select v-model="value" placeholder="文章类型">
              <el-option
                  v-for="item in articleType"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
              </el-option>
          </el-select>
      </div>
      <div>
        <div id="editorElem" style="text-align:left;background:#fff"></div>
        <el-button class="edit_button" type="primary" v-on:click="getContent">发布</el-button>
      </div>
  </div>
</template>

<script>
  import {getArticleType} from '@/api/article.js'
  import axios from '../utils/axiosService'
  import moment from 'moment'
    import E from 'wangeditor'
    export default {
      data () {
        return {
          editorContent: '',
          title: '',
          articleType: '',
          value: ''
        }
      },
      props: {
        loginStatic: {
          required: true
        }
      },
      created() {
        getArticleType().then( (req) => {
          let tmpData = []
          req.data.forEach(x => {
            tmpData.push({value: x.id,label: x.type})
          })
          this.articleType = tmpData
        }).catch((error) => {
          console.warn(error)
        })
      },
      methods: {
        getContent() {
          console.log(this.value)
          let that = this;
          alert(this.editorContent)
          if (this.editorContent.length > 500) {
            const data = {
              content: this.editorContent,
              title: this.title,
              uid: this.loginStatic.uid,
              articleType: this.value
            }
            axios.post("/api/addArticle",data).then(function (req) {
              alert(req.data)
              that.$router.push({path: '/home'})
            })
          } else {
            alert('您的文章写得太短了')
          }
        }
      },
      mounted() {
        var editor = new E('#editorElem')
        editor.customConfig.onchange = (html) => {
          this.editorContent = html
        }
        editor.create()
      }
    }
</script>

<style scoped>
  .edit_button {
    margin: 10px auto; 
  }
  
</style>