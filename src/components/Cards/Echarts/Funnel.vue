<template>
    <v-chart class="chart" :option="option" :update-options="{ notMerge: true }" :loading="isLoading" autoresize />
</template>

<script lang="ts" setup>
import VChart from "vue-echarts";
import { use } from 'echarts/core'
import { FunnelChart } from 'echarts/charts'
import {
    TitleComponent,
    TooltipComponent,
    ToolboxComponent,
    LegendComponent
} from 'echarts/components'
import { CanvasRenderer } from 'echarts/renderers'
import { computed } from "vue";

use([
    TitleComponent,
    TooltipComponent,
    ToolboxComponent,
    LegendComponent,
    FunnelChart,
    CanvasRenderer
])

const props = defineProps<{ isLoading: boolean, data: { value: number, name: '0-50' | '50-100' | '100-150' | '150-700' }[], xunit?: string }>()

const option = computed(() => {
    return {
        tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c}%'
        },
        toolbox: {
            feature: {
                dataView: { readOnly: false },
                restore: {},
                saveAsImage: {}
            }
        },
        legend: {
            data: ['0-50', '50-100', '100-150', '150-700']
        },
        series: [
            {
                name: 'Funnel',
                type: 'funnel',
                left: '10%',
                top: 60,
                bottom: 60,
                width: '80%',
                min: 0,
                max: 100,
                minSize: '0%',
                maxSize: '100%',
                sort: 'descending',
                gap: 2,
                label: {
                    show: true,
                    position: 'inside'
                },
                labelLine: {
                    length: 10,
                    lineStyle: {
                        width: 1,
                        type: 'solid'
                    }
                },
                itemStyle: {
                    borderColor: '#fff',
                    borderWidth: 1
                },
                emphasis: {
                    label: {
                        fontSize: 20
                    }
                },
                data: props.data
            }
        ]
    };
})
</script>