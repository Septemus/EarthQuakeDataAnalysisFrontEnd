<template>
    <v-chart class="chart" :option="option" :update-options="{ notMerge: true }" :loading="isLoading" autoresize />

</template>
<script lang="ts" setup>
import VChart from "vue-echarts";
import { use } from 'echarts/core'
import { PieChart } from 'echarts/charts'
import {
    TitleComponent,
    TooltipComponent,
    LegendComponent,
} from 'echarts/components'
import { CanvasRenderer } from 'echarts/renderers'
import { computed } from 'vue'

use([
    TitleComponent,
    TooltipComponent,
    LegendComponent,
    PieChart,
    CanvasRenderer
])
const props = defineProps<{ isLoading: boolean, data: { name: string, value: number }[] }>()

const option = computed(() => {
    return {
        tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        legend: {
            type: 'scroll',
            orient: 'horizontal',
            // right: 0,
            top: 0,
            // bottom: 0,
        },
        
        series: [
            {
                name: '省份',
                type: 'pie',
                radius: '50%',
                center: ['50%', '60%'],
                data: props.data,
                // label: {
                //     show: false
                // },
                emphasis: {
                    itemStyle: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    },
                    // label: {
                    //     show: true
                    // }
                }
            }
        ]
    }
})

</script>