<template>
    <div class="article_detail_content">
       <div class="title">{{title}}</div>
       <div v-html="content" class="content">
       </div>
    </div>
</template>
<script>
    import axios from '../utils/axiosService'
    import myEdit from '@/components/myEdit.vue'
    export default {
        name: 'articleDetail',
        data() {
            return {
                aid: this.$route.params.aid,
                content: '',
                title: ''
            }
        },
        components: {
        },
        created() {
            let that = this
            let data = {
                aid: this.aid
            };
            axios.post("/api/detailArticle",data).then(function (req) {
             console.log(req.data,"detailArticle")
             let tmpDate = req.data[0]
             that.content = tmpDate.content
             that.title = tmpDate.title
            })
        }
    }
</script>

<style scoped>
    .article_detail_content {
        margin: 0 20%;
        background: #fff;
    }
    .title {
        margin: 0 auto;
        padding-top: 20px;
        text-align: center;
        font-size: 30px
    }
    .content {
        padding: 0 10px;
        overflow: hidden
    }
</style>