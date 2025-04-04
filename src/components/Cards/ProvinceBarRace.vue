<template>
    <bar-race :is-loading="isLoading" :top-count="10" :category="categories" :values="values" :bg-text="curMonth" :speed="speed" />
</template>
<script lang="ts" setup>
import BarRace from '@/components/Cards/Echarts/BarRace.vue';
import { onMounted, ref } from 'vue';
const isLoading = ref(true)
const location_count = new Map<string, number>()
const values = ref<number[]>([])
const categories = ref<string[]>([])
const curMonth = ref<string>("")
const speed = ref<number>(1000)
onMounted(() => {
    fetch(`${import.meta.env.VITE_HOST_NAME}/earthquake/api/locationly_monthly_count`, {
        headers: {
            "ngrok-skip-browser-warning": "true",
        },
    }).then((res) => {
        return res.json()
    }).then(async (res) => {
        isLoading.value = false
        let lastMonth = Object.keys(res)[0].split('/')[0];
        const entries = Object.entries<number>(res)
        for (let i = 0; i < entries.length; ++i) {
            curMonth.value = entries[i][0].split('/')[0];
            if (curMonth.value !== lastMonth) {
                categories.value = Array.from(location_count.keys())
                values.value = Array.from(location_count.values())
                await new Promise(res => {
                    setTimeout(res, speed.value)
                })
            }
            const province = entries[i][0].split('/')[1];
            const count = entries[i][1]
            if (location_count.get(province) === undefined) {
                location_count.set(province, count)
            }
            else {
                location_count.set(province, location_count.get(province)! + count)
            }
            lastMonth = curMonth.value;
        }
    })
})
</script>