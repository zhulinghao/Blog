<template>
    <div>
        <div :class="div1" ref="div1">
            <div class="static" v-show="!showToHome"> 
                <div>你想遨游在知识的海洋吗？！</div>
                <div><span @click="want">想</span> <span @click="doNotWant">不想</span></div>
            </div>
        </div>
        <div class="to-home" v-show="showToHome">
            <div>进入欲言网，打开新世界的大门！</div>
            <div>
                <span><router-link to="/home">首页</router-link></span>
                <span><router-link to="/reg">注册/登陆</router-link></span>
            </div>
        </div>
    </div>
</template>

<script>
import 'csshake'
export default {
    name: 'begin',
    components: {
    },
    data () {
        return {
            div1: 'div1',
            showToHome: false
        }
    },
    created() {
    },
    methods: {
        want() {
            this.div1 = 'div1-active'
            this.showToHome = true
        },
        doNotWant() {
            this.$message({
                message: '没梦想，再见！！！！！！！！！',
                type: 'waring',
                duration: 2000
            })
            let timer = setInterval(function() {
                window.location.href="about:blank"
                window.close()
            },2000)
        }
    },
    mounted() {
    } 
}
</script>
<style>
    .begin_content {
        height: 100%;
        width: 100%;
    }
    .div1 {
        background: url('http://dl.bizhi.sogou.com/images/2012/02/17/216614.jpg');
        background-size: cover;
    }
    .div1-active {
        background: url('https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=4270913971,1851723872&fm=27&gp=0.jpg');
        background-size: cover;
        filter: blur(20px);
        transition: 1s;
    }
    .div1-active,
    .div1 {
        position: absolute;
        width: 100%;
        height: 100%;
        font-weight: 700;
        color: #fff;
        font-size: 1.5rem;
    }
    .div1 > div > div >span {
        cursor: pointer;
    }
    .static,
    .to-home {
        font-weight: 700;
        color: #fff;
        font-size: 3rem;
        position: absolute;
        top: 40%;
        transform: translate(-50%,-50%);
        left: 50%;
    }
    .to-home a {
        color: #fff;
    }
    .to-home a:hover {
        color: #0f88eb;;
    }
</style>