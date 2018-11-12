<template>
    <div class="notF">
      <div class="n-header"><span @click="backHome" class="n-tohome"><i class="el-icon-arrow-left"></i>回到主页</span></div>
    </div>
</template>

<script>
export default {
  name: 'NotFoundPage',
  components: {
  },
  data () {
    return {
    }
  },
  created() {
  },
  methods: {
    backHome() {
      this.$router.push({ path: '/home' })
    }
  }
}
</script>
<style>
  .notF {
    background: url('/static/notFound.png') no-repeat;
    height: 100%;
    width: 100%;
    background-size: cover;
  }
  .n-header {
    font-size: 20px;
    background: rgba(0, 0, 0, .2);
    padding: 20px 10%;
  }
  .n-tohome {
    cursor: pointer;
    color: #fff;
  }
  .n-tohome:hover {
    color: #8fe9f5;
    transition: .3s;
  }
</style>