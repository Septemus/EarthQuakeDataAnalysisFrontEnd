<template>
    <v-chart class="chart" :option="option" :update-options="{ notMerge: true }" :loading="isLoading" autoresize />
</template>
<script lang="ts" setup>
import VChart from "vue-echarts"
import { use } from 'echarts/core'
import { BarChart } from 'echarts/charts'
import { GridComponent,TooltipComponent } from 'echarts/components'
import { CanvasRenderer } from 'echarts/renderers'
import { onMounted, ref } from 'vue'

use([GridComponent, BarChart, CanvasRenderer,TooltipComponent])
const isLoading = ref(true)
const option = ref({
    tooltip:{
        trigger:"axis"
    },
    xAxis: {
        type: 'category',
        data: [] as number[]
    },
    yAxis: {
        type: 'value'
    },
    series: [
        {
            data: [] as number[],
            type: 'bar'
        }
    ]
})
onMounted(() => {
    fetch(`${import.meta.env.VITE_HOST_NAME}/earthquake/api/levely_count`, {
        headers: {
            "ngrok-skip-browser-warning": "true",
        },
    }).then((res)=>{
        return res.json()
    }).then((res:{level_int:number,levely_count:number}[])=>{
        isLoading.value=false
        option.value.series[0].data=res.map((e)=>{
            return e.levely_count
        })
        option.value.xAxis.data=res.map((e)=>{
            return e.level_int
        })
    })
})
</script>