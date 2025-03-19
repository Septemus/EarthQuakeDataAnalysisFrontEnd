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
    text: "沈芙蓉-自2009年以来地震数据热力图",
    left: "center",
    textStyle: {
      color: "white"
    }
  },
  visualMap: [
    {
      show: true,
      left: "10%",
      bottom: "5%",
      type: "continuous",
      min: 0,
      max: 10,
      z: 999,
      calculable: true,
      text: ["高", "低"],
      textStyle: {
        color: "white",
      },
      inRange: {
        color: ["#D14137", "#E7CF1A", "#22B536", "#047ACF"].reverse(), //颜色
      },
      seriesIndex: 0,
    },
    {
      seriesIndex: 1,
      show: true,
      top: "5%",
      left: "10%",
      type: "continuous",
      min: 0,
      max: 3400,
      z: 666,
      inRange: {
        color: ["#D14137", "#E7CF1A", "#22B536", "#047ACF"].reverse(), //颜色
      },
      calculable: true,
      textStyle: {
        color: "white",
      },
    },
  ],
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
      type: "heatmap",
      pointSize: 3,
      //每个点模糊的大小
      blurSize: 0.3,
      coordinateSystem: "geo",
      data: [{ value: [] }],
      zlevel: 999,
    },
    {
      name: "地震次数",
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
  fetch(`${import.meta.env.VITE_HOST_NAME}/earthquake/api/locationly_count`, {
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
    tmp.forEach((item, index) => {
      let isAutonomy = item.name.search('自治区') != -1
      if (isAutonomy) {
        item.name = item.name.search('内') != -1 ? item.name.substr(0, 3) : item.name.substr(0, 2)
      } else {
        if (/(\S*)(省|市|特别行政区)/.test(item.name as string)) {
          item.name = item.name.match(/(\S*)(省|市|特别行政区)/)[1];
        }
      }
    });
    (option.value.series as any)[1].data = tmp
    return fetch(`${import.meta.env.VITE_HOST_NAME}/earthquake/api/`, {
      headers: {
        "ngrok-skip-browser-warning": "true",
      },
    })
  })
    .then((res) => {
      return res.json();
    }).then((res) => {
      (option.value.series as any)[0].data = res.map((e: any) => {
        return {
          value: [e.logitude, e.latitude, e.level],
        };
      });
      isLoading.value=false;
    });

  // option.value.series[0].
});
</script>

<style scoped>
.chart {
  height: 100%;
}
</style>
