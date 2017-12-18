<template>
  <div>
    <el-container class="homeContainer">
        <el-main>
          <mainHeader/>
          <homeCard :articles='articles'></homeCard>
        </el-main>
        <el-aside width="30%">
          <homeAsideCard/>
          <homeAsideMeanu/>
        </el-aside>
      </el-container>  
  </div>
</template>

<script>
import mainHeader from '@/components/mainHeader.vue'
import homeCard from '@/components/homeCard.vue'
import homeAsideCard from '@/components/homeAsideCard.vue'
import homeAsideMeanu from '@/components/homeAsideMeanu.vue'
import {getArticle} from '@/api/article.js'

export default {
  name: 'home',
  components: {
    homeCard,
    homeAsideCard,
    homeAsideMeanu,
    mainHeader
  },
  data () {
    return {
      articles: ''
    }
  },
  created() {
    getArticle().then( (req) => {
      this.articles = req.data
      console.log(this.articles,"aaaaaaaaa")
    }).catch((error) => {
      console.warn(error)
    })
  },
  methods: {
    Affix () {
      console.log(this);
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
</style>