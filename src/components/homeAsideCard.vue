<template>
      <el-carousel class="home_carousel" width="100%" height="200px" :interval="5000" arrow="always">
          <el-carousel-item>
            <img src="../../static/home/lb4.jpg" alt="">
          </el-carousel-item>
          <el-carousel-item>
              <img src="../../static/home/lb3.jpg" alt="">
          </el-carousel-item>
          <el-carousel-item>
              <img src="../../static/home/lb2.jpg" alt="">
          </el-carousel-item>
          <el-carousel-item>
              <img src="../../static/home/lb1.jpg" alt="">
          </el-carousel-item>
      </el-carousel>
</template>

<style>
.blockkk {
  margin-bottom: 10px
}
.el-carousel__item h3 {
  color: #475669;
  font-size: 18px;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
  text-align: center
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n+1) {
  background-color: #d3dce6;
}
.home_carousel img {
  height: 200px;
  width: 100%;
}
</style>