<template>
    <Funnel :data="data" :is-loading="isLoading" :xunit="'km'" />
</template>
<script lang="ts" setup>
import Funnel from '@/components/Cards/Echarts/Funnel.vue';
import { onMounted, ref } from 'vue';
const isLoading = ref<boolean>(true)
const data = ref<{ value: number, name: '0-50' | '50-100' | '100-150' | '150-700' }[]>([{name:'0-50',value:0},{name:'50-100',value:0},{name:'100-150',value:0},{name:'150-700',value:0}])
onMounted(() => {
    fetch(`${import.meta.env.VITE_HOST_NAME}/earthquake/api/depth`, {
        headers: {
            "ngrok-skip-browser-warning": "true",
        },
    }).then(res => res.json()).then((res: { depth: number }[]) => {
        let sum=0;
        res.forEach(e => {
            ++sum;
            if(e.depth<50) {
                data.value[0].value++;
            }
            else if(e.depth<100) {
                data.value[1].value++;
            }
            else if(e.depth<150) {
                data.value[2].value++;
            }
            else {
                data.value[3].value++
            }
        })
        data.value.forEach(d=>{
            d.value/=sum
            d.value*=100
        })
        isLoading.value = false
    })
})
</script>