<template>
    <div class="big-screen">
        <header>
            <h1>地震数据大屏</h1>
            <div class="show-time">{{ curTime_str }}</div>
        </header>
        <section class="mainbox">
            <!-- 左侧盒子 -->
            <div class="column">
                <div class="panel bar">
                    <!-- 图表放置盒子 -->
                    <!-- <div class="chart"></div> -->
                    <card-avg-chart class="chart" :title="'地震省份词云绘图'" :height="100" :unit="'%'" :see-all="false">
                        <ProvinceWordCloud :size-range="[10, 40]" />
                    </card-avg-chart>
                    <!-- 伪元素绘制盒子下边角 -->
                    <div class="panel-footer"></div>
                </div>
                <div class="panel line">
                    <CardYearlyLineChart class="chart" :height="100" :unit="'%'" :transparent="true" />
                    <div class="panel-footer"></div>
                </div>
                <div class="panel line">
                    <card-avg-chart class="chart" :title="'平均地震级数仪表盘'" :height="100" :unit="'%'" :see-all="false">
                        <card-avg-level-gauge />
                    </card-avg-chart>
                    <div class="panel-footer"></div>
                </div>
            </div>
            <!-- 中间盒子 -->
            <div class="column">
                <!-- 头部 no模块 -->
                <div class="no">
                    <div class="no-hd">
                        <ul>
                            <li>{{ total_count }}</li>
                            <li>{{ recent_month_count }}</li>
                        </ul>
                    </div>
                    <div class="no-bd">
                        <ul>
                            <li>地震总数</li>
                            <li>本月地震次数</li>
                        </ul>
                    </div>
                </div>
                <!-- map模块 -->
                <div class="map">
                    <div class="map1"></div>
                    <div class="map2"></div>
                    <div class="map3"></div>
                    <ChinaHeatMap class="relative w-full shadow-lg rounded chart" />
                    <!-- <div class="chart"></div> -->
                </div>
            </div>
            <!-- 右侧盒子 -->
            <div class="column">
                <div class="panel bar2">
                    <card-avg-chart class="chart" :title="'省份平均地震强度柱状图'" :height="100" :unit="'%'" :see-all="false">
                        <ProvinceLevelAvgBar />
                    </card-avg-chart>
                    <div class="panel-footer"></div>
                </div>
                <div class="panel line2">
                    <card-avg-chart class="chart" :title="'地震深度管道图'" :height="100" :unit="'%'" :see-all="false">
                        <CardDepthFunnel />
                    </card-avg-chart>
                    <div class="panel-footer"></div>
                </div>
                <div class="panel line">
                    <card-avg-chart class="chart" :title="'平均地震深度仪表盘'" :height="100" :unit="'%'" :see-all="false">
                        <card-avg-depth-gauge />
                    </card-avg-chart>
                    <div class="panel-footer"></div>
                </div>
            </div>
        </section>
    </div>
</template>
<script lang="ts" setup>
import ChinaHeatMap from "@/components/Maps/ChinaHeatMap.vue";
import CardAvgChart from "@/components/Cards/CardAvgChart.vue";
import ProvinceWordCloud from "@/components/Cards/ProvinceWordCloud.vue";
import CardYearlyLineChart from "@/components/Cards/CardYearlyLineChart.vue";
import ProvinceLevelAvgBar from "@/components/Cards/ProvinceLevelAvgBar.vue";
import CardAvgLevelGauge from "@/components/Cards/CardAvgLevelGauge.vue";
import CardAvgDepthGauge from "@/components/Cards/CardAvgDepthGauge.vue";
import CardDepthFunnel from "@/components/Cards/CardDepthFunnel.vue";
import { computed, onMounted, provide, ref } from 'vue';
provide("big-screen",true);
const curTime = ref<Date>(new Date());
const total_count = ref(0);
const recent_month_count = ref(0);
onMounted(() => {
    function time() {
        curTime.value = new Date();
    }
    setInterval(time, 1000); //开始运行
    fetch(`${import.meta.env.VITE_HOST_NAME}/earthquake/api/total_count`, {
        headers: {
            "ngrok-skip-browser-warning": "true",
        },
    })
        .then((res) => res.json()).then((res) => {
            total_count.value = res.data
        })

    fetch("https://api.shwgij.com/api/dizhen/dizhen?key=PYX8PGJxHQUOP3Etd0LBMqPyJA&num=4")
        .then((res) => res.json()).then((res) => {
            recent_month_count.value = res.data.shuju.length
        })
})
const curTime_str = computed(() => {
    return "当前时间：" + curTime.value.getFullYear() + "年" + (curTime.value.getMonth() + 1) + "月" + curTime.value.getDate() + "日-" + curTime.value.getHours() + "时" + curTime.value.getMinutes() + "分" + curTime.value.getSeconds() + "秒"
})
</script>
<style lang="scss" scoped>
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

li {
    list-style: none;
}

@font-face {
    font-family: electronicFont;
    src: url(/font/DS-DIGIT.TTF);
}

.big-screen {
    background: url(/images/bg.jpg) no-repeat top center;
    background-size:100% 100%;
    width: 100%;
    height: 100%;
    line-height: 1.15;
    font-size: 24px;

    header {
        position: relative;
        height: 10%;
        background: url(/images/head_bg.png) no-repeat;
        background-size: 100% 100%;

        h1 {
            font-size: 36px;
            color: rgba(255, 255, 255, 0.87);
            text-align: center;
            position: absolute;
            top: 40%;
            left: 50%;
            transform: translate(-50%, -50%);
        }

        .show-time {
            position: absolute;
            top: 50%;
            right: 0;
            transform: translate(0, -50%);
            color: rgba(255, 255, 255, 0.7);
            font-size: 12px;
        }
    }

    .mainbox {
        height: 90%;
        display: flex;
        // min-width: 1024px;
        // max-height: 1920px;
        width: 100%;
        margin: 0 auto;
        padding: 0.125rem 0.125rem 0;



        .column {
            flex: 3;
            height: 100%;
            display: flex;
            flex-direction: column;

            &:nth-child(2) {
                display: block;
                flex: 6;
                margin: 0 0.125rem 0.1875rem;
                overflow: hidden;
            }

            .chart {
                position: absolute;
                top: 0;
                left: 0;
                height: 100%;
                width: 100%;
                opacity: 0.9;
            }

            .panel {
                position: relative;
                flex: 1;
                padding: 0 0.1875rem 0.5rem;
                margin-bottom: 0.1875rem;
                border: 1px solid rgba(25, 186, 139, 0.17);
                background: url(/images/line.png) rgba(255, 255, 255, 0.03);

                h2 {
                    height: 18px;
                    color: #fff;
                    // line-height: 0.6rem;
                    text-align: center;
                    font-size: 14px;
                    font-weight: 400;
                }

                &::before {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 10px;
                    height: 10px;
                    border-left: 2px solid #02a6b5;
                    border-top: 2px solid #02a6b5;
                    content: '';
                }

                &::after {
                    position: absolute;
                    top: 0;
                    right: 0;
                    width: 10px;
                    height: 10px;
                    border-right: 2px solid #02a6b5;
                    border-top: 2px solid #02a6b5;
                    content: '';
                }

                .panel-footer {
                    position: absolute;
                    bottom: 0;
                    left: 0;
                    width: 100%;

                    &::before {
                        position: absolute;
                        bottom: 0;
                        left: 0;
                        width: 10px;
                        height: 10px;
                        border-left: 2px solid #02a6b5;
                        border-bottom: 2px solid #02a6b5;
                        content: '';
                    }

                    &::after {
                        position: absolute;
                        bottom: 0;
                        right: 0;
                        width: 10px;
                        height: 10px;
                        border-right: 2px solid #02a6b5;
                        border-bottom: 2px solid #02a6b5;
                        content: '';
                    }
                }
            }

            .map {
                position: relative;
                height: 100%;

                // .chart {
                //     position: absolute;
                //     top: 0;
                //     left: 0;
                //     height: 100%;
                //     width: 100%;
                //     opacity: 0.9;
                // }

                .map1 {
                    width: 75%;
                    height: 75%;
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    background: url(/images/map.png);
                    background-size: 100% 100%;
                    opacity: 0.3;
                }

                .map2 {
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    width: 80%;
                    height: 80%;
                    background: url(/images/lbx.png);
                    background-size: 100% 100%;
                    animation: rotate1 15s linear infinite;
                    opacity: 0.6;
                }

                .map3 {
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    width: 75%;
                    height: 75%;
                    background: url(/images/jt.png);
                    background-size: 100% 100%;
                    animation: rotate2 15s linear infinite;
                }
            }

            .no {
                background-color: rgba(101, 132, 226, 0.1);
                padding: 4px;

                .no-hd {
                    position: relative;
                    border: 1px solid rgba(25, 186, 139, 0.17);

                    ul {
                        display: flex;

                        li {
                            position: relative;
                            flex: 1;
                            line-height: 24px;
                            font-size: 20px;
                            color: #ffeb7b;
                            text-align: center;
                            font-family: electronicFont;

                            &:first-child::after {
                                content: '';
                                position: absolute;
                                top: 25%;
                                right: 0;
                                height: 50%;
                                width: 1px;
                                background-color: rgba(255, 255, 255, 0.3);
                            }
                        }
                    }

                    &::before {
                        position: absolute;
                        top: 0;
                        left: 0;
                        width: 7px;
                        height: 3px;
                        border-top: 2px solid #02a6b5;
                        border-left: 2px solid #02a6b5;
                        content: '';
                    }

                    &::after {
                        position: absolute;
                        bottom: 0;
                        right: 0;
                        width: 7px;
                        height: 3px;
                        border-bottom: 2px solid #02a6b5;
                        border-right: 2px solid #02a6b5;
                        content: '';
                    }
                }

                .no-bd {
                    ul {
                        display: flex;

                        li {
                            flex: 1;
                            text-align: center;
                            color: rgba(255, 255, 255, 0.7);
                            font-size: 20px;
                            height: 24px;
                            line-height: 24px;
                            padding-top: 3px;
                        }
                    }

                }

            }
        }
    }
}



// .no .no-hd::before {
//     position: absolute;
//     top: 0;
//     left: 0;
//     width: 0.375rem;
//     height: 0.125rem;
//     border-top: 2px solid #02a6b5;
//     border-left: 2px solid #02a6b5;
//     content: '';
// }

// .no .no-hd::after {
//     position: absolute;
//     bottom: 0;
//     right: 0;
//     width: 0.375rem;
//     height: 0.125rem;
//     border-bottom: 2px solid #02a6b5;
//     border-right: 2px solid #02a6b5;
//     content: '';
// }

// ul {
//     display: flex;
// }

// .no .no-hd ul li {
//     position: relative;
//     flex: 1;
//     line-height: 1rem;
//     font-size: 0.875rem;
//     color: #ffeb7b;
//     text-align: center;
//     font-family: electronicFont;
// }

// .no .no-hd ul li:first-child::after {
//     content: '';
//     position: absolute;
//     top: 25%;
//     right: 0;
//     height: 50%;
//     width: 1px;
//     background-color: rgba(255, 255, 255, 0.3);
// }

// .no .no-bd ul {
//     display: flex;
// }

// .no .no-bd ul li {
//     flex: 1;
//     text-align: center;
//     color: rgba(255, 255, 255, 0.7);
//     font-size: 0.225rem;
//     height: 0.5rem;
//     line-height: 0.5rem;
//     padding-top: 0.125rem;
// }



// .map .map1 {
//     width: 6.475rem;
//     height: 6.475rem;
//     position: absolute;
//     top: 50%;
//     left: 50%;
//     transform: translate(-50%, -50%);
//     background: url(/images/map.png);
//     background-size: 100% 100%;
//     opacity: 0.3;
// }

// .map .map2 {
//     position: absolute;
//     top: 50%;
//     left: 50%;
//     transform: translate(-50%, -50%);
//     width: 8.0375rem;
//     height: 8.0375rem;
//     background: url(/images/lbx.png);
//     background-size: 100% 100%;
//     animation: rotate1 15s linear infinite;
//     opacity: 0.6;
// }

// .map .map3 {
//     position: absolute;
//     top: 50%;
//     left: 50%;
//     transform: translate(-50%, -50%);
//     width: 7.075rem;
//     height: 7.075rem;
//     background: url(/images/jt.png);
//     background-size: 100% 100%;
//     animation: rotate2 15s linear infinite;
// }

// .map .chart {
//     position: absolute;
//     top: 0;
//     left: 0;
//     height: 10.125rem;
//     width: 100%;
// }

@keyframes rotate1 {
    from {
        transform: translate(-50%, -50%) rotate(0deg);
    }

    to {
        transform: translate(-50%, -50%) rotate(360deg);
    }
}

@keyframes rotate2 {
    from {
        transform: translate(-50%, -50%) rotate(360deg);
    }

    to {
        transform: translate(-50%, -50%) rotate(0deg);
    }
}
</style>