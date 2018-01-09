<template>
  <div  style="background: #fff; margin: 10px 15%;">
    <form id="form" enctype="multipart/form-data">
      <div class="file"><div v-show='!showImg'>+</div><img v-show='showImg' v-bind:src='imageUrl' style="height:100px; width:100px;">
        <input type="file" @change="upload($event)" name="avatar" id="file">
      </div>
    </form>
  </div>
</template>

<script>
import axios from '../utils/axiosService'
import $ from 'jquery'
export default {
  name: 'detail',
  components: {
  },
  data () {
    return {
      showImg: false,
      imageUrl: ''
    }
  },
  created() {
  },
  methods: {
    upload(ev) {
      ev.target.value == '' ? this.showImg = false : this.showImg = true
      let config = {'Content-Type': 'multipart/form-data'}
      let formData = new FormData($('#form')[0])
      let f = ev.target.files[0]
      if(f) {
        let tmp = f.name.split('.')
        let suffix = '.'+tmp[tmp.length - 1];
        if (suffix != '.jpg' && '.png' && '.PNG'  && '.JPG') {
          alert('file must be png or jpg')
          $('#file').val('')
          this.showImg = false
        } else {
          let that = this
          let r = r= new FileReader()
          r.readAsDataURL(f)
          r.onload=function  (e) {
            that.imageUrl = this.result
          }
          axios.post('/api/updataAvatar',formData,config).then(req => {
            console.log(req.data)
          }).catch((error) => {
            console.warn(error)
          })
          this.showImg = true
        }
      }
    }
  }
}
</script>
<style>
   .file {
    font-size: 40px;
    color: gray;
    text-align: center;
    line-height: 100px;
    border: 1px dashed #d9d9d9;
    border: rgb(217, 217, 217);
    border-style: dashed;
    border-radius: 6px;
    height: 100px;
    width: 100px;
    padding: 0;
    position: relative;
    display: inline-block;
    overflow: hidden;
    text-decoration: none;
    text-indent: 0;
}
.file input {
    position: absolute;
    font-size: 100px;
    right: 0;
    top: 0;
    opacity: 0;
    cursor: pointer;
    margin: 0;
}
.file:hover {
    border-color: #78C3F3;
    text-decoration: none;
}
</style>