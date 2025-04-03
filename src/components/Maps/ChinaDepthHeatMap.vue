<template>
  <v-chart class="chart" :option="option" :update-options="{ notMerge: true }" :loading="isLoading" autoresize />
</template>

<script setup lang="ts">
import { use } from "echarts/core";
import { CanvasRenderer } from "echarts/renderers";
import { HeatmapChart, MapChart } from "echarts/charts";
import { registerMap } from "echarts/core";
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  VisualMapComponent,
} from "echarts/components";
import VChart from "vue-echarts";
import { ref, onMounted } from "vue";
import chinaJson from "@/assets/china.json";
// import provincesJson from "@/assets/provinces.json";
import type { EChartsOption } from "echarts/types/dist/shared";
use([
  CanvasRenderer,
  MapChart,
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  HeatmapChart,
  VisualMapComponent,
]);
const isLoading = ref<boolean>(true);
const option = ref<EChartsOption>({
  title: {
    text: "自2009年以来地震深度热力图",
    left: "center",
    textStyle: {
      color: "white"
    }
  },
  visualMap: {
    left: 'right',
    min: 5,
    max: 45,
    inRange: {
      color: [
        '#313695',
        '#4575b4',
        '#74add1',
        '#abd9e9',
        '#e0f3f8',
        '#ffffbf',
        '#fee090',
        '#fdae61',
        '#f46d43',
        '#d73027',
        '#a50026'
      ]
    },
    text: ['浅', '深'],
    calculable: true
  },
  tooltip: {
    trigger: "item",
    formatter(params: any) {
      return `
      ${params.seriesName}<br />
      ${params.name}:${params.data.value}

      `;
    },
  },
  geo: {
    // 地图配置
    map: "china",
  },
  series: [
    {
      name: "地震深度",
      type: "map",
      map: "china",
      data: [],
      itemStyle: {
        areaColor: "rgba(50, 50, 50, 1)",
        borderWidth: 1, //设置外层边框
        borderColor: "#ddd",
        // shadowColor: "rgba(63, 236, 209, 1)",
        // shadowBlur: 40, //地图外层光晕
      },
      label: {
        show: true,
        color: "#fff",
      },
    },
  ],
});
// const option = ref<EChartsOption>();
onMounted(() => {
  registerMap("china", chinaJson as any);
  fetch(`${import.meta.env.VITE_HOST_NAME}/earthquake/api/locationly_depth_avg`, {
    headers: {
      "ngrok-skip-browser-warning": "true",
    },
  }).then((res) => {
    return res.json()
  }).then((res) => {
    const tmp = Object.entries(res).map((e: any) => {
      let name = e[0];
      return {
        name,
        value: e[1],
      };
    });
    tmp.forEach((item) => {
      let isAutonomy = item.name.search('自治区') != -1
      if (isAutonomy) {
        item.name = item.name.search('内') != -1 ? item.name.substr(0, 3) : item.name.substr(0, 2)
      } else {
        if (/(\S*)(省|市|特别行政区)/.test(item.name as string)) {
          item.name = item.name.match(/(\S*)(省|市|特别行政区)/)[1];
        }
      }
    });
    (option.value.series as any)[0].data = tmp
    isLoading.value=false;
  })

  // option.value.series[0].
});
</script>

<style scoped>
.chart {
  height: 100%;
}
</style>
