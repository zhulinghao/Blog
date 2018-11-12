<template>
	<div class="wrapper">
		<div class="header_two">
			<span class="header_two_logo"><router-link to="/home">YUYAN</router-link></span>
			<span style="margin-left: 500px;font-weight:800">吃豆豆</span>
		</div>
		<canvas id="canvas" width="960" height="640">不支持画布</canvas>
		<p>按［空格］暂停或继续</p>
	</div>
</template>

<script>
    import {
        myApp
    } from './app.js'
    if (window.top != window.self) {
        window.top.location = self.location.href;
    }
    export default {
        name: 'eat',
        components: {},
        data() {
            return {}
        },
        created() {

        },
        methods: {},
        mounted() {
            myApp()
        }
    }
</script>
<style>
    * {
        padding: 0;
        margin: 0;
    }
    
    .wrapper {
        width: 960px;
        margin: 0 auto;
        line-height: 36px;
        text-align: center;
        color: #999;
    }
    
    canvas {
        display: block;
        background: #000;
    }
    
    .mod-botton {
        height: 32px;
        padding: 15px 0;
        text-align: center;
    }
</style>