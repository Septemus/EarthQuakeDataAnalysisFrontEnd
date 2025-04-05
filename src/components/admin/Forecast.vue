<template>
    <div class="flex flex-wrap mt-4">
        <div class="w-full mb-12 px-4">
            <card-avg-chart :title="'2026年预测情况'" :height="500" :see-all="false">
                <forecast-map />
            </card-avg-chart>
        </div>
        <div class="w-full mb-12 px-4">
            <card-avg-chart :title="'详细预测数据'" :height="500" :see-all="false">
                <card-data-table :columns="columns" :get-data="getData" :total="total" :is-loading="isLoading"
                    :crud="false" />
            </card-avg-chart>
        </div>
    </div>
</template>
<script lang="ts" setup>
import CardAvgChart from "@/components/Cards/CardAvgChart.vue";
import ForecastMap from "@/components/Maps/ForecastMap.vue";
import CardDataTable from "@/components/Cards/CardDataTable.vue";
import { ref } from "vue";
const isLoading = ref(true);
const total = ref(0);
const columns = [
    {
        prop: 'occurtime',
        label: '时间',
        dateTime: true
    },
    {
        prop: 'location',
        label: '地点',
    },
    {
        prop: 'logitude',
        label: '经度',
    },
    {
        prop: 'latitude',
        label: '纬度',
    },
    {
        prop: 'level',
        label: '强度',
    },
    {
        prop: 'depth',
        label: '深度',
    }
]
function getData(range?: [number, number]):Promise<any[]> {
    isLoading.value = true
    return fetch(`${import.meta.env.VITE_HOST_NAME}/earthquake/api?year=2013`, {
        headers: {
            "ngrok-skip-browser-warning": "true",
        },
    })
        .then(res => res.json())
        .then((res: { occurtime: string|Date }[]) => {
            res.forEach((item: { occurtime: string|Date }) => {
                item.occurtime = new Date(item.occurtime)
                item.occurtime.setFullYear(2026)
            })
            res.sort((a,b)=>{
                return Date.parse(a.occurtime.toString())-Date.parse(b.occurtime.toString())
            })
            total.value = res.length
            console.log(res)
            // tableData.value = res
            isLoading.value = false
            if (range) {
                return res.slice(range[0], range[1])
            }
            else {
                return res;
            }
        })
}
</script>