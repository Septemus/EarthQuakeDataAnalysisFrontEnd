<template>
    <Bar :is-loading="isLoading" :values="values" :category="categories"/>
</template>
<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import Bar from "@/components/Cards/Echarts/Bar.vue"
const isLoading = ref(true)
const values=ref<number[]>([])
const categories=ref<string[]>([])
onMounted(() => {
    fetch(`${import.meta.env.VITE_HOST_NAME}/earthquake/api/levely_count`, {
        headers: {
            "ngrok-skip-browser-warning": "true",
        },
    }).then((res)=>{
        return res.json()
    }).then((res:{level_int:number,levely_count:number}[])=>{
        isLoading.value=false
        values.value=res.map((e)=>{
            return e.levely_count
        })
        categories.value=res.map((e)=>{
            return e.level_int.toString()
        })
    })
})
</script>