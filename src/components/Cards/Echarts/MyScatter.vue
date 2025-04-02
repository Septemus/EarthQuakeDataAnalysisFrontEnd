<template>
    <v-chart class="chart" :option="option" :update-options="{ notMerge: true }" :loading="isLoading" autoresize />
</template>
<script lang="ts" setup>
import VChart from "vue-echarts";
import { use } from 'echarts/core'
import { ScatterChart } from 'echarts/charts'
import {
    DatasetComponent,
    TooltipComponent,
    AxisPointerComponent,
    VisualMapComponent,
    GridComponent,
    TransformComponent
} from 'echarts/components'
import { CanvasRenderer } from 'echarts/renderers'
import { computed } from "vue";

use([
    DatasetComponent,
    TooltipComponent,
    VisualMapComponent,
    GridComponent,
    TransformComponent,
    ScatterChart,
    CanvasRenderer,
    AxisPointerComponent
])

const props = defineProps<{ isLoading: boolean, data: [number, number][],xunit?:string }>()


const option = computed(() => {
    return {
        dataset: [
            {
                source: props.data
            },
        ],
        tooltip: {
            position: 'top',
            axisPointer: {
                show: true,
                type: 'cross',
                lineStyle: {
                    type: 'dashed',
                    width: 1
                }
            }
        },
        visualMap: {
            min: 3,
            max: 9,
            dimension: 1,
            orient: 'vertical',
            right: 10,
            top: 'center',
            text: ['HIGH', 'LOW'],
            calculable: true,
            inRange: {
                color: ['#f2c31a', '#24b7f2']
            }
        },
        grid: {
            left: 120
        },
        xAxis: {
            axisLabel: {
                formatter: `{value} ${props.xunit}`
            },
        },
        yAxis: {
            min: 3,
            max: 9
        },
        series: {
            type: 'scatter',
            encode: { tooltip: [0, 1] },
            symbolSize: 13,
            datasetIndex: 0
        }
    };
})

</script>