<template>
    <div>
        <div class="topBlock">
            <myHeader :privateMessageData='privateMessageData' :loginStatic='loginStatic' @logOut="logOut"/>
        </div>
        <div style="margin: 0 15%;">
            <answerMain class="answer_main" :answers="answers" :hotAnswers="hotAnswers"/>
        </div>
    </div>
</template>

<script>
    import moment from 'moment'
    import myHeader from '@/components/header.vue'
    import answerMain from '@/components/answerMain.vue'
    import axios from '../utils/axiosService'
    export default {
        name: 'answer',
        components: {
            answerMain,
            myHeader
        },
        data() {
            return {
                answers: [],
                hotAnswers: []
            }
        },
        props: {
            privateMessageData: {
                required: true
            },
            loginStatic: {
                required: true
            }
        },
        created() {
            axios.get('/api/getAnswers').then(req => {
                let tmpData = req.data
                let sortCreateTime = (a, b) => {
                    return b.createdAt - a.createdAt
                }
                tmpData.sort(sortCreateTime)
                tmpData.forEach(item => {
                    item.createdAt = moment(item.createdAt).format('YYYY/MM/DD')
                })
                let tmpHot = JSON.parse(JSON.stringify(tmpData))
                this.answers = tmpData
                this.hotAnswers = tmpHot.sort(this.sortFtimes)
            })
        },
        methods: {
            logOut() {
                this.$emit('logOut')
            }
        }
    }
</script>
<style>
    .answer_main {
        margin-top: 15px;
    }
</style>