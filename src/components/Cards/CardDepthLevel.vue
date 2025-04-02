<template>
    <Scatter :data="data" :is-loading="isLoading" :xunit="'km'" />
</template>
<script lang="ts" setup>
import Scatter from '@/components/Cards/Echarts/MyScatter.vue';
import { onMounted, ref } from 'vue';
const isLoading = ref<boolean>(true)
const data = ref<[number, number][]>([])
onMounted(() => {
    fetch(`${import.meta.env.VITE_HOST_NAME}/earthquake/api/depth_level`, {
        headers: {
            "ngrok-skip-browser-warning": "true",
        },
    }).then(res => res.json()).then((res: { depth: number, level: number }[]) => {
        data.value = res.map(e => {
            e.level+=Math.random()*0.1;
            return [e.depth, e.level]
        })
        isLoading.value = false
    })
})
</script>