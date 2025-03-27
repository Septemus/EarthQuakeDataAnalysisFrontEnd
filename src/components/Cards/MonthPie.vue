<template>
    <Pie :data="data" :is-loading="isLoading" />
</template>
<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import Pie from '@/components/Cards/Echarts/Pie.vue';
const data = ref<{ name: string, value: number }[]>([])
const isLoading = ref<boolean>(true)
onMounted(() => {
    fetch(`${import.meta.env.VITE_HOST_NAME}/earthquake/api/monthly_count`, {
        headers: {
            "ngrok-skip-browser-warning": "true",
        },
    })
        .then((res) => {
            return res.json();
        })
        .then((res) => {
            const ret: { name: string, value: number }[] = [
            ]
            for (let i = 0; i < 12; ++i) {
                ret.push({
                    name: `${i + 1}月`,
                    value: 0
                })
            }
            res.forEach((e: { ym: string, ymly_count: number }) => {
                const monthStr=e.ym.slice(-2);
                ret[parseInt(monthStr)-1].value+=e.ymly_count;
            });
            data.value = ret
            isLoading.value = false;
        });
})
</script>