<template>
    <v-chart class="chart" :option="option" :update-options="{ notMerge: true }" :loading="isLoading" autoresize />
</template>
<script setup lang="ts">
import provincesJson from "@/assets/provinces.json";
import VChart from "vue-echarts";
import { ref,onMounted } from "vue";
import { use } from 'echarts/core'
import {
    TooltipComponent,
    TitleComponent,
} from 'echarts/components'
import { CanvasRenderer } from 'echarts/renderers'
use([
    TooltipComponent,
    TitleComponent,
    CanvasRenderer,
])
const isLoading = ref<boolean>(true);
const option = ref({
    title: {
        text: '关键词',
        show: false
    },
    tooltip: {},
    series: [{
        type: 'wordCloud',
        shape: 'circle',
        left: 'center',
        top: 'center',
        width: '100%',
        height: '100%',
        right: null,
        bottom: null,
        sizeRange: [30, 130],
        // rotationRange: [-45, 45],
        gridSize: 12,
        drawOutOfBound: false,
        // 这是全局的文字样式，相对应的还可以对每个词设置字体样式
        textStyle: {
            fontFamily: 'sans-serif',
            fontWeight: 'bold',
            // 颜色可以用一个函数来返回字符串
            color: function () {
                // Random color
                return 'rgb(' + [
                    Math.round(Math.random() * 160),
                    Math.round(Math.random() * 160),
                    Math.round(Math.random() * 160)
                ].join(',') + ')';
            },
            emphasis: {
                shadowBlur: 2,
                shadowColor: '#333'
            }
        },
        // Data is an array. Each array item must have name and value property.
        data: []

    }]
})
onMounted(() => {
    fetch(`${import.meta.env.VITE_HOST_NAME}/earthquake/api/`, {
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
      res.forEach((e:any) => {
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
      });
      (option.value.series as any)[0].data = Array.from(
        provinceEarthquakeTimes.entries()
      ).map((e) => {
        return {
          name: e[0],
          value: e[1],
        };
      });
      isLoading.value = false;
    });
})
</script>