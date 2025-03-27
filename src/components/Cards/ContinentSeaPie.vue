<template>
    <Pie :data="data" :is-loading="isLoading" />
</template>
<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import Pie from '@/components/Cards/Echarts/Pie.vue';
const data = ref<{ name: string, value: number }[]>([])
const isLoading = ref<boolean>(true)
onMounted(() => {
    fetch(`${import.meta.env.VITE_HOST_NAME}/earthquake/api/locationly_count?property=province`, {
        headers: {
            "ngrok-skip-browser-warning": "true",
        },
    })
        .then((res) => {
            return res.json();
        })
        .then((res) => {
            const ret = [
                {
                    name: "大陆",
                    value: 0,
                },
                {
                    name: "海洋", 
                    value: 0
                }
            ]
            Object.entries(res).forEach((e: any) => {
                let name: string = e[0];
                if (name.includes("海域")) {
                    ret[1].value += e[1]
                }
                else {
                    ret[0].value += e[1]
                }
            });
            data.value = ret
            isLoading.value = false;
        });
})
</script>