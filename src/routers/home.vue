<template>
  <div>
    <div class="topBlock"></div>
    <myHeader/>
    <el-container class="homeContainer">
        <el-main>
          <homeCard/>
        </el-main>
        <el-aside width="30%">
          <homeAsideCard/>
          <homeAsideMeanu/>
        </el-aside>
      </el-container>  
  </div>
</template>

<script>
import homeCard from '@/components/homeCard.vue'
import homeAsideCard from '@/components/homeAsideCard.vue'
import homeAsideMeanu from '@/components/homeAsideMeanu.vue'
import myHeader from '@/components/header.vue'
export default {
  name: 'home',
  components: {
    homeCard,
    homeAsideCard,
    homeAsideMeanu,
    myHeader
  },
  data () {
    return {
    }
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
  .topBlock {
    width: 100%;
    height: 60px;
  }
</style>