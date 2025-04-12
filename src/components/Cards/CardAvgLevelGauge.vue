<template>
    <Gauge :data="data" :is-loading="isLoading" :min="2" :max="5" />
</template>
<script lang="ts" setup>

import Gauge from '@/components/Cards/Echarts/Gauge.vue';
import { ref } from 'vue';
import { onMounted } from 'vue';
const data = ref<{ name: string, value: number }>({ name: '', value: 0 });
const isLoading = ref<boolean>(true)
onMounted(() => {
    fetch(`${import.meta.env.VITE_HOST_NAME}/earthquake/api/average_level`, {
        headers: {
            "ngrok-skip-browser-warning": "true",
        },
    }).then((res) => res.json()).then((res) => {
        isLoading.value = false
        data.value.value = res.data
        data.value.value=parseFloat(data.value.value.toFixed(2))
        data.value.name="平均地震级数"
    })
})
</script>