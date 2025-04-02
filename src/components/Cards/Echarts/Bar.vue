<template>
    <v-chart class="chart" :option="option" :update-options="{ notMerge: true }" :loading="isLoading" autoresize />
</template>
<script lang="ts" setup>
import VChart from "vue-echarts"
import { use } from 'echarts/core'
import { BarChart } from 'echarts/charts'
import { GridComponent,TooltipComponent,DataZoomComponent } from 'echarts/components'
import { CanvasRenderer } from 'echarts/renderers'
import { computed, ref, watch } from 'vue'

use([GridComponent, BarChart, CanvasRenderer,TooltipComponent,DataZoomComponent])

const props=defineProps<{isLoading:boolean,values:number[],category:string[],scrolling:boolean,batchSize?:number}>()

const range=ref([0,0])
watch(props,({isLoading})=>{
    if(!isLoading) {
        if(props.scrolling) {
            const batchsize=props.batchSize??10;
            range.value[1]=batchsize
            const cb=() => {
                range.value[0]++
                range.value[1]++;
                if(range.value[1]>=props.values.length) {
                    range.value[0]=0
                    range.value[1]=batchsize
                }
            }
            // cb()
            setInterval(
                cb, 2000
            )
        }
        else {
            range.value[1]=props.values.length-1
        }
    }
})
// const isLoading = ref(true)
const option = computed(()=>{
    return {
        tooltip:{
            trigger:"axis"
        },
        legend: {
            show: true
        },
        xAxis: {
            type: 'category',
            data: props.category,
            axisLabel: {
                interval: 0,
                rotate: 30 //If the label names are too long you can manage this by rotating the label.
            }
        },
        yAxis: {
            type: 'value'
        },
        series: [
            {
                data: props.values,
                type: 'bar',
                label: {
                    show: true,
                    position: 'top'
                }
            }
        ],
        dataZoom:[{
            type:"inside",
            xAxisIndex: 0, // 表示这个 dataZoom 组件控制 第一个 xAxis
            startValue: range.value[0], // 数据窗口范围的起始数值index
            endValue: range.value[1], // 数据窗口范围的结束数值index
        }]
    }
})
</script>