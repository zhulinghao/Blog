<template>
  <div>
    <el-container class="homeContainer">
        <el-main>
          <mainHeader :loginStatic="loginStatic"/>
          <homeCard :articles='articles' :loginStatic="loginStatic"></homeCard>
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
import moment from 'moment'

export default {
  name: 'home',
  components: {
    homeCard,
    homeAsideCard,
    homeAsideMeanu,
    mainHeader
  },
  props: {
    loginStatic: {
      required: true
    }
  },
  data () {
    return {
      articles: ''
    }
  },
  created() {
    getArticle().then( (req) => {
      let tmpData = req.data
      tmpData.forEach(item => {
          item.createdAt = moment(item.createdAt).format('YYYY/MM/DD')
      })
      this.articles = tmpData
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