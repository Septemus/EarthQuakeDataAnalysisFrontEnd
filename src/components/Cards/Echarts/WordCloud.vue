<template>
    <v-chart class="chart" :option="option" :update-options="{ notMerge: true }" :loading="isLoading" autoresize />
</template>
<script setup lang="ts">
// import provincesJson from "@/assets/provinces.json";
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
        sizeRange: [5, 180],
        // rotationRange: [-45, 45],
        gridSize: 12,
        drawOutOfBound: true,
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
    fetch(`${import.meta.env.VITE_HOST_NAME}/earthquake/api/locationly_count`, {
    headers: {
      "ngrok-skip-browser-warning": "true",
    },
  })
    .then((res) => {
      return res.json();
    })
    .then((res) => {
      const tmp = Object.entries(res).map((e:any) => {
        let name=e[0];
        if(name==="新疆维吾尔自治区") {
          name="新疆"
        }
        return {
          name,
          value: e[1],
        };
      });
      console.log(tmp);
      (option.value.series as any)[0].data=tmp
      isLoading.value = false;
    });
})
</script>