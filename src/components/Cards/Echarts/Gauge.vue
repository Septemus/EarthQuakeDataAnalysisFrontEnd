<template>
    <v-chart class="chart" :option="option" :update-options="{ notMerge: true }" :loading="isLoading" autoresize />
</template>
<script lang="ts" setup>
import VChart from "vue-echarts"
import { use } from 'echarts/core'
import { GaugeChart } from 'echarts/charts'
import { TooltipComponent } from 'echarts/components'
import { CanvasRenderer } from 'echarts/renderers'
import { computed } from 'vue'

use([TooltipComponent, GaugeChart, CanvasRenderer])

const props = defineProps<{ isLoading: boolean, data: { value: number, name: string }, min: number, max: number }>()

const option = computed(() => {
    return {
        tooltip: {
            formatter: '{a} <br/>{b} : {c}'
        },
        series: [
            {
                title: {
                    show: false
                },
                axisLabel: {
                    color: '#fff',
                    fontSize:8
                },
                name: props.data.name,
                type: 'gauge',
                min: props.min,
                max: props.max,
                detail: {
                    color: "#fff",
                    fontSize: 12
                },
                data: [
                    props.data
                ]
            }
        ]
    }
})
</script>
