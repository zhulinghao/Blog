<template>
  <div>
    <div class="topBlock">
        <myHeader :privateMessageData='privateMessageData' :loginStatic='loginStatic' @logOut="logOut"/>
    </div>
    <el-container class="homeContainer">
        <el-main>
          <mainHeader :loginStatic="loginStatic"/>
          <notFound v-show='!articles.length' style="margin-top: -25px;box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);"></notFound>
          <articleCard :articles='articles' :loginStatic="loginStatic"></articleCard>

        </el-main>
        <el-aside class="home_aside">
          <div class="home_aside_blocks">
            <homeAsideCard/>
            <homeAsideMeanu v-show="loginStatic.isLogin" :loginStatic="loginStatic"/>
            <div class="footer">
              <a href="https://github.com/zhu8191553">gitHub</a><a href="https://zhu8191553.github.io/">个人博客</a>
              <p>copyright ©musashi</p>
            </div>
          </div>
        </el-aside>
      </el-container>
      <div style="height: 50px;" ></div>
  </div>
</template>
<script>
  import mainHeader from '@/components/mainHeader.vue'
  import articleCard from '@/components/articleCard.vue'
  import notFound from '@/components/notFound.vue'
  import myHeader from '@/components/header.vue'
  import homeAsideCard from '@/components/homeAsideCard.vue'
  import homeAsideMeanu from '@/components/homeAsideMeanu.vue'
  import {getArticle} from '@/api/article.js'
  import moment from 'moment'

  export default {
    name: 'home',
    components: {
      articleCard,
      homeAsideCard,
      homeAsideMeanu,
      mainHeader,
      myHeader,
      notFound
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
        articles: [],
        articleQuantity: 3,
        sw: true,
        allArticleQuantity: []
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
              this.articleQuantity = this.articleQuantity + 2
              this.GetArticle(this.articleQuantity)
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
  @media (max-width: 768px) {
    .home_aside {
      display: none;
    }
    .homeContainer {
      margin-top: 10px;
    }
  }
  @media (min-width: 768px) {
    .el-main {
      padding: 0;
      margin: 0;
      margin-right: 10px;
    }
    .footer {
      margin-top: 20px;
      color: #8590a6;
      padding: 10px;
    }
    .footer a {
      color: #8590a6;
      margin-right: 15px;
    }
    .footer a:hover {
      color: #777;
      transition: .3s;
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
  }
</style>
