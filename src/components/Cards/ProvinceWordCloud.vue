<template>
  <div
    class="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded h-full"
  >
    <div class="rounded-t mb-0 px-4 py-3 border-0">
      <div class="flex flex-wrap items-center">
        <div class="relative w-full px-4 max-w-full flex-grow flex-1">
          <h3 class="font-semibold text-base text-blueGray-700">
            地震省份词云绘图
          </h3>
        </div>
        <div
          class="relative w-full px-4 max-w-full flex-grow flex-1 text-right"
        >
          <button
            class="bg-indigo-500 text-white active:bg-indigo-600 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
            type="button"
          >
            See all
          </button>
        </div>
      </div>
    </div>
    <div class="block w-full overflow-x-auto flex-grow h-600-px">
      <WordCloud :data="data" :is-loading="isLoading" class=""/>
    </div>
  </div>
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
      debugger
      data.value=tmp
      isLoading.value = false;
    });
})
</script>