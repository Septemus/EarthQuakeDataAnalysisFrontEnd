<template>
  <WordCloud :data="data" :is-loading="isLoading" class=""/>
</template>
<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import WordCloud from './Echarts/WordCloud.vue';
const data=ref<{name:string,value:number}[]>([])
const isLoading=ref<boolean>(true)
onMounted(() => {
    fetch(`${import.meta.env.VITE_HOST_NAME}/earthquake/api/locationly_count`, {
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
        if(name==="新疆维吾尔自治区") {
          name="新疆"
        }
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