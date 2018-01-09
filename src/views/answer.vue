<template>
    <div style="margin: 0 15%;">
        <answerMain class="answer_main" :answers="answers"/>
    </div>
</template>

<script>
import moment from 'moment'
import answerMain from '@/components/answerMain.vue'
import axios from '../utils/axiosService'
export default {
    name: 'answer',
    components: {
        answerMain
    },
    data () {
    return {
        answers: ''
    }
    },
    created() {
        axios.get('/api/getAnswers').then(req => {
            let tmpData = req.data
            let sortCreateTime = (a,b) => {
                return b.createdAt - a.createdAt
            }
            tmpData.sort(sortCreateTime)
            tmpData.forEach(item => {
                item.createdAt = moment(item.createdAt).format('YYYY/MM/DD')
            })
            this.answers = tmpData
        })
    },
    methods: {
    }
}
</script>
<style>
    .answer_main {
        margin-top: 15px;
    }
</style>