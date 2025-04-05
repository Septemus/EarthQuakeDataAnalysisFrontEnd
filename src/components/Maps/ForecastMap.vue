<template>
    <v-chart class="chart" :option="option" :update-options="{ notMerge: true }" :loading="isLoading" autoresize />
</template>

<script setup lang="ts">
import { use } from "echarts/core";
import { CanvasRenderer } from "echarts/renderers";
import { HeatmapChart, MapChart, ScatterChart, EffectScatterChart } from "echarts/charts";
import { registerMap } from "echarts/core";
import {
    TitleComponent,
    TooltipComponent,
    GeoComponent,
    LegendComponent,
    VisualMapComponent,
} from "echarts/components";
import VChart from "vue-echarts";
import { ref, onMounted } from "vue";
import chinaJson from "@/assets/china.json";
import geoCoordMap from "@/assets/provinces-cord.json";
// import provincesJson from "@/assets/provinces.json";
import type { EChartsOption } from "echarts/types/dist/shared";
use([
    CanvasRenderer,
    MapChart,
    ScatterChart,
    EffectScatterChart,
    TitleComponent,
    TooltipComponent,
    GeoComponent,
    LegendComponent,
    HeatmapChart,
    VisualMapComponent,
]);
function convertData(data: { name: string, value: number }[]) {
    const res = [];
    for (let i = 0; i < data.length; i++) {
        const geoCoord = (geoCoordMap as any)[data[i].name];
        if (geoCoord) {
            res.push({
                name: data[i].name,
                value: geoCoord.concat(data[i].value)
            });
        }
    }
    return res;
}
const isLoading = ref<boolean>(true);
// const originalData = ref<{ name: string, value: number }[]>([]);
const option = ref<EChartsOption>(
    {
        textStyle: {
            fontFamily: 'Inter, "Helvetica Neue", Arial, sans-serif',
            fontWeight: 300
        },
        backgroundColor: "#404a59",
        visualMap: [
            {
                seriesIndex: 2,
                show: true,
                top: "5%",
                left: "10%",
                type: "continuous",
                min: 0,
                max: 250,
                inRange: {
                    color: ['#f2c31a', '#24b7f2'].reverse()
                },
                calculable: true,
                textStyle: {
                    color: "white",
                },
            },
        ],
        title: {
            subtext: "基于随机森林回归算法",
            top: "0",
            left: "center",
            textStyle: {
                color: "#fff"
            }
        },
        tooltip: {
            trigger: "item"
        },
        legend:
        {
            orient: "vertical",
            data: ["最大地震强度"],
            right: "5%",
            bottom: "5%",
            textStyle: {
                color: "#fff"
            }
        },
        geo: {
            map: "china",
            emphasis: {
                label: {
                    show: false
                },
                itemStyle: {
                    areaColor: "#2a333d"
                }
            },
            itemStyle: {
                areaColor: "#323c48",
                borderColor: "#111"
            },
        },
        series: [
            {
                name: "最大地震强度",
                type: "scatter",
                coordinateSystem: "geo",
                data: [],
                zlevel: 10,
                symbolSize: val => val[2] * 4 + 3,
                tooltip: {
                    formatter: function (val: any) {
                        return "最大地震强度："+val.name + ": " + val.value[2];
                    }
                },
                itemStyle: {
                    color: "#d350a4"
                }
            },
            {
                name: "Top 5",
                type: "effectScatter",
                coordinateSystem: "geo",
                data: [],
                symbolSize: val => val[2] * 4 + 3,
                showEffectOn: "render",
                rippleEffect: {
                    brushType: "stroke"
                },
                emphasis: {
                    scale: true
                },
                tooltip: {
                    formatter: function (val: any) {
                        return "最大地震强度："+val.name + ": " + val.value[2];
                    }
                },
                label: {
                    formatter: "{b}",
                    position: "right",
                    show: true
                },
                itemStyle: {
                    color: "#d350a4",
                    shadowBlur: 10,
                    shadowColor: "#333"
                },
                zlevel: 10
            },
            {
                name: "地震次数",
                type: "map",
                map: "china",
                data: [],
                zlevel: 5,
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
        ]
    }
)
// const option = ref<EChartsOption>();
onMounted(() => {
    registerMap("china", chinaJson as any);
    fetch(`${import.meta.env.VITE_HOST_NAME}/earthquake/api/locationly_count?year=2013`, {
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
        (option.value.series as any)[2].data = tmp
        return fetch(`${import.meta.env.VITE_HOST_NAME}/earthquake/api/locationly_max?year=2013`, {
            headers: {
                "ngrok-skip-browser-warning": "true",
            },
        })

    }).then(res => res.json()).then(res => {
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
        (option.value.series as any)[0].data = convertData(tmp);
        (option.value.series as any)[1].data = convertData(tmp.sort((a, b) => b.value - a.value).slice(0, 6))
        isLoading.value = false
    })

});
</script>

<style scoped>
.chart {
    height: 100%;
}
</style>