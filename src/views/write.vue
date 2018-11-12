<template>
    <div>
        <div class="header">
            <span class="write_logo"><router-link to="/home">YUYAN</router-link></span>
            <span v-show="showTxt" style="margin-left: 200px;font-weight:800">写文章</span>
            <span v-show="!showTxt" style="margin-left: 200px;font-weight:800">修改文章</span>
        </div>
        <div class="myEdit">
            <myEdit :loginStatic="loginStatic" :aid="aid"/>
        </div>
    </div>
</template>

<script>
    import myEdit from '@/components/myEdit.vue'
    export default {
      name: 'write',
      data() {
          return{
            aid: this.$route.params.aid,
            showTxt: ''
          }
      },
      created() {
        if (this.aid === 'none') {
            this.showTxt = true
        }
      },
      components: {
        myEdit
      },
      props: {
        loginStatic: {
          required: true
        }
      }
    }
</script>

<style scoped>
    .write_logo a {
        color: gray;
        font-size: 24px;
        position: absolute;
        text-decoration: none;
    }
    .header {
        height: 60px;
        line-height: 60px;
        padding: 0 10%;
        margin-bottom: 40px;
        border-bottom: rgba(0,0,0,.08) solid 1px;
        background: #fff;
    }
    .myEdit {
        margin: 0 auto;
        width: 800px;
    }
</style>
