<template>
  <el-card class="box-card">
    <div v-for="o in 3" :key="o" class="text item">
      友情链接
    </div>
  </el-card>
</template>

<style>
.text {
    font-size: 14px;
}
.item {
    padding: 5px 0;
}
</style>