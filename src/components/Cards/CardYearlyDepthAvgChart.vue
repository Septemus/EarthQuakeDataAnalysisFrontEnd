<template>
    <Line :data="data" :categories="categories" :is-loading="isLoading" :title="'年平均地震深度'" :yaxisrange="[8,17]"/>
</template>
<script lang="ts" setup>
// import Chart from "chart.js";
import { onMounted, ref } from "vue";
import Line from "@/components/Cards/Echarts/Line.vue";
const categories = ref<string[]>([])
const data = ref<number[]>([])
const isLoading = ref<boolean>(true)
onMounted(() => {
    fetch(`${import.meta.env.VITE_HOST_NAME}/earthquake/api/yearly_depth_avg`, {
        headers: {
            "ngrok-skip-browser-warning": "true",
        },
    }).then(res => res.json()).then((res: { year: string, yearly_avg: number }[]) => {
        categories.value = res.map((e) => {
            return e.year
        });
        data.value = res.map((e) => e.yearly_avg)
        isLoading.value = false
    })
})
</script>