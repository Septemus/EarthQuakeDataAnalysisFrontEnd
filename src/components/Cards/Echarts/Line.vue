<template>
  <v-chart class="chart" :option="option" :update-options="{ notMerge: true }" :loading="isLoading" autoresize />
</template>

<script setup lang="ts">
import VChart from "vue-echarts";
import type { EChartsOption } from "echarts/types/dist/shared";
import { computed } from "vue";
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

const props = defineProps<{ categories: string[], data: number[], isLoading: boolean, title: string,yaxisrange?:[number,number] }>()

const option = computed((): EChartsOption => {
  const ret:any = {
    tooltip: {
      trigger: 'axis',
    },
    title: {
      left: 'center',
      text: props.title,
      textStyle: {
        color: "black"
      }
    },
    xAxis: {
      type: 'category',
      data: props.categories
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        name: props.title,
        type: 'line',
        data: props.data,
        markPoint: {
          data: [
            { type: 'max', name: 'Max' },
            { type: 'min', name: 'Min' }
          ]
        },
        markLine: {
          data: [{ type: 'average', name: `平均${props.title}` }]
        }
      }
    ]
  }
  if(props.yaxisrange) {
    ret.yAxis.min=props.yaxisrange[0];
    ret.yAxis.max=props.yaxisrange[1];
  }
  return ret;
})
</script>

<style scoped>
.chart {
  height: 100%;
}
</style>