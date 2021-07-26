<template>
    <div class="my-project-main-container">
        <!--用户导航条-->
        <div class="left-card">
            <div class="self-card">
                <el-card class="box-card">
                    <div class="user-icon">afdsafds</div>
                    <div class="user-regard">adasfsa</div>
                    <div class="project-intro">fdafdsa</div>
                </el-card>
            </div>
            <!-- 正在进行中得项目 -->
            <div class="processing-project-card">
                <el-card class="box-card">
                    <div slot="header" class="processing-project-header">
                        <span>进行中的项目</span>
                        <el-button style="float: right; padding: 3px 0" type="text">全部项目</el-button>
                    </div>
                    <div v-for="o in 4" :key="o" class="text item">

                    </div>
                </el-card>
            </div>

            <!--处理状态 -->
            <div class="deal-status">
                <el-card class="box-card">
                    <div slot="header" class="deal-status-header">
                        <span>动态</span>
<!--                        <el-button style="float: right; padding: 3px 0" type="text">全部项目</el-button>-->
                    </div>
                    <div v-for="o in 4" :key="o" class="text item">

                    </div>
                </el-card>
            </div>
        </div>
        <div class="right-card">
            <div class="project-dashboard">
                <el-card class="box-card">
                    <div slot="header" class="project-dashboard-table">
                        <span>项目概况</span>
                    </div>
                    <div class="project-dashboard-body">
                        <div id="project-completed-dashboard" ref="projectCompletedDashboard"
                             style="width: 180px; height: 180px"></div>
                        <div id="project-processing-dashboard" ref="projectDealDashboard"
                             style="width: 180px; height: 180px"></div>
                    </div>
                </el-card>
            </div>
            <div class="deal-time">
                <el-card class="box-card">
                    <div slot="header" class="project-dashboard-table">
                        <span>本周处理时长(mins)</span>
                    </div>
                    <div class="deal-time-body">
                        <div id="deal-time-chart" style="height: 180px; width: 500px"></div>
                    </div>

                </el-card>
            </div>
        </div>

    </div>
</template>

<script>
export default {
    name: 'MyProject',
    mounted() {
        this.drawCompletedPieChart();
        this.drawProcessingPieChart();
        this.drawDealChart();
    },
    methods: {
        drawCompletedPieChart() {
            var chartDom = document.getElementById('project-completed-dashboard');
            console.log(chartDom)
            // var myChart = this.$echarts.init(this.$ref.projectCompletedDashboard);
            var myChart = this.$echarts.init(chartDom);
            console.log(myChart)
            var option;

            option = {
                series: [{
                    // color: '#3ba0ff',
                    type: 'gauge',
                    startAngle: 90,
                    endAngle: -270,
                    pointer: {
                        show: false
                    },
                    progress: {
                        show: true,
                        overlap: false,
                        roundCap: false,
                        clip: false,
                        itemStyle: {
                            borderWidth: 1,
                            color: '#3ba0ff',
                        }
                    },
                    axisLine: {
                        lineStyle: {
                            width: 20,
                        }
                    },
                    splitLine: {
                        show: false,
                        distance: 0,
                        length: 10,
                    },
                    axisTick: {
                        show: false
                    },
                    axisLabel: {
                        show: false,
                        distance: 50
                    },
                    data: [{
                        value: 30,
                        name: '已完成',
                        title: {
                            offsetCenter: ['0%', '-15%']
                        },
                        detail: {
                            offsetCenter: ['0%', '15%'],
                            fontSize: 16,
                            color: '#000',
                        }
                    }
                    ],
                    title: {
                        fontSize: 16
                    },
                    detail: {
                        width: 50,
                        height: 16,
                        fontSize: 16,
                        fontWeight: 700,
                        color: 'auto',
                        // borderColor: 'auto',
                        // borderRadius: 20,
                        // borderWidth: 1,
                        formatter: '{value}%'
                    }
                }]
            };
            option && myChart.setOption(option);
        },
        drawProcessingPieChart() {
            var chartDom = document.getElementById('project-processing-dashboard');
            console.log(chartDom)
            // var myChart = this.$echarts.init(this.$ref.projectCompletedDashboard);
            var myChart = this.$echarts.init(chartDom);
            console.log(myChart)
            var option;

            option = {
                series: [{

                    type: 'gauge',
                    startAngle: 90,
                    endAngle: -270,
                    pointer: {
                        show: false
                    },
                    progress: {
                        show: true,
                        overlap: false,
                        // roundCap: true,
                        clip: false,
                        itemStyle: {
                            borderWidth: 1,
                            color: '#63D389',
                            // borderColor: '#464646'
                        }
                    },
                    axisLine: {
                        lineStyle: {
                            width: 20,
                        }
                    },
                    splitLine: {
                        show: false,
                        distance: 0,
                        length: 10,
                    },
                    axisTick: {
                        show: false
                    },
                    axisLabel: {
                        show: false,
                        distance: 50
                    },
                    data: [{
                        value: 30,
                        name: '已完成',
                        title: {
                            offsetCenter: ['0%', '-15%']
                        },
                        detail: {
                            offsetCenter: ['0%', '15%'],
                            fontSize: 16,
                            color: '#000',
                        }
                    }
                    ],
                    title: {
                        fontSize: 16
                    },
                    detail: {
                        width: 50,
                        height: 16,
                        fontSize: 16,
                        fontWeight: 700,
                        color: 'auto',
                        // borderColor: 'auto',
                        // borderRadius: 20,
                        // borderWidth: 1,
                        formatter: '{value}%'
                    }
                }]
            };
            option && myChart.setOption(option);
        },
        drawDealChart() {
            var chartDom = document.getElementById('deal-time-chart');
            var myChart = this.$echarts.init(chartDom);
            var option;

            option = {
                grid: {
                    left:'8%'
                },
                xAxis: {
                    type: 'category',
                    data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
                    axisTick: {
                        show: true,
                        alignWithLabel: true,
                        interval: 'auto'
                    },
                    axisLabel: {
                        interval: 'auto'
                    }
                },
                yAxis: {
                    type: 'value'
                },
                series: [{
                    data: [120, 200, 150, 80, 70, 110, 130],
                    type: 'bar',
                    width: 15,
                    barWidth : 15,
                    barCategoryGap: '5',
                    color: '#3ba0ff',
                    barGap: '5'
                    // series-bar. barGap
                }],
            };

            option && myChart.setOption(option);
        }
    }
}
</script>


<style lang="scss">
.my-project-main-container {
    width: 100%;
    height: 100%;
    display: flex;
    overflow: auto;
    .left-card {
        margin-top: 8vh;
        margin-left: 20vh;
        /*margin-left: 20vh;*/
        width: 60%;
        .self-card {
            .box-card {
                display: flex;
                flex-direction: column;
            }
        }
        .processing-project-card {
            margin-top: 5vh;
            .box-card {
                .processing-project-header {
                    font-size: 18px;
                    font-weight: 700;
                }
            }
        }
        .deal-status {
            margin-top: 5vh;
            .box-card {
                .deal-status-header {
                    font-size: 18px;
                    font-weight: 700;
                }
            }
        }
    }
    .right-card {
        width: 40vh;
        margin-top: 8vh;
        margin-left: 5vh;
        margin-right: 20vh;
        overflow: visible;
        .project-dashboard {
            .box-card {
                width: 100%;
                height: 100%;
                .project-dashboard-table {
                    span{
                        font-size: 18px;
                        font-weight: 700;
                    }
                }
                .project-dashboard-body {
                    align-items: center;
                    display: flex;
                }
            }
        }
        .deal-time {
            margin-top: 2vh;
            .box-card {
                .project-dashboard-table {
                    span {
                        font-size: 18px;
                        font-weight: 700;
                    }
                }
            }
        }
    }
}
.self-card {

}
</style>