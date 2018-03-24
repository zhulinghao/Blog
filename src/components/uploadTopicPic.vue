<template>
    <div>
        <form id="form" enctype="multipart/form-data">
            <div>
                <span id="uploadImg">  
                <input type="file" id="file" size="1" @change="upload($event)" name="topicPic">  
                <button class="upload-button">修改话题logo</button> </span> 
            </div>
        </form>
    </div>
</template>

<script>
import $ from 'jquery'
import axios from '../utils/axiosService'
export default {
components: {
},
data () {
    return {
    }
},
created() {
},
props: ['tid','pic'],
methods: {
    upload(ev) {
        let formData = new FormData($('#form')[0])
        formData.append('tid',this.tid)
        formData.append('pic', this.pic)
        axios.post('/api/updataTopicPic',formData).then(res => {
            this.$message({
                message: "更改话题图片成功",
                type: 'success',
                duration: 1000
            })
            this.getTopic()
            $('#file').val('');
        }).catch((error) => {
            console.warn(error)
        })
    },
    getTopic() {
        this.$emit('getTopic')
    },
}
}
</script>
<style>
    #uploadImg{ font-size:12px; overflow:hidden; position:absolute;top:20px;right: 20px;cursor: pointer;}  
    #file{ 
        position:absolute; z-index:100; margin-left:-180px; 
        font-size:60px;opacity:0;
        filter:alpha(opacity=0);
        margin-top:-5px;
    } 
    .upload-button {
        background-color: #1B9AF7;
        color: white;
        border: 1px solid #1B9AF7;
        font-size: 12px;
        height: 25px;
        line-height: 25px;
        padding: 0 25px;
        
    }
    #uploadImg:hover {
        opacity: .7;
    }
</style>