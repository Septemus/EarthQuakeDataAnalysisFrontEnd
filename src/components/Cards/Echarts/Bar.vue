<template>
    <v-chart class="chart" :option="option" :update-options="{ notMerge: true }" :loading="isLoading" autoresize />
</template>
<script lang="ts" setup>
import VChart from "vue-echarts"
import { use } from 'echarts/core'
import { BarChart } from 'echarts/charts'
import { GridComponent,TooltipComponent } from 'echarts/components'
import { CanvasRenderer } from 'echarts/renderers'
import { computed } from 'vue'

use([GridComponent, BarChart, CanvasRenderer,TooltipComponent])

const props=defineProps<{isLoading:boolean,values:number[],category:string[]}>()

// const isLoading = ref(true)
const option = computed(()=>{
    return {
        tooltip:{
            trigger:"axis"
        },
        xAxis: {
            type: 'category',
            data: props.category
        },
        yAxis: {
            type: 'value'
        },
        series: [
            {
                data: props.values,
                type: 'bar'
            }
        ]
    }
})
</script>