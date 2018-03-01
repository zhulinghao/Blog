<template>
  <div>
    <div class="topBlock">
        <myHeader :privateMessageData='privateMessageData' :loginStatic='loginStatic' @logOut="logOut"/>
    </div>
    <el-container class="homeContainer">
        <el-main>
          <mainHeader :loginStatic="loginStatic"/>
          <homeCard :articles='articles' v-loading="loadArticle" :loginStatic="loginStatic"></homeCard>
        </el-main>
        <el-aside class="home_aside">
          <div class="home_aside_blocks">
            <homeAsideCard/>
            <homeAsideMeanu :loginStatic="loginStatic"/>
          </div>
        </el-aside>
      </el-container>
      <div style="height: 50px;" ></div>
  </div>
</template>

<script>
import mainHeader from '@/components/mainHeader.vue'
import homeCard from '@/components/homeCard.vue'
import myHeader from '@/components/header.vue'
import homeAsideCard from '@/components/homeAsideCard.vue'
import homeAsideMeanu from '@/components/homeAsideMeanu.vue'
import {getArticle} from '@/api/article.js'
import moment from 'moment'

export default {
  name: 'home',
  components: {
    homeCard,
    homeAsideCard,
    homeAsideMeanu,
    mainHeader,
    myHeader
  },
  props: {
    loginStatic: {
      required: true
    },
    privateMessageData: {
      required: true
    }
  },
  data () {
    return {
      articles: '',
      articleQuantity: 3,
      sw: true,
      loadArticle: false,
      allArticleQuantity: ''
    }
  },
  created() {
    this.GetArticle(3)
  },
  mounted() {
    window.addEventListener('scroll',() => {  
        if(document.documentElement.scrollTop + window.innerHeight >= document.documentElement.scrollHeight) {  
          if (this.sw == true && this.articleQuantity <= this.allArticleQuantity) {
            this.sw = false
            this.loadArticle = true
            this.articleQuantity = this.articleQuantity + 2
            setTimeout(() => {
              this.loadArticle = false
              this.GetArticle(this.articleQuantity)
            },1000)
          }
        }  
    });  
  },
  methods: {
    GetArticle(articleQuantity) {
      let that = this
      getArticle().then((req) => {
        let tmpData = req.data
        tmpData.forEach(item => {
            item.createdAt = moment(item.createdAt).format('YYYY/MM/DD')
        })
        this.allArticleQuantity = tmpData.length
        this.articles = tmpData.slice(0,articleQuantity)
        this.sw = true
      }).catch((error) => {
        console.warn(error)
      })
    },
    logOut() {
      this.$emit('logOut')
    }
  }
}
</script>
<style>
  .el-main {
    padding: 0;
    margin: 0;
    margin-right: 10px;
  }
  .homeContainer {
    margin-top: 10px;
    padding: 0 15%;
  }
  .home_aside {
    position: relative;
  }
  .home_aside_blocks {
    position: fixed;
    width: 22%;
  }
</style>