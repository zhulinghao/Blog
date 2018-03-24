<template>
    <el-row class="tac">
        <el-menu
        class="el-menu-vertical-demo">
        <el-menu-item index="1">
            <i class="el-icon-edit-outline" style="margin-right: 5px;"></i>
            <span slot="title">
                <router-link :to="{ name:'personnalCenter', params: {uid: loginStatic.uid, who:'me', tab: 'first'} }">我的文章</router-link>
            </span>
        </el-menu-item>
        <el-menu-item index="2">
            <i class="el-icon-tickets" style="margin-right: 5px;"></i>
            <span slot="title">
                <span slot="title">
                    <router-link :to="{ name:'personnalCenter', params: {uid: loginStatic.uid, who:'me', tab: 'second'} }">我的回答</router-link>
                </span>
            </span>
        </el-menu-item>
        <el-menu-item index="3">
            <i class="el-icon-question" style="margin-right: 5px;"></i>
            <span slot="title">
                <router-link :to="{ name:'personnalCenter', params: {uid: loginStatic.uid, who:'me', tab: 'third'} }">我的提问</router-link>
            </span>
        </el-menu-item>
        <el-menu-item index="4">
            <i class="el-icon-star-off"></i>
            <span slot="title">
                <router-link :to="{ name:'personnalCenter', params: {uid: loginStatic.uid, who:'me', tab: 'fourth'} }">我的收藏</router-link>
            </span>
        </el-menu-item>
        </el-menu>
    </el-row>
</template>
<script>
export default {
  data () {
    return {

    }
  },
  created() {
  },
  props: {
    loginStatic: {
        required: true
    }
  },
  methods: {
  }
}
</script>
<style>
    .tac {
        margin-top: 10px;
        box-shadow: 0 2px 12px 0 rgba(0,0,0,.1)
    }
</style>