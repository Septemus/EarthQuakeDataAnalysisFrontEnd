<template>
    <Line :data="data" :categories="categories" :is-loading="isLoading" :title="'月平均地震强度'" :yaxisrange="[3,4.5]"/>
</template>
<script lang="ts" setup>
// import Chart from "chart.js";
import { onMounted, ref } from "vue";
import Line from "@/components/Cards/Echarts/Line.vue";
const categories = ref<string[]>([])
const data = ref<number[]>([])
const isLoading = ref<boolean>(true)
onMounted(() => {
    fetch(`${import.meta.env.VITE_HOST_NAME}/earthquake/api/monthly_avg`, {
        headers: {
            "ngrok-skip-browser-warning": "true",
        },
    }).then(res => res.json()).then((res: { ym: string, ymly_avg: number }[]) => {
        categories.value = res.map((e) => {
            return e.ym
        });
        data.value = res.map((e) => e.ymly_avg)
        isLoading.value = false
    })
})
</script>