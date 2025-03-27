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
            const ret = [
                {
                    name: "春季",
                    value: 0,
                },
                {
                    name: "夏季",
                    value: 0
                },
                {
                    name: "秋季",
                    value: 0
                },
                {
                    name: "冬季",
                    value: 0
                },
            ]
            res.forEach((e: { ym: string, ymly_count: number }) => {
                switch(e.ym.slice(-2)){
                    case "03":
                    case "04":
                    case "05":{
                        ret[0].value+=e.ymly_count
                        break;
                    }
                    case "06":
                    case "07":
                    case "08":{
                        ret[1].value+=e.ymly_count
                        break;
                    }
                    case "09":
                    case "10":
                    case "11":{
                        ret[2].value+=e.ymly_count
                        break;
                    }
                    case "12":
                    case "01":
                    case "02":{
                        ret[3].value+=e.ymly_count
                        break;
                    }
                }
            });
            data.value = ret
            isLoading.value = false;
        });
})
</script>