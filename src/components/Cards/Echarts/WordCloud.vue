<template>
  <v-chart class="chart" :option="option" :update-options="{ notMerge: true }" :loading="isLoading" autoresize />
</template>
<script setup lang="ts">
// import provincesJson from "@/assets/provinces.json";
import VChart from "vue-echarts";
import { computed } from "vue";
import { use } from 'echarts/core'
import {
  TooltipComponent,
  TitleComponent,
} from 'echarts/components'
import { CanvasRenderer } from 'echarts/renderers'
const props = defineProps<{ isLoading: boolean, data: { name: string, value: number }[] }>()
use([
  TooltipComponent,
  TitleComponent,
  CanvasRenderer,
])
const option = computed(() => {
  return {
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
      sizeRange: [10, 200],
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
      data: props.data

    }]
  }
})

</script>