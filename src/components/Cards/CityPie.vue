<template>
    <Pie :data="data" :is-loading="isLoading" :series-name="'城市'"/>
</template>
<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import Pie from '@/components/Cards/Echarts/Pie.vue';
const data=ref<{name:string,value:number}[]>([])
const isLoading=ref<boolean>(true)
    onMounted(() => {
    fetch(`${import.meta.env.VITE_HOST_NAME}/earthquake/api/locationly_count?property=city`, {
    headers: {
      "ngrok-skip-browser-warning": "true",
    },
  })
    .then((res) => {
      return res.json();
    })
    .then((res) => {
      const tmp = Object.entries(res).map((e:any) => {
        let name=e[0];
        return {
          name,
          value: e[1],
        };
      });
      data.value=tmp
      isLoading.value = false;
    });
})
</script>