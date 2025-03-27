<template>
    <v-chart class="chart" :option="option" :update-options="{ notMerge: false }" :loading="isLoading" autoresize />
</template>
<script lang="ts" setup>
import VChart from "vue-echarts"
import { use } from 'echarts/core'
import { BarChart } from 'echarts/charts'
import { GridComponent, TooltipComponent, DataZoomComponent,GraphicComponent } from 'echarts/components'
import { CanvasRenderer } from 'echarts/renderers'
import { computed } from 'vue'
import type { ECBasicOption } from "echarts/types/dist/shared"

use([GridComponent, BarChart, CanvasRenderer, TooltipComponent, DataZoomComponent,GraphicComponent])

const props = defineProps<{ isLoading: boolean, values: number[], category: string[], topCount: number,bgText: string,speed:number }>()

// const isLoading = ref(true)
const option = computed((): ECBasicOption => {
    return {
        animationDuration: 0,
        animationDurationUpdate: props.speed,
        animationEasing: 'linear',
        animationEasingUpdate: 'linear',
        tooltip: {
            trigger: "axis"
        },
        legend: {
            show: true
        },
        yAxis: {
            type: 'category',
            data: props.category,
            inverse: true,
            animationDuration: 300,
            animationDurationUpdate: 300,
            max: props.topCount // only the largest 5 bars will be displayed
        },
        xAxis: {
            max: 'dataMax'
        },
        series: [
            {
                realtimeSort: true,
                data: props.values,
                type: 'bar',
                label: {
                    show: true,
                    position: 'right',
                    valueAnimation: true
                }
            }
        ],
        graphic: {
            elements: [
                {
                    type: 'text',
                    right: 160,
                    bottom: 60,
                    style: {
                        text: props.bgText,
                        font: 'bolder 80px monospace',
                        fill: 'rgba(100, 100, 100, 0.25)'
                    },
                    z: 100
                }
            ]
        }
    }
})
</script>