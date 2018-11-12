<template>
  <div>
      <div style="margin-bottom: 20px;">
          <el-input v-model="title" placeholder="输入文章标题" label="标题：" style="margin-bottom:15px;"></el-input>
          <el-select v-model="value" placeholder="选择话题">
              <el-option
                  v-for="item in topicOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
              </el-option>
          </el-select>
      </div>
      <div>
        <div id="editorElem" style="text-align:left;background:#fff;"></div>
        <el-button v-show="!edit" class="edit_button" type="default" v-on:click="getContent">发布</el-button>
        <el-button v-show="edit" class="edit_button" type="default" v-on:click="getContent">更新</el-button>
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
          title: '',
          topicOptions: [],
          value: '',
          edit: ''
        }
      },
      props: ['loginStatic','aid'],
      created() {
        if (this.aid !== 'none') {
          this.edit = true
          let data = { aid: this.aid}
          axios.post('/api/detailArticle',data).then((res) => {
            let tmp = res.data[0]
            this.editorContent = tmp.content
            document.querySelector('.w-e-text').innerHTML = tmp.content
            this.value = tmp.articleType
            this.title = tmp.title
          }).catch((error) => {
            console.log(error)
          })
        } else {
          this.title = moment().format('YYYY-MM-DD')
        }
        axios.get('/api/getTopics').then((res) => {
            let tmp = res.data
            tmp.forEach(element => {
                let item = {
                    label: element.title,
                    value: element.title
                }
                this.topicOptions.push(item)
            });
        }).catch((error) => {
            console.log(error)
        })
      },
      methods: {
        getContent() {
          let that = this;
          if (this.editorContent.length > 500) {
            const data = {
              content: this.editorContent,
              title: this.title,
              uid: this.loginStatic.uid,
              articleType: this.value,
              aid: this.aid
            }
            if (this.edit === true) {
              axios.post("/api/editArticle",data).then(function (req) {
                that.sucMessage('SUCCESS')
                that.$router.push({ name:'personnalCenter', params: {uid: that.loginStatic.uid, who:'me', tab: 'first'} })
              })
            } else {
              axios.post("/api/addArticle",data).then(function (req) {
                that.sucMessage('SUCCESS')
                that.$router.push({ name:'personnalCenter', params: {uid: that.loginStatic.uid, who:'me', tab: 'first'} })
              })
            }
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

<style>
  .edit_button {
    position: absolute;
    top: 10px;
    right: 350px;
  }
  #editorElem .w-e-text-container {
    height: 450px !important;
    position: relative;
  }
</style>
