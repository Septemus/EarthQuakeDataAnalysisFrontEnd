<template>
    <Bar :scrolling="true" :is-loading="isLoading" :values="values" :category="categories" :batch-size="4" />
</template>
<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import Bar from "@/components/Cards/Echarts/Bar.vue"
const isLoading = ref(true)
const values = ref<number[]>([])
const categories = ref<string[]>([])
onMounted(() => {
    fetch(`${import.meta.env.VITE_HOST_NAME}/earthquake/api/locationly_level_avg?property=province&sort=desc`, {
        headers: {
            "ngrok-skip-browser-warning": "true",
        },
    }).then((res) => {
        return res.json()
    }).then((res) => {
        isLoading.value = false
        categories.value = Object.keys(res)
        values.value = Object.values(res).map(
            (e) => parseFloat((e as number).toPrecision(4))
        )
    })
})
</script>