<template>
    <v-chart class="chart" :option="option" :update-options="{ notMerge: true }" :loading="isLoading" autoresize />
</template>

<script setup lang="ts">
import VChart from "vue-echarts";
import type { EChartsOption } from "echarts/types/dist/shared";
import { ref } from "vue";
import { use } from 'echarts/core'
import { LineChart } from 'echarts/charts'
import {
  TooltipComponent,
  TitleComponent,
  ToolboxComponent,
  GridComponent,
  DataZoomComponent
} from 'echarts/components'
import { CanvasRenderer } from 'echarts/renderers'

use([
  TooltipComponent,
  TitleComponent,
  ToolboxComponent,
  GridComponent,
  DataZoomComponent,
  LineChart,
  CanvasRenderer
])

let base = +new Date(1988, 9, 3);
let oneDay = 24 * 3600 * 1000;
let data = [[base, Math.random() * 300]];
for (let i = 1; i < 20000; i++) {
  let now = new Date((base += oneDay));
  data.push([+now, Math.round((Math.random() - 0.5) * 20 + data[i - 1][1])]);
}

const isLoading = ref<boolean>(false);
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
    type: 'time',
  },
  yAxis: {
    type: 'value',
    boundaryGap: [0, '100%']
  },
  series: [
    {
      name: 'Fake Data',
      type: 'line',
      smooth: true,
      symbol: 'none',
      areaStyle: {},
      data: data
    }
  ]
})
</script>

<style scoped>
.chart {
    height: 100%;
}
</style>