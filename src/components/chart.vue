<template>
    <div :id="id" :style="{width: width+ 'px', height: height + 'px'}" class="myChart"></div>
</template>

<script>
    import axios from '../utils/axiosService'
    import echarts from 'echarts'
    export default {
        name: 'chart',
        components: {},
        data() {
            return {
                width: this.data.width,
                height: this.data.height,
                type: this.data.type,
                name: this.data.name,
                column: this.data.column,
                title: this.data.title,
                nums: this.data.nums,
                id: this.data.id
            }
        },
        props: ['data'],
        created() {

        },
        mounted() {
            this.chartInit()
        },
        methods: {
            chartInit() {
                let myChart = echarts.init(document.getElementById(this.id));
                if (this.type === 'bar') {
                    myChart.setOption({
                        backgroundColor: '#e3e5e8',
                        title: {
                            text: this.title
                        },
                        tooltip: {},
                        xAxis: {
                            data: this.column
                        },
                        yAxis: {},
                        series: [{
                            name: this.name,
                            type: this.type,
                            data: this.nums
                        }]
                    })
                } else if (this.type === 'pie') {
                    myChart.setOption({
                        backgroundColor: '#e3e5e8',
                        title: {
                            text: '项目代码行数',
                            left: 'center',
                            top: 20,
                            textStyle: {
                                color: '#2c343c'
                            }
                        },
                        tooltip: {
                            trigger: 'item',
                            formatter: "{a} <br/>{b} : {c} ({d}%)"
                        },
                        visualMap: {
                            show: false,
                            min: 80,
                            max: 600,
                            inRange: {
                                colorLightness: [0, 1]
                            }
                        },
                        series: [{
                            name: '访问来源',
                            type: 'pie',
                            radius: '55%',
                            center: ['50%', '50%'],
                            data: [{
                                value: 6000,
                                name: 'JS'
                            }, {
                                value: 7000,
                                name: 'CSS'
                            }, {
                                value: 3000,
                                name: 'HTML'
                            }].sort(function(a, b) {
                                return a.value - b.value;
                            }),
                            roseType: 'radius',
                            label: {
                                normal: {
                                    textStyle: {
                                        color: '#2c343c'
                                    }
                                }
                            },
                            labelLine: {
                                normal: {
                                    lineStyle: {
                                        color: '2c343c'
                                    },
                                    smooth: 0.2,
                                    length: 10,
                                    length2: 20
                                }
                            },
                            itemStyle: {
                                normal: {
                                    color: '#2c343c',
                                    shadowBlur: 200,
                                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                                }
                            },
                            animationType: 'scale',
                            animationEasing: 'elasticOut',
                            animationDelay: function(idx) {
                                return Math.random() * 200;
                            }
                        }]
                    })
                }
            }
        }
    }
</script>
<style>
    .myChart {
        border-radius: 5px;
        margin: 15px;
        float: left;
    }
</style>