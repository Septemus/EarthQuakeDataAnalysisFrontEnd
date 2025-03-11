<template>
    <v-chart class="chart" :option="option" :update-options="{ notMerge: true }" :loading="isLoading" autoresize />
</template>
<script setup lang="ts">
import VChart from "vue-echarts";
import { ref } from "vue";
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
const isLoading = ref<boolean>(false);
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
        sizeRange: [14, 72],
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
        data: [
            {
                name: '前端工程师',
                value: 100
            },
            {
                name: '数据可视化',
                value: 50
            },
            {
                name: '大耳朵图图',
                value: 20
            },
            {
                name: '前端工程师',
                value: 150
            },
            {
                name: '数据可视化',
                value: 75
            },
            {
                name: '大耳朵图图',
                value: 55
            }
        ]

    }]
})
</script>