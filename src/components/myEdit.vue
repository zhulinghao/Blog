<template>
  <div>
      <el-input v-model="title" placeholder="输入文章标题" label="标题：" style="margin-bottom:15px;"></el-input>
      <div>
        <div id="editorElem" style="text-align:left"></div>
        <el-button class="edit_button" type="primary" v-on:click="getContent">发布</el-button>
      </div>
  </div>
    
</template>

<script>
  import axios from '../utils/axiosService'
  import moment from 'moment'
    import E from 'wangeditor'
    export default {
      data () {
        return {
          editorContent: '',
          title: ''
        }
      },
      methods: {
        getContent: function () {
            let that = this;
            alert(this.editorContent)
            console.log(this.editorContent)
            const data = {
              content: this.editorContent,
              title: this.title
            }
            axios.post("/api/addArticle",data).then(function (req) {
              alert(req.data)
              that.$router.push({path: '/home'})
            })
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