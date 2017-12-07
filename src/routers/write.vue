<template>
    <el-card class="box-card">
        <div slot="header" class="clearfix">
            <span>MUSASHI</span>
            <span style="margin-left: 200px;font-weight:800">写文章</span>
            <el-button style="float: right; padding: 3px 0" type="text">发布</el-button>
        </div>
        <div class="text item">
            <myEdit/>
        </div>
    </el-card>
</template>

<script>
    import myEdit from '@/components/myEdit.vue'
    export default {
      name: 'write',
      components: {
        myEdit
      }
    }
</script>

<style scoped>
    .clearfix span:first-child {
        color: gray;
        font-size: 24px;
        position: absolute
    }
</style>