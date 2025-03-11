<template>
    <v-chart class="chart" :option="option" :update-options="{ notMerge: true }" :loading="isLoading" autoresize />
</template>

<script setup lang="ts">
import VChart from "vue-echarts";
import type { EChartsOption } from "echarts/types/dist/shared";
import { ref,onMounted } from "vue";
import { use } from 'echarts/core'
import { LineChart } from 'echarts/charts'
import {
  TooltipComponent,
  TitleComponent,
  ToolboxComponent,
  GridComponent,
  DataZoomComponent,
  MarkLineComponent,
  MarkPointComponent
} from 'echarts/components'
import { CanvasRenderer } from 'echarts/renderers'

use([
  TooltipComponent,
  TitleComponent,
  ToolboxComponent,
  GridComponent,
  DataZoomComponent,
  LineChart,
  CanvasRenderer,
  MarkLineComponent,
  MarkPointComponent
])


const isLoading = ref<boolean>(true);
const option = ref<EChartsOption>({
  tooltip: {
    trigger: 'axis',
  },
  title: {
    left: 'center',
    text: '2009年以来每年地震次数',
    textStyle:{
        color:"white"
    }
  },
  xAxis: {
    type: 'category',
    data:[]
  },
  yAxis: {
    type: 'value',
  },
  series: [
    {
      name: '地震次数',
      type: 'line',
      data: [],
      markPoint: {
        data: [
          { type: 'max', name: 'Max' },
          { type: 'min', name: 'Min' }
        ]
      },
      markLine: {
        data: [{ type: 'average', name: '平均次数' }]
      }
    }
  ]
})
onMounted(()=>{
  fetch(`${import.meta.env.VITE_HOST_NAME}/earthquake/api/yearly_count`, {
    headers: {
      "ngrok-skip-browser-warning": "true",
    },
  }).then(res=>res.json()).then((res:{year:string,yearly_count:number}[])=>{
    (option.value as any).xAxis.data=res.map((e)=>{
      return e.year
    });
    (option.value.series as any)[0].data=res.map((e)=>e.yearly_count)
    isLoading.value=false
  })
})
</script>

<style scoped>
.chart {
    height: 100%;
}
</style>