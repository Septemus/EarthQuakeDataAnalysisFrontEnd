<template>
  <v-chart
    class="chart"
    :option="option"
    :update-options="{ notMerge: true }"
    :loading="isLoading"
    autoresize
  />
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
import provincesJson from "@/assets/provinces.json";
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
        color: "#333",
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
    },
  ],
  tooltip: {
    trigger: "item",
    formatter(params:any) {
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
  fetch("https://490f-103-97-2-71.ngrok-free.app", {
    headers: {
      "ngrok-skip-browser-warning": "true",
    },
  })
    .then((res) => {
      return res.json();
    })
    .then((res) => {
      const provinceEarthquakeTimes = new Map<string, number>(
        Object.values(provincesJson.provinces).map((p) => {
          return [p, 0];
        })
      );
      (option.value.series as any)[0].data = res.map((e:any) => {
        let province = "";
        if (
          Array.from(provinceEarthquakeTimes.keys()).find((p) => {
            if ((e.location as string).includes(p)) {
              province = p;
              return true;
            } else return false;
          })
        ) {
          provinceEarthquakeTimes.set(
            province,
            provinceEarthquakeTimes.get(province)! + 1
          );
        }
        return {
          value: [e.logitude, e.latitude, e.level],
        };
      });
      (option.value.series as any)[1].data = Array.from(
        provinceEarthquakeTimes.entries()
      ).map((e) => {
        return {
          name: e[0],
          value: e[1],
        };
      });
      isLoading.value = false;
      console.log((option.value.series as any)[0].data);
    });
  // option.value.series[0].
});
</script>

<style scoped>
.chart {
  height: 100vh;
}
</style>
