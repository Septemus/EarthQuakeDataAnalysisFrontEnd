<template>
  <div class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-blueGray-700 z-10">
    <div class="rounded-t mb-0 px-4 py-3 bg-transparent">
      <div class="flex flex-wrap items-center">
        <div class="relative w-full max-w-full flex-grow flex-1">
          <h6 class="uppercase text-blueGray-100 mb-1 text-xs font-semibold">
            年地震次数折线图
          </h6>
          <h2 class="text-white text-xl font-semibold">

          </h2>
        </div>
      </div>
    </div>
    <div class="p-4 flex-auto">
      <!-- Chart -->
      <div class="relative h-350-px">
        <Line :categories="categories" :data="data" :is-loading="isLoading" title="年地震次数"/>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
// import Chart from "chart.js";
import { onMounted, ref } from "vue";
import Line from "./Echarts/Line.vue";
const categories = ref<string[]>([])
const data = ref<number[]>([])
const isLoading = ref<boolean>(true)
onMounted(() => {
  fetch(`${import.meta.env.VITE_HOST_NAME}/earthquake/api/yearly_count`, {
    headers: {
      "ngrok-skip-browser-warning": "true",
    },
  }).then(res => res.json()).then((res: { year: string, yearly_count: number }[]) => {
    debugger;
    categories.value = res.map((e) => {
      return e.year
    });
    data.value = res.map((e) => e.yearly_count)
    isLoading.value = false
  })
})
</script>
