<template>
  <el-card class="box-card">
      <div slot="header" class="clearfix">
          <span>发帖人信息</span>
          <el-button style="float: right; padding: 3px 0" type="text"><i class="el-icon-close"></i></el-button>
      </div>
    <div class="clearfix">
        <h2>题目</h2>
    </div>
    <div v-for="o in 19" :key="o" class="text item">
      <div style="margin-bottom: 15px">
          内容
      </div>
      <div>
        <el-row>
          <el-col :span="3">赞</el-col>
          <el-col :span="3">踩</el-col>
          <el-col :span="3">x 条品论</el-col>
          <el-col :span="3">分享</el-col>
          <el-col :span="3">收藏</el-col>
          <el-col :span="4"></el-col>
        </el-row>          
      </div>
    </div>
  </el-card>
</template>
<style>
.text {
    font-size: 14px;
}

.item {
    margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
    display: table;
    content: "";
}
.clearfix:after {
    clear: both
}
</style>